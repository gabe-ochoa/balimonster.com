# Chase the deep blue. Real trips.

## Objective

Replace the illustrative stock presentation with real promotional photos and video from the owner's Apple Photos shared album, “Bali monster spearfishing”. Make the site feel bold, personal, and credible, and turn interest into WhatsApp trip enquiries.

## Confirmed inputs

- The owner supplied the album name and authorized its promotional media for the site on 2026-09-07.
- The owner explicitly retained the existing direction and withdrew the Riz-centered and “slay” direction. Keep “Chase the deep blue”, the navy/lime palette, and the adventure tone.
- Spearfishing, freediving, and charters are the existing activities (`app/page.tsx`).
- Bookings use +1 512 767 9350 and activity-specific WhatsApp messages (`app/site.ts`).
- Hosting is a static vinext export on Cloudflare Pages (`next.config.ts`, `README.md`).
- Existing colors and typography provide a usable navy, lime, and condensed-type identity (`app/globals.css`).

## Editorial direction

Keep the established “CHASE THE DEEP BLUE.” headline and understated adventure tone. Ground the story in the actual supplied catches, underwater footage, boats, and people. Avoid generic stock, fabricated testimonials, rankings, certifications, experience counts, or named species that cannot be confirmed. Do not introduce a Riz profile or “slay” copy.

## Proposed experience

1. Homepage: real hero photo, short statement, clear WhatsApp CTA, strongest catch/crew footage, activity choices, trip-planning details, FAQs.
2. Gallery at `/gallery`: curated photos and playable clips, useful captions, and a booking CTA. Create this page if the supplied media supports a substantial collection.
3. Keep activity sections on the homepage unless confirmed trip details justify separate pages. Avoid thin pages made from repeated marketing text.
4. Make navigation work on small screens and between routes, including homepage section anchors.

## Media workflow

- Access only the requested album. Keep source exports outside public output and Git.
- Create a local inventory, inspect images and representative video frames, then select for hero, catches, crew, and underwater atmosphere.
- Do not identify people by guessing their faces.
- Preserve authentic subject matter. Resize/compress supplied media without AI alteration of catches, people, or locations.
- Strip location/device metadata from published derivatives. Give files descriptive names and keep a provenance manifest with the original filename and intended use.
- Use responsive images with explicit dimensions. Load below-fold media lazily.
- Videos get posters, visible controls, inline playback, and no automatic audio. Do not download whole videos on initial page load. Add captions or a transcript when speech carries relevant information.
- Keep each published file below Cloudflare Pages' verified upload limit. Prefer short, compressed clips and avoid adding source videos to Git.
- Replace the social preview with real imagery once the selection is final.

## Technical approach

Retain the current React/vinext/Vite static export and pinned dependencies. Extract shared site navigation/footer when introducing the gallery. Use a typed media manifest to drive the homepage selections and gallery. Keep the default booking contact unchanged unless the owner supplies a replacement. Add route-specific metadata and sitemap entries for any new pages.

## Verification

- Build all routes as static HTML; keep an exported 404.
- Check every internal route, image, poster, video, and stylesheet referenced by the export.
- Verify WhatsApp recipient and activity text on all pages.
- Check that each page has its own canonical URL and descriptive metadata.
- Run typecheck, lint, and export tests.
- Confirm image dimensions, file sizes, and video codec support before handoff.
- Provide the finished result for review before any merge or deployment. Main may now trigger Cloudflare Pages automatically.

## Media access

The owner provided `~/Desktop/BaliPhotos` on 2026-09-07. Read and inspect these supplied files directly. Keep the source folder unchanged. The former shared-album access blocker is resolved.
