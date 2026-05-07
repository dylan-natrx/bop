# BOP × Natrx — Site Prioritization Tool

A media-grade, public-facing interactive piece that documents the Billion Oyster Project × Natrx site prioritization framework. Targeted at general public readers (NY Times, Wired Magazine, Hakai, Mongabay, Inside Climate News audience), and engineered to function simultaneously as a portfolio object proving Natrx's ability to synthesize messy environmental data into defensible decision frameworks.

The deliverable is a single deployed web experience. It may or may not ship publicly — that decision is downstream — but it should be built to ship.

---

## Project Goal

Tell the story of how new technology and partnership produced a defensible answer to a hard question: where, across 78 candidate sites in New York Harbor, should Billion Oyster Project prioritize building oyster reefs first, given finite restoration budgets?

The piece must do two jobs simultaneously:

1. **Public storytelling.** Teach a lay reader why prioritizing reef sites is genuinely difficult, what oysters do as ecological infrastructure, and what the framework produced. Accessible, editorial-grade, scannable.
2. **Capability demonstration.** Function as proof that Natrx synthesizes data at expert level, with project-specific constraints, into actionable decision-making. The aesthetic and information density should make a sophisticated reader (potential client, journalist, or partner) come away thinking "they know what they're doing."

---

## Audience

- **Primary:** General public, science-literate but not technical. NY Times, Wired, Hakai readers. Reading on laptops and phones.
- **Secondary:** Restoration-sector professionals, potential Natrx clients, environmental journalists, BOP supporters/funders.

Not the audience: BOP scientists, Natrx engineers, academic researchers. They have the master document. The tool is downstream.

---

## Locked Editorial Decisions

These have been worked through with the client (Natrx). Do not relitigate without explicit instruction.

### Headline
**Restoring New York Harbor's Oyster Reefs. But where?**

Set in Fraunces serif, the question "But where?" sits on its own line in italic, brand teal. The italicized question is the chromatic and intellectual punctuation of the headline. The headline does not use the words "at scale" anywhere; that framing was rejected as a generic ambition signal.

### Lede
> Oysters are **ecological infrastructure**. A single adult filters fifty gallons of water a day; their reefs build habitat for fish and crabs and dampen the wave energy that erodes shorelines. New York Harbor was once one of the most oyster-rich estuaries on Earth. Restoring those reefs is a multi-decade project, and Billion Oyster Project has set a goal of **one billion oysters by 2035**. **Budgets are finite**. This framework gives BOP a defensible way to prioritize which of **78 candidate sites** and **2,604 acres** of urban estuary get funded first.

The phrase "ecological infrastructure" is intentional and rhymes with Natrx's tagline "Adaptive Infrastructure." Don't underline the connection. A savvy reader will catch it.

### Section labeling

Remove the § symbol from all reader-facing labels. Use named labels only:

| Internal reference | Reader-facing label |
|-------------------|---------------------|
| § 01 | (no label, it's the hero) |
| § 02 | "The Framework" or "How the sites were scored" |
| § 03 | "Sites Already in Design" |
| § 04 | "Explore Every Site" or "The Map" |
| § 05 | "Site Detail" |
| § 06 | "Methodology" |

Keep numbered § references only in code comments, file names, and internal documentation (like this file). The reader never sees the § symbol.

### Tone Rules

- **No em dashes.** Use commas, periods, colons, parentheses, or semicolons. Em dashes are banned project-wide.
- **No "It's not X, it's Y" or "It's not just X, it's Y" constructions.** This is AI cliché. Use direct assertions or "X, not Y" structures instead.
- **No false drama, no manufactured tension, no clever wordplay in headlines.** Direct, confident, forward-looking.
- **"Confidence" must be handled with care.** See the dedicated section below.

### What to call things

- **"Suitability score"** = the 0–1 water-quality composite (the rank-driving number). Do not call this "confidence."
- **"Data support"** or **"monitoring coverage"** = the dimension Nick's pipeline calls "ConfidenceRule." Use this language in any public-facing context.
- **"Sites already in design"** = the 11 sites with `Status = "Design"`. Already moving toward construction. Avoid the word "pipeline."
- **"Candidate sites"** = the full pool of 78.
- **"Reef restoration"** = the work. Not "oyster farming," not "aquaculture." NYC's restored oysters are inedible by design (a century of urban runoff still leaves traces; the state prohibits harvest from restoration sites). The case for the work is ecological, not culinary.

### Variable structure

The framework distinguishes three analytical categories:

1. **Water quality** (salinity, chlorophyll-a, dissolved oxygen) — drives the suitability score. These are the rank-driving variables, sourced from public monitoring stations.

2. **Shoreline dynamics** (erosion, wave exposure, depth suitability) — come from Natrx Assess. Includes multi-year/historical satellite imagery and wind-driven wave modeling. Contextual layers, not score inputs.

3. **Built environment** (CSO outfalls, MS4 outfalls, parkland proximity) — regulatory/infrastructure proximity flags. Also contextual layers.

**The suitability score is built from water quality only.** The other six variables are contextual layers that inform site understanding but do not drive the ranking.

### Data support and uncertainty — non-negotiable

The framework surfaces uncertainty in the suitability score where the underlying monitoring data is sparse. The ranking honestly carries that uncertainty rather than hiding it. Frame this as **transparency about real-world data gaps, designed into the framework**.

The `ConfidenceRule` field describes how dense and recent the public monitoring data is near each site. It does NOT describe confidence in Natrx's framework or its outputs. Low data support means there are fewer monitoring stations near a site, which has nothing to do with Natrx's analytical capability.

**For the public tool**, rename the tiers:

- High → **Robust**
- Moderate+ → **Strong**
- Moderate → **Adequate**
- Moderate- → **Limited**
- Low → **Sparse**

Internal scientific labels (Nick and Lise's High/Mod+/Mod/Mod-/Low) stay intact for any technical context. The press tool relabels the dimension as "Data support" or "Monitoring coverage" instead of "Confidence."

The narrative tension to surface (in a dedicated section, not the hero): top-ranked sites tend to fall in sparse-data areas because public monitoring is sparser there; sites already in design tend to have robust data support. Frame this as a feature: BOP can target additional monitoring at high-priority candidates while moving forward at sites where data is dense. Two-track investment plan, not a flaw in the ranking. **Do not surface data support in the hero.** It belongs in a later section where there's room to teach it.

---

## Visual Register

Use `hero_reference.html` as the canonical reference for the visual language. Inherit from it. The same palette, type pairing, motion grammar, and density should run through every section. Do not re-invent.

### Palette (CSS custom properties, named exactly)

```
--bg-deep:      #061321   /* page background, deepest navy */
--bg-mid:       #0E2236
--bg-soft:      #15314A
--land:         #04101C   /* land mass fill on map (darker than bg, recessive) */
--land-edge:    rgba(70, 110, 145, 0.18)
--teal:         #137D76   /* Natrx primary teal */
--teal-bright:  #2BA8A0   /* accent, italic emphasis */
--teal-aqua:    #6FE3D0   /* highest-suitability sites, scores */
--ivory:        #F2EDE3   /* primary text */
--ivory-dim:    #B8B0A0   /* secondary text, lede */
--ivory-faint:  #6E6859   /* tertiary, eyebrow, captions */
--rule:         rgba(242, 237, 227, 0.12)
--rule-soft:    rgba(242, 237, 227, 0.06)
```

Suitability score color ramp: linear gradient from `#2A4A56` (0.20) through `#137D76` (0.50) to `#6FE3D0` (0.87). Use these stops everywhere a site is colored by suitability.

### Typography

- **Fraunces** (Google Fonts, opsz 9..144, weights 300–600, italic available). Used for: headline, stat numbers, figure captions, tooltip site names. Always weight 300, italic for emphasis.
- **Inter** (Google Fonts, weights 300–600). Used for: body, lede, UI text. Weight 300 default, 400 for emphasized inline, 500 for navigation/buttons.
- **JetBrains Mono** (Google Fonts, weights 400, 500). Used for: eyebrows, section markers, data axis labels, dimension titles, scores in panels. Always uppercase with letter-spacing 0.18em–0.22em where used as labels.

### Motion grammar

- One choreographed entrance per section: text fades up first (~200–500ms delay, 1200ms duration), data/figure fades in next (~700–800ms delay), annotations draw last (~2200ms delay).
- After entrance, the only sustained motion is the active-design pulse (2.6s ease-in-out, scale 1→1.7, opacity 0.6→0).
- Hover states: 280ms ease, modest scale (~1.1×), no bounce, no rotation.
- Scroll choreography for the layered reveal: scroll-tied camera moves on the map, layer fade-ins on the framework primer, focused/defocused state changes for the design queue narrative section. Use Framer Motion's `useScroll` + `useTransform` for tied motion, not raw scroll listeners.

### Density and grid

- Generous negative space. Don't fill it.
- Max content width 1480px. Page padding 36px top, 56px sides, scaled down on mobile.
- Two-column figure layouts where it makes sense (320px panel + map fills the rest), per `hero_reference.html`'s map figure.
- Mobile breakpoint: collapse to single column under 1100px.

### Aesthetic vote

Editorial dark mode, journalism-grade, scientifically serious. Pudding.cool, NYT graphics desk, FiveThirtyEight visual stories are reference points. Not Stripe-cinematic. Not maximalist. The "sexy" comes from craft and confidence, not from visual noise.

---

## v1 Scope (the full layered reveal)

Build all six sections as a single scrolling experience. Each section inherits the visual language above.

### § 01 — Hero (no reader-facing label needed)
What `hero_reference.html` already shows. Topbar with partnership lockup. Headline + lede on the left, four-stat stack on the right (78 sites, 2,604 ac, 1 billion goal, 9 variables). Two-column figure: left panel with Fig. 1 caption, top-ranked sites list, suitability legend; right panel with the SVG map (subtle NY Harbor coastline, place labels, 78 site centroids colored by suitability, top-ranked halos pulsing). Footer with logo lockup and methodology line.

Port the SVG map from `hero_reference.html` directly. The hero is finalized. Don't redesign it.

### § 02 — The Framework (reader-facing: "How the sites were scored")
Teach the reader how the framework works in 4–5 progressive panels, each with a small data visualization that demonstrates the variable being introduced. Suggested progression:

1. **The question.** Restated: 78 sites, finite budget, no consistent way to compare across them before this work.
2. **Three water-quality drivers.** Salinity, chlorophyll-a, dissolved oxygen. Show how each is measured (public monitoring stations) and what range matters for oysters. Small per-variable maps showing the spatial distribution of each, cross-fading.
3. **The composite.** Visual demonstration of the DO-modifier formula: `(salinity_score + chla_score) / 2 × DO_score`. Make the math legible.
4. **Three physical/built-environment flags.** Wave exposure, depth suitability, shoreline erosion (physical) plus near-CSO, near-MS4, near-park (built environment). Frame these as constraints rather than scores.
5. **The output.** A site's rank is the composite score plus the flags. Each site gets a one-line readout.

**Required content for § 02:**
- The three-category structure (water quality, shoreline dynamics, built environment) with explanation of how each variable was measured
- The "10 years ago" callout: this analysis wasn't possible a decade ago because public monitoring expansion and satellite imagery resolution have only recently reached sufficient density
- The 30+ sources detail with the rigor of excluding insufficient-data variables (turbidity, total suspended sediments were considered but dropped for data gaps)
- The dual-aggregation cross-check for ranking consistency (two different aggregation methods produced similar rankings, validating the approach)

Use Framer Motion for the cross-fades. Avoid layer toggles in this section; this is teaching, not exploration.

### § 03 — Sites Already in Design (reader-facing: "Sites Already in Design")
The most important narrative section. Use a horizontally scrolling or scroll-pinned layout to walk through:

- 11 sites are already in active design, totaling 288 acres
- They mostly cluster in Western Long Island Sound (Flushing Bay, Pugsley Creek, Powell's Cove, Turtle Cove, City Island, Bush Terminal Park) plus Paerdegat Basin in Brooklyn and Brooklyn Bridge Park in the Upper Harbor
- Their ranks span 38 to 74, never the top of the list
- Their data support is mostly Robust or Strong, where the top-ranked sites tend toward Sparse
- This is the "two-track investment" insight: build first where the data is dense, monitor where you want to build big

Use a side-by-side comparison treatment: top-ranked sites on one side (sparse data), sites already in design on the other (robust data). Make the inversion visible. Land on the synthesis: the framework gives BOP both a construction queue and a monitoring investment plan.

### § 04 — The Map (reader-facing: "Explore Every Site")
The working tool. Mapbox GL JS with a custom Natrx-skinned dark style (start from a Mapbox Standard or Light dark base, restyle to match `hero_reference.html`'s palette). Render full site polygons (not just centroids) from `BOP_Feb2026_Pipeline_Rankings.geojson`.

**Layer toggles** (left rail or floating control panel):
- Suitability score (default on, choropleth fill)
- Sites already in design (pulsing accent on the 11 Design sites)
- Data support / monitoring coverage (the renamed confidence tiers, choropleth)
- Wave exposure (categorical: Yes/No/NA)
- Erosion (Yes/No/NA)
- Depth suitability (Yes/No)
- Near CSO outfall (within 50ft)
- Near MS4 outfall (within 50ft)
- Near park (within 1640ft)

Pan, zoom, hover, click. Click a polygon → site detail panel slides in.

### § 05 — Site Detail (reader-facing: "Site Detail")
Triggered by click in § 04, also linkable via URL hash (`#/site/27` for Arthur Kill). Single-site spread:

- Site name and waterbody
- Status (Active design / Proposed future site)
- Rank, suitability score, data support tier (using public-facing tier names)
- Six flags rendered as clean status icons
- The water-quality breakdown: salinity, chlorophyll-a, DO with their bootstrap CIs (use `BOP_Feb2026_Pipeline_statistics.geojson` for the per-site numbers)
- Distance to nearest monitoring station for each parameter
- Acreage and depth distribution
- A small site map showing just this site's polygon in geographic context
- "Download brief" button → triggers PDF generation (server-side via Puppeteer or @react-pdf/renderer)

Per-site PDF is a high-value deliverable for journalists. Make it look print-quality, single page, Natrx-branded.

### § 06 — Methodology (reader-facing: "Methodology")
A collapsible/scrollable section at the bottom for readers who want the full technical story. Source the content from `BOP_Master_Document_Final.pdf`. Cover:

- The 26-week engagement scope
- Data sources used (NYC DEP, USGS, NOAA, NAIP imagery, NYHC monitoring network, etc.)
- The DO-modifier composite formula with reasoning
- How data support tiers are computed (bootstrap CIs + nearest-station distance)
- The wave-fetch model and 1m-resolution shoreline change analysis (highlight Natrx Assess-generated layers as the proprietary contribution)
- Caveats and limitations the framework surfaces

**Required content for § 06:**
- The four-workshop co-creation story: framework was built collaboratively with BOP over multiple working sessions, not handed down
- BOP's local expertise shaping variable selection: they brought decades of field knowledge that informed which variables mattered
- The two aggregation methods cross-check: ranking consistency was validated by running two different aggregation approaches
- The framework's adaptability to new data: BOP plans more monitoring this summer; the framework can re-run with updated inputs
- The precision that the framework is repeatable for BOP but not directly portable to other harbors without recalibration to local conditions

Footer with full credits, partnership lockup, and links to BOP and Natrx.

---

## Tech stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS, with the design tokens above wired into `tailwind.config.ts` as the source of truth
- **Type:** Inter, Fraunces, JetBrains Mono via `next/font/google`
- **Maps:** Mapbox GL JS (the `react-map-gl` wrapper is fine if it stays out of the way; raw Mapbox GL JS is also fine)
- **Animation:** Framer Motion for choreography, scroll-tied transitions, page transitions
- **PDF generation:** Puppeteer if running on Vercel serverless functions (use `@sparticuz/chromium` for the Lambda-compatible build), or `@react-pdf/renderer` if we want pure React-side rendering. Pick the simpler one given Vercel constraints.
- **Data:** Static GeoJSON files served from `/public`. No DB needed.
- **Deploy:** Vercel
- **Repo:** GitHub under `dylan-natrx`

Avoid: heavy client state libraries (no Redux, no Zustand unless genuinely needed; React state + URL params should suffice). Avoid: shadcn/ui out of the box. The aesthetic doesn't match. Build small, custom components.

---

## Data files in this folder

- **`BOP_Feb2026_Pipeline_Rankings.geojson`** — the authoritative source. 78 sites with multipolygon geometries (WGS84), rank, score, ConfidenceRule, status, waterbody, acreage, six flags. Use this for the map polygons and rankings.
- **`BOP_Feb2026_Pipeline_statistics.geojson`** — same 78 sites with the rich underlay: bootstrap 95% CIs for salinity / Chl-a / DO, distance-to-nearest-monitoring-station, depth distribution, full erosion threshold breakouts. Use this for the § 05 site detail panel.
- **`final_assessment.xlsx`** — same content as Rankings GeoJSON in spreadsheet form. Redundant for this build.
- **`BOP_Master_Document_Final.pdf`** — 44-page engagement deliverable. Source for § 06 methodology content. Note: Tables 12–15 in this document have known data discrepancies vs the GeoJSON for some flag values (Wave Exposure / Erosion / etc.). Always trust the GeoJSON, not the PDF tables.
- **`BOP_Wave_Analysis_Report.pdf`** — 53-page per-site reference, programmatically generated and Natrx-branded. Each site gets one page with aerial image + shoreline change overlay, wind rose, wave point analysis. Visually compelling, reusable as imagery for site detail panels. Worth asking Nick later whether the underlying tabular data and plotting code can be shared so we can render web-native interactive versions; for v1, embedding the static images is fine.
- **`hero_reference.html`** — the canonical visual reference. Open in a browser to see the target register. Port its map to React/Mapbox in § 01 of the build.
- **`Natrx_Logo_and_Tagline_-_White.png`** — Natrx logo, white on transparent.
- **`bop.png`** — Billion Oyster Project shield logo.

---

## Out of scope for v1

- Any feature requiring authentication or user accounts
- Server-side data persistence (no DB, no Supabase)
- Search / filter UI beyond the layer toggles
- Spanish or other-language localization
- Email signup, newsletter, social embeds
- Analytics integration beyond Vercel Analytics if it's free
- Anything that requires BOP's content team to review/approve before publish (this build assumes the locked editorial decisions above)

---

## Workflow

1. Scaffold the project, confirm structure with the user before adding code beyond the scaffold.
2. Build § 01 first, port the hero from `hero_reference.html` to React + Mapbox. Get sign-off on visual fidelity before moving on.
3. Build § 02–§ 06 in order. Show preview deploys (Vercel) at the end of each section.
4. Hold deployment of the production URL until v1 is feature-complete and the user has reviewed the full piece.

---

## Credentials

- **Mapbox token:** the user has a token. Treat as secret. Store in `.env.local` as `NEXT_PUBLIC_MAPBOX_TOKEN`. Set URL restrictions in Mapbox dashboard for `localhost`, the Vercel preview domain, and the production domain. Do NOT commit the token to the repo. Add `.env.local` to `.gitignore` immediately on scaffold.
- **GitHub:** `dylan-natrx`. Run `gh auth login` interactively when ready.
- **Vercel:** `dylan-natrx`. Run `vercel login` interactively when ready.

---

## What the user wants from you

The user is a PR/comms strategist, not a developer. They have strong design and editorial taste. They will review code less than they review visual fidelity, copy, and the editorial register. Your job:

- Build production-quality code without expecting heavy review
- Surface visual previews at every meaningful checkpoint (Vercel preview deploys)
- Match `hero_reference.html`'s register exactly; do not introduce new colors, type, or motion patterns without asking
- Push back when design decisions would conflict with the editorial brief above
- Keep deploy steps simple and interactive (so the user can see and approve each deploy)

When in doubt, ask. The strategic decisions in this brief took dozens of iterations to lock. Don't relitigate them, but do flag if implementation reveals a real tension.

---

## Project Documentation

For implementation details and session continuity, see:

- **`docs/SPEC_NOTES.md`** - Technical specifications, architecture, implementation details
- **`docs/ISSUES_AND_SOLUTIONS.md`** - Problems encountered and how they were solved
- **`docs/PROJECT_STATUS.md`** - Current completion status, checklists, next steps
- **`docs/SESSION_HANDOFF.md`** - Quick context for resuming work

### Current State (§ 01 Hero)

The hero section is complete with:
- Custom SVG map using Mercator projection (not Mapbox)
- Bidirectional hover state between FigurePanel and HeroMap
- Top-ranked sites (1-10) with pulsing halos and glow effects
- Suitability coloring with 0.5 threshold (gradient+stroke above, muted below)
- Extended coastlines with natural-looking edges
- Water layer with subtle teal tint, land darker than background

Key implementation files:
- `src/lib/colors.ts` - Suitability color functions, threshold logic
- `src/lib/land.ts` - Coastline polygon coordinates
- `src/lib/projection.ts` - Mercator projection parameters
- `src/components/hero/HeroMap.tsx` - SVG map rendering
- `src/components/hero/FigurePanel.tsx` - Left panel with rank mappings
