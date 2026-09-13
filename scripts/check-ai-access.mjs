#!/usr/bin/env node
// Fetches the live site as each search and AI crawler and reports whether it gets the full page.
// Cloudflare's AI bot blocking and managed robots.txt act before this site's own files,
// so the only way to know an assistant can read balimonster.com is to ask as the assistant would.
//
//   npm run check:ai-access            # checks https://balimonster.com
//   npm run check:ai-access -- <url>   # checks a preview deployment

const origin = (process.argv[2] ?? 'https://balimonster.com').replace(/\/$/, '');
const crawlers = {
  'Googlebot': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Bingbot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36',
  'GPTBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'ChatGPT-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  'ClaudeBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'Claude-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +https://www.anthropic.com/claude-searchbot)',
  'Claude-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +https://www.anthropic.com/claude-user)',
  'PerplexityBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'Perplexity-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
  'Applebot': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko; compatible; Applebot/0.1; +http://www.apple.com/go/applebot)',
  'DuckAssistBot': 'Mozilla/5.0 (compatible; DuckAssistBot/1.1; +http://duckduckgo.com/duckassistbot.html)',
};

async function fetchAs(name, agent, path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${origin}${path}`, { headers: { 'user-agent': agent, accept: 'text/html,application/xhtml+xml,*/*' }, redirect: 'follow', signal: controller.signal });
    const body = await response.text();
    return { name, path, status: response.status, ok: response.ok, body, server: response.headers.get('server') ?? '' };
  } catch (error) {
    return { name, path, status: 0, ok: false, body: '', server: '', error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

function checkPage({ body }) {
  const hasTitle = /<title>Bali Monster Spearfishing/.test(body);
  const hasSchema = /<script type="application\/ld\+json">/.test(body);
  const hasWhatsApp = /https:\/\/wa\.me\/6282236954017/.test(body);
  const challenge = /Just a moment|cf-chl|challenge-platform|Attention Required/.test(body);
  return { hasTitle, hasSchema, hasWhatsApp, challenge };
}

const pages = ['/', '/spearfishing-bali', '/faq'];
let failures = 0;
console.log(`Checking ${origin} as ${Object.keys(crawlers).length} crawlers\n`);
for (const [name, agent] of Object.entries(crawlers)) {
  const results = await Promise.all(pages.map(path => fetchAs(name, agent, path)));
  const lines = results.map(result => {
    const page = checkPage(result);
    const pass = result.ok && page.hasTitle && page.hasSchema && page.hasWhatsApp && !page.challenge;
    if (!pass) failures += 1;
    const why = result.error ? result.error : page.challenge ? 'Cloudflare challenge page' : !result.ok ? `HTTP ${result.status}` : !page.hasTitle ? 'no title' : !page.hasSchema ? 'no JSON-LD' : !page.hasWhatsApp ? 'no WhatsApp link' : 'full page';
    return `  ${pass ? 'PASS' : 'FAIL'}  ${result.path.padEnd(20)} ${why}`;
  });
  console.log(`${name}\n${lines.join('\n')}`);
}
const robots = await fetchAs('robots', crawlers.GPTBot, '/robots.txt');
const llms = await fetchAs('llms', crawlers.GPTBot, '/llms.txt');
const sitemap = await fetchAs('sitemap', crawlers.GPTBot, '/sitemap.xml');
console.log(`\nrobots.txt  ${robots.ok ? 'HTTP ' + robots.status : 'unreachable'}${/Disallow: \/\s*$/m.test(robots.body) ? '  WARNING: a Disallow: / rule is being served' : ''}`);
console.log(`llms.txt    ${llms.ok ? 'HTTP ' + llms.status : 'unreachable'}`);
console.log(`sitemap.xml ${sitemap.ok ? 'HTTP ' + sitemap.status + ', ' + [...sitemap.body.matchAll(/<loc>/g)].length + ' URLs' : 'unreachable'}`);
if (!robots.ok || !llms.ok || !sitemap.ok) failures += 1;
console.log(failures ? `\n${failures} check(s) failed. If the failures are Cloudflare challenges or 403s, turn off "Block AI bots" under Security > Bots in the Cloudflare dashboard.` : '\nEvery crawler receives the full page.');
process.exit(failures ? 1 : 0);
