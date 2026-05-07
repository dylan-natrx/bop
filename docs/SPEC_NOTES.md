# Technical Specification Notes

## Project Architecture

### Stack
- **Next.js 15.5** with App Router and Turbopack
- **Tailwind CSS** with custom design tokens in `tailwind.config.ts`
- **Framer Motion** for animations
- **Mapbox GL JS** (planned for § 04, not used in hero)
- **Static GeoJSON** served from `/public/data/`

### Directory Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Home page (hero section)
│   └── site/[siteId]/      # Dynamic site detail routes (§ 05)
├── components/
│   ├── hero/               # § 01 Hero components
│   │   ├── HeroFigure.tsx  # Container with hover state
│   │   ├── FigurePanel.tsx # Left panel with rankings
│   │   ├── HeroMap.tsx     # SVG map visualization
│   │   ├── Headline.tsx    # Hero headline
│   │   ├── Lede.tsx        # Hero lede paragraph
│   │   └── StatStack.tsx   # Stats display
│   ├── layout/             # Topbar, Footer
│   └── ui/                 # Shared components (Tooltip, Legend, etc.)
├── hooks/
│   └── useRankingsData.ts  # Data fetching hook
├── lib/
│   ├── colors.ts           # Suitability color functions
│   ├── constants.ts        # App constants, stats, top-ranked sites
│   ├── data.ts             # GeoJSON parsing, centroid calculation
│   ├── land.ts             # Coastline polygon coordinates
│   └── projection.ts       # Mercator projection for SVG map
└── types/
    ├── geojson.ts          # GeoJSON type definitions
    └── site.ts             # Site data types
```

---

## § 01 Hero Implementation

### SVG Map (not Mapbox)
The hero uses a custom SVG with Mercator projection, not Mapbox GL JS. This keeps the hero lightweight and allows precise control over the visual styling.

**Key files:**
- `src/lib/projection.ts` - Mercator projection math, viewport config
- `src/lib/land.ts` - Coastline polygon coordinates (extended beyond viewport)
- `src/components/hero/HeroMap.tsx` - SVG rendering

**Projection parameters:**
```typescript
DEFAULT_VIEW = {
  width: 1100,
  height: 900,
  padX: 0.02,  // 2% horizontal padding
  padY: 0.02,  // 2% vertical padding
}
```

### Layer Stack (bottom to top)
1. Background gradient (`url(#depthGrad)`)
2. Water layer (`rgba(19, 125, 118, 0.06)`)
3. Land polygons (`#04101C`, 0.85 opacity)
4. Place labels (MANHATTAN, BROOKLYN, etc.)
5. Site markers (colored by suitability)
6. Tooltip (floating, follows mouse)

### Suitability Coloring
Threshold: **0.5**

- **≥ 0.5**: Gradient from `#137D76` to `#6FE3D0`, with teal stroke
- **< 0.5**: Flat muted color `rgba(80, 105, 115, 0.32)`, no stroke

```typescript
// src/lib/colors.ts
const THRESHOLD = 0.5
const BELOW_THRESHOLD_COLOR = 'rgba(80, 105, 115, 0.32)'
```

### Top-Ranked Sites (Rank 1-10)
- Pulsing halo animation (2.6s, scale 1→2.0)
- 1.15× base radius
- Glow filter applied
- Bidirectional hover with FigurePanel

### Bidirectional Hover State
`HeroFigure.tsx` owns `hoveredRanks: number[]` state, passed to both:
- `FigurePanel` - highlights row on hover, calls `onHoverRanks([ranks])`
- `HeroMap` - scales/highlights markers, dims non-hovered top-ranked

**Rank mappings in FigurePanel:**
```typescript
const RANK_MAPPINGS: Record<string, number[]> = {
  'Arthur Kill': [1],
  'Living Breakwaters': [2, 3, 4, 5, 6, 7],
  "Wolfe's Pond": [8],
  'Conch Basin': [9],
}
```

### Coastline Polygons
Extended beyond SVG viewport to fill edges. Inner edges (facing water) are geographically accurate. Outer edges use intermediate vertices with ±0.015-0.025° offsets for natural irregularity.

---

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headline | Fraunces | 300 | Italic for "But where?" |
| Stat numbers | Fraunces | 300 | - |
| Body/Lede | Inter | 300-400 | - |
| Eyebrows/Labels | JetBrains Mono | 400-500 | Uppercase, 0.18-0.22em tracking |

---

## Color Palette

```css
--bg-deep:      #061321   /* page background */
--bg-mid:       #0E2236
--bg-soft:      #15314A
--land:         #04101C   /* land mass fill (darker than bg) */
--land-edge:    rgba(70, 110, 145, 0.18)
--teal:         #137D76   /* Natrx primary */
--teal-bright:  #2BA8A0   /* accent */
--teal-aqua:    #6FE3D0   /* highest suitability */
--ivory:        #F2EDE3   /* primary text */
--ivory-dim:    #B8B0A0   /* secondary text */
--ivory-faint:  #6E6859   /* tertiary text */
--rule:         rgba(242, 237, 227, 0.12)
```

---

## Data Files

| File | Purpose |
|------|---------|
| `public/data/BOP_Feb2026_Pipeline_Rankings.geojson` | 78 sites with polygons, ranks, scores, flags |
| `public/data/BOP_Feb2026_Pipeline_statistics.geojson` | Bootstrap CIs, distances, depth distributions |

**Key fields in Rankings GeoJSON:**
- `Rank` (1-78)
- `Score` (0-1 suitability)
- `Status` ("Design" or "Proposed Future Site")
- `ConfidenceRule` ("High", "Moderate+", etc.)
- `Waterbody`
- `Acres`
- Flags: `WaveExposure`, `Erosion`, `DepthSuitability`, `NearCSO`, `NearMS4`, `NearPark`

---

## Animation Timings

| Animation | Duration | Easing |
|-----------|----------|--------|
| Fade up entrance | 1200ms | ease-out |
| Fade in (figure) | 1500ms | ease-out |
| Pulse halo | 2600ms | ease-in-out, infinite |
| Hover transitions | 200-280ms | ease |

---

## Build & Dev

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run prepare-data # Process GeoJSON files
```

**If Turbopack cache corrupts:**
```bash
rm -rf .next && npm run dev
```
