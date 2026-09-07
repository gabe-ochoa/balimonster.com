# Validation

2026-09-07

- Static build exports `/`, `/gallery`, and a 404 page.
- TypeScript and ESLint pass.
- Six export tests pass: homepage/booking content, 404, asset references, gallery metadata/media, internal navigation/anchors, and Pages media limits.
- Local Pages HTTP checks: homepage and gallery 200, unknown route 404, selected photo 200, MP4 200 with `video/mp4`.
- Three MP4s have a single H.264 video stream, 4:2:0 pixels, no audio, no source location tag, and the MP4 index before media data for progressive playback.
- Selected image derivatives and representative video frames were inspected against the source inventory. Source-to-caption mappings were corrected before the final build.
- Browser layout/playback inspection was not performed. The local Pages preview ignores Range and returns the full MP4 with 200. Seeking/range delivery remains a hosted-environment check after deployment; no claim of live verification is made.
- No main-branch update, merge, or deployment is part of this review handoff.

## Header navigation fix

The first browser click check reproduced a vinext `next/link` handler exception that prevented both page and hash navigation. Replaced internal Link components with native anchors throughout the homepage and shared navigation/footer. This static site does not need client-router interception. Also excluded Wrangler's generated preview files from ESLint.

Browser verification after rebuilding: header “From the water” opens `/gallery`; header “The experiences” returns to `/#experiences` and scrolls to the activity section; brand returns to `/#top`. Build, typecheck, lint, and the six export tests pass. These navigation checks supersede the earlier statement that no browser navigation was inspected; video playback and responsive layout review remain separate.
