# Methodology Walkthrough — Component Spec

## What this is

The methodology walkthrough is the central interactive component of the explainer page. It teaches the reader how site suitability emerges from layered data, in six steps. The reader controls progression with Previous and Next buttons. The map updates with each step. A spectra panel beside the map also updates, showing the suitability curve for each variable as it gets introduced.

This is not a free-exploration tool. It is a guided sequence in the style of a *New York Times* or Reuters Graphics feature. The reader is being taught a methodology, not handed a sandbox.

The component lives inside Section 3 of the page. It replaces the placeholder `<MethodologyWalkthrough />` block.

## Layout

```
+----------------------------------------------------------+
|  Step indicator: "Step 3 of 6"                           |
|  Step title: "Add dissolved oxygen"                      |
+----------------------------------------------------------+
|                                |                         |
|                                |                         |
|       MAP                      |    SPECTRA PANEL        |
|       (60% width on desktop)   |    (40% width)          |
|                                |                         |
|                                |                         |
+--------------------------------+-------------------------+
|                                                          |
|  Step copy (full width below the panels, ~80-120 words)  |
|                                                          |
+----------------------------------------------------------+
|  [< Previous]   • • • • • •   [Next >]                   |
+----------------------------------------------------------+
```

On mobile, panels stack: map on top, spectra below, copy below that, controls at bottom. Step indicator and title remain at top.

## The map panel

Same Mapbox base style as Map 1 (the hero). Same polygon geometry for all 78 sites. The map state changes at each step by recoloring sites, adding overlays, or adding visual flags.

The map should always show all 78 sites. The walkthrough is about how the same field of candidates reads differently as more data layers in. Sites do not disappear between steps. Their visual treatment changes.

Transitions between steps: 600ms ease-in-out. Color interpolations are smooth. Overlay appearances fade in. When the reader goes backward, transitions reverse cleanly.

Hover interactions on map sites: same tooltip pattern as Map 1, showing site name, rank, score. No popups, no clicks that navigate away.

## The spectra panel

Custom SVG charts. The spectra panel shows the shape of each variable's suitability function. As the walkthrough progresses, curves appear one at a time, then stack.

Visual style: each curve rendered against a slightly lifted dark background (subtle contrast from the page background so the panel reads as a distinct surface). Curves drawn in the existing teal palette. The favorable zone under each curve subtly shaded with a low-opacity fill.

Axis labels are minimal. The point is the shape of the curve, not the precise values. Tick marks only at meaningful values (the optimum range boundaries, the hypoxia threshold).

Annotations: a short label at or near the peak of each curve, calling out the key feature ("optimum salinity, 12 to 20 PSU" / "linear food response" / "hypoxia threshold at 3 mg/L").

When a new curve is added in a step, it appears with a quick fade-in (300ms). Previously-shown curves remain visible but slightly de-emphasized, so the new addition reads as the current focus.

## The six steps

For each step below: the map state, the spectra panel state, the step title, and the step copy.

The copy is final. Use it as written. The voice is editorial, plain language, teaching without condescension. No "It's not [x], it's [y]." No em dashes.

---

### Step 1 — Salinity, the Goldilocks variable

**Map state:**
All 78 sites colored by salinity score (0 to 1). Hudson River sites (Piermont, Irvington, Yonkers, Hastings-on-Hudson, Dobbs Ferry, Ossining) render in the lowest band, near zero, because the upper Hudson is too fresh for oysters. Most harbor sites render in the higher bands. A north-to-south gradient is visible across the map.

**Spectra panel:**
Salinity suitability curve alone. X-axis 0 to 45 PSU. Y-axis 0 to 1. Zero suitability below 5 PSU, ramps up sharply, plateaus at ~0.89 between 12 and 20 PSU, declines back to zero at 40 PSU. Visibly hump-shaped. The plateau zone (12 to 20 PSU) subtly shaded as the favorable range. Annotation near the peak: "Optimum salinity, 12 to 20 PSU."

**Step title:**
Salinity, the Goldilocks variable

**Step copy** (first sentence emphasized):

**Salinity is a Goldilocks variable.** Too little salt and oysters cannot survive. Too much, and they cannot either. Most of New York Harbor sits in the optimum range. The upper Hudson does not, and that single gradient already begins to sort the pipeline. Downstream sites near Yonkers and Hastings-on-Hudson score perfectly. Upstream at Piermont, Irvington, and Ossining, the water is too fresh, and the sites drop out. One variable, and the map starts telling a different story than the brief.

---

### Step 2 — Adding chlorophyll-a, the food layer

**Map state:**
Sites recolored using the combined salinity and chlorophyll-a scores. Some Upper Harbor sites that scored well on salinity now drop because chlorophyll-a is low (food-poor). Jamaica Bay sites with high productivity hold or improve. The visible field of strong candidates narrows.

**Spectra panel:**
Salinity curve remains visible but slightly de-emphasized. Chlorophyll-a curve appears beside or below it. X-axis 0 to 40 µg/L. Y-axis 0 to 1. Linear from 0 to 1 across the range. A hatched "danger zone" indication at the high end (above ~20 µg/L) marks where high chlorophyll-a starts to signal eutrophication problems. Annotation: "Linear food response, with eutrophication caveat."

**Step title:**
Adding chlorophyll-a, the food layer

**Step copy** (first sentence emphasized):

**Oysters are filter feeders.** They need food in the water, measured by chlorophyll-a. The relationship is mostly more is better, with a real catch: too much chlorophyll-a signals algae blooms, which crash oxygen and kill the oysters those blooms feed. The scoring captures the productive range. The methodology flags the danger zone. Adding this layer reshapes the field. Sites strong on salinity but thin on food production lose ground. Sites strong on both come forward.

---

### Step 3 — Adding dissolved oxygen, the limiter

**Map state:**
Sites recolored using BOP's full water quality composite formula: (salinity + chlorophyll-a) / 2 × DO score. Sites that frequently fall into hypoxia (dissolved oxygen below 3 mg/L more than 10 percent of the time) get cut sharply because DO acts as a multiplier in the formula. The full water quality picture is now visible. Arthur Kill emerges at the top. Six Living Breakwaters sites cluster just below it.

**Spectra panel:**
Salinity and chlorophyll-a curves remain, slightly de-emphasized. Dissolved oxygen curve appears as a step function rather than a smooth curve. Three tiers: 1.0 if hypoxia is rare (below 2% of measurements), 0.75 if occasional (2-10%), 0.5 if frequent (>10%). Discrete steps drawn clearly. Annotation: "Hypoxia threshold, 3 mg/L."

**After the third curve appears**, a subtle visual treatment highlights the narrow zone where all three water quality variables would simultaneously support strong oyster habitat. A pale vertical band, low opacity, drawn across the stacked spectra. This is the Goldilocks moment, made visible.

**Step title:**
Adding dissolved oxygen, the limiter

**Step copy** (first sentence emphasized):

**Dissolved oxygen does not need to be high.** It just cannot fall below survival levels. In the composite formula, oxygen acts as a multiplier, so sites that regularly slip into hypoxia get their other strengths cut in half. This is where the methodology earns its keep. Arthur Kill on Staten Island emerges as the strongest site in the pipeline. Six locations inside the Living Breakwaters system cluster just behind. The harbor's industrial west shore, often written off, now leads on the variables that matter most to oyster restoration. Three variables, each with its own shape, combined into one defensible ranking.

---

### Step 4 — Wave exposure, from Natrx Assess

**Map state:**
Site coloring stays as in Step 3 (the composite water quality score). Sites with significant wave exposure (wave heights ≥ 3 ft at some frequency) gain a small visual flag overlaid on the existing color. The flag is distinct but does not overwhelm the underlying color. The water quality ranking is still visible; what's been added is information about constructability.

**Spectra panel:**
The three water quality curves remain visible but de-emphasized. The Goldilocks band remains. A wave exposure suitability curve appears, showing the optimum range concept: some water movement is beneficial (delivers food and oxygen), excessive movement is detrimental (constructability and oyster dislodgment). Annotation: "Wave exposure, optimum range. Flagged when above 3 feet."

**Step title:**
Wave exposure, from Natrx Assess

**Step copy** (first sentence emphasized; *Natrx Assess* in italic on first reference per CLAUDE.md):

***Natrx Assess* now adds data BOP did not previously have.** Site-level wave energy modeling, computed for every candidate location using fetch-limited wind-wave equations from the Army Corps of Engineers Coastal Engineering Manual. Wave exposure has its own sweet spot: enough movement to deliver food and oxygen, not so much that structures fail and oysters wash off before they take hold. Sites with modeled waves above three feet are flagged for additional engineering review. The ranking holds. The reader's understanding of which top sites carry which complications sharpens.

---

### Step 5 — Shoreline erosion, from Natrx Assess

**Map state:**
Site coloring stays as before. Sites adjacent to actively eroding shorelines (≥ 1 foot per year) gain a different visual flag distinct from the wave flag. The pattern becomes visible: several top-ranked candidates also carry erosion flags.

**Spectra panel:**
Erosion does not have a suitability curve. Treat it differently. The panel shows a small annotation block in the position where the next curve would have appeared, with text along the lines of: "Erosion is not a suitability variable. It is a flag for co-benefit. Sites adjacent to actively eroding shorelines are tagged, because oyster reefs function as natural breakwaters."

**Step title:**
Shoreline erosion, from Natrx Assess

**Step copy** (first sentence emphasized; *Natrx Assess* in italic):

***Natrx Assess* also delivers a one-meter resolution analysis of shoreline erosion, going back fifteen years, using NAIP satellite imagery and the Marsh Edge from Image Processing methodology.** Eight sites show erosion of more than a foot per year. Fifteen more show active retreat. Several sit in the top tier of the suitability ranking, and the overlap is the story. Oyster reefs function as natural breakwaters. Where strong water quality meets actively eroding shoreline, one intervention delivers two outcomes: restored habitat and a protected coast.

---

### Step 6 — The practical filters

**Map state:**
Site coloring stays as before. Additional contextual indicators applied:
- Sites near NYC parkland (within 1,640 feet) get a parkland indicator.
- Sites within 50 feet of combined sewer outfalls (CSO) get a CSO flag.
- Sites within 50 feet of separate stormwater outfalls (MS4) get an MS4 flag.

The 10 to 15 sites that satisfy strong water quality, manageable construction, restoration co-benefits, and accessibility now read as visually distinct from the rest of the pipeline.

**Spectra panel:**
The water quality curves remain visible. Erosion annotation remains. A final annotation block appears for the practical filters: "Context filters. Not suitability variables. Constraints on which suitable sites are also actionable."

**Step title:**
The practical filters

**Step copy** (first sentence emphasized):

**The last layer is operational.** BOP works primarily on publicly owned parkland, where restoration runs alongside community education, so proximity to NYC parks is tracked. Sites near combined sewer and stormwater outfalls are flagged for permitting and water quality complications, regardless of how strong a site scores ecologically. The pipeline that survives every layer is the pipeline BOP can actually execute. Out of 78 candidates, more than thirty datasets, and six layers of analysis, the framework points to ten to fifteen priority projects ready for design and permitting. That is the answer the engagement was built to produce.

---

## Caveat to surface, just below the panels on Step 3

The composite formula is `(salinity + chl-a) / 2 × DO`, which is not literally a three-way intersection of the curves shown. The spectra panel teaches the *concept* of stacked constraints. A small expandable annotation on Step 3, reading something like "Show the math →", should reveal the actual formula for readers who want methodological precision. The visual teaches; the expandable provides the rigor for those who want it.

This caveat should not appear in the main copy. It belongs as an in-panel disclosure.

## Controls

Previous and Next buttons, fixed below the copy. The button row also shows a six-dot indicator of progress (dots fill in or color as the reader advances).

Keyboard navigation: arrow keys advance and reverse. Space bar advances. Escape does nothing (this is not a modal).

The walkthrough does not auto-advance. The reader controls every step.

On reaching Step 6, the Next button is replaced with a closing affordance, something like "Continue reading →" that scrolls smoothly to the start of Section 4.

## Out of scope for this build

- A free-exploration mode after Step 6. Removed earlier in the design conversation. The walkthrough is guided only.
- Sharing or deep-linking to specific steps. Future enhancement, not part of v1.
- Animations beyond the smooth color transitions and curve fade-ins specified above. No parallax, no scroll-triggered effects.
- Saving the reader's progress across page loads. The walkthrough resets to Step 1 each visit.

## Definition of done

- All six steps render correctly with the specified map states, spectra panel states, titles, and copy.
- Transitions between steps are smooth, including reverse navigation.
- Goldilocks band appears on Step 3 as specified.
- The Step 3 expandable "Show the math" disclosure works.
- The component is mobile-responsive: panels stack on narrow viewports, controls remain accessible.
- Keyboard navigation works.
- The component is accessible: ARIA labels on the map and spectra panel describe the current state, the step indicator is screen-reader-readable, the buttons are properly labeled.
- The component is contained inside Section 3 of the page and does not affect the layout of other sections.

## What to ask Dylan before starting

Two questions worth asking before committing to implementation:

1. The `sites.json` data already has the individual variable scores (salinity_score, chla_score, do_score) and the flag fields (wave_exposure_gte_3, erosion_gte_1, near_park, near_cso, near_ms4). Confirm these are sufficient inputs, or flag if anything is missing.

2. For the spectra panel curves, the salinity and chlorophyll-a transfer functions are documented in the Master Document (Figures 1 and 2 in section 5.2.2). Should the curves be hand-tuned to match those figures visually, or generated from the underlying scoring functions for mathematical accuracy? Hand-tuned is faster and gives more design control; generated is methodologically pure but harder to make look intentional.

Everything else in this spec is final. Start when you have answers to those two.
