# MEGA — Make Enugu Great for All

Next.js App Router campaign site for Ohaa–Omeje 2027, based on the supplied November 2026 Rescue Mission manifesto. All claims in the policy experience are proposals, not completed projects.

## Run locally

Node.js 20+ required. Open this folder in VS Code, then:

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build` to test production, then `npm start`. Deploy by importing the project into Vercel. This version uses JavaScript/JSX (not TypeScript).

## Content and routes

- Home, manifesto index, 23 individual policy pages, candidate profiles, campaign trail, implementation timeline, rural compact, newsroom and media centre.
- `data/policies.json`: editorial summaries, source page ranges. `data/source-pages.json`: extracted full source pages; adjacent policies can overlap on shared pages. Text extraction loses some table layout; the original PDF is authoritative.
- `data/content.json`: list of LGAs, timelines, rural commitments and campaign events/news. News and events are intentionally empty until verified. This file is the initial content store, not a live CMS. Edit and redeploy to publish. Example event (fictional schema only; do not publish without approval): `{ "id": "unique-id", "title": "...", "lga": "Nsukka", "date": "YYYY-MM-DD", "venue": "...", "description": "...", "status": "scheduled", "published": false }`. Status values are `scheduled` or `completed`. News item fields: `id`, `title`, `date`, `body`, optional `image`, `published`.
- `public/images`: six authentic source-manifesto images, and `/public/documents` contains the unchanged original PDF. `data/media-sources.json` records external sources for future, approved media.

## Geographic map

The client loads `/data/enugu.geojson` first, then attempts the public ArcGIS LGA endpoint. On failure or invalid coverage it shows an accessible 17-LGA directory; the status and visit counter still work. No invented shapes or events. The current environment could not access external domains, so the actual polygons were not downloaded or independently verified. Before launch, download/validate and confirm reuse terms for the boundary dataset. Run `node scripts/fetch-boundaries.mjs` on a network-connected machine, or supply a vetted GeoJSON with `ADM2_EN`/`name`/`shapeName` properties for all 17 LGAs. Source: https://services3.arcgis.com/7J7WB6yJX0pYke9q/ArcGIS/rest/services/NCO_Security_Database_WFL1/FeatureServer/1 ; alternate: https://open.africa/en/dataset/enugu-local-government-administrative-boundaries

## Launch checklist

- Confirm official authorisation and final text with the campaign; review transcriptions against the PDF; confirm media rights.
- Supply verified event photos, dates, venues, official contact details and newsroom entries. The current news page is empty; no fake media or fake updates.
- Add a real database, admin authentication, CMS, volunteer consent/privacy handling and contact channels in the next backend phase. No personal data collection or pretending frontend forms submit to an absent backend.
- Install Next.js and run a full production build (dependencies unavailable in the generation environment). Preview uses rendered source markup with a lightweight offline adapter and a directory fallback, not the Next.js runtime.

## Version 2: media and campaign trail
- 6 local manifesto assets and 12 external photo references, with attribution, source links and image-error fallbacks. Third-party photographs are for development preview only until publication rights are cleared; CC BY-SA forest image credits Dotun55. No download of third-party photographs was possible here. No claim that scenic images depict campaign events.
- 4 independently sourced YouTube films with click-to-play embeds and direct watch links; playback is subject to provider restrictions. To use drone footage as an autoplay background obtain licensed original MP4/WebM footage.
- `data/content.json` contains dated sourced reports. Enugu North is marked campaign; Enugu East (airport reception) and Udi (memorial) marked separate visits. The Oct 29 town hall is listed without LGA until final venue is verified. Enugu North attribution for GRA: https://enugunorthlga.en.gov.ng/wards-in-enugu-north-lga/ . Airport area attribution: https://thesun.ng/airport-enugu-govt-to-relocate-displaced-traders-support-association-with-n21m/ . Nsukka is an opt-in demo only, no date or official scheduling claim.
- All 17 LGAs are selectable, including keyboard navigation and category filters. Geographic polygons still depend on boundary service/local GeoJSON. Offline interactive schematic is explicitly not geographic boundaries. No precise geographic rendering is claimed.
- Run `npm install` then `npm run dev`; production build and external video loading not tested in this offline environment. Database/admin not yet connected.

## Version 3: campaign-first architecture
- The homepage leads with both members of the ticket, news, candidate introductions, campaign trail and films before the full policy experience. The two separate source portraits are not a joint photo.
- Four new routes: `/about`, `/events`, `/press`, `/information`. Press downloads are existing source-document assets, not a professionally supplied press kit. Contact details and future events remain unconfirmed; no pretend forms or published hypothetical events.
- Four additional remote photographs and two additional YouTube references retained from earlier research; remote links and permissions are not independently re-tested here. Existing policy routes and district fallback retained.
- Older README references to empty news/event stores apply to V1 only; the current data contains reported events. Full build still requires npm installation and runtime checks.

## Version 4 — manifesto-first campaign editorial
- Homepage leads with the Rescue Mission, introduces the two candidates together in a clearly separated portrait layout, then combines 6 illustrated policy stories, the ticket, timeline, LGA explorer, newsroom, campaign gallery, film player and the policy index. `/issues` contains 11 illustrated policy stories; matching policy detail pages include source-context panels. Workers/retirees includes the November 2026 pension payment update.
- Added 13 external photo references, including dated documentary photographs, independent example projects and an Awkunanaw event collage, plus 3 video references (2 archive reports). Total: 35 photo entries (6 bundled + 29 external) and 9 video entries. All external media still needs live verification and rights clearance. No joint studio portrait was located. Separate portraits are original from the supplied PDF; no artificial joint photograph.
- `data/stories.json` is the source-to-policy editorial mapping. `data/visuals.json` includes image credits, dates (where known), original reports and rights status. `node scripts/cache-media.mjs <approved-image-id> [...]` downloads explicitly cleared images into the local app and rewrites the references. Do not cache third-party media without clearance. Remote image downloads were blocked in the development environment; local images are only the six manifesto assets. The schematic map, CMS limitations, and pending full production/runtime validation remain as in V3.

## V5 media update
- New MEGA logo in navigation and press resources.
- Supplied joint poster upscaled from 416 × 622 to 2568 × 3840; no generative face or text edits. Not native 4K.
- One candidate portrait in hero; full poster in ticket section; removed unrelated lead-news portrait.
- Contain framing for photos; basic minimum 800-pixel longest-edge check for remote images (not a sharpness or licensing check). External media and production build require verification.

## V6 editorial photo update
- Policy displays no longer include captions, source overlays, historical image descriptions or repetitive context/response headings. Captions in campaign archives remain factual.
- Eight new Wikimedia Commons photo references sourced from high-resolution originals (3,872–9,080 pixels on longest side). Policy photographs are illustrative, not claims of local events or endorsement. Photo credits and licensing are located at `/photo-credits`.
- External images are omitted if they fail to load or fail the pixel-dimension threshold. Pixel dimensions alone do not verify sharpness. External media could not be downloaded or inspected in this environment (DNS unavailable); source selections must be visually checked and likeness/usage clearance confirmed before publication. The original third-party news references remain in the data as archived sources.
- To bundle approved copies, run `node scripts/cache-media.mjs policy-water policy-market policy-school policy-solar policy-farm policy-health policy-road policy-tech` on an internet-connected machine after clearance. Then verify all images at desktop/mobile sizes, and run `npm run build`.

## V7 — Campaign trail
The next stop is featured by default on the homepage and campaign trail. The current proposed location, Nsukka, is a draft, with public-facing pending-confirmation wording and no fabricated date or venue. Change `proposedNextStop` in `data/content.json` or set it to null to remove it. The first published, dated, future scheduled event with a valid LGA automatically takes priority. Add a real event to `campaignEvents` with `status: "scheduled"`, `published: true`, ISO date and valid LGA after campaign approval. The events page shares the same next-stop logic. The actual geographic boundary source is unchanged; the schematic fallback remains available. Full production and browser testing still required.
#   M E G A  
 