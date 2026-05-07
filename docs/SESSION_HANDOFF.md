# Session Handoff

**Quick context for resuming work on this project.**

---

## What This Project Is

A media-grade interactive piece for Billion Oyster Project × Natrx, documenting their site prioritization framework. Target audience: NY Times / Wired readers. Editorial dark mode, journalism-grade visuals.

**The ask:** Tell the story of how 78 candidate sites in NY Harbor were ranked for oyster reef restoration, given finite budgets.

---

## What's Built

**§ 01 Hero** - Complete and polished
- Custom SVG map (not Mapbox) with 78 site markers
- Bidirectional hover between ranking panel and map
- Top-ranked sites (1-10) have pulsing halos, glow effects
- Suitability coloring with 0.5 threshold
- Extended coastlines that fill viewport naturally

**§ 02-06** - Not yet started

---

## Key Files to Know

```
CLAUDE.md                    # Full editorial brief, locked decisions
docs/SPEC_NOTES.md          # Technical implementation details
docs/ISSUES_AND_SOLUTIONS.md # Problems encountered and fixes
docs/PROJECT_STATUS.md      # Completion checklist, next steps

src/components/hero/        # Hero section components
src/lib/colors.ts           # Suitability color logic (threshold: 0.5)
src/lib/land.ts             # Coastline polygon coordinates
src/lib/projection.ts       # Mercator projection for SVG
tailwind.config.ts          # Design tokens, animations
```

---

## Terminology (Editorial Lock)

| Say this | Not this |
|----------|----------|
| Suitability score | Confidence |
| Data support / monitoring coverage | Confidence (for ConfidenceRule) |
| Sites already in design | Pipeline |
| Candidate sites | Pipeline sites |
| Design queue | Design pipeline |

---

## Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
rm -rf .next && npm run dev  # Fix Turbopack cache corruption
```

---

## Immediate Next Step

Start **§ 02 Framework Primer** - teach how the sites were scored:
1. The question (78 sites, finite budget)
2. Three water-quality drivers (salinity, chlorophyll-a, DO)
3. The composite formula
4. Physical/built-environment flags
5. The output (rank = composite + flags)

Use Framer Motion for cross-fades. Small per-variable visualizations.

---

## Visual Reference

Open `hero_reference.html` in a browser to see the target aesthetic. The palette, typography, and motion grammar in the hero should carry through all sections.
