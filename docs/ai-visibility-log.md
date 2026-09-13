# AI visibility log

How to tell whether ChatGPT, Claude, Gemini, and Perplexity recommend Bali Monster Spearfishing, and whether that is changing.

## Monthly check

On the first of each month, ask each assistant the eight questions below in a fresh chat with web access on. Record whether Bali Monster is named, in what position, and which source the assistant cites. Add a row per month.

Questions:

1. Best spearfishing charter in Bali
2. Spearfishing for dogtooth tuna in Bali
3. Freediving trips in Bali for beginners
4. Boat charter for spearfishing in Bali
5. Is spearfishing legal in Bali
6. Spearfishing near Nusa Penida
7. Best months for spearfishing in Bali
8. Spearfishing guide in Bali, book by WhatsApp

Scoring per assistant: count of the eight questions where Bali Monster is named. Note the source cited most often (balimonster.com, Google profile, TripAdvisor, other).

| Month | ChatGPT | Claude | Gemini | Perplexity | Most-cited source | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-09 | | | | | | Baseline, before the crawler and content changes shipped |

## Crawler access

Run `npm run check:ai-access` after any Cloudflare change and once a month. It fetches the live site as each search and AI crawler and fails if any of them gets a challenge page, a 403, or a page without the structured data.

| Date | Result | Notes |
| --- | --- | --- |
| | | |

## Where guests come from

Ask every WhatsApp enquiry how they found the business. Tally the answers here by month.

| Month | Search | Assistant (ChatGPT, Claude, etc.) | Social | Word of mouth | Other |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
