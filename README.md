# Bali Monster Spearfishing

One-page site for **balimonster.com**. Spearfishing, freediving, and charters in Bali.
All booking links open WhatsApp for **+1 512 767 9350** with an activity-specific enquiry.
No messages are sent automatically. No database, authentication, payment flow, or backend credentials are required.

## Local preview

Use Node 22.13 or newer. Node 22.17 was used during development.

```sh
cd ~/code/balispearfishing
bun install --frozen-lockfile
npm run dev -- --host 127.0.0.1
```

Open the Local URL printed by the server. Default: http://localhost:3000/.

## Verification

```sh
npm run build
npm run typecheck
npm run lint
npm test
```

The rendered HTML test checks the built Cloudflare Worker locally with mocked asset access.
It verifies the WhatsApp recipient and enquiry text without contacting WhatsApp.

## Editing

- `app/site.ts`: business name, domain, phone, and WhatsApp message template.
- `app/page.tsx`: content and section layout.
- `app/globals.css`: responsive styles and color tokens.
- `app/layout.tsx`: fonts and metadata.
- `public/`: locally served imagery, social card, sitemap, and robots file.

## Cloudflare handoff

This site uses React, vinext, Vite, and the Cloudflare Vite plugin.
`npm run build` produces the Worker and assets in `dist/`.
The Cloudflare plugin writes deployment configuration in the build output.
The Sites plugin also copies `.openai/hosting.json` into the build output.
No D1, R2, secrets, or provider bindings are required for the landing page.
Publishing and domain changes require approval. This version is local only.

This is an independent Git repository at `~/code/balispearfishing` on `codex/bali-monster`.
It is separate from the txt.wedding workspace.

## Content and image sources

Business facts and booking details came from the owner in this conversation on 2026-09-07.
Prices, certifications, equipment inclusions, customer reviews, and meeting locations are not assumed.
Ocean photography is illustrative stock, not a photograph of the business or a promised dive location.

- Ocean photo: [Unsplash freediver collection](https://unsplash.com/s/photos/freediver), image `photo-1581260163220-7fb2c70bebaa`.
- Booking format: [WhatsApp click to chat documentation](https://faq.whatsapp.com/5913398998672934).
- Social card: generated with the built-in image generation tool. Prompt: deep navy and lime ocean adventure card with the brand name, “CHASE THE DEEP BLUE.”, the three activities, and `balimonster.com`. Corrected the earlier domain in one edit.
