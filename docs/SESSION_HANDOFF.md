# Session Handoff

**Pick up here.** This is the single doc to read first when resuming work. It assumes nothing about prior context.

Last meaningful work: 2026-05-26. **v1 is live at https://bop.natrx.report behind the password gate.** All five sections have real copy and real visuals. Map storytelling rebuilt: biology gates (steps 1–3), external factors overlay as flag markers (steps 4–6), priority projects revealed at step 6 with a pulsing halo. Spectra panel uses a two-color treatment (teal = biology, amber = external). Legend evolved into a horizontal strip pinned to the bottom of the map. Mobile section nav got a hamburger menu. Custom domain wired up with Cloudflare DNS + per-domain Vercel CNAME target. Three pullquotes (Carolyn Khoury §2, Mike McCann §3, Lise Montefiore PhD §5). Vercel Analytics + Speed Insights are live with custom editorial events.

**Recent editorial polish (May 14–18) — what's changed since the v1 launch state:**
- § 2 expanded to four paragraphs (harbor history → opportunistic siting → systemwide shift with the 10–15 funded sites / 2029–2030 target → "the framework on this page is how Billion Oyster Project and Natrx built that capability together"). Carolyn Khoury pullquote between paragraphs 3 and 4. Inline `candidate-site` `<GlossaryTerm>` in paragraph 3.
- § 5 reshaped: Operational beat to one sentence, Institutional expanded to six sentences with the NY State EIS detail (scheduled to conclude end of 2028), Mission tightened. Lise Montefiore pullquote replaced with new water-quality copy; role updated to "Water Quality and Data Scientist, Natrx"; credential simplified to PhD. Closing portability paragraph opens to "restoration practitioners at every scale."
- Press contact rebuilt as two side-by-side cards. Andi Cross (BOP, Director of Communications, +1 484 501 3326). Dylan DiBona (Natrx, press contact, dylan@natrx.io). Each eyebrow links to its org site. Source-materials line dropped.
- Footer logos now link to natrx.io and billionoysterproject.org.
- Natrx Assess added to glossary as the first `productName: true` entry (italic + medium-weight `<dt>` in the drawer). Every body-text occurrence renders in serif italic + pure white. First occurrence on the page (§ 3 intro) wraps in `<GlossaryTerm termId="natrx-assess">`; subsequent occurrences are styled but unlinked.

**Scientific review edits (May 26) — Lise Montefiore (Natrx Water Quality & Data Scientist). The why: the framework ranks the 78 candidates against each other on water-quality variables; it is not a calibrated Habitat Suitability Index, and Lise flagged that the copy (Figure 1 especially) was implying it might be. What changed:**
- **Score reframed as a relative "Site score."** New § 3 paragraph after the "two questions in order" graf: the score "is a relative measure of water-quality conditions across the 78 candidates… A score of 0.90 ranks better than a score of 0.10, but neither carries an absolute claim about habitat quality." "Suitability score" relabeled **Site score** across all chrome — hero legend, Fig. 1 caption, map hover tooltip, and the glossary entry (renamed from "Composite score and DO-modifier"; id `composite-score` → `site-score`; moved to its alphabetical slot between "Shoreline change analysis (MEIP)" and "Spat"; definition rewritten as a relative measure, dropping the old DO-multiplier explanation, which still lives in the walkthrough's "Show the math" disclosure). "Relative site score" is reserved for the § 3 first-use prose only.
- **"Calibrated" removed.** § 3: "mixes both dimensions, calibrated to each location" → "integrates both dimensions across all 78 sites." § 5: dropped ", calibrated to the place." `grep calibrat` is clean.
- **Walkthrough score-curve subtitles** "Habitat suitability" → "Scoring function" on the three biology curves (salinity, chlorophyll-a, dissolved oxygen). Wave keeps its own subtitle — it is a teaching curve, not a scored input — and the two annotation blocks (erosion, filters) have no subtitle. Only three plots literally read "Habitat suitability," not the six the brief assumed.
- **Salinity plot citation** added beneath the curve, figure-caption styled: "Scoring function adapted from Starke et al. (2011)." Implemented as a new optional `citation` field on `CurveDef` in `SpectraPanel.tsx`.
- **Chlorophyll-a plot** lost the eutrophication threshold band + "Eutrophication" label; the linear food-response curve and its "Linear food response" annotation stay. The `DangerZone` function and the `showDanger` prop were removed (chla was the only consumer). The Eutrophication *glossary* entry is untouched — it's a defined term, not the plot.
- **Body sweep:** hero stat "evaluated for oyster suitability" → "ranked for restoration priority"; § 4 "top tier of the suitability ranking" → "top tier of the site ranking"; walkthrough "the suitable set" (×3) → "the qualifying set."
- **Step 2 copy** revised so the consequence of too much food points at the dissolved-oxygen step (where the framework actually flags it) instead of a "danger zone" visual that no longer exists.
- **aria-label** "Variable suitability curves" → "Variable scoring functions" (screen-reader users read the renamed plots too).
- **Held for Lise's next pass:** new salinity + dissolved-oxygen threshold values (incoming data — both plots otherwise unchanged); the lower-stakes "suitable" *adjective* uses ("each suitable site," the map legend's "Suitable site," § 4 "most suitable for," two spectra annotations); the Habitat Suitability Index glossary entry (kept — it draws the HSI contrast and aids defensibility).
- **Shipped:** commit `3c1120a` to `main`, local `next build` clean, Vercel production status green. Code symbols (`SuitabilityLegend`, `SUITABILITY_GRADIENT*`, `SuitableDot`) left unchanged — internal identifiers with no reader surface; renaming them is a separate hygiene task, not a narrative correction.

**The editorial spine for the entire methodology section, locked:**
> The framework's complete recommendation isn't just "top-10 by biology." It's "top-10 by biology, with full cost/permitting/co-benefit context attached."

Steps 1–3 narrow by biology. Steps 4–6 attach context without narrowing further. The priority halo at step 6 reveals the top-10 inside the wider suitable set, with all flag rings visible. Arthur Kill ends step 6 with priority halo + cost ring + co-benefit ring + bright dot — exactly what the framework says about it: strongest biology, with engineering cost and permitting friction known, and shoreline co-benefit attached.

**Vocabulary locked across the page:**
- Candidate sites = the original 78
- Site score = the relative water-quality score (renamed from "suitability score" on May 26). "Relative site score" appears only in the § 3 first-use prose.
- Qualifying set = the sites that pass the biology gate (22, bright dot). Called "the suitable set" in walkthrough copy until May 26.
- Priority project = top-10 by composite (haloed at step 6 only)
- Reserve = qualifying but not in top-10 (12, bright but unhaloed)

Note the current half-state, by design: the *set* is now the "qualifying set," but individual sites are still described with the adjective "suitable site" (and the map legend still reads "Suitable site"). Those adjective uses are held for Lise's review pass — don't sweep them unprompted.

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
| `_overview-documents/BOP_Explainer_Build_Brief.md` (untracked, local) | Original build brief (pre-Next.js direction; archived for design rationale) |
| `_overview-documents/BOP_Explainer_Page_Brief.md` (untracked, local) | Original editorial brief — audience, story spine, voice |
| `_overview-documents/BOP_Natrx_Project_Narrative_DRAFT_v0_2.md` (untracked, local) | Master narrative, source of truth for all copy |
| `_overview-documents/BOP_Project_Handoff.md` (untracked, local) | Earlier general partnership handoff doc (people, voice rules). Superseded by this file for build state |
| `_overview-documents/*Gemini.md` (untracked, local) | Auto-generated meeting transcripts (May 7 internal call, May 18 BOP interview) |

The untracked references live in your local working tree only — `_overview-documents/` is gitignored because the contents are source material, not source code.

---

## Pre-public access gate

The site is gated by a custom-branded password page while in editorial review. Architecture:

- **`src/middleware.ts`** — Next.js middleware. Checks `bop-auth` cookie on every request. Missing or invalid → redirect to `/login?from=<original-path>`. Matcher excludes `_next/static`, `_next/image`, `_vercel`, `favicon.ico`, `/images`, `/site-imagery`, `/data`, `/login`, `/api/auth`. **Lives in `src/`, not project root** — see ISSUES doc; root location is silently ignored on `src/`-layout projects.
- **`src/app/login/page.tsx`** — BOP × Natrx branded login page. Form is a Suspense-wrapped client component.
- **`src/app/api/auth/login/route.ts`** — POST handler validating credentials against env vars, setting `bop-auth` cookie on success.

Env vars (defaults in code are safe-for-local-dev; set on Vercel for prod):
- `AUTH_USERNAME` — default: `natrx`
- `AUTH_PASSWORD` — default: `resili3nc3`
- `AUTH_TOKEN` — the cookie value (default: `bop-preview-2026`). Rotate to invalidate all sessions.
- `AUTH_DISABLED=true` — optional, no-ops the gate without removing files.

**To remove when public:** delete `src/middleware.ts` (and optionally `src/app/login` and `src/app/api/auth`). Or set `AUTH_DISABLED=true`.

**Vercel Deployment Protection must be OFF** for the custom gate to be the only gate. The platform-level Vercel Auth intercepts before middleware runs and would mask the branded page. Disabled at `vercel.com/dylan-natrx/bop/settings/deployment-protection` → Vercel Authentication → Disabled for Production.

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

**§ 2 Stakes & problem ([StakesAndProblem.tsx](../src/components/sections/StakesAndProblem.tsx))** — done. Headline "Rebuilding the harbor's oyster reefs, and choosing where to start." Four body paragraphs: harbor history (350 sq mi reef, 15-foot visibility, food web) → opportunistic siting "happened" at proof-of-concept scale → the shift to systemwide planning with the 10–15 funded sites by 2029–2030 target (inline `<GlossaryTerm termId="candidate-site">` link on "candidate restoration sites") → "the framework on this page is how Billion Oyster Project and Natrx built that capability together." Carolyn Khoury pullquote ("we've moved from considering each restoration site individually to understanding what the whole system needs to support a self-sustaining population") between paragraphs 3 and 4. Portrait-format `EditorialImage` (`section2.jpg`) right column.

**§ 3 Methodology, made visible ([MethodologyMadeVisible.tsx](../src/components/sections/MethodologyMadeVisible.tsx))** — done. Headline "How a framework finds the sites that earn the next dollar." Intro credits the partnership and lands on the framework asking two questions in order. The phrase "Two custom data products were generated by *Natrx Assess*" carries the page's first-encounter `<GlossaryTerm termId="natrx-assess">` wrapper around the italic `<em>` so readers can jump to the drawer entry on first contact. A `Pullquote` from Mike McCann (BOP Director of Science and Research) sits between the intro and the walkthrough — on the confidence-layer framing ("knowing where we're confident and where we're not is exactly what we want when we're making these decisions"). Below the pullquote: the six-step `MethodologyWalkthrough` (`WalkthroughMap` 3fr / `SpectraPanel` 2fr / bottom strip with copy + controls right-anchored). Step 4 and step 5 titles render *Natrx Assess* italic + white inline. Below the walkthrough: three `TopRankedCallout` cards (Arthur Kill / Living Breakwaters cluster / Wolfe's Pond) each with a live `SiteMiniMap`.

**§ 4 What the analysis made visible ([WhatAnalysisMadeVisible.tsx](../src/components/sections/WhatAnalysisMadeVisible.tsx))** — done. Headline "Two patterns the ranking surfaced." Two `FindingBeat` components: beat 1 ("Oysters and shorelines, one intervention.") with `EditorialImage` of shoreline change at Living Breakwaters; beat 2 ("A map of where to invest in more data next.") with `ConfidenceDistributionChart` (stacked horizontal bar showing the 8/14/24/14/18 tier distribution). Beat 2 is the data-investment framing — naming the unevenness of observational coverage and closing on the framework's role as a map of where to send the next round of monitoring effort. Italic closing thread unchanged.

**§ 5 What this unlocks ([WhatThisEnables.tsx](../src/components/sections/WhatThisEnables.tsx))** — done. Eyebrow "What this unlocks." Headline "The pipeline becomes operational." Three nested beats with teal-bright mono kickers — **Operational** (one sentence: BOP can now move priority sites toward design and permitting at the same time, with the comparative ranking guiding where to commit time and capital first), **Institutional** (six sentences with the NY State Environmental Impact Statement detail — scheduled to conclude by end of 2028 — and the "regulators have been wanting" framing), **Mission** (the 2035 one-billion-oyster target is now operationally achievable because the framework makes a parallel pipeline credible). A `Pullquote` from Lise Montefiore, PhD (Water Quality and Data Scientist, Natrx) hinges between the three beats and the closing paragraph ("Water quality data in a harbor like this is complex. Our work was to extract it from many monitoring stations and turn it into something BOP could make decisions from."). Closing paragraph opens to "coastal districts, state agencies, port authorities, foundations, and restoration practitioners at every scale" and renders *Natrx Assess* italic + white. Closes with `nyoyster.webp` (also the page's Open Graph image). Section id stays `what-this-enables` so anchors and nav don't break.

**Persistent page chrome:**
- `SectionNav` ([src/components/layout/SectionNav.tsx](../src/components/layout/SectionNav.tsx)) — sticky top, brand lockup left, four short links right (Stakes / Methodology / Findings / At scale). IntersectionObserver scroll-spy.
- `SiteChromeProvider` ([src/components/chrome/](../src/components/chrome/)) — right-edge drawer affordance + drawer. Two tabs: **Glossary** (25 alphabetized entries; `productName: true` entries — currently only Natrx Assess — render the term in italic + medium-weight) and **Press contact** (two side-by-side cards: Andi Cross / BOP / phone, Dylan DiBona / Natrx / email; each eyebrow links to org site). Drawer opens on edge-tab click, on `<GlossaryTerm>` click anywhere in the body, or programmatically.
- `Footer` ([src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx)) — partnership lockup with each logo linked to its org site (natrx.io, billionoysterproject.org), divider rule, single editorial credit line.

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
- **Natrx Assess: italicized + pure white (`text-white`) in every body-text occurrence.** First occurrence on the page (§ 3 intro) is wrapped in `<GlossaryTerm termId="natrx-assess">`; subsequent body mentions (§ 4 Beat 1, § 5 closing portability graf, walkthrough steps 4 and 5) carry the same styling but no link, so the inline glossary affordance reads as a first-encounter introduction. Figure captions (e.g. § 4 "Source: Natrx Assess…") are intentionally unstyled — chrome, not body voice. No product card treatment, no CTA.

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
| Site score (chart UI) / relative site score (§ 3 first-use prose) | Suitability score · Habitat Suitability Index · Confidence |
| Data support / monitoring coverage | Confidence (for ConfidenceRule) |
| Sites already in design | Pipeline |
| Candidate sites | Pipeline sites |
| Reef restoration | Oyster farming / aquaculture |
| Two patterns the ranking surfaced | Unexpected finding / surprise / discovery |
| How buildable / where data is strong | Constructability / data-strength jargon |
| Operational conditions / context filters | "Constraints, not scores" or other negation-led prose |

No em dashes anywhere. No "It's not X, it's Y." Past tense for completed work, present tense for the partnership and the framework.
