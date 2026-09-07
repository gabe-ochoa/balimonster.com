import assert from 'node:assert/strict';
import test from 'node:test';

async function render(path = '/') {
  const { default: worker } = await import('../dist/server/index.js');
  return worker.fetch(new Request(`https://balimonster.com${path}`, {
    headers: { accept: 'text/html' },
  }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, {
    waitUntil() {}, passThroughOnException() {},
  });
}

test('serves the complete page and sends all enquiries to the correct WhatsApp recipient', async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
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

test('unknown routes return 404 instead of a booking page', async () => {
  assert.equal((await render('/not-a-page')).status, 404);
});
