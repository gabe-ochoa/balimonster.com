import assert from 'node:assert/strict';
import test from 'node:test';
import { access, readFile, readdir, stat } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const readOutput = (path) => readFile(new URL(path, output), 'utf8');

test('serves the complete page and sends all enquiries to the correct WhatsApp recipient', async () => {
  const html = await readOutput('spearfishing.html');
  assert.match(html, /<title>Bali Monster/);
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
  for (const file of ['index.html', 'charters.html', 'spearfishing.html', 'gallery.html', '404.html']) {
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
    assert.equal(url.pathname, '/15127679350');
    assert.match(url.searchParams.get('text'), /Preferred dates:/);
  }
  assert.match(await readOutput('sitemap.xml'), /<loc>https:\/\/balimonster\.com\/gallery<\/loc>/);
});

test('internal navigation and anchors resolve in the static export', async () => {
  const pages = { '/': 'index.html', '/gallery': 'gallery.html', '/charters': 'charters.html', '/spearfishing': 'spearfishing.html' };
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


test('neutral landing and charters keep catches out of the browsing path', async () => {
  for (const file of ['index.html', 'charters.html']) {
    const html = await readOutput(file);
    assert.match(html, /BALI MONSTER/);
    assert.doesNotMatch(html, /(?:src|poster|content)="[^" ]*(?:two-catches|catch-closeup|blue-water-catch|sunset-crew|boat-day|sunset-return|heading-home)/);
    for (const activity of ['Snorkeling', 'Sunsets', 'Camping', 'Sportfishing', 'Island transfer']) assert.ok(html.includes(activity), activity);
    assert.match(html, /href="\/spearfishing"/);
    assert.match(html, /href="\/charters/);
  }
  const charter = await readOutput('charters.html');
  for (const id of ['snorkeling', 'sunsets', 'camping', 'sportfishing', 'island-transfer']) assert.ok(charter.includes(`id="${id}"`));
  for (const [, href] of charter.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)) assert.equal(new URL(href.replaceAll('&amp;', '&')).pathname, '/15127679350');
});
