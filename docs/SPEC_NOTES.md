# Technical Specification Notes

Last updated: 2026-05-18. Reflects v1 feature-complete state: OSM-based map architecture, all five sections built, Vercel Analytics wired, post-launch editorial polish landed (3 pullquotes, 2-card press contact, Natrx Assess glossary entry + product-name styling, footer org links).

---

## Stack

- **Next.js 15.5.18** with App Router and Turbopack
- **Tailwind CSS 3.x** with custom design tokens in `tailwind.config.ts`
- **Framer Motion** for choreographed entrances (the AnimatedEntrance wrapper) and walkthrough step transitions
- **Mapbox GL JS 3.8** with fully custom inline style spec (no Mapbox-hosted basemap, no tiles, no sprites, no glyphs)
- **Static GeoJSON** served from `/public/data/`
- **`@vercel/analytics` + `@vercel/speed-insights`** for telemetry
- **Deploy:** Vercel, project `dylan-natrx/bop` (`prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`). Auto-deploys every push to `main`.

---

## Directory layout

```
src/
├── app/
│   ├── layout.tsx                       # Root layout, fonts, metadata, OG image, Analytics + SpeedInsights
│   ├── globals.css                      # Base styles, scrollbar, tooltip CSS, ambient gradients
│   ├── page.tsx                         # Home page; SiteChromeProvider wraps SectionNav + sections + Footer
│   ├── site/[siteId]/page.tsx           # Site detail route stub (unused in v1)
│   └── test-map/page.tsx                # Coastline experiment, debugging artifact
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx              # Section wrapper (headline + figure)
│   │   ├── HeroFigure.tsx               # Container with bidirectional hover state, grid layout
│   │   ├── FigurePanel.tsx              # Left panel: Fig.1 caption, top sites, legends
│   │   ├── HeroMap.tsx                  # Mapbox GL JS Map 1 implementation
│   │   ├── Headline.tsx                 # "Restoring NY Harbor's Oyster Reefs. But where?"
│   │   ├── StatStack.tsx                # 4-stat right column
│   │   └── CoastlineTest.tsx            # Debugging artifact; references legacy `lib/land.ts`
│   ├── methodology/
│   │   ├── MethodologyWalkthrough.tsx   # Step state, keyboard nav, Framer step transitions
│   │   ├── WalkthroughMap.tsx           # Map 2 with step-specific filter semantics
│   │   ├── SpectraPanel.tsx             # Stacked SVG curves, newest on top, click-to-revisit
│   │   ├── steps.tsx                    # Six step configs (lede, body, flags, curves)
│   │   └── WalkthroughControls.tsx      # Step counter + 6-dot breadcrumb + Prev/Next
│   ├── sections/
│   │   ├── SectionShell.tsx             # Shared eyebrow + padding; includes SectionViewTracker
│   │   ├── SectionViewTracker.tsx       # Invisible client marker for section_reached event
│   │   ├── PlaceholderBlock.tsx         # Dashed-border placeholder (unused in v1, kept for future)
│   │   ├── EditorialImage.tsx           # Next/Image inside a bordered editorial frame
│   │   ├── ImagePlaceholder.tsx         # Pre-image placeholder (legacy, unused in v1)
│   │   ├── StakesAndProblem.tsx         # § 2
│   │   ├── MethodologyMadeVisible.tsx   # § 3 container
│   │   ├── TopRankedCallout.tsx         # § 3 callout card (3 instances)
│   │   ├── SiteMiniMap.tsx              # § 3 mini Mapbox map inside each callout
│   │   ├── WhatAnalysisMadeVisible.tsx  # § 4 container
│   │   ├── FindingBeat.tsx              # § 4 finding beat (used twice)
│   │   ├── ConfidenceDistributionChart.tsx # § 4 beat 2 stacked bar chart
│   │   └── WhatThisEnables.tsx          # § 5
│   ├── chrome/
│   │   ├── SiteChromeProvider.tsx       # Drawer context + state + analytics on open
│   │   ├── DrawerEdgeTab.tsx            # Right-edge affordance button
│   │   ├── SiteDrawer.tsx               # Slide-out drawer
│   │   ├── GlossaryPanel.tsx            # Glossary tab body
│   │   ├── PressContactPanel.tsx        # Press contact tab body
│   │   └── glossary-data.ts             # 23 alphabetized terms
│   ├── layout/
│   │   ├── SectionNav.tsx               # Sticky top nav with scroll-spy
│   │   └── Footer.tsx                   # Simplified page-end footer
│   └── ui/
│       ├── GlossaryTerm.tsx             # Inline glossary anchor; opens drawer on click
│       ├── Tooltip.tsx                  # Generic + SiteTooltipContent
│       ├── Legend.tsx                   # SuitabilityLegend + TopRankedLegend
│       ├── PulseHalo.tsx                # Pulse halo CSS wrapper
│       └── AnimatedEntrance.tsx         # Framer Motion entrance wrapper
├── hooks/
│   ├── useRankingsData.ts               # Loads /data/rankings.geojson, exposes geojson + sites
│   ├── useStatisticsData.ts             # Loads /data/statistics.geojson, byId map
│   ├── useFireOnView.ts                 # IntersectionObserver fire-once-per-element
│   ├── useSelectedSite.ts               # Selection state for drawer integration
│   └── useSiteStats.ts                  # Per-site stats accessor
├── lib/
│   ├── colors.ts                        # Suitability color logic, 0.5 threshold, gradient stops
│   ├── constants.ts                     # TOP_RANKED_SITES, stat values
│   ├── data.ts                          # GeoJSON load helpers, calculateCentroid
│   ├── projection.ts                    # Legacy SVG projection. Only calculateMarkerRadius is still used
│   ├── land.ts                          # Legacy SVG coastline coords. Only used by CoastlineTest
│   └── track.ts                         # Typed Vercel Analytics wrapper
└── types/
    ├── geojson.ts                       # FeatureCollection types
    └── site.ts                          # RankingSite, SiteStats, FrameworkPrimerSite, etc.
```

---

## Map architecture (post-OSM rebuild, May 2026)

All three Mapbox maps on the page (HeroMap, WalkthroughMap, SiteMiniMap) use **the same two GeoJSON sources** for land and water. This is the key architectural decision that solves the seam / wedge / paved-river problems we had with the previous patchwork approach.

### Sources

```js
'land-region': { type: 'geojson', data: '/data/region-land.geojson' }
'water-hudson': { type: 'geojson', data: '/data/hudson-river.geojson' }
'sites': { type: 'geojson', data: sitesGeoJson, promoteId: 'id' }
```

`sitesGeoJson` is computed in a useMemo per map and contains Point features at site centroids with `_radius` and `_isTop10` properties precomputed.

### Layer order (all production maps)

1. `background` — solid fill `#061321` (deep navy water)
2. `land-region-fill` — fill `#15314A` at opacity 1 (uniform land)
3. `water-hudson-fill` — fill `#061321` at opacity 1 (carves out Hudson)
4. `land-region-edge` — line `rgba(120, 158, 184, 0.35)` width 1.1 (coastline outline)
5. `water-hudson-edge` — same line (Hudson banks)
6. *(map-specific layers below this — site circles, erosion highlights, etc.)*

### How `region-land.geojson` was built

Fetched from OpenStreetMap Overpass API:

```
[out:json][timeout:180];
(way["natural"="coastline"](40.4,-74.4,41.5,-71.7););
out geom qt;
```

That returns 2,194 coastline ways for the tri-state area (~10.6MB raw). The build script:

1. Stitches ways into chains by matching endpoint node IDs (OSM coastline convention: water on right when walking the way).
2. Closed chains become island polygons (Long Island including Brooklyn/Queens, Manhattan, Staten Island, Fire Island and other barrier islands, smaller islets).
3. The longest open chain is the mainland coast (NJ + NY mainland + CT, 59,310 points before simplification). Closed along the bbox edges (top-right corner → top-left → bottom-left → start) to form a polygon.
4. Drop islands under ~1e-5 sq deg (~100×100 m).
5. Simplify with `shapely.simplify(0.0002, preserve_topology=True)` (~22m on the ground).
6. Save as a single MultiPolygon FeatureCollection.

Result: 132 polygons, ~614KB. Same fidelity everywhere; no political-boundary seams.

### How `hudson-river.geojson` was built

```
[out:json][timeout:180];
(way["natural"="water"](40.85,-74.05,41.5,-73.7);
 relation["natural"="water"](40.85,-74.05,41.5,-73.7););
out geom qt;
```

Filter to relations:
- `type=multipolygon`
- `natural=water`
- NOT reservoir, pond, lake (skip those features)
- Bbox intersects the Hudson corridor (lng −74.05 to −73.84, lat 40.84 to 41.6)
- Exclude Hackensack-named relations explicitly

For each relation, stitch the `outer` and `inner` member ways into closed rings, build a Polygon (with holes if inner rings present), buffer(0) to fix any self-intersections, and union all polygons. Simplify with the same 0.0002° tolerance. Result: ~55KB.

The Hudson polygon **must be drawn ON TOP of land** because NJ, Westchester, and the OSM mainland polygon each technically extend slightly into the river (political boundary or coastline approximation). The water-color overlay carves it out visually.

### Map 1 (HeroMap) — specifics

```js
{
  container: mapNodeRef.current,  // inline style; see CRITICAL note below
  style: { ... see Sources + Layers above ... },
  bounds: [[-74.30, 40.42], [-73.70, 41.05]],
  fitBoundsOptions: { padding: { top: 20, right: 24, bottom: 36, left: 24 } },
  projection: 'mercator',
  attributionControl: false,
  interactive: false,        // hero is for looking
  doubleClickZoom: false, dragPan: false, dragRotate: false,
  scrollZoom: false, keyboard: false, touchZoomRotate: false, pitchWithRotate: false,
  maxZoom: 13,
}
```

DOM markers added in the `load` handler:

1. **Borough labels** — JetBrains Mono uppercase, 10px, color `rgba(184, 176, 160, 0.7)`, `text-shadow: 0 0 6px rgba(6, 19, 33, 0.9)`. Positions in `BOROUGH_LABELS`.
2. **Water-body labels** — Fraunces italic, 11px, color `rgba(184, 176, 160, 0.42)`. Some rotated to follow channel axis. Positions in `WATER_LABELS`.
3. **Top-10 halos** — outer wrapper holds Mapbox positioning transform; inner div has `className="animate-pulse-halo"`. Wrapper/inner split is **critical** — see [ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md).

### Site circle expressions (same for HeroMap + WalkthroughMap)

```js
'circle-radius': [
  'case',
  ['boolean', ['feature-state', 'hover'], false],
  ['*', ['get', '_radius'], 1.3],
  ['get', '_radius']
]
'circle-color': [
  'case',
  ['<', ['get', 'Score'], 0.5],
  'rgba(80, 105, 115, 0.85)',  // muted below threshold
  ['interpolate', ['linear'], ['get', 'Score'],
    0.5,  '#2A4A56',
    0.685,'#137D76',
    0.87, '#6FE3D0']
]
'circle-stroke-color': [
  'case',
  ['<', ['get', 'Score'], 0.5],
  'rgba(0, 0, 0, 0)',
  'rgba(111, 227, 208, 0.55)'
]
'circle-stroke-width': ['case', ['<', ['get', 'Score'], 0.5], 0, 1.5]
'circle-opacity':       ['case', ['<', ['get', 'Score'], 0.5], 0.45, 1]
'circle-blur':          ['case', ['==', ['get', '_isTop10'], 1], 0.18, 0]
```

### Bidirectional hover (HeroMap ↔ FigurePanel)

`HeroFigure` owns `hoveredRanks: number[]`. Passes it to both children:

- **FigurePanel:** row hover calls `onHoverRanks(rankArray)`.
- **HeroMap:** subscribes to `hoveredRanks` via useEffect, calls `setFeatureState({ source: 'sites', id }, { hover: true })` on matching features. Halos dim to opacity 0.32 when other ranks are hovered.

Rank-to-row mapping in FigurePanel:
```ts
{
  'Arthur Kill': [1],
  'Living Breakwaters': [2, 3, 4, 5, 6, 7],
  "Wolfe's Pond": [8],
  'Conch Basin': [9],
}
```

### Map 2 (WalkthroughMap) — step semantics

Six step configs in [steps.tsx](../src/components/methodology/steps.tsx). Each step has:
- `id`, `title`, `lede`, `bodyParagraphs[]`
- `colorMode` — how to color the site circles at this step
- `visibleFlags` — which filter flags (wave, erosion, CSO, MS4, park) to surface
- `visibleCurves` — which spectra curves to render in SpectraPanel
- `focusCurve`, `showFavorableZone`, `showErosionAnnotation`, `showFiltersAnnotation`, `showMathDisclosure`

The map dims sites where step-relevant flags are negative (`_filteredOut` computed per site). Wave step dims `NearWave=Yes` sites. Erosion step adds a teal-aqua ring to `NearErosion` sites. CSO/MS4 step adds further dimming. Park is positive (not a filter).

### Map 3 (SiteMiniMap) — top-ranked callout cards

Same style as Map 1/2. Filters `rankings.geojson` to the passed `siteIds` prop, computes bounds, fits view with `padding: 28` and `maxZoom: 14`. Polygons rendered in teal-aqua. Static (non-interactive).

### Container positioning (CRITICAL across all three maps)

The map's container ref uses **inline style**, not Tailwind classes:

```tsx
<div ref={mapNodeRef}
     style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
```

If you switch to Tailwind classes here, `mapbox-gl/dist/mapbox-gl.css` will override `absolute` with `relative` and the map collapses to 0 height. See [ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md).

---

## Methodology walkthrough (§3 inner)

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ STEP N OF 6                                                       │
│ Step title (Fraunces)                                             │
├─────────────────────────────────────┬─────────────────────────────┤
│ WalkthroughMap (3fr)                │ SpectraPanel (2fr)          │
│ - bounds matched to harbor          │ - stacked curves            │
│ - step-specific dimming             │ - newest on top             │
│ - same Mapbox style as Map 1        │ - click curve = jump to step│
├─────────────────────────────────────┴─────────────────────────────┤
│ Step lede + body paragraphs (Inter)            Step N/6 ●●●○○○    │
│                                                ← Previous  Next → │
└──────────────────────────────────────────────────────────────────┘
```

### Step state

`currentStep` is 1-indexed. `advance(via, to)` is the unified state transition: handles next/previous/jump/keyboard origins, fires `walkthrough_step` analytics on every real change.

```ts
const advance = useCallback((via, to) => {
  setCurrentStep((s) => {
    const target = to === 'next' ? min(6, s+1) : to === 'previous' ? max(1, s-1) : clamp(to, 1, 6)
    if (target !== s) track('walkthrough_step', { step: target, via })
    return target
  })
}, [])
```

### Keyboard nav

ArrowRight or Space → next (via='keyboard'). ArrowLeft or Shift+Space → previous. Ignores keystrokes when an input/textarea has focus.

### Step 6 final state

The Next button is `disabled` rather than transformed into a "Continue reading" CTA. Earlier the button scrolled to §4, which skipped the "What the ranking surfaces" callout cards inside §3 below the walkthrough — that bug was the reason we dropped the CTA.

---

## Persistent chrome

### Sticky section nav

`SectionNav` ([src/components/layout/SectionNav.tsx](../src/components/layout/SectionNav.tsx)) is a 56px-tall sticky header (z-30, backdrop-blur). Brand lockup on the left, four short links on the right. IntersectionObserver scroll-spy with `rootMargin: '-30% 0px -60% 0px'` highlights the active section. Smooth scroll on click with 56px offset to account for the sticky nav height. Links: Stakes / Methodology / Findings / At scale.

### Right-edge drawer

`SiteChromeProvider` ([src/components/chrome/SiteChromeProvider.tsx](../src/components/chrome/SiteChromeProvider.tsx)) owns:
- `isOpen: boolean`, `activeTab: 'glossary' | 'press'`, `anchor: string | undefined`
- `open(tab?, anchor?)`, `close()`, `toggle()`, `setActiveTab(tab)`

Closes on Escape. Locks body scroll while open. Fires `drawer_opened` analytics when `isOpen` transitions to true (covers every entry path).

`DrawerEdgeTab` is a vertical right-edge button on desktop (`fixed top-1/2 right-0`), a round bottom-right button on mobile. `SiteDrawer` is the slide-out content with two tabs.

### Inline glossary terms

`<GlossaryTerm termId="estuary">estuary</GlossaryTerm>` ([src/components/ui/GlossaryTerm.tsx](../src/components/ui/GlossaryTerm.tsx)) renders as an inline button with dotted underline. On click: fires `glossary_term_clicked` with `term_id`, then opens the drawer scrolled to the matching entry.

### Glossary entries

25 alphabetized definitions in [glossary-data.ts](../src/components/chrome/glossary-data.ts): algal bloom, Allee effect, bathymetry, candidate site, chlorophyll-a, composite score, confidence interval, CSO, dissolved oxygen, Eastern oyster, estuary, eutrophication, fetch-limited wave modeling, filter feeder, Habitat Suitability Index, hypoxia, keystone species, MS4, NAIP imagery, **Natrx Assess**, natural breakwater, salinity, shoreline change analysis (MEIP), spat, subtidal vs. intertidal.

The `GlossaryEntry` interface carries an optional `productName?: boolean` field. Entries with that flag (currently only Natrx Assess) render the drawer `<dt>` in `font-serif italic font-medium` instead of the default `font-light`. Everything else uses the same plain serif treatment. The flag exists to keep the editorial chrome rule (product names italicized) consistent inside the drawer without baking the styling into the term string.

### Inline `<GlossaryTerm>` usage on the page

- § 2 paragraph 3: wraps "candidate restoration sites" → opens drawer at the `candidate-site` entry.
- § 3 intro: wraps the italic `<em>` containing "Natrx Assess" → opens drawer at the `natrx-assess` entry. This is the page's first encounter of the term; subsequent occurrences (§ 4 Beat 1, § 5 closing graf, walkthrough step 4 and 5 titles and step 4 body) are styled italic + white but not wrapped.

### Body-text styling for Natrx Assess

Every body-text occurrence renders as `<em className="font-serif italic text-white">Natrx Assess</em>` — pure white instead of `text-ivory-dim`, so the named product reads as foregrounded editorial chrome without becoming a button or product card. The walkthrough's local `Em` component in [steps.tsx](../src/components/methodology/steps.tsx) applies the same class so step titles and step bodies stay consistent. `StepConfig.title` is typed as `ReactNode` (not `string`) specifically to allow JSX titles like `<>Wave exposure, from <Em>Natrx Assess</Em></>`. Figure captions are deliberately unstyled.

---

## Analytics + Speed Insights

Installed packages:
- `@vercel/analytics` — page views, top referrers, geo, custom events
- `@vercel/speed-insights` — Core Web Vitals from real users

Both rendered in `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
// ...
<body>
  {children}
  <Analytics />
  <SpeedInsights />
</body>
```

### Custom events (via `src/lib/track.ts`)

```ts
type Events = {
  walkthrough_step: { step: number; via: 'next' | 'previous' | 'jump' | 'keyboard' }
  drawer_opened: Record<string, never>
  glossary_term_clicked: { term_id: string }
  top_ranked_viewed: { site: string }
  section_reached: { section: string }
}
```

The wrapper is the single source of truth for the event vocabulary; adding an event means adding it here first.

### `useFireOnView` hook

[src/hooks/useFireOnView.ts](../src/hooks/useFireOnView.ts). Attach to a ref + callback. Fires the callback exactly once when the element first crosses a visibility threshold, then disconnects the observer. Options:
- `threshold` (0..1) — default 0.5
- `skipInitial` — true skips the initial paint event so events only fire after the user has scrolled

Used by:
- `SectionViewTracker` (zero-height client marker rendered at the top of every SectionShell, threshold 0.01)
- `TopRankedCallout` (threshold 0.6)

### Dashboard access

First-time setup is **one-time per project**:
1. Visit `https://vercel.com/dylan-natrx/bop`
2. Open **Analytics** tab → click **Enable**
3. Open **Speed Insights** tab → click **Enable**

Then:
- Page views, geo, referrers: `/analytics`
- Custom events: same page, scroll to the Events section
- Core Web Vitals: `/speed-insights`

All cookieless. No consent banner required.

---

## Typography

Loaded via `next/font/google` in `src/app/layout.tsx`. Exposed as CSS variables `--font-fraunces`, `--font-inter`, `--font-jetbrains`.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headlines, stat numbers, water labels | Fraunces | 300 | Italic for emphasis ("But where?", water-body labels, Natrx Assess on first reference) |
| Body, lede, UI text | Inter | 300, 400 | 300 default, 400 emphasized |
| Eyebrows, section markers, code-like labels | JetBrains Mono | 400, 500 | Always uppercase, letter-spacing 0.18–0.22em |

---

## Palette (CSS custom properties via Tailwind tokens)

```
--bg-deep:      #061321   /* page background, water in maps */
--bg-mid:       #0E2236   /* darker UI surface */
--bg-soft:      #15314A   /* land masses in maps */
--land:         #04101C   /* legacy, kept for SVG hero artifacts */
--land-edge:    rgba(70, 110, 145, 0.18)
--teal:         #137D76   /* Natrx primary */
--teal-bright:  #2BA8A0   /* accent, halo border */
--teal-aqua:    #6FE3D0   /* highest-suitability sites, top-ranked highlights */
--ivory:        #F2EDE3   /* primary text */
--ivory-dim:    #B8B0A0   /* secondary text, labels */
--ivory-faint:  #6E6859   /* tertiary, eyebrow, captions */
--rule:         rgba(242, 237, 227, 0.12)
--rule-soft:    rgba(242, 237, 227, 0.06)
```

Suitability gradient stops (used by both the legend CSS gradient and the Mapbox `interpolate` expression):
- 0.20–0.50 → `#2A4A56` (muted)
- 0.685    → `#137D76` (mid)
- 0.87     → `#6FE3D0` (aqua)

---

## Data files

### Production maps

| File | Source | Used by |
|---|---|---|
| `public/data/region-land.geojson` | OSM coastline ways via Overpass, stitched + simplified | HeroMap, WalkthroughMap, SiteMiniMap |
| `public/data/hudson-river.geojson` | OSM `water=river` multipolygon relations, unioned + simplified | HeroMap, WalkthroughMap, SiteMiniMap |
| `public/data/rankings.geojson` | Copy of `BOP_Feb2026_Pipeline_Rankings.geojson` (Natrx source) | `useRankingsData()`, all map `sites` sources |
| `public/data/statistics.geojson` | Copy of `BOP_Feb2026_Pipeline_statistics.geojson` (Natrx source) | `useStatisticsData()`, walkthrough |

### Legacy (kept on disk for diagnostic routes)

| File | Source | Status |
|---|---|---|
| `public/data/nyc-boroughs.geojson` | NYC Open Data | Used by `/test-map`, `CoastlineTest` only |
| `public/data/nj-shoreline.geojson` | US Census CB 500k | Used by `/test-map`, `CoastlineTest` only |
| `public/data/westchester.geojson` | US Census CB 500k | Used by `/test-map`, `CoastlineTest` only |
| `public/data/upstate-ny-ct.geojson` | US Census CB 500k, clipped | Unused; safe to delete |
| `public/data/framework-primer.json` | Generated by `scripts/generate-framework-primer.js` | Reserved; not in v1 |
| `public/data/sites/<id>.json` | Generated by `scripts/split-statistics.js` | Reserved; not in v1 |

### Key fields in rankings.geojson

```
id              "0"–"77"
Site            string
Status          "Design" | "Proposed Future Site"
Waterbody       string
Acres           number
Rank            1–78
Score           0.0–0.87 (composite suitability)
ConfidenceRule  "low" | "moderate-" | "moderate" | "moderate+" | "high"
NearCSO         "Yes" | "No"
NearMS4         "Yes" | "No"
NearPark        "Yes" | "No"
WaveExposure    "Yes" | "No" | null
Erosion         "Yes" | "No" | null
SuitableDepth   "Yes" | "No"
```

### Public-facing label mappings

`DATA_SUPPORT_LABELS` in `src/types/site.ts`:
```
high      → Robust
moderate+ → Strong
moderate  → Adequate
moderate- → Limited
low       → Sparse
```

Internal scientific labels (Nick / Lise) stay intact in the data; public UI uses the relabeled tiers.

---

## Motion grammar

| Animation | Duration | Easing | Notes |
|---|---|---|---|
| Fade up entrance | 1200 ms | ease-out | Text first, ~200–500 ms delay |
| Fade in (figure) | 1500 ms | ease-out | ~700–800 ms delay after text |
| Pulse halo (top-10) | 2600 ms | ease-in-out, infinite | scale 1→2.0, opacity 0.85→0 |
| Hover transitions | 200–280 ms | ease | scale ~1.1×, no bounce |
| Walkthrough step transition | 300 ms | ease-out | Framer Motion AnimatePresence on title + body |
| Drawer slide-in | 300 ms | ease-out | From the right edge, light backdrop dim |
| Stacked spectra reorder | layout-transition | spring | Newest-added curve animates to top of stack |

---

## Build & dev

```bash
npm run dev               # Next.js dev server (Turbopack), default port 3000
npm run build             # Production build, runs type checks + ESLint
npm run start             # Production server locally on port 3000
npm run prepare-data      # Re-runs the GeoJSON prep scripts
rm -rf .next && npm run dev   # Fix Turbopack cache corruption
```

**When dev server's HMR is stuck on geojson changes** (the map renders empty with `loaded: false` and no useful error):
```bash
pkill -f "next" && sleep 2 && npm run dev
```

**Authoritative validation when HMR misbehaves:** run `npm run build` and verify against the production deploy.

---

## Environment variables

```
NEXT_PUBLIC_MAPBOX_TOKEN     # Mapbox public token (94 chars). Required at build time.
```

Set in `.env.local` (gitignored) and on Vercel for Production/Preview/Development scopes. **Baked into the bundle at build time** — env var changes require a rebuild to take effect.

---

## Open Graph / Twitter card

Configured in `app/layout.tsx`:

```ts
openGraph: {
  title: "Restoring New York Harbor's Oyster Reefs",
  description: 'Where should New York Harbor prioritize building oyster reefs? A data-driven framework for Billion Oyster Project.',
  type: 'website',
  images: [{ url: '/site-imagery/nyoyster.webp', width: 1201, height: 901, alt: '...' }],
},
twitter: {
  card: 'summary_large_image',
  title: ...,
  description: ...,
  images: ['/site-imagery/nyoyster.webp'],
},
```

`nyoyster.webp` (an oyster cluster shot with the NYC skyline) is the same image that closes §5 visually.

---

## Things known to be obsolete / kept for inertia

- `src/lib/projection.ts` — `calculateProjection` and `projectPoint` are dead code (SVG-era projection math). Only `calculateMarkerRadius` is still consumed by HeroMap.
- `src/lib/land.ts` — coastline coords for the SVG hero. Still imported by `CoastlineTest.tsx`. Can be deleted along with `CoastlineTest.tsx` and `src/app/test-map/page.tsx` when convenient.
- `src/components/sections/PlaceholderBlock.tsx` and `ImagePlaceholder.tsx` — used during scaffolding; no v1 component references them anymore.
- The `/site/[siteId]` route exists but is stub-only. The new 5-section structure may or may not bring it back; site detail might move into § 3 callouts instead.
- The four legacy land geojson files (`nyc-boroughs`, `nj-shoreline`, `westchester`, `upstate-ny-ct`) are no longer used by production but kept on disk for the diagnostic routes. When those routes are removed, the files can be deleted too.
