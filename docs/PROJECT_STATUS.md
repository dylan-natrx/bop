# Project Status

Last meaningful update: 2026-05-11.

## Section completion (new 5-section structure)

| § | Section | Status | Notes |
|---|---|---|---|
| 1 | Hero | Functional, iterating | Mapbox GL JS, all 78 sites, top-10 halos, hover tooltip, bidirectional hover. Not "complete" — the user has been iterating on copy and visual register |
| 2 | The stakes and the problem | Scaffold only | Component exists with bracketed placeholder copy. No real copy written |
| 3 | The methodology, made visible | Scaffold only | Component exists. Contains placeholders for `<MethodologyWalkthrough />` (Map 2 + spectra) and three `<TopRankedCallout />` cards |
| 4 | What the analysis made visible | Scaffold only | Component exists with two `<FindingBeat />` placeholders + the italic closing thread line locked in code |
| 5 | What this enables | Scaffold only | Component exists. Contains `<Glossary />` placeholder |

The old 6-section numbering (Framework Primer / Design Queue / Deep-dive Map / Site Detail / Methodology Drawer) is **superseded** — see [CLAUDE.md](../CLAUDE.md) section labeling.

---

## § 1 Hero — done

- Topbar with partnership lockup (BOP + Natrx logos)
- Headline "Restoring New York Harbor's Oyster Reefs. But where?" with italic teal "But where?"
- Lede paragraph
- Stat stack (78 sites, 2,604 ac, 1 billion goal, 9 variables)
- Two-column figure (320px panel + map fills the rest)
- FigurePanel: Fig. 1 caption, top-ranked sites list with hover, suitability legend, top-ranked legend
- HeroMap: Mapbox GL JS, custom dark inline style, no Mapbox-hosted assets
  - All 78 sites as a single circle layer, color by composite score using `interpolate` expression
  - Sub-0.5 sites muted; top-10 sites get 1.15× radius and pulsing halo
  - Land masses fed from `public/data/nyc-boroughs.geojson`, `nj-shoreline.geojson`, `westchester.geojson`
  - Borough labels (JetBrains Mono uppercase) and water-body labels (Fraunces italic, river labels rotated)
  - Hover tooltip (Tooltip + SiteTooltipContent)
  - Bidirectional hover via `setFeatureState`
  - Non-interactive (no pan/zoom/scroll). Hero is for looking.
- Footer with methodology line

## § 1 Hero — outstanding polish

- The user has not finalized the visual register. Subject to iteration.
- Mobile responsiveness: untested below the lg breakpoint. Figure scaffolding has mobile-first heights but real verification is pending.

---

## § 2–5 — outstanding work

In priority order:

1. **§ 2 copy.** Two paragraphs, ~80 words each. Stakes (oysters as keystone, BOP's mission, Allee effect) + the structural problem (78 sites, per-site instrumentation, 30% design bottleneck). Source: `_overview-documents/BOP_Natrx_Project_Narrative_DRAFT_v0_2.md` Parts 1–2.
2. **§ 3 Map 2 + spectra panel.** Six-step guided sequence. Reader-controlled Previous/Next. Each step adds a layer to the map and a curve to the spectra panel. Detailed spec in [CLAUDE.md § 3](../CLAUDE.md).
3. **§ 3 TopRankedCallout component.** Three cards (Arthur Kill, Living Breakwaters, Wolfe's Pond). Visuals can pull from the Wave Analysis Report PDF in `_master_docs/`.
4. **§ 4 FindingBeat component.** Used twice (erosion co-benefit, data confidence).
5. **§ 5 Glossary component.** Collapsible, ~18 terms. Definitions in CLAUDE.md.

---

## Environment

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiZHls...  # 94 chars, in .env.local AND on Vercel
```

`.env.local` is gitignored. The token on Vercel is set for Production, Preview, and Development scopes.

Dev server: `npm run dev` (runs on port 3000 by default; we used 3033 in some debugging sessions).

Build: `npm run build`. Production build verifies type checks AND ESLint.

---

## Files: at-a-glance

| Purpose | Path |
|---|---|
| Design tokens, animations | `tailwind.config.ts` |
| Global CSS, scrollbar, tooltip, fade-up classes | `src/app/globals.css` |
| Suitability color logic | `src/lib/colors.ts` |
| Centroid math (used by HeroMap) | `src/lib/data.ts` |
| Marker radius math (used by HeroMap) | `src/lib/projection.ts` |
| Legacy SVG coastline coordinates (still imported by `CoastlineTest`) | `src/lib/land.ts` |
| Hero section wrapper | `src/components/hero/HeroSection.tsx` |
| Hero figure (panel + map) | `src/components/hero/HeroFigure.tsx` |
| Mapbox Map 1 | `src/components/hero/HeroMap.tsx` |
| Hero left panel | `src/components/hero/FigurePanel.tsx` |
| Headline | `src/components/hero/Headline.tsx` |
| Stat stack | `src/components/hero/StatStack.tsx` |
| Section shell + placeholder | `src/components/sections/SectionShell.tsx`, `PlaceholderBlock.tsx` |
| § 2–5 scaffolds | `src/components/sections/StakesAndProblem.tsx`, `MethodologyMadeVisible.tsx`, `WhatAnalysisMadeVisible.tsx`, `WhatThisEnables.tsx` |
| Tooltip | `src/components/ui/Tooltip.tsx` |
| Animated entrance wrapper | `src/components/ui/AnimatedEntrance.tsx` |
| Suitability + top-ranked legends | `src/components/ui/Legend.tsx` |
| Page root | `src/app/page.tsx` |
| Site detail route (unused for now) | `src/app/site/[siteId]/page.tsx` |
| Coastline experiment route | `src/app/test-map/page.tsx` |

---

## Known technical debt

- The site detail route (`/site/[siteId]`) is a stub. No content yet. Not in the new 5-section scope but the route is still wired.
- `src/components/hero/CoastlineTest.tsx` and `src/app/test-map/page.tsx` are debugging artifacts from earlier work. Safe to remove if you're confident, but they're tiny and currently isolated.
- `src/lib/projection.ts` and `src/lib/land.ts` were for the old SVG hero. They're still used (`calculateMarkerRadius` is consumed by HeroMap, the COASTLINES constant is consumed by CoastlineTest). When CoastlineTest is removed, `land.ts` can go.
- `scripts/` contains data-prep scripts: `split-statistics.js`, `generate-framework-primer.js`. Probably still useful for re-running data prep. Not on the critical path.
- No automated tests. The user's review loop is visual: push to main, refresh Vercel, eyeball.
- No PDF generation yet (was planned for site detail per old brief; not in current 5-section structure).
- No mobile QA pass.

---

## Editorial reminders (lock)

- **No em dashes anywhere.** Use commas, periods, colons, parentheses, or semicolons.
- **No "It's not X, it's Y" or "It's not just X, it's Y"** constructions. AI cliché.
- **No "unexpected", "surprise", "discovery", or "happy accident"** anywhere in § 4. The shoreline erosion data was a deliverable, not a discovery.
- **No CTAs anywhere on the page.** No "talk to us," no "request a demo," no button-styled links.
- **Past tense for completed work, present tense for the partnership and the framework.**
- **Natrx Assess gets italicized on first reference per section**, then dropped to roman afterwards. No promotion, no product card treatment.
- **Top sites get named directly in the body copy:** Arthur Kill #1 (0.87), Living Breakwaters cluster #2–7 (0.74–0.79), Wolfe's Pond #8 (0.65).
