# Session Handoff

**Pick up here.** This is the single doc to read first when resuming work. It assumes nothing about prior context.

Last meaningful work: 2026-05-12. The page is feature-complete for v1, with a second editorial pass landed late that day. All five sections have real copy and real visuals. Both Mapbox maps and the three top-ranked mini-maps are wired to a single OSM-derived land source. Vercel Analytics + Speed Insights are live with custom editorial events. Two pullquotes are in place — Mike McCann (BOP Director of Science and Research) between §3 intro and the methodology walkthrough, and Lise Montefiore, PhD, MS (Data Scientist, Natrx) hinging §5 between the three operational beats and the closing portability paragraph. § 5 is restructured around a three-beat block — Operational / Institutional / Mission — followed by the portability close.

---

## The project in one paragraph

A media-grade, public-facing explainer page documenting the Billion Oyster Project × Natrx site prioritization framework for New York Harbor oyster restoration. Built in Next.js 15 + Mapbox GL JS + Tailwind, deployed on Vercel. Primary audience is climate/infrastructure reporters (Bloomberg Green, Grist, ICN, NYT Climate, Bloomberg CityLab, MIT Tech Review); secondary is general public. The page also functions as a Natrx capability demonstration. Five sections (1 Hero, 2 Stakes & problem, 3 Methodology, 4 What the analysis made visible, 5 What this enables). Editorial dark mode, Fraunces serif + Inter sans + JetBrains Mono. Strict tone rules in [CLAUDE.md](../CLAUDE.md).

---

## Where to look first

| Doc | Read for |
|---|---|
| [CLAUDE.md](../CLAUDE.md) | Editorial brief: locked decisions, tone rules, five-section structure, palette, type. **Read first** when in doubt. |
| [docs/SPEC_NOTES.md](SPEC_NOTES.md) | Tech stack, component architecture, design tokens, data files, analytics wiring |
| [docs/PROJECT_STATUS.md](PROJECT_STATUS.md) | Per-section status, outstanding polish, technical debt |
| [docs/ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md) | Every gotcha encountered and how it was fixed. Read before debugging anything map-related |
| `hero_reference.html` | Canonical visual reference for the dark editorial register. Open in a browser |
| `BOP_Explainer_Build_Brief.md` (untracked, local) | The current build brief |
| `_overview-documents/BOP_Natrx_Project_Narrative_DRAFT_v0_2.md` (untracked, local) | Master narrative, source of truth for all copy |

The untracked references live in your local working tree only — they're in `.gitignore` because they're source material, not source code.

---

## Where things are deployed

- **GitHub:** `dylan-natrx/bop` on `main`. All work goes directly to `main`. **Push under the `dylan-natrx` GitHub account** (`gh auth switch --user dylan-natrx` if pushes start 403-ing — the auth flip is a recurring annoyance).
- **Vercel project:** `dylan-natrx/bop` (project ID `prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`). Linked locally via `.vercel/project.json`. Every push to `main` triggers a Production deploy.
- **Production URLs:** Vercel generates a new URL per deploy (`bop-<slug>-dylan-natrx.vercel.app`). No custom domain configured yet.
- **Mapbox token:** `NEXT_PUBLIC_MAPBOX_TOKEN` is set on Vercel for Production, Preview, and Development. Mirrored locally in `.env.local` (gitignored). The token is 94 characters; anything shorter is truncated. See ISSUES doc.
- **Analytics dashboards:** `vercel.com/dylan-natrx/bop/analytics` (page views + custom events) and `vercel.com/dylan-natrx/bop/speed-insights` (Core Web Vitals). Both have to be **enabled once per project** in the Vercel dashboard — the package install alone isn't enough.

---

## What's built (v1 feature-complete)

**§ 1 Hero ([src/components/hero/](../src/components/hero/))** — done. Topbar replaced by the sticky `SectionNav` (4 link nav with scroll-spy). Headline, lede, 4-stat stack, two-column figure with `FigurePanel` on the left and `HeroMap` (Mapbox GL JS, custom dark inline style) on the right. All 78 sites render as a circle layer colored by composite score. Top-10 get pulsing halos. Borough + water-body labels render as DOM markers. Hover tooltip works. Bidirectional hover between FigurePanel and HeroMap works.

**§ 2 Stakes & problem ([StakesAndProblem.tsx](../src/components/sections/StakesAndProblem.tsx))** — done. Headline "Rebuilding the harbor's oyster reefs, and choosing where to start." Two body paragraphs. Paragraph 2 now names the four-hundred-year opportunistic-vs-comparative shift directly (parks departments saying yes, marinas allowing cages, access-driven decisions). Portrait-format `EditorialImage` (`section2.jpg`) right column. A future pullquote slot is reserved below paragraph 2 (marked with an HTML comment).

**§ 3 Methodology, made visible ([MethodologyMadeVisible.tsx](../src/components/sections/MethodologyMadeVisible.tsx))** — done. Headline "How a framework finds the sites that earn the next dollar." Intro credits the partnership and lands on "the first harbor-wide comparative look at all 78 candidate sites at once, calibrated to the specific ecology and geography of New York Harbor." A `Pullquote` from Mike McCann (BOP Director of Science and Research) sits between the intro and the walkthrough — on the confidence-layer framing ("knowing where we're confident and where we're not is exactly what we want when we're making these decisions"). Below the pullquote: the six-step `MethodologyWalkthrough` (`WalkthroughMap` 3fr / `SpectraPanel` 2fr / bottom strip with copy + controls right-anchored). Below the walkthrough: three `TopRankedCallout` cards (Arthur Kill / Living Breakwaters cluster / Wolfe's Pond) each with a live `SiteMiniMap`.

**§ 4 What the analysis made visible ([WhatAnalysisMadeVisible.tsx](../src/components/sections/WhatAnalysisMadeVisible.tsx))** — done. Headline "Two patterns the ranking surfaced." Two `FindingBeat` components: beat 1 ("Oysters and shorelines, one intervention.") with `EditorialImage` of shoreline change at Living Breakwaters; beat 2 ("A map of where to invest in more data next.") with `ConfidenceDistributionChart` (stacked horizontal bar showing the 8/14/24/14/18 tier distribution). Beat 2 is the data-investment framing — naming the unevenness of observational coverage and closing on the framework's role as a map of where to send the next round of monitoring effort. Italic closing thread unchanged.

**§ 5 What this unlocks ([WhatThisEnables.tsx](../src/components/sections/WhatThisEnables.tsx))** — done. Eyebrow "What this unlocks." Headline "The pipeline becomes operational." Three nested beats with teal-bright mono kickers above the body — **Operational** (parallel advancement of ten priority sites), **Institutional** (predictability with state and federal agencies), **Mission** (the 2035 one-billion-oyster target operationally achievable). A `Pullquote` from Lise Montefiore, PhD, MS (Data Scientist, Natrx) hinges between the three beats and the closing paragraph ("What we did is a small piece of the big work BOP is doing to restore the harbor. The goal itself is impressive."). Closing paragraph zooms out to the broader audience and the transferable-framework framing. Closes with the `nyoyster.webp` editorial image (also the page's Open Graph image). Section id stays `what-this-enables` so anchors and nav don't break.

**Persistent page chrome:**
- `SectionNav` ([src/components/layout/SectionNav.tsx](../src/components/layout/SectionNav.tsx)) — sticky top, brand lockup left, four short links right (Stakes / Methodology / Findings / At scale). IntersectionObserver scroll-spy.
- `SiteChromeProvider` ([src/components/chrome/](../src/components/chrome/)) — right-edge drawer affordance + drawer. Two tabs: Glossary (23 alphabetized entries) and Press contact. Drawer opens on edge-tab click, on `<GlossaryTerm>` click anywhere in the body, or programmatically.
- `Footer` ([src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx)) — simplified, partnership lockup + line.

**Analytics:** Vercel Analytics + Speed Insights wired in `app/layout.tsx`. Custom event wrapper at [src/lib/track.ts](../src/lib/track.ts). Five typed events: `section_reached`, `walkthrough_step`, `drawer_opened`, `glossary_term_clicked`, `top_ranked_viewed`. Page views, geo, referrers visible on the Hobby tier; custom event breakdowns require Pro Analytics ($10/mo base + overage, separate from the Vercel Pro developer subscription).

**Pullquote component ([Pullquote.tsx](../src/components/sections/Pullquote.tsx))** — Fraunces italic body at section-subhead scale, JetBrains Mono uppercase attribution + role separated by a middle dot, left vertical rule in teal-bright, `max-w-[60ch]` centered. Two instances on the page (McCann in §3, Montefiore in §5). The reserved future slot in §2 is marked with an HTML comment.

---

## Critical learnings (cumulative across sessions)

If you only read one section of this doc, read this one.

### Map data architecture (current, post-OSM rebuild)

**Two GeoJSON sources drive every map on the page:**

- `public/data/region-land.geojson` (~614KB, 132 polygons) — single master land source. Built from OpenStreetMap `natural=coastline` data for the NYC region (bbox 40.4–41.5 lat, −74.4 to −71.7 lng), stitched into closed island rings (Long Island, Manhattan, Staten Island) and one open mainland ring (NJ + NY mainland + CT) closed along the bbox edges. Simplified to 0.0002° tolerance. Same fidelity everywhere; no seams between county / state polygons.
- `public/data/hudson-river.geojson` (~55KB) — Hudson River polygon, derived from OSM `natural=water` `water=river` multipolygon relations in the Hudson Valley bbox (Tappan Zee, named and unnamed Hudson River segments). Drawn ON TOP of the land fill with `#061321` (water bg color) so it carves out the river visually. NJ and Westchester polygons would otherwise pave the river over because their political boundaries run down the middle.

**Layer order in the Mapbox style (HeroMap, WalkthroughMap, SiteMiniMap):**
1. `background` (deep navy water, `#061321`)
2. `land-region-fill` (`#15314A`, all land)
3. `water-hudson-fill` (`#061321`, carves out the Hudson)
4. `land-region-edge` (`rgba(120, 158, 184, 0.35)`, coastline outline)
5. `water-hudson-edge` (same outline color for the river banks)
6. site circles / interaction layers

The older patchwork of four polygons (`nyc-boroughs`, `nj-shoreline`, `westchester`, `upstate-ny-ct`) is no longer referenced by production maps. The files are still on disk because the diagnostic `/test-map` route and `CoastlineTest` component reference them. Don't delete them without also pruning those references.

### Why the OSM rebuild was necessary

The previous patchwork had three concrete problems that all stemmed from mixing data sources at different resolutions:

1. **Seam between NYC and Long Island** — the upstate polygon's harbor-exclusion clip ran at lng −73.72 (a straight rectangle edge). The NYC boroughs polygon's eastern coast at Queens runs at the actual Queens-Nassau border. Where they joined, the edge stroke drew a visible vertical line through the landmass.
2. **Hudson disappeared above Manhattan** — NJ, Westchester, and the upstate polygons each trace their political boundary down the middle of the Hudson. They collectively paved the river. Hand-traced ribbon attempts looked unnatural at the Tappan Zee.
3. **Coarse polygon edges** — at 16-pt (CT) and 68-pt (NY State at PublicaMundi) resolution, the polygon's straight-line segments showed as visible wedges in the visible map area.

The OSM rebuild solved all three at once: same fidelity for every coast, real Hudson polygon, no political-boundary artifacts in the river.

### Editorial tone rules (carry forward, no exceptions)

- **No em dashes anywhere.** Use commas, periods, colons, parentheses, or semicolons.
- **No negation-led copy.** Never open a body block with "Not X" or pair an assertion with its negation in the same breath. This recurred multiple times on the spectra panel; if you're tempted to write "X, not Y" reverse it to lead with the affirmative. (Detail in `memory/feedback_no_negation_jargon_copy.md`.)
- **No abstract single-word jargon** like "constructability" or "actionability" when a verb phrase explains what it does.
- **No "It's not X, it's Y"** constructions — AI cliché.
- **No "unexpected", "surprise", "discovery", "happy accident"** in § 4. The shoreline erosion data was a deliverable, not a discovery.
- **No CTAs anywhere on the page** — no "talk to us," no buttons styled as conversion targets. Press contact in the drawer is editorial, not sales.
- **Past tense for completed work, present tense for the partnership and the framework.** The 26-week engagement is past. The partnership is ongoing.
- **Natrx Assess italicized on first reference per section**, roman afterwards. No promotion, no product card treatment.

### Mapbox gotchas

- **`mapbox-gl/dist/mapbox-gl.css` overrides `position: absolute` on the map container.** Use inline `style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}` on the container ref. Inline beats imported CSS. See HeroMap.tsx.
- **Mapbox marker positioning conflicts with CSS animations on transform.** Nest: outer wrapper holds Mapbox's positioning transform, inner div has the animation class. See the halo creation code in HeroMap.tsx.
- **Mapbox 3.x default projection can be globe.** Explicitly pass `projection: 'mercator'` to the constructor.
- **Custom inline style with geojson sources is fully self-hosted.** No tiles, no Mapbox-hosted styles. The token is still required at init.
- **Mapbox emits no clear error when a token is truncated** — it returns "A valid Mapbox access token is required." The Mapbox public token is exactly 94 characters. If yours is shorter, suspect paste/copy truncation. We hit this in production; the Vercel-stored token was 85 chars.
- **Dev server HMR is unreliable when geojson files change.** The map gets into a stuck `loaded: false` state with no useful error in the console. When this happens: kill the dev server with `pkill -f "next"`, sleep 2, and restart. The production build is the authoritative validator — `npm run build` and inspecting the prod deploy is the verification path that actually works when HMR is glitching.

### NEXT_PUBLIC_* env vars on Vercel

- Inlined at build time. Updating the env var without rebuilding does nothing.
- After changing the env var on Vercel, trigger a rebuild (`git commit --allow-empty -m "Retrigger build" && git push`).
- `vercel env pull` does not always include NEXT_PUBLIC_* values in the file. Use `vercel env ls` for ground truth.

### Git + GitHub

- Two GitHub accounts authed (`dylan-natrx` and `dylandibona`). Pushes need `dylan-natrx` active. If a push 403s, run `gh auth switch --user dylan-natrx`. This still trips us occasionally.
- **Never use `git add -A`** near the local-only reference docs (`_master_docs/`, `_overview-documents/`, and the loose top-level `BOP_*.md` notes). The `.gitignore` covers them but the discipline still matters.

### Layout / CSS gotchas specific to this page

- The hero figure's height needs an explicit floor: `min-h-[640px] lg:min-h-[720px] lg:h-[min(90vh,860px)]`. Without it, short viewports compress the map.
- The hero figure was previously breaking out of the section scaffold with `w-[95vw]` — the browser absorbed the overflow with `margin-right: -112px`, pushing the figure left of center. Fix: drop the breakout so the figure fits the section content area naturally. See HeroFigure.tsx.
- Land fill color is `#15314A` (palette token `bg-soft`). Earlier `#0E2236` was only 8/15/21 RGB above water `#061321` — too low contrast, land read as water where polygon edges sat off-screen.
- `text-shadow: 0 0 6px rgba(6, 19, 33, 0.9)` on borough/water labels — keeps them legible over varied land/water rendering.

### Build & deploy verification (when HMR fails)

When dev HMR is stuck and `npm run dev` won't load the map cleanly:
1. `npm run build` — production build is the source of truth for whether code compiles
2. Push to main and wait for Vercel
3. Open the production URL in a real browser
4. If you need to inspect the prod bundle directly: `vercel curl <path> --deployment <url>`

---

## Analytics dashboards — first-time access

The packages and event wiring shipped in commit `b4f8f8b`. Before any data arrives, **you must enable Analytics on the Vercel project once**:

1. Visit `https://vercel.com/dylan-natrx/bop`
2. Open the **Analytics** tab in the project nav → click **Enable**
3. Open the **Speed Insights** tab → click **Enable**

Both are free on Hobby. Data starts within a minute of the next production page view.

**What lives where:**
- Standard metrics (page views, top referrers, geo, devices): `/analytics`
- Custom events: same page, scroll to the Events section. Five events to look at:
  - `section_reached` (property: `section`) — drop-off across §1 → §5
  - `walkthrough_step` (properties: `step` 1–6, `via` next/previous/jump/keyboard) — methodology engagement
  - `drawer_opened` — total drawer opens
  - `glossary_term_clicked` (property: `term_id`) — which definitions readers look up
  - `top_ranked_viewed` (property: `site`) — Arthur Kill vs Living Breakwaters vs Wolfe's Pond view counts
- Core Web Vitals: `/speed-insights` — LCP, CLS, INP, broken down by route

---

## What needs to happen next

In priority order:

1. **Enable Analytics + Speed Insights in the Vercel dashboard** (one-time, ~30 seconds).
2. **Mobile QA pass.** All sections have been built lg-first. Real mobile verification still pending.
3. **Visual review of map fidelity on the production deploy.** The OSM rebuild was verified via queryRenderedFeatures and the production build, but the user's eye is the final acceptance gate.
4. **Optional follow-up:** the "Applied Filters" panel in the methodology walkthrough should be re-passed to read as a confident running summary, not a glossary of definitions. See `memory/project_applied_filters_panel_rewrite.md`.
5. **Optional follow-up:** delete the dead-code paths — `src/components/hero/CoastlineTest.tsx`, `src/app/test-map/page.tsx`, `src/lib/land.ts` (legacy SVG coastline), `src/lib/projection.ts` projections (only `calculateMarkerRadius` is still used). And once those are gone, delete the now-unused `public/data/nyc-boroughs.geojson` / `nj-shoreline.geojson` / `westchester.geojson` / `upstate-ny-ct.geojson` files (production no longer references them).

Always reference [CLAUDE.md](../CLAUDE.md) for the locked editorial decisions before writing copy.

---

## Data files

| File | Source | Used by |
|---|---|---|
| `public/data/region-land.geojson` | OSM coastline ways via Overpass API, stitched + simplified | All production maps |
| `public/data/hudson-river.geojson` | OSM `water=river` multipolygon relations, unioned + simplified | All production maps |
| `public/data/rankings.geojson` | Natrx pipeline GeoJSON copy | `useRankingsData()` and every map's `sites` source |
| `public/data/statistics.geojson` | Natrx pipeline statistics | `useStatisticsData()` for the walkthrough |
| `public/data/nyc-boroughs.geojson`, `nj-shoreline.geojson`, `westchester.geojson`, `upstate-ny-ct.geojson` | Legacy patchwork, US Census 500k + handmade | `CoastlineTest` + `/test-map` debugging routes only. Not referenced by production maps. |
| `BOP_Feb2026_Pipeline_Rankings.geojson` (repo root) | Source of truth from Natrx | Reference; the file copied into `public/data/rankings.geojson` is what the app loads |
| `BOP_Feb2026_Pipeline_statistics.geojson` (repo root) | Source of truth | Same |

The OSM data was fetched via Overpass:
- Coastlines: `way[natural=coastline](40.4,-74.4,41.5,-71.7);` (10.6MB raw)
- Hudson: `way[natural=water](40.85,-74.05,41.5,-73.7); relation[natural=water](...)` (5.8MB raw), filtered to `water=river` with `Hudson River` or unnamed water=river relations in the Hudson valley

If you need to regenerate the files, the Overpass queries and stitching script logic are documented in the `658489c` and `85bcab4` commits.

---

## Verification workflow

```bash
npm run dev               # Dev server. HMR may glitch on geojson changes — restart if so.
npm run build             # Authoritative source of truth for whether the code compiles.
npm run start             # Production server locally on port 3000.
```

When the dev server's map is stuck:
```bash
pkill -f "next" && sleep 2 && npm run dev
```

After pushing to main:
- Vercel auto-deploys (~30–45s).
- Open the production URL in a real browser. Inspect the map.
- If you need to verify what's in the bundle: `vercel curl <path> --deployment <url>`.

---

## Terminology lock (editorial)

| Say | Not |
|---|---|
| Suitability score | Confidence |
| Data support / monitoring coverage | Confidence (for ConfidenceRule) |
| Sites already in design | Pipeline |
| Candidate sites | Pipeline sites |
| Reef restoration | Oyster farming / aquaculture |
| Two patterns the ranking surfaced | Unexpected finding / surprise / discovery |
| How buildable / where data is strong | Constructability / data-strength jargon |
| Operational conditions / context filters | "Constraints, not scores" or other negation-led prose |

No em dashes anywhere. No "It's not X, it's Y." Past tense for completed work, present tense for the partnership and the framework.
