# Issues and Solutions Log

## Session Issues

### 1. Turbopack Cache Corruption
**Symptom:** Internal server error, "Cannot find module '../chunks/ssr/[turbopack]_runtime.js'"

**Solution:**
```bash
rm -rf .next && npm run dev
```

**Prevention:** This seems to happen after rapid file changes. If the dev server becomes unresponsive, clean the cache before restarting.

---

### 2. Land/Water Contrast Inverted
**Symptom:** Land appeared brighter than water, causing visual confusion about which was which.

**Root cause:** Original `--land` color (#0B1D2F) was lighter than the background gradient, making land pop forward instead of receding.

**Solution:**
1. Changed `--land` from `#0B1D2F` → `#04101C` (darker)
2. Added water layer `<rect>` with `rgba(19, 125, 118, 0.06)` behind land
3. Bumped land `fillOpacity` from 0.75 → 0.85

**Files changed:**
- `tailwind.config.ts` (land color)
- `src/components/hero/HeroMap.tsx` (water rect, land opacity)

---

### 3. Boxy Coastline Corners
**Symptom:** Extended coastline polygons had visible right-angle corners at outer edges (NJ upper-left, Long Island right side).

**Root cause:** Simple extension just pushed vertices to viewport edges without natural curvature.

**Solution:** Replaced abrupt outer vertices with sequences of 3-5 intermediate vertices, each with slight lat/lng offsets (±0.015 to ±0.025°) to suggest natural coastal irregularity.

**File changed:** `src/lib/land.ts`

---

### 4. Grid Lines Adding to Boxy Feel
**Symptom:** Horizontal lines at y=225, y=450, y=675 contributed to a rigid, technical appearance.

**Solution:** Removed the `<g>` containing the three `<line>` elements from HeroMap.tsx.

---

### 5. "Pipeline" Terminology Confusion
**Symptom:** "Pipeline" implied industrial process, not BOP's design queue.

**Solution:** Project-wide rename:
- "Total pipeline footprint" → "Total candidate footprint"
- "Active design pipeline" → "Sites already in design"
- "Design pipeline narrative" → "Design queue narrative"

**Files changed:**
- `src/lib/constants.ts`
- `CLAUDE.md` (6 replacements)

---

### 6. Below-Threshold Sites Too Prominent
**Symptom:** Sites with Score < 0.5 were visually competing with high-suitability sites.

**Solution:**
- Changed below-threshold color from `rgba(42, 74, 86, 0.45)` → `rgba(80, 105, 115, 0.32)`
- Added stroke only for ≥ 0.5 sites: `rgba(111, 227, 208, 0.5)`, 1.5px
- No stroke for below-threshold sites

**File changed:** `src/lib/colors.ts`

---

### 7. Top-Ranked Sites Not Distinctive Enough
**Symptom:** Rank 1-10 sites didn't stand out sufficiently from the 78-site field.

**Solution:**
- Added 1.15× radius boost for top-ranked
- Added glow filter (`<filter id="top-ranked-glow">`)
- Increased pulse animation scale from 1.7× → 2.0×
- Increased base opacity from 0.6 → 0.85
- Implemented bidirectional hover between panel and map

**Files changed:**
- `src/components/hero/HeroMap.tsx`
- `tailwind.config.ts` (pulseHalo keyframes)

---

### 8. StatStack Misaligned with Figure
**Symptom:** Stats weren't right-aligned with the figure edge.

**Solution:** Changed from flex layout to CSS Grid with `justify-items: end` on the container.

**File changed:** `src/components/hero/StatStack.tsx`

---

## Recurring Patterns

### When Adding New SVG Elements
Always verify the layer order in HeroMap.tsx:
1. Background gradient
2. Water rect
3. Land polygons
4. Place labels
5. Site markers
6. Annotations/tooltips

### When Modifying Colors
- Check both the Tailwind config AND any hardcoded values in components
- The suitability colors are computed in `src/lib/colors.ts`, not pulled from Tailwind

### When Extending Coastlines
- Keep inner edges (facing water) geographically accurate
- Use intermediate vertices with irregular offsets for outer edges
- Test that polygons extend beyond viewport on all sides
