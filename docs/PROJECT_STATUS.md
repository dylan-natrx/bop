# Project Status

**Last updated:** Session ending with land/water contrast fix

---

## Completion Status

| Section | Status | Notes |
|---------|--------|-------|
| § 01 Hero | ✅ Complete | All visual fixes applied, bidirectional hover working |
| § 02 Framework Primer | ⬜ Not started | - |
| § 03 Design Queue Narrative | ⬜ Not started | - |
| § 04 Deep-dive Map | ⬜ Not started | Will use Mapbox GL JS |
| § 05 Site Detail Panel | ⬜ Not started | Route exists at /site/[siteId] |
| § 06 Methodology Drawer | ⬜ Not started | - |

---

## § 01 Hero Checklist

- [x] Topbar with partnership lockup (BOP + Natrx logos)
- [x] Headline with italic teal "But where?"
- [x] Lede paragraph
- [x] Three-stat stack (78 sites, 2604 ac, 6 variables)
- [x] Two-column figure layout (320px panel + map)
- [x] FigurePanel with Fig. 1 caption
- [x] Top-ranked sites list with hover interaction
- [x] Suitability legend
- [x] Top-ranked legend
- [x] SVG map with coastlines
- [x] 78 site markers colored by suitability
- [x] Top-ranked (1-10) pulsing halos
- [x] Bidirectional hover between panel and map
- [x] Tooltips on site hover
- [x] Footer with methodology link
- [x] Favicon

---

## Known Technical Debt

1. **Mapbox token not yet configured** - Will need for § 04
2. **PDF generation not implemented** - Planned for § 05
3. **No mobile responsiveness yet** - Hero assumes desktop viewport
4. **Statistics GeoJSON not yet used** - Needed for § 05 site detail

---

## Environment Setup

```bash
# Required
NEXT_PUBLIC_MAPBOX_TOKEN=<token>  # Not yet set, needed for § 04

# Dev server
npm run dev

# Build
npm run build
```

---

## File Locations Quick Reference

| Purpose | File |
|---------|------|
| Design tokens | `tailwind.config.ts` |
| Suitability colors | `src/lib/colors.ts` |
| Coastline coordinates | `src/lib/land.ts` |
| Map projection | `src/lib/projection.ts` |
| App constants | `src/lib/constants.ts` |
| Hero map component | `src/components/hero/HeroMap.tsx` |
| Rankings data | `public/data/BOP_Feb2026_Pipeline_Rankings.geojson` |
| Statistics data | `public/data/BOP_Feb2026_Pipeline_statistics.geojson` |

---

## Next Steps (When Resuming)

1. **Start § 02 Framework Primer** - Teach how sites were scored
   - 4-5 progressive panels with small visualizations
   - Salinity, chlorophyll-a, dissolved oxygen drivers
   - DO-modifier formula demonstration
   - Physical/built-environment flags

2. **Mobile responsiveness** - Can be deferred but should be addressed before § 04

3. **Mapbox setup** - Configure token in `.env.local` before starting § 04

---

## Editorial Reminders

- **No em dashes** - Use commas, periods, colons, parentheses
- **No "It's not X, it's Y"** - AI cliché, avoid
- **"Suitability score"** not "confidence"
- **"Data support"** or **"monitoring coverage"** for the ConfidenceRule field
- **"Sites already in design"** not "pipeline"
- **"Candidate sites"** for the full pool of 78
