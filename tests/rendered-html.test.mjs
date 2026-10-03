import assert from 'node:assert/strict';
import test from 'node:test';
import { access, readFile, readdir, stat } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const readOutput = (path) => readFile(new URL(path, output), 'utf8');

const trackPages = { spearfishing: 'spearfishing.html', charters: 'index.html' };
const text = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');

test('the spearfishing side serves the complete page and sends all enquiries to the correct WhatsApp recipient', async () => {
  const html = await readOutput(trackPages.spearfishing);
  assert.match(html, /<title>Bali Monster Spearfishing/);
  assert.match(html, /rel="canonical" href="https:\/\/balimonster.com\/spearfishing"/);
  assert.match(html, /CHASE THE/);
  assert.match(html, /Dogtooth tuna/);
  const links = [...html.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]+)"/g)].map(match => new URL(match[1].replaceAll('&amp;', '&').replaceAll('&#x27;', "'")));
  assert.ok(links.length >= 8, 'booking links render without needing client JavaScript');
  for (const link of links) {
    assert.equal(link.pathname, '/6282236954017');
    const message = link.searchParams.get('text');
    assert.match(message, /^Hi Bali Monster!/);
    assert.match(message, /Preferred dates:/);
    assert.match(message, /Number of people:/);
    assert.match(message, /Experience level:/);
  }
  for (const interest of ['spearfishing for dogtooth tuna', 'freediving', 'a boat charter']) {
    assert.ok(links.some(link => link.searchParams.get('text').includes(interest)), interest);
  }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project|balimonsterspearfishing\.com|txt\.wedding/);
});

test('the charters side never leads with the hunt and books every charter activity', async () => {
  const html = await readOutput(trackPages.charters);
  assert.match(html, /<title>Bali Monster \| Boat Charters/);
  assert.match(html, /rel="canonical" href="https:\/\/balimonster.com\/?"/);
  // Outside the two deliberate signposts (the door under the hero and the cross-link at the bottom),
  // the page must read as a boat-day site, not a spearfishing one.
  const body = text(html.slice(0, html.indexOf('track-cross')).replace(/<aside class="hunt-door"[^>]*>[\s\S]*?<\/aside>/, ''));
  assert.match(html, /<aside class="hunt-door"/);
  assert.doesNotMatch(body, /dogtooth|speargun|catch(es)?\b|the hunt/i, 'the charters side does not mention the hunt');
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  assert.doesNotMatch(markup, /media\/(two-catches|blue-water-catch|catch-closeup|sunset-crew|boat-day|back-at-the-boat)/, 'no catch photos on the charters side');
  for (const word of ['Snorkeling', 'Sunset cruise', 'Island camping', 'Sportfishing', 'Island transfers']) assert.match(body, new RegExp(word), word);
  const links = [...html.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]+)"/g)].map(match => new URL(match[1].replaceAll('&amp;', '&').replaceAll('&#x27;', "'")));
  assert.ok(links.length >= 8);
  for (const link of links) assert.equal(link.pathname, '/6282236954017');
  for (const interest of ['a snorkeling boat trip', 'a sunset cruise', 'an island camping trip', 'a sportfishing charter', 'an island transfer', 'a boat charter']) {
    assert.ok(links.some(link => link.searchParams.get('text').includes(interest)), interest);
  }
});

test('the front door is the charters side with spearfishing one tap away', async () => {
  const html = await readOutput('index.html');
  assert.match(html, /class="track-toggle"[^>]*><a href="\/spearfishing">Spearfishing<\/a><a href="\/" aria-current="page">Boat charters<\/a>/, 'the header toggle marks charters and offers spearfishing');
  assert.match(html, /class="hunt-door"/, 'option 3 signposts the hunt under the hero instead of asking first');
  assert.doesNotMatch(html, /bm-track|<dialog/, 'no popup and no remembered pick: the toggle is the switch');
  const spearfishing = await readOutput('spearfishing.html');
  assert.match(spearfishing, /class="track-toggle"[^>]*><a href="\/spearfishing" aria-current="page">Spearfishing<\/a><a href="\/">Boat charters<\/a>/);
});

test('exports a real 404 page so Pages does not fall back to the homepage', async () => {
  const html = await readOutput('404.html');
  assert.match(html, /404/);
  assert.doesNotMatch(html, /CHASE THE/);
});

test('exports all referenced assets and domain discovery files', async () => {
  for (const file of ['index.html', 'spearfishing.html', 'gallery.html', '404.html']) {
    const html = await readOutput(file);
    const assets = [...html.matchAll(/(?:src|poster)="(\/[^"#?]+)"/g)].map(match => match[1]);
    assets.push(...[...html.matchAll(/href="(\/_next\/[^"]+)"/g)].map(match => match[1]));
    assert.ok(assets.some(path => path.endsWith('.css')));
    for (const [, set] of html.matchAll(/srcSet="([^"]+)"/gi)) {
      for (const candidate of set.split(',')) assets.push(candidate.trim().split(/\s+/)[0]);
    }
    for (const path of assets) {
      await access(new URL(`.${path}`, output));
      if (path.endsWith('.css')) {
        const css = await readOutput(`.${path}`);
        for (const [, asset] of css.matchAll(/url\(["']?(\/[^)"']+)["']?\)/g)) {
          await access(new URL(`.${asset}`, output));
        }
      }
    }
  }
  await access(new URL('media/two-catches-1280.jpg', output));
  assert.match(await readOutput('robots.txt'), /Sitemap: https:\/\/balimonster\.com\/sitemap\.xml/);
  assert.match(await readOutput('sitemap.xml'), /<loc>https:\/\/balimonster\.com\/<\/loc>/);
  await assert.rejects(access(new URL('_worker.js', output)), { code: 'ENOENT' });
});


test('gallery has its own metadata, real media, and working booking links', async () => {
  const html = await readOutput('gallery.html');
  assert.match(html, /rel="canonical" href="https:\/\/balimonster.com\/gallery"/);
  assert.match(html, /property="og:url" content="https:\/\/balimonster.com\/gallery"/);
  assert.match(html, /From the Water/);
  assert.equal([...html.matchAll(/<figure class="gallery-photo"/g)].length, 10);
  const videos = [...html.matchAll(/<video\b([^>]*)>/g)];
  assert.equal(videos.length, 3);
  for (const [, attributes] of videos) {
    assert.match(attributes, /controls/);
    assert.match(attributes, /preload="none"/);
    assert.match(attributes, /poster="\/media\//);
    assert.doesNotMatch(attributes, /autoPlay|autoplay/);
  }
  for (const [, href] of html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&').replaceAll('&#x27;', "'"));
    assert.equal(url.pathname, '/6282236954017');
    assert.match(url.searchParams.get('text'), /Preferred dates:/);
  }
  assert.match(await readOutput('sitemap.xml'), /<loc>https:\/\/balimonster\.com\/gallery<\/loc>/);
});

test('internal navigation and anchors resolve in the static export', async () => {
  const pages = { '/': 'index.html', '/spearfishing': 'spearfishing.html', '/gallery': 'gallery.html', '/spearfishing-bali': 'spearfishing-bali.html', '/freediving-bali': 'freediving-bali.html', '/boat-charter-bali': 'boat-charter-bali.html', '/faq': 'faq.html' };
  for (const [route, file] of Object.entries(pages)) {
    const html = await readOutput(file);
    assert.doesNotMatch(html, /ocean-diver\.jpg|\/og\.png|WE SLAY/);
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const url = new URL(href, `https://balimonster.com${route}`);
      if (url.origin !== 'https://balimonster.com') continue;
      const target = pages[url.pathname];
      if (!target) { await access(new URL(`.${url.pathname}`, output)); continue; }
      if (url.hash) assert.ok((await readOutput(target)).includes(`id="${url.hash.slice(1)}"`), href);
    }
  }
});

test('published media fits Pages limits and excludes original videos', async () => {
  const files = await readdir(new URL('media/', output));
  assert.equal(files.filter(file => file.endsWith('.mp4')).length, 3);
  for (const file of files) {
    assert.match(file, /\.(jpg|mp4)$/);
    assert.ok((await stat(new URL(`media/${file}`, output))).size < 25 * 1024 * 1024, file);
  }
});

const tripPages = { '/spearfishing-bali': 'spearfishing-bali.html', '/freediving-bali': 'freediving-bali.html', '/boat-charter-bali': 'boat-charter-bali.html', '/faq': 'faq.html' };
const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)].map(match => JSON.parse(match[1]));
const types = (data) => [data['@type']].flat();

test('every page carries the LocalBusiness structured data with the WhatsApp number', async () => {
  for (const file of [...Object.values(trackPages), 'gallery.html', ...Object.values(tripPages)]) {
    const business = jsonLd(await readOutput(file)).find(data => types(data).includes('LocalBusiness'));
    assert.ok(business, file);
    assert.equal(business.name, 'Bali Monster Spearfishing');
    assert.equal(business.telephone, '+6282236954017');
    assert.equal(business.url, 'https://balimonster.com');
    assert.equal(business.contactPoint.url, 'https://wa.me/6282236954017');
    assert.equal(business.address.addressCountry, 'ID');
    assert.doesNotMatch(JSON.stringify(business), /aggregateRating|review/i, 'no ratings are claimed without real reviews');
  }
});

test('track homepages and trip pages expose their questions as FAQPage data', async () => {
  for (const file of [...Object.values(trackPages), ...Object.values(tripPages)]) {
    const html = await readOutput(file);
    const faq = jsonLd(html).find(data => data['@type'] === 'FAQPage');
    assert.ok(faq, file);
    assert.ok(faq.mainEntity.length >= 4, file);
    for (const item of faq.mainEntity) {
      assert.equal(item['@type'], 'Question');
      assert.ok(html.includes(`<summary>${item.name.replaceAll("'", '&#x27;').replaceAll('&', '&amp;')}`), `${file}: ${item.name} is visible on the page`);
      assert.match(item.acceptedAnswer.text, /\S/);
    }
  }
});

test('trip pages answer their question in plain text and book to the right WhatsApp interest', async () => {
  const expectations = {
    '/spearfishing-bali': { title: 'Spearfishing in Bali', interest: 'spearfishing for dogtooth tuna', service: 'Guided spearfishing trip' },
    '/freediving-bali': { title: 'Freediving in Bali', interest: 'freediving', service: 'Guided freediving trip' },
    '/boat-charter-bali': { title: 'Boat Charters in Bali', interest: 'a boat charter', service: 'Private boat charter' },
  };
  for (const [route, expected] of Object.entries(expectations)) {
    const html = await readOutput(tripPages[route]);
    assert.match(html, new RegExp(`<title>${expected.title} \\| Bali Monster Spearfishing`));
    assert.match(html, new RegExp(`rel="canonical" href="https://balimonster.com${route}"`));
    assert.match(html, /Bali Monster Spearfishing (runs|offers) /, 'opens with a plain statement an assistant can quote');
    assert.match(html, /Bali, Indonesia/);
    const service = jsonLd(html).find(data => data['@type'] === 'Service');
    assert.equal(service.serviceType, expected.service);
    assert.equal(service.provider['@id'], 'https://balimonster.com/#business');
    const links = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map(([, href]) => new URL(href.replaceAll('&amp;', '&').replaceAll('&#x27;', "'")));
    assert.ok(links.length >= 3, route);
    for (const link of links) {
      assert.equal(link.pathname, '/6282236954017');
      assert.match(link.searchParams.get('text'), /Preferred dates:/);
    }
    assert.ok(links.some(link => link.searchParams.get('text').includes(expected.interest)), expected.interest);
    assert.doesNotMatch(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''), /\$\s?\d|USD|IDR|Rp\s?\d/, 'no prices are invented');
  }
  const faq = await readOutput('faq.html');
  assert.match(faq, /rel="canonical" href="https:\/\/balimonster.com\/faq"/);
  assert.ok([...faq.matchAll(/<details>/g)].length >= 8);
});

test('crawler files welcome AI assistants and list every page', async () => {
  const robots = await readOutput('robots.txt');
  for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Google-Extended']) {
    assert.match(robots, new RegExp(`^User-agent: ${bot}$`, 'm'), bot);
  }
  assert.doesNotMatch(robots, /^Disallow:/m);
  const llms = await readOutput('llms.txt');
  assert.match(llms, /^# Bali Monster Spearfishing/);
  assert.match(llms, /\+62 822-3695-4017/);
  assert.match(llms, /https:\/\/wa\.me\/6282236954017/);
  const sitemap = await readOutput('sitemap.xml');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  for (const route of ['/', '/gallery', ...Object.keys(tripPages)]) {
    assert.ok(locs.includes(`https://balimonster.com${route}`), route);
    assert.match(llms, new RegExp(`https://balimonster\\.com${route === '/' ? '/' : route}\\)`), `llms.txt links ${route}`);
  }
  for (const loc of locs) {
    const path = new URL(loc).pathname;
    await access(new URL(path === '/' ? 'index.html' : `.${path}.html`, output));
  }
});
