import assert from 'node:assert/strict';
import test from 'node:test';
import { access, readFile } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const readOutput = (path) => readFile(new URL(path, output), 'utf8');

test('serves the complete page and sends all enquiries to the correct WhatsApp recipient', async () => {
  const html = await readOutput('index.html');
  assert.match(html, /<title>Bali Monster Spearfishing/);
  assert.match(html, /rel="canonical" href="https:\/\/balimonster.com/);
  assert.match(html, /CHASE THE/);
  assert.match(html, /Dogtooth tuna/);
  const links = [...html.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]+)"/g)].map(match => new URL(match[1].replaceAll('&amp;', '&').replaceAll('&#x27;', "'")));
  assert.ok(links.length >= 8, 'booking links render without needing client JavaScript');
  for (const link of links) {
    assert.equal(link.pathname, '/15127679350');
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

test('exports a real 404 page so Pages does not fall back to the homepage', async () => {
  const html = await readOutput('404.html');
  assert.match(html, /404/);
  assert.doesNotMatch(html, /CHASE THE/);
});

test('exports all referenced assets and domain discovery files', async () => {
  for (const file of ['index.html', '404.html']) {
    const html = await readOutput(file);
    const assets = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map(match => match[1]);
    assert.ok(assets.some(path => path.endsWith('.css')));
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
  await access(new URL('og.png', output));
  assert.match(await readOutput('robots.txt'), /Sitemap: https:\/\/balimonster\.com\/sitemap\.xml/);
  assert.match(await readOutput('sitemap.xml'), /<loc>https:\/\/balimonster\.com\/<\/loc>/);
  await assert.rejects(access(new URL('_worker.js', output)), { code: 'ENOENT' });
});
