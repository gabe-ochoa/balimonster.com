import assert from 'node:assert/strict';
import test from 'node:test';
import { access, readFile, readdir, stat } from 'node:fs/promises';

const output = new URL('../dist/client/', import.meta.url);
const readOutput = (path) => readFile(new URL(path, output), 'utf8');

test('serves the complete page and sends all enquiries to the correct WhatsApp recipient', async () => {
  const html = await readOutput('spearfishing.html');
  assert.match(html, /<title>Bali Monster/);
  assert.match(html, /rel="canonical" href="https:\/\/balimonster.com/);
  assert.match(html, /SPEARFISHING/);
  assert.match(html, /Dogtooth Tuna/);
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
  for (const interest of ['spearfishing for dogtooth tuna', 'blue water drifting', 'reef hunting', 'a boat charter']) {
    assert.ok(links.some(link => link.searchParams.get('text').includes(interest)), interest);
  }
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project|balimonsterspearfishing\.com|txt\.wedding/);
});

test('exports a real 404 page so Pages does not fall back to the homepage', async () => {
  const html = await readOutput('404.html');
  assert.match(html, /404/);
  assert.doesNotMatch(html, /SPEARFISHING/);
});

test('exports all referenced assets and domain discovery files', async () => {
  for (const file of ['index.html', 'charters.html', 'spearfishing.html', 'gallery.html', 'missions.html', 'blog/spearfishing-in-indonesia.html', '404.html']) {
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
  assert.equal([...html.matchAll(/<figure class="gallery-photo"/g)].length, 22);
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
  const pages = { '/': 'index.html', '/missions': 'missions.html', '/gallery': 'gallery.html', '/charters': 'charters.html', '/spearfishing': 'spearfishing.html', '/blog/spearfishing-in-indonesia': 'blog/spearfishing-in-indonesia.html' };
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
  assert.equal(files.filter(file => file.endsWith('.mp4')).length, 6);
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
    for (const activity of ['Snorkeling', 'Sunsets', 'Sportfishing', 'Island transfer']) assert.ok(html.includes(activity), activity);
    assert.match(html, /href="\/spearfishing"/);
    assert.match(html, /href="\/charters/);
  }
  const charter = await readOutput('charters.html');
  for (const id of ['snorkeling', 'sunsets', 'sportfishing', 'island-transfer']) assert.ok(charter.includes(`id="${id}"`));
  for (const [, href] of charter.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)) assert.equal(new URL(href.replaceAll('&amp;', '&')).pathname, '/15127679350');
});

 test('review feedback renders destinations, safety, founder, and catch policy', async () => {
  for (const file of ['index.html', 'charters.html']) {
    const html = await readOutput(file);
    for (const text of ['Nusa Penida', 'Nusa Lembongan', 'Nusa Ceningan', 'Manta Point', 'Padang Bai', 'Tulamben', 'EPIRB', 'cancel trips']) assert.ok(html.includes(text), `${file}: ${text}`);
    assert.doesNotMatch(html, /src="[^" ]*(?:penida-spearfishing|putu-commercial|fresh-fillet)/);
  }
  const html = await readOutput('spearfishing.html');
  for (const text of ['IN BALI.', 'Putu Ari', 'Opah Kill Bags', 'I shot a fish, can I keep it?', 'Putri Sri Ayuni', '300-litre']) assert.ok(html.includes(text), text);
  for (const photo of ['max04433', 'max04603', 'putu-commercial', 'fresh-fillet']) assert.ok(html.includes(`/media/${photo}-`), photo);
});

test('October 14 feedback removes camping and adds island stays and linked field notes', async () => {
  for (const file of ['index.html', 'charters.html']) {
    const html = await readOutput(file);
    assert.doesNotMatch(html, /camping/i);
    for (const text of ['cliffs', 'hidden bays', 'island temple', 'soft corals', 'mangrove forest', 'Blue Lagoon', 'Multi-day trips', 'by land']) assert.ok(html.includes(text), `${file}: ${text}`);
  }
  const route = '/blog/spearfishing-in-indonesia';
  assert.ok((await readOutput('spearfishing.html')).includes(`href="${route}"`));
  const html = await readOutput('blog/spearfishing-in-indonesia.html');
  assert.ok(html.includes(`rel="canonical" href="https://balimonster.com${route}"`));
  for (const text of ['drift diving', 'Never dive alone', 'spearfishing.northbali', 'indospearfishing', 'gusame_spearfishingbali', 'tabasanbalispearfishing']) assert.ok(html.includes(text), text);
  assert.ok((await readOutput('sitemap.xml')).includes(route));
});


test('October 17 feedback places silent loops on the right pages and alphabetizes guides', async () => {
  for (const file of ['index.html', 'charters.html', 'spearfishing.html']) {
    const html = await readOutput(file);
    const expected = file === 'spearfishing.html' ? ['spearfishing-hero'] : ['penida-hero', 'snorkeling-trevally'];
    for (const id of expected) {
      assert.ok(html.includes(`/media/${id}.mp4`), `${file}: ${id}`);
      assert.ok(html.includes(`/media/${id}-poster.jpg`));
    }
    const loops = [...html.matchAll(/<video\b([^>]*class="loop-video"[^>]*)>/g)];
    assert.equal(loops.length, expected.length);
    for (const [, attributes] of loops) {
      assert.match(attributes, /muted/i);
      assert.match(attributes, /loop/i);
      assert.match(attributes, /playsinline/i);
    }
    assert.ok(html.includes('Play video'), 'fallback playback control renders without JS');
  }
  const spear = await readOutput('spearfishing.html');
  assert.ok(spear.indexOf('/media/max04433-') < spear.indexOf('id="experiences"'), 'boat photo remains near the hero');
  const blog = await readOutput('blog/spearfishing-in-indonesia.html');
  const handles = [...blog.matchAll(/href="https:\/\/www.instagram.com\/([^/]+)\/"/g)].map(match => match[1]);
  assert.equal(handles.length, 5);
  assert.ok(handles.includes('mariospearfishingbali'));
  assert.deepEqual(handles, [...handles].sort());
});


test('new photos, caption-free gallery, and separate mobile booking section render', async () => {
  const gallery = await readOutput('gallery.html');
  for (const id of ['max03866','max03800','max04433','max04603','max05511']) assert.ok(gallery.includes(`/media/${id}-1280.jpg`));
  assert.doesNotMatch(gallery, /<figcaption/);
  assert.ok((await readOutput('spearfishing.html')).includes('/media/max04603-1280.jpg'));
  assert.ok((await readOutput('blog/spearfishing-in-indonesia.html')).includes('/media/max03800-1280.jpg'));
  for (const file of ['index.html','charters.html','spearfishing.html']) assert.match(await readOutput(file), /<div class="bm-mobile-booking"><a[^>]*href="https:\/\/wa.me/);
});


test('published pages omit decorative labels while retaining navigation and accessibility', async () => {
  for (const file of ['index.html','charters.html','spearfishing.html','gallery.html','missions.html','blog/spearfishing-in-indonesia.html']) {
    const html = await readOutput(file);
    assert.doesNotMatch(html, /class="(?:eyebrow|bm-kicker|bm-ticker|activity-strip|hero-side-note|image-caption|button-note)"/);
    assert.doesNotMatch(html, /GOOD DAYS START|LESS NOISE|YOUR KIND|REAL STORIES|REIMAGINED/);
    assert.match(html, /<h1/);
    assert.match(html, /Skip to content/);
    assert.match(html, /aria-label=/);
  }
});

 test('missions link from spearfishing and export destination details and supplied photos', async () => {
  const spear = await readOutput('spearfishing.html');
  for (const text of ['Blue Water Drifting','Reef Hunting','Andre Spearguns','href="/missions"']) assert.ok(spear.includes(text), text);
  const missions = await readOutput('missions.html');
  for (const text of ['Alas Purwo, Java','The Last Rumpon, Singaraja','Abdul Kadir','Details and dates to be announced.','https://balimonster.com/missions']) assert.ok(missions.includes(text), text);
  for (const id of ['max04692','max04263','max04219']) assert.ok(missions.includes(`/media/${id}-1280.jpg`));
  assert.ok((await readOutput('sitemap.xml')).includes('https://balimonster.com/missions'));
});
