# Project Status

Last meaningful update: 2026-05-14 (late). **v1 is LIVE at https://bop.natrx.report behind the password gate.** All five sections have real copy and real visuals. Map storytelling rebuilt around the editorial spine: biology gates the ranking (steps 1–3); external factors overlay as flag markers (steps 4–6); priority projects revealed at step 6 with a pulsing halo. Spectra panel uses two-color treatment (teal biology / amber external). Horizontal-strip legend pinned to bottom of map. Mobile section nav has a hamburger menu. Custom-branded password gate at `src/middleware.ts` + `src/app/login` blocking unauthenticated access. Custom domain wired up via Cloudflare DNS + Vercel per-domain CNAME target.

**Editorial spine, locked:** the framework's complete recommendation isn't just "top-10 by biology." It's "top-10 by biology, with full cost/permitting/co-benefit context attached." See `memory/project_methodology_editorial_spine.md`.

## Section completion

| § | Section | Status | Notes |
|---|---|---|---|
| 1 | Hero | ✅ Done | Mapbox GL JS, all 78 sites, top-10 halos, hover tooltip, bidirectional hover. Sticky `SectionNav` replaces the original Topbar. |
| 2 | The stakes and the problem | ✅ Done | Two paragraphs. Paragraph 2 carries the four-hundred-year opportunistic-vs-comparative framing. `EditorialImage` of the harbor on the right column. Future pullquote slot reserved below paragraph 2. |
| 3 | The methodology, made visible | ✅ Done | Intro (now credits the partnership and the 78-site comparative scope) + Mike McCann pullquote on the confidence-layer framing + 6-step `MethodologyWalkthrough` (map 3fr / spectra 2fr / bottom strip) + 3 `TopRankedCallout` cards each with a live `SiteMiniMap`. |
| 4 | What the analysis made visible | ✅ Done | Two `FindingBeat` blocks (no kicker labels): shoreline change `EditorialImage` for beat 1 ("Oysters and shorelines, one intervention."), `ConfidenceDistributionChart` for beat 2 ("A map of where to invest in more data next.") — Beat 2 now frames the confidence layer as a data-investment map. |
| 5 | What this unlocks | ✅ Done | Eyebrow renamed WHAT THIS ENABLES → WHAT THIS UNLOCKS. Headline "The pipeline becomes operational." Three nested beats (Operational / Institutional / Mission) + Lise Montefiore, PhD, MS pullquote hinge + closing portability paragraph + `nyoyster.webp` closing image (also the OG image). |

The original 6-section numbering (Framework Primer / Design Queue / Deep-dive Map / Site Detail / Methodology Drawer) is **superseded** — see [CLAUDE.md](../CLAUDE.md) for the locked 5-section structure.

---

## Persistent page chrome

- **`SectionNav` ([src/components/layout/SectionNav.tsx](../src/components/layout/SectionNav.tsx))** — sticky top, brand lockup left, four short links right (Stakes / Methodology / Findings / At scale). IntersectionObserver scroll-spy with `rootMargin: -30% 0px -60% 0px`. Smooth scroll on click with 56px offset.
- **Right-edge drawer ([src/components/chrome/](../src/components/chrome/))** — `SiteChromeProvider` + `DrawerEdgeTab` + `SiteDrawer`. Two tabs:
  - **Glossary** — 23 entries alphabetized (`glossary-data.ts`). Includes algal bloom, Allee effect, bathymetry, chlorophyll-a, composite score, confidence interval, CSO, dissolved oxygen, Eastern oyster, estuary, eutrophication, fetch-limited wave modeling, filter feeder, Habitat Suitability Index, hypoxia, keystone species, MS4, NAIP imagery, natural breakwater, salinity, shoreline change analysis (MEIP), spat, subtidal vs intertidal.
  - **Press contact** — Dylan DiBona, press email, editorial note about source materials.
  - Inline `<GlossaryTerm termId="...">` opens the drawer scrolled to the matching entry.
- **`Footer` ([src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx))** — partnership lockup + single line; intentionally simplified after the section nav was added.

---

## Analytics + Speed Insights

`@vercel/analytics` and `@vercel/speed-insights` are installed and rendered in `app/layout.tsx`. Typed event wrapper at [src/lib/track.ts](../src/lib/track.ts). Custom events:

| Event | Properties | Fires when |
|---|---|---|
| `section_reached` | `section: string` | A SectionShell first scrolls past the 1% visibility threshold (via `SectionViewTracker` invisible marker) |
| `walkthrough_step` | `step: 1–6`, `via: next/previous/jump/keyboard` | Reader advances through methodology steps |
| `drawer_opened` | (none) | Drawer transitions from closed to open via any path (edge tab, glossary term, programmatic) |
| `glossary_term_clicked` | `term_id: string` | A `<GlossaryTerm>` inline is clicked |
| `top_ranked_viewed` | `site: string` | A `TopRankedCallout` reaches 60% visibility (fires once per session per card) |

**One-time access setup** required after deploy: enable Analytics + Speed Insights in `vercel.com/dylan-natrx/bop` (per-project toggle, not just a package install).

The `useFireOnView` hook ([src/hooks/useFireOnView.ts](../src/hooks/useFireOnView.ts)) implements once-per-session intersection firing for `section_reached` and `top_ranked_viewed`. `skipInitial: true` avoids a flood of events on first paint.

---

## Map architecture (current)

**One land source + one water mask.** Both files in [public/data/](../public/data/).

- `region-land.geojson` (~614KB, 132 polygons) — single OSM-derived land mass for the visible region. Mainland (NJ + NY mainland + CT) plus closed islands (Long Island including Brooklyn/Queens, Manhattan, Staten Island, plus barrier islands and smaller pieces). Same fidelity everywhere; no political-boundary seams. Built by stitching OSM `natural=coastline` ways for bbox 40.4–41.5 lat, −74.4 to −71.7 lng and closing the mainland ring along the bbox edges.
- `hudson-river.geojson` (~55KB) — Hudson River polygon from OSM `water=river` multipolygon relations (Tappan Zee, named and unnamed Hudson River segments). Drawn ON TOP of land with `#061321` fill so it carves the river out visually.

**Layer order in every map (HeroMap, WalkthroughMap, SiteMiniMap):**
```
1. background                                  (#061321, water)
2. land-region-fill        source: land-region (#15314A, land)
3. water-hudson-fill       source: water-hudson (#061321, carve out Hudson)
4. land-region-edge        source: land-region (rgba(120,158,184,0.35) line)
5. water-hudson-edge       source: water-hudson (same line color)
6. <map-specific layers>: sites circles, erosion highlights, etc.
```

**Legacy files retained** (production maps no longer reference them, but the diagnostic `/test-map` route and `CoastlineTest` still do):
- `nyc-boroughs.geojson` (3.2MB, NYC Open Data)
- `nj-shoreline.geojson` (18KB, US Census 500k state outline)
- `westchester.geojson` (8.4KB, US Census 500k county)
- `upstate-ny-ct.geojson` (35KB, US Census 500k NY + CT clipped)

When the diagnostic routes are deleted, these files can also be deleted.

---

## Environment

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiZHls...  # 94 chars, in .env.local AND on Vercel
```

`.env.local` is gitignored. Token is set on Vercel for Production, Preview, and Development scopes. Tokens shorter than 94 chars indicate paste truncation.

Dev: `npm run dev` (port 3000 by default). Build: `npm run build`.

---

## Files: at-a-glance

### App + layout
| Purpose | Path |
|---|---|
| Root layout (fonts, metadata, OG image, Analytics + SpeedInsights) | `src/app/layout.tsx` |
| Page root | `src/app/page.tsx` |
| Global CSS, scrollbar, tooltip, fade-up classes | `src/app/globals.css` |
| Design tokens, animations | `tailwind.config.ts` |

### Pre-public gate
| Purpose | Path |
|---|---|
| Middleware (checks `bop-auth` cookie, redirects to /login) | `src/middleware.ts` |
| Login page (BOP × Natrx branded, Suspense-wrapped form) | `src/app/login/page.tsx` |
| Login form (client component, posts to /api/auth/login) | `src/app/login/LoginForm.tsx` |
| Auth API (validates credentials, sets `bop-auth` cookie) | `src/app/api/auth/login/route.ts` |
| Env vars documented | `.env.local.example` |

### Hero (§1)
| Purpose | Path |
|---|---|
| Section wrapper (sticky nav stays above) | `src/components/hero/HeroSection.tsx` |
| Hero figure (panel + map, bidirectional hover state) | `src/components/hero/HeroFigure.tsx` |
| Map 1: Mapbox GL JS, custom dark inline style | `src/components/hero/HeroMap.tsx` |
| Hero left panel (Fig.1, top sites, legends) | `src/components/hero/FigurePanel.tsx` |
| Headline | `src/components/hero/Headline.tsx` |
| Stat stack | `src/components/hero/StatStack.tsx` |

### Sections (§2–5) + shared
| Purpose | Path |
|---|---|
| Section shell (eyebrow + max-width + scaffold padding) | `src/components/sections/SectionShell.tsx` |
| Section view tracker (invisible analytics marker) | `src/components/sections/SectionViewTracker.tsx` |
| §2 stakes & problem | `src/components/sections/StakesAndProblem.tsx` |
| §3 methodology container | `src/components/sections/MethodologyMadeVisible.tsx` |
| §3 top-ranked callout card | `src/components/sections/TopRankedCallout.tsx` |
| §3 mini-map inside each callout | `src/components/sections/SiteMiniMap.tsx` |
| §4 container | `src/components/sections/WhatAnalysisMadeVisible.tsx` |
| §4 finding beat block | `src/components/sections/FindingBeat.tsx` |
| §4 confidence distribution chart | `src/components/sections/ConfidenceDistributionChart.tsx` |
| §5 unlocks (3 beats + closing) | `src/components/sections/WhatThisEnables.tsx` |
| Editorial image frame | `src/components/sections/EditorialImage.tsx` |
| Pullquote (used in §3 + §5) | `src/components/sections/Pullquote.tsx` |
| Placeholder block (legacy, unused in v1) | `src/components/sections/PlaceholderBlock.tsx` |

### Methodology walkthrough (§3 inner)
| Purpose | Path |
|---|---|
| Walkthrough container (step state, keyboard nav, panels) | `src/components/methodology/MethodologyWalkthrough.tsx` |
| Map 2 (six step states, narrowing semantics) | `src/components/methodology/WalkthroughMap.tsx` |
| Spectra panel (stacked SVG curves, newest on top) | `src/components/methodology/SpectraPanel.tsx` |
| Step copy + visibility flags | `src/components/methodology/steps.tsx` |
| Right-anchored controls (counter + dots + prev/next) | `src/components/methodology/WalkthroughControls.tsx` |

### Page chrome
| Purpose | Path |
|---|---|
| Sticky section nav with scroll-spy | `src/components/layout/SectionNav.tsx` |
| Page-end footer | `src/components/layout/Footer.tsx` |
| Drawer provider + state | `src/components/chrome/SiteChromeProvider.tsx` |
| Drawer body | `src/components/chrome/SiteDrawer.tsx` |
| Drawer edge tab (right-edge affordance) | `src/components/chrome/DrawerEdgeTab.tsx` |
| Glossary panel + entries | `src/components/chrome/GlossaryPanel.tsx`, `glossary-data.ts` |
| Press contact panel | `src/components/chrome/PressContactPanel.tsx` |

### UI primitives
| Purpose | Path |
|---|---|
| Inline glossary term anchor | `src/components/ui/GlossaryTerm.tsx` |
| Tooltip generic + SiteTooltipContent | `src/components/ui/Tooltip.tsx` |
| Suitability + top-ranked legends | `src/components/ui/Legend.tsx` |
| Pulse halo class wrapper | `src/components/ui/PulseHalo.tsx` |
| Framer-Motion entrance wrapper | `src/components/ui/AnimatedEntrance.tsx` |

### Hooks + lib
| Purpose | Path |
|---|---|
| Rankings GeoJSON loader | `src/hooks/useRankingsData.ts` |
| Statistics GeoJSON loader | `src/hooks/useStatisticsData.ts` |
| Fire callback once when element enters viewport | `src/hooks/useFireOnView.ts` |
| Selected site state (drawer integration) | `src/hooks/useSelectedSite.ts` |
| Per-site stats accessor | `src/hooks/useSiteStats.ts` |
| Typed Vercel Analytics wrapper | `src/lib/track.ts` |
| Suitability color logic + threshold | `src/lib/colors.ts` |
| Stat constants, TOP_RANKED_SITES | `src/lib/constants.ts` |
| GeoJSON helpers, calculateCentroid | `src/lib/data.ts` |
| Marker radius calc (used by HeroMap) | `src/lib/projection.ts` |
| Legacy SVG coastline coords (used by CoastlineTest only) | `src/lib/land.ts` |

### Diagnostic / debug
| Purpose | Path |
|---|---|
| Coastline experiment (legacy data, not on the main page) | `src/components/hero/CoastlineTest.tsx`, `src/app/test-map/page.tsx` |
| Stub site detail route (unused in v1 scope) | `src/app/site/[siteId]/page.tsx` |

---

## Known technical debt

- **Dead-code paths to remove when convenient:**
  - `src/components/hero/CoastlineTest.tsx` + `src/app/test-map/page.tsx` (debugging artifacts)
  - `src/lib/land.ts` (legacy SVG coastline data) — can be deleted once CoastlineTest is gone
  - Most of `src/lib/projection.ts` — only `calculateMarkerRadius` is still used by HeroMap; the rest is SVG-era projection math
  - `src/app/site/[siteId]/page.tsx` — site detail stub; the new 5-section structure may move per-site detail into §3 callouts instead
  - Once the above are pruned, `public/data/nyc-boroughs.geojson`, `nj-shoreline.geojson`, `westchester.geojson`, `upstate-ny-ct.geojson` can be deleted (production no longer reads them)
- `scripts/` — `split-statistics.js`, `generate-framework-primer.js`. Useful if data is regenerated from the master GeoJSONs. Not on the critical path.
- **No automated tests.** Visual review through Vercel deploys is the QA loop.
- **No PDF generation.** Was planned for site detail in the original brief; not in the v1 5-section structure.
- **No mobile QA pass.** All sections built lg-first. Real-device verification still pending.
- **Editorial follow-up:** the methodology walkthrough's "Applied Filters" panel (the right-column spectra/annotation stack) should be re-passed to read as a confident running summary rather than a glossary of definitions. See `memory/project_applied_filters_panel_rewrite.md`.

---

## Editorial reminders (lock)

- **No em dashes anywhere.** Use commas, periods, colons, parentheses, or semicolons.
- **No negation-led copy.** Never open a block with "Not X" or "X is not Y." Lead with what the thing IS.
- **No abstract jargon nouns** like "constructability" / "actionability" where a verb phrase explains what it does.
- **No "It's not X, it's Y" or "It's not just X, it's Y"** — AI cliché.
- **No "unexpected", "surprise", "discovery", or "happy accident"** anywhere in § 4. The shoreline erosion data was a deliverable, not a discovery.
- **No CTAs anywhere on the page.** Press contact in the drawer is editorial outreach, not a conversion target.
- **Past tense for completed work, present tense for the partnership and the framework.**
- **Natrx Assess gets italicized on first reference per section**, then drops to roman.
- **Top-ranked sites are named directly** in the body copy: Arthur Kill #1 (0.87), Living Breakwaters cluster #2–7 (0.74–0.79), Wolfe's Pond #8 (0.65). Also rendered as `TopRankedCallout` cards in §3.
