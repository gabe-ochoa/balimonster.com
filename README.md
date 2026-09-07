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

The tests check the exported homepage, 404 page, referenced assets, and domain metadata.
They verify the WhatsApp recipient and enquiry text without contacting WhatsApp.
Run `npm start` after building to preview the static site with the local Pages server.

## Editing

- `app/site.ts`: business name, domain, phone, and WhatsApp message template.
- `app/page.tsx`: content and section layout.
- `app/globals.css`: responsive styles and color tokens.
- `app/layout.tsx`: fonts and metadata.
- `public/`: locally served imagery, social card, sitemap, and robots file.

## Cloudflare Pages setup

Connect [gabe-ochoa/balimonster.com](https://github.com/gabe-ochoa/balimonster.com) in Cloudflare Pages with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist/client` |
| Root directory | Repository root (leave blank) |
| Environment variable | `NODE_VERSION=22.17.0` |

Keep the committed Bun lockfile so Pages can install the pinned dependencies.
The site uses React, vinext, and Vite with `output: "export"`.
Only `dist/client` is published. `dist/server` contains build-time rendering code and must not be uploaded.
No Workers runtime, Pages Functions, bindings, or secrets are required.
The exported `404.html` makes unknown URLs return a not-found page instead of the homepage.
The copyright year is generated at build time.

After the first deployment, add `balimonster.com` under the Pages project's Custom domains and follow Cloudflare's DNS instructions.
Publishing and DNS changes are handled separately by the owner.
The existing `.openai/hosting.json` is retained for project compatibility and is not used by Pages.

References: [Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/),
[Pages static routing](https://developers.cloudflare.com/pages/configuration/serving-pages/).

## Content and image sources

Business facts and booking details came from the owner in this conversation on 2026-09-07.
Prices, certifications, equipment inclusions, customer reviews, and meeting locations are not assumed.
Ocean photography is illustrative stock, not a photograph of the business or a promised dive location.

- Ocean photo: [Unsplash freediver collection](https://unsplash.com/s/photos/freediver), image `photo-1581260163220-7fb2c70bebaa`.
- Booking format: [WhatsApp click to chat documentation](https://faq.whatsapp.com/5913398998672934).
- Social card: generated with the built-in image generation tool. Prompt: deep navy and lime ocean adventure card with the brand name, “CHASE THE DEEP BLUE.”, the three activities, and `balimonster.com`. Corrected the earlier domain in one edit.
