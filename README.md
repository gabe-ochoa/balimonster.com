# Bali Monster Spearfishing

A homepage and trip gallery for **balimonster.com**. Spearfishing, freediving, and charters in Bali.
All booking links open WhatsApp for **+62 822-3695-4017** with an activity-specific enquiry.
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

The tests check the exported homepage, gallery, 404 page, referenced media, and domain metadata.
They verify the WhatsApp recipient and enquiry text without contacting WhatsApp.
Run `npm start` after building to preview the static site with the local Pages server.

## Editing

- `app/site.ts`: business name, domain, phone, service area, public profile links, and WhatsApp message template.
- `app/faqs.ts`: the questions and answers shared by the homepage, `/faq`, and the trip pages.
- `app/structured-data.tsx`: schema.org JSON-LD for the business, each trip service, and the FAQs.
- `app/trip-page.tsx`: the shared layout for `/spearfishing-bali`, `/freediving-bali`, and `/boat-charter-bali`.
- `app/page.tsx`: homepage content and section layout.
- `app/gallery/page.tsx`: real trip photo and video gallery.
- `app/components.tsx`: shared navigation, footer, and media rendering.
- `app/media-manifest.json`: selected media, descriptions, and source filenames.
- `app/globals.css`: responsive styles and color tokens.
- `app/layout.tsx`: fonts and metadata.
- `public/`: locally served imagery, social card, sitemap, and robots file.

## Search engines and AI assistants

Assistants such as ChatGPT, Claude, Gemini, and Perplexity recommend a business from what their crawlers can read and from what other trusted sites say about it. The repository handles the first part:

- `public/robots.txt` names every major search and AI crawler with an explicit allow.
- `public/llms.txt` is a plain-text summary of the business for agents, with links to every page.
- Every page carries `LocalBusiness` JSON-LD with the WhatsApp number. Trip pages add `Service` and `FAQPage` data. The homepage and `/faq` add `FAQPage` data.
- `/spearfishing-bali`, `/freediving-bali`, `/boat-charter-bali`, and `/faq` each open with a plain statement of what the business offers, so an assistant has a sentence to quote.
- No prices, ratings, certifications, or meeting points are stated anywhere until the owner supplies them. The tests fail if a price or an `aggregateRating` appears.

```sh
npm run check:ai-access
```

That fetches the live site as each crawler and fails if any of them receives a challenge page, a 403, or a page without the structured data. Run it after any Cloudflare change.

Steps that live outside the repository, in the owner's accounts:

1. Cloudflare dashboard, Security → Bots: turn off "Block AI bots" and any managed robots.txt. That setting overrides the committed robots file.
2. Register the site in Bing Webmaster Tools and Google Search Console and submit `https://balimonster.com/sitemap.xml`. ChatGPT search reads Bing's index.
3. Create the Google Business Profile, Bing Places, and TripAdvisor listings with the same name, number, and description as the site, then add their URLs to `profiles` in `app/site.ts` so they publish as `sameAs` links.
4. Supply the facts the pages currently defer to WhatsApp: launch points, seasons, species, group sizes, inclusions, and a price range. Update `app/faqs.ts` and the trip pages when they are confirmed.

`docs/ai-visibility-log.md` holds the monthly check: eight questions to ask each assistant, and where to record the answers.

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

## Brand artwork

The main wordmark and illustrated fish/boat icon were supplied by the owner. Original JPEGs are preserved in `public/brand/`. The header and footer use a transparent PNG derived from the wordmark, without browser-dependent CSS masking; the icon appears in the booking panels and as the browser icon.

## Content and media

Business facts and booking details came from the owner on 2026-09-07.
Prices, certifications, equipment inclusions, customer reviews, and meeting locations are not assumed.
The owner retained the original “Chase the deep blue” direction and supplied `~/Desktop/BaliPhotos` with real promotional photos and videos from their trips.

The website uses ten selected photos and three silent video excerpts from that export. The hero is a frame from the supplied underwater clip. The social preview uses a real catch photo. No stock or AI-generated imagery remains.

`app/media-manifest.json` maps each published selection to its original filename. Published derivatives are under `public/media/`; source exports are not committed. Images are resized JPEGs in two widths, with descriptive alt text. Videos are H.264 MP4s with posters, controls, inline playback, no audio, and `preload="none"`. Each file is below the [Cloudflare Pages 25 MiB asset limit](https://developers.cloudflare.com/pages/platform/limits/).

To regenerate the selected media locally with FFmpeg and FFprobe installed:

```sh
python3 scripts/prepare-media.py ~/Desktop/BaliPhotos
npm run build
npm test
```

The script reads originals without changing them, removes source metadata, and exports only the selected files. The silent excerpts do not include source audio. Review provenance and alt text when changing a source selection.

Booking format: [WhatsApp click to chat documentation](https://faq.whatsapp.com/5913398998672934).
