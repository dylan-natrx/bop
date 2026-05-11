# Technical Specification Notes

Last updated: 2026-05-11. Reflects the post-Mapbox-rebuild state.

---

## Stack

- **Next.js 15.5.18** with App Router and Turbopack
- **Tailwind CSS 3.x** with custom design tokens in `tailwind.config.ts`
- **Framer Motion** for choreographed entrances (the AnimatedEntrance wrapper)
- **Mapbox GL JS 3.8** with a fully custom inline style spec (no Mapbox-hosted basemap, no tiles, no sprites, no glyphs)
- **Static GeoJSON** served from `/public/data/`
- **Deploy:** Vercel, project `dylan-natrx/bop` (`prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`). Auto-deploys every push to `main`.

---

## Directory layout

```
src/
├── app/
│   ├── layout.tsx                       # Root layout, fonts, metadata
│   ├── globals.css                      # Base styles, scrollbar, tooltip CSS, ambient gradients
│   ├── page.tsx                         # Home page; renders Hero + sections 2-5
│   ├── site/[siteId]/page.tsx           # Site detail route (unused in current scope)
│   └── test-map/page.tsx                # Coastline experiment, debugging artifact
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx              # Section wrapper (topbar + headline + figure + footer)
│   │   ├── HeroFigure.tsx               # Container with bidirectional hover state, grid layout
│   │   ├── FigurePanel.tsx              # Left panel: Fig.1 caption, top sites, legends
│   │   ├── HeroMap.tsx                  # Mapbox GL JS Map 1 implementation
│   │   ├── Headline.tsx                 # "Restoring NY Harbor's Oyster Reefs. But where?"
│   │   ├── StatStack.tsx                # 4-stat right column
│   │   └── CoastlineTest.tsx            # Debugging artifact; references obsolete `lib/land.ts`
│   ├── sections/
│   │   ├── SectionShell.tsx             # Shared eyebrow + padding for §2-5
│   │   ├── PlaceholderBlock.tsx         # Dashed-border "Component placeholder" block
│   │   ├── StakesAndProblem.tsx         # § 2 scaffold
│   │   ├── MethodologyMadeVisible.tsx   # § 3 scaffold (Map 2 + spectra + 3 top-ranked callouts)
│   │   ├── WhatAnalysisMadeVisible.tsx  # § 4 scaffold (2 finding beats + thread)
│   │   └── WhatThisEnables.tsx          # § 5 scaffold (portability + glossary)
│   ├── layout/
│   │   ├── Topbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Tooltip.tsx                  # Generic + SiteTooltipContent
│       ├── Legend.tsx                   # SuitabilityLegend + TopRankedLegend
│       └── AnimatedEntrance.tsx         # Framer Motion entrance wrapper
├── hooks/
│   └── useRankingsData.ts               # Loads /data/rankings.geojson, exposes geojson + sites
├── lib/
│   ├── colors.ts                        # Suitability color logic, 0.5 threshold, gradient stops
│   ├── constants.ts                     # TOP_RANKED_SITES, stat values
│   ├── data.ts                          # GeoJSON load helpers, calculateCentroid
│   ├── projection.ts                    # Legacy SVG projection. Only calculateMarkerRadius is still used
│   └── land.ts                          # Legacy SVG coastline coords. Only used by CoastlineTest now
└── types/
    ├── geojson.ts                       # FeatureCollection types
    └── site.ts                          # RankingSite, SiteStats, FrameworkPrimerSite, etc.
```

---

## Map 1 (HeroMap) — Mapbox implementation

### Style spec

Defined inline in [HeroMap.tsx](../src/components/hero/HeroMap.tsx). Style version 8, no glyphs, no sprite. Sources:

- `land-nyc` — `/data/nyc-boroughs.geojson` (5 boroughs, ~80k pts total)
- `land-nj` — `/data/nj-shoreline.geojson` (755 pts, US Census 2010 500k state outline)
- `land-westchester` — `/data/westchester.geojson` (332 pts, US Census 2010 500k county outline)
- `sites` — inline GeoJSON computed in `sitesGeoJson` useMemo, Point geometries at site centroids, with `_radius` and `_isTop10` properties precomputed

### Layers, in render order (bottom → top)

1. `background` — solid fill `#061321` (deep navy water)
2. `land-westchester-fill` — fill `#0E2236` at opacity 1
3. `land-nj-fill` — fill `#0E2236` at opacity 1
4. `land-nyc-fill` — fill `#0E2236` at opacity 1 (drawn last among land so it visually masks any NJ overlap)
5. `land-nyc-edge` — line `rgba(120, 158, 184, 0.35)` width 1.1
6. `land-nj-edge` — same
7. `land-westchester-edge` — same
8. `sites-circle` — data-driven circle layer over the `sites` source

### Site circle expressions

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

### DOM markers

Three categories of `mapboxgl.Marker` are added in the `load` handler:

1. **Borough labels** — JetBrains Mono uppercase, 10px, color `rgba(184, 176, 160, 0.7)`, with `text-shadow: 0 0 6px rgba(6, 19, 33, 0.9)` for legibility. Positions hardcoded in `BOROUGH_LABELS` array.
2. **Water-body labels** — Fraunces italic, 11px, color `rgba(184, 176, 160, 0.42)` (more faint to differentiate from boroughs). Some rotated (`rotate: -55` for East River, `-78` for Hudson River, `-80` for Arthur Kill) to follow the channel axis. Positions in `WATER_LABELS` array.
3. **Top-10 halos** — DOM `<div>` wrapper containing an animated inner `<div>`. The wrapper holds Mapbox's positioning transform; the inner has `className="animate-pulse-halo"` and handles the scale animation. **Wrapper/inner split is critical** — see [ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md) for why.

### Map constructor config

```js
{
  container: mapNodeRef.current,
  style: { ... inline style spec ... },
  bounds: [[-74.30, 40.42], [-73.70, 41.05]],  // harbor area
  fitBoundsOptions: { padding: { top: 20, right: 24, bottom: 36, left: 24 } },
  projection: 'mercator',  // Mapbox 3.x default can be globe; force flat
  attributionControl: false,
  interactive: false,  // hero is for looking, not panning
  doubleClickZoom: false,
  dragPan: false,
  dragRotate: false,
  scrollZoom: false,
  keyboard: false,
  touchZoomRotate: false,
  pitchWithRotate: false,
  maxZoom: 13,
}
```

### Bidirectional hover

`HeroFigure` owns `hoveredRanks: number[]`. Passed to both children:

- **FigurePanel:** row hover → calls `onHoverRanks(rankArray)`.
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

### Container positioning (critical)

The map's container ref uses **inline style**, not Tailwind classes, to override Mapbox's CSS:

```tsx
<div ref={mapNodeRef}
     style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
```

If you switch to Tailwind classes here, `mapbox-gl/dist/mapbox-gl.css` will override `absolute` with `relative` and the map will collapse to 0 height. See [ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md).

---

## Typography

Loaded via `next/font/google` in `src/app/layout.tsx`. Exposed as CSS variables `--font-fraunces`, `--font-inter`, `--font-jetbrains`.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headline, stat numbers, water labels | Fraunces | 300 | Italic for "But where?" and water-body labels |
| Body, lede, UI text | Inter | 300, 400 | 300 default, 400 emphasized |
| Eyebrows, section markers, code-like labels | JetBrains Mono | 400, 500 | Always uppercase, letter-spacing 0.18–0.22em |

---

## Palette (CSS custom properties via Tailwind tokens)

```
--bg-deep:      #061321   /* page background, water in Map 1 */
--bg-mid:       #0E2236   /* land masses in Map 1 */
--bg-soft:      #15314A
--land:         #04101C   /* legacy, kept for the SVG hero artifacts */
--land-edge:    rgba(70, 110, 145, 0.18)
--teal:         #137D76   /* Natrx primary */
--teal-bright:  #2BA8A0   /* accent, halo border */
--teal-aqua:    #6FE3D0   /* highest-suitability sites */
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

| File | Source | Used by |
|---|---|---|
| `BOP_Feb2026_Pipeline_Rankings.geojson` (repo root) | Source of truth from Natrx | Reference; the file copied into `public/data/rankings.geojson` is what the app loads |
| `BOP_Feb2026_Pipeline_statistics.geojson` (repo root) | Source of truth | Reserved for future site-detail / § 4 data work |
| `public/data/rankings.geojson` | Copy of pipeline rankings | `useRankingsData()` and Map 1's `sites` source |
| `public/data/nyc-boroughs.geojson` | NYC Open Data | NYC borough fills on Map 1 |
| `public/data/nj-shoreline.geojson` | US Census 2010 CB 500k (state outlines) | NJ fill on Map 1 |
| `public/data/westchester.geojson` | US Census 2010 CB 500k (county outlines) | Westchester fill on Map 1 |
| `public/data/framework-primer.json` | Generated by `scripts/generate-framework-primer.js` | Reserved for future § 3 walkthrough data |
| `public/data/sites/<id>.json` | Generated by `scripts/split-statistics.js` | Reserved for future per-site detail |

### Key fields in rankings.geojson

```
id              "0"–"77"
Site            string
Status          "Design" | "Proposed Future Site"
Waterbody       string
Acres           number (one site has 0)
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

Internal scientific labels (Nick / Lise) stay intact in the data. The public-facing tier names are for any UI that surfaces the ConfidenceRule field.

---

## Motion grammar

| Animation | Duration | Easing | Notes |
|---|---|---|---|
| Fade up entrance | 1200 ms | ease-out | text first, ~200–500 ms delay |
| Fade in (figure) | 1500 ms | ease-out | ~700–800 ms delay after text |
| Pulse halo (top-10) | 2600 ms | ease-in-out, infinite | scale 1→2.0, opacity 0.85→0 |
| Hover transitions | 200–280 ms | ease | scale ~1.1×, no bounce |

---

## Build & dev

```bash
npm run dev               # Next.js dev server (Turbopack), default port 3000
npm run build             # Production build, runs type checks + ESLint
npm run prepare-data      # Re-runs the GeoJSON prep scripts
rm -rf .next && npm run dev   # Fix Turbopack cache corruption
```

For visual verification when a browser isn't easy:
```bash
npx playwright install chromium    # one-time
node -e "<inline playwright script>"
```

See [SESSION_HANDOFF.md](SESSION_HANDOFF.md) for the inspection script we used during debugging.

---

## Environment variables

```
NEXT_PUBLIC_MAPBOX_TOKEN     # Mapbox public token (94 chars). Required at build time.
```

Set in `.env.local` (gitignored) and on Vercel for Production/Preview/Development scopes. **Baked into the bundle at build time** — env var changes require a rebuild to take effect.

---

## Things known to be obsolete / kept for inertia

- `src/lib/projection.ts`'s `calculateProjection` and `projectPoint` functions are dead code (SVG-era projection math). Only `calculateMarkerRadius` is still consumed by HeroMap.
- `src/lib/land.ts` — coastline coords for the SVG hero. Still imported by `CoastlineTest.tsx`. Can be deleted along with `CoastlineTest.tsx` and `src/app/test-map/page.tsx` when convenient.
- The `/site/[siteId]` route exists but is stub-only. The new 5-section structure may or may not bring it back; site detail might move into § 3 callouts instead.
