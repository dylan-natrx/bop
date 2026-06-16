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

Two overlapping audiences, in priority order:

1. **Reporters and editors at climate and infrastructure outlets.** Bloomberg Green, Grist, Inside Climate News, MIT Tech Review, NYT Climate, Bloomberg CityLab. They will land here from a pitch and need to understand the work fast: what was at stake, what Natrx built, what it surfaced, why it matters at scale.
2. **General public**, science-literate but not technical. Environmental advocates, foundation staff, port authority and coastal infrastructure decision-makers, anyone who cares about urban estuary restoration. Needs jargon translated to plain language, glossary available for the terms that matter.

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

Five-section structure, locked. Remove the § symbol from all reader-facing labels. Use named labels only:

| Internal reference | Reader-facing eyebrow |
|-------------------|------------------------|
| § 1 | (no label, it's the hero) |
| § 2 | "The stakes and the problem" |
| § 3 | "The methodology, made visible" |
| § 4 | "What the analysis made visible" |
| § 5 | "What this enables" |

Top-ranked site callouts live **inside** § 3, not as a standalone section. The glossary lives **inside** § 5, collapsed at the bottom of the page.

Keep numbered § references only in code comments, file names, and internal documentation (like this file). The reader never sees the § symbol.

The older 6-section structure (Framework / Sites Already in Design / Explore the Map / Site Detail / Methodology) is **superseded**. Do not reintroduce it without explicit instruction.

### Tone Rules

- **No em dashes.** Use commas, periods, colons, parentheses, or semicolons. Em dashes are banned project-wide.
- **No "It's not X, it's Y" or "It's not just X, it's Y" constructions.** This is AI cliché. Use direct assertions or "X, not Y" structures instead.
- **No false drama, no manufactured tension, no clever wordplay in headlines.** Direct, confident, forward-looking.
- **"Confidence" must be handled with care.** See the dedicated section below.
- **No "unexpected," "surprise," "discovery," or "happy accident" language anywhere in § 4.** This was the brief Natrx was hired to deliver. The framing is *what the work showed,* not *what we found out.* BOP came to Natrx specifically because Natrx Assess produces wave and shoreline change data and Lise Montefiore's water quality expertise was exactly what was needed. The shoreline erosion data was a deliverable, not a discovery; the data-support inversion is the framework being honest about itself, not a happy accident.
- **Past tense for completed work, present tense for the partnership and the framework.** The 26-week engagement is past. The partnership is ongoing. The framework is in active use ("BOP can now target additional monitoring..."). Named people (Nick Brady, Mike McCann, Lise Montefiore) are present-tense ("Nick Brady leads...," "Lise Montefiore brings...").

### Natrx Assess editorial chrome

Treat *Natrx Assess* the way an editorial feature names a specific tool: identified clearly because accuracy demands it, never promoted.

- **Italic on first reference per section.** Fraunces italic, inline, same weight as surrounding body copy. Don't bold it. Don't link it. Don't pull-quote it.
- **Subsequent references in the same section drop the italic.** Treat it as a proper noun after the first naming.
- **No CTAs anywhere on the page.** No "talk to us," no "request a demo," no button-styled links to Natrx Assess or Address, no contact form, no email capture.
- **Methodology callouts are editorial footnotes, not product cards.** When the body copy names a methodology (MEIP, NAIP imagery, fetch-limited wave modeling) the visual treatment is footnote-style: small Fraunces italic line set apart, not a card with a logo and CTA.

The test: would a New York Times feature on this work name *Natrx Assess* by name? Yes. Would it include a "talk to us" CTA? No. Follow that line.

### What to call things

- **"Suitability score"** = the 0–1 water-quality composite (the rank-driving number). Do not call this "confidence."
- **"Data support"** or **"monitoring coverage"** = the dimension Nick's pipeline calls "ConfidenceRule." Use this language in any public-facing context.
- **"Sites already in design"** = the 11 sites with `Status = "Design"`. Already moving toward construction. Avoid the word "pipeline."
- **"Candidate sites"** = the full pool of 78.
- **"Reef restoration"** = the work. Not "oyster farming," not "aquaculture." NYC's restored oysters are inedible by design (a century of urban runoff still leaves traces; the state prohibits harvest from restoration sites). The case for the work is ecological, not culinary.

### Variable structure

The framework distinguishes three analytical categories:

1. **Water quality** (salinity, chlorophyll-a, dissolved oxygen) — drives the suitability score. These are the rank-driving variables, sourced from public monitoring stations.

2. **Shoreline dynamics** (erosion, wave exposure, depth suitability) — come from Natrx Assess. Includes multi-year/historical aerial imagery (NAIP, Assess's primary source; Assess can also use satellite imagery depending on need, availability, and budget) and wind-driven wave modeling. Contextual layers, not score inputs.

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

## v1 Scope (the five sections, locked)

Build all five sections as a single scrolling experience. Each section inherits the visual language above. The two custom maps (Map 1 in § 1, Map 2 inside § 3) share Mapbox GL JS with the same custom dark inline style.

### § 1 — Hero (no reader-facing eyebrow)
Topbar with partnership lockup. Headline ("Restoring New York Harbor's Oyster Reefs. But where?") + lede on the left, four-stat stack on the right (78 sites, 2,604 ac, 1 billion goal, 9 variables). Two-column figure: left panel with Fig. 1 caption, top-ranked sites list, suitability legend; right panel with **Map 1**. Footer with logo lockup and methodology line.

**Map 1** is the confidence-builder: reader lands, sees the harbor, understands scope in one glance. Mapbox GL JS, custom inline dark style. All 78 sites rendered as a single circle layer (centroids sized by acreage, colored by composite score using the locked gradient stops). Top-10 sites get a 1.15× radius and a pulsing teal halo. Land masses from `nyc-boroughs.geojson`, `nj-shoreline.geojson`, `westchester.geojson`. Borough labels in JetBrains Mono uppercase; water-body labels (Upper Bay, Lower Bay, Raritan Bay, Jamaica Bay, East River, Hudson River, Arthur Kill) in Fraunces italic. No pan, zoom, click, popup, or layer toggle. Hover tooltip only.

### § 2 — The stakes and the problem
Plain-language version of two beats, combined:

1. **The stakes.** New York Harbor as one of the richest estuaries in the world. Oysters as a keystone species. The collapse of the reefs and the ecosystem services they provided. BOP's mission to deploy one billion oyster spat by 2035. The Allee effect as the reason concentration matters.
2. **The problem.** 78 candidate sites. BOP's established per-site instrumentation method as rigorous, expensive, and not scalable. The 30 percent design bottleneck. The absence of an analytical layer that could compare candidates against one another at scale.

No fancy data visualizations in this section. Text-led, editorial. Headline + two paragraphs + section break.

### § 3 — The methodology, made visible (Map 2 + spectra panel + top-ranked callouts)
This is the teaching section. The reader watches site suitability emerge from layered data through a guided, reader-controlled walkthrough.

**Map 2 + spectra panel — six-step guided sequence.** Same Mapbox style as Map 1, same site geometry. A controller walks the reader through six states with smooth (~600ms ease-in-out) color interpolation between steps. Reader controls progression with Previous and Next; no free exploration. Beside the map, a spectra panel renders custom SVG curves that stack as each variable is introduced.

1. **Salinity (the Goldilocks variable).** Curve: optimum window, hump shape, ~16 PSU peak.
2. **Add chlorophyll-a (food, with a catch).** Curve: linear, with a hatched "eutrophication danger zone" above ~20 µg/L.
3. **Add dissolved oxygen (the limiter).** Curve: step function across the % of measurements below 3 mg/L hypoxia threshold. After this step, surface the composite formula `(sal + chla) / 2 × DO` for the curious reader, with an honest note that the literal math is not a three-way intersection and the stacked-curves visual teaches the *concept* of stacked constraints.
4. **Add wave exposure (Natrx Assess).** Map overlays a wave-exposure flag on flagged sites. Spectra panel adds a wave-exposure suitability curve framed as a teaching visualization of the ecological logic, not a scored input.
5. **Add shoreline erosion (Natrx Assess).** Map overlays an erosion flag. Spectra panel does *not* add a curve; instead a small annotation reads "Erosion is a flag, not a curve. Sites near actively eroding shorelines are tagged for the co-benefit story."
6. **The practical filters.** Map overlays parkland, CSO, and MS4 proximity flags. Section closes by noting these are constraints, not scores.

**Top-ranked site callouts (nested inside § 3, after the walkthrough).** Three editorial cards, in rank order:
- **Arthur Kill, #1, 0.87.** The redemption arc. Staten Island's historically industrial west shore now leads the harbor on combined salinity, chlorophyll-a, and dissolved oxygen.
- **Living Breakwaters cluster, #2–7, 0.74–0.79.** Independent validation of an iconic resilience installation. Six sites within the SCAPE-designed system rank in the top seven.
- **Wolfe's Pond, #8, 0.65.** Staten Island park site, publicly accessible, strong across every variable.

Visuals for the callouts can pull from `BOP_Wave_Analysis_Report.pdf` (per-site aerial + shoreline change overlay + wind rose).

### § 4 — What the analysis made visible
The section title is "What the analysis made visible." No "unexpected," no "surprise," no "discovery." See the Section 4 framing rule under Tone Rules.

Two beats, plus a closing thread:

1. **The co-benefit.** Many top-ranked sites sit adjacent to actively eroding shorelines. Oyster reefs function as natural breakwaters. The *Natrx Assess* shoreline change analysis (MEIP methodology, NAIP imagery 2010 to present) identifies which sites deliver biodiversity restoration and shoreline protection from a single intervention. This is the kind of multi-variable insight Assess is built to produce.
2. **Data confidence and where to invest next.** The framework also surfaced where observational data is robust and where it is thin. Sites already in design carry strong data because they have been studied. Some top-ranked candidates carry less observational support because they have not been studied as deeply. BOP can target additional monitoring exactly where it would compound the value of the analysis. The methodology is honest about its own uncertainty, and that honesty is itself a deliverable.

**Closing thread (single italic line, ~35 words):** Assess and the team's expertise didn't just answer *which sites.* They answered *which sites, with what confidence, and where additional investment should go next.*

### § 5 — What this enables (portability)
The portability story. Coastal districts, port authorities, state agencies, foundations, NGOs all face the same prioritization decision. The methodology charts a third path between site-by-site instrumentation that does not scale and habitat-suitability models that demand continuous data most environments cannot supply. Named comparable estuaries: San Francisco Bay, the Chesapeake. The methodology is the deliverable, not the New York Harbor result alone.

Close with a short paragraph on the ongoing partnership: BOP plans more monitoring this summer; the framework can re-run with updated inputs without rebuilding the scoring system. Natrx's broader position (*Assess* for analytical capability, Address for fabrication, the field track record) as the answer to the full question from where to act through what to deploy. **No CTA. No "talk to us." No button-styled links.**

Footer with full credits, partnership lockup, methodology line, and links to BOP and Natrx (text links, not buttons).

### Page chrome — persistent right-edge drawer

A single persistent affordance on the right edge of the viewport, visible across every section, opens a slide-out drawer with two panels:

- **Glossary.** ~18 plain-language definitions: Eastern oyster, salinity / PSU, chlorophyll-a, dissolved oxygen / hypoxia, Habitat Suitability Index, composite score / DO-modifier, confidence interval, fetch-limited wave modeling, shoreline change analysis (MEIP), NAIP imagery, CSO, MS4, subtidal vs intertidal, Allee effect, spat, keystone species, estuary, bathymetry. Drawn from `BOP_Master_Document_Final.pdf` and `_overview-documents/Natrx_x_Billion_Oyster_Project_Overview.docx`.
- **Press contact.** Dylan DiBona, press contact email, a one-line note that source materials (the BOP-Natrx Master Document, the Wave & Shoreline Change Analysis Report, per-site data) are available to reporters on request, and an invitation framed as editorial outreach not a commercial channel.

**Inline glossary terms** in body copy use `<GlossaryTerm termId="...">term</GlossaryTerm>` (see [src/components/ui/GlossaryTerm.tsx](src/components/ui/GlossaryTerm.tsx)). Clicking opens the drawer scrolled to the matching entry. Term ids are defined in [src/components/chrome/glossary-data.ts](src/components/chrome/glossary-data.ts).

**Interaction:** slide in from the right, 300ms ease-out, light backdrop dim. Close by clicking the backdrop, pressing Escape, or tapping the edge affordance again. Mobile collapses the edge affordance to a round button in the lower-right corner and the drawer covers most of the viewport.

**No CTAs anywhere in the drawer.** The press contact is editorial, like a masthead handles letters to the editor. Not "talk to us about your project."

The glossary lives in the drawer, not in § 5 page flow. Do not reintroduce it as a section.

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

### Current State

**v1 is live at https://bop.natrx.report behind a custom-branded password gate.** Last meaningful update: 2026-05-18. All five sections are built, copy is locked, and the editorial polish is in active rounds. For granular detail (file paths, dates, gotchas, deploy commands), defer to `docs/SESSION_HANDOFF.md` and `docs/PROJECT_STATUS.md` — this block is a high-level snapshot only.

What's shipped:

- **§ 1 Hero.** Mapbox GL JS, OSM-derived `region-land.geojson` + `hudson-river.geojson` carving the Hudson out of the land mass, all 78 sites as circles colored by composite score, top-10 with pulsing halos, hover tooltip, bidirectional hover between `HeroMap` and `FigurePanel`. Sticky `SectionNav` (4 links + scroll-spy, hamburger on mobile) replaces the original topbar.
- **§ 2 Stakes & problem.** Four-paragraph body opening on the harbor's lost reefs (350 sq mi, 15-foot visibility) and closing on the shift from opportunistic siting to systemwide planning. Carolyn Khoury pullquote between paragraphs 3 and 4. Inline `<GlossaryTerm termId="candidate-site">` link in paragraph 3. Portrait `EditorialImage` of the harbor.
- **§ 3 Methodology, made visible.** Intro + Mike McCann pullquote + six-step `MethodologyWalkthrough` (map 3fr / spectra 2fr / bottom strip with copy + right-anchored controls) + three `TopRankedCallout` cards with live `SiteMiniMap`s (Arthur Kill / Living Breakwaters cluster / Wolfe's Pond). The editorial spine: biology gates steps 1–3, external context overlays at steps 4–6 without filtering, priority halo reveals top-10 inside the suitable set at step 6. Spectra panel uses a two-color treatment (teal biology / amber external).
- **§ 4 What the analysis made visible.** Two `FindingBeat` blocks: shoreline change image for beat 1 ("Oysters and shorelines, one intervention."), `ConfidenceDistributionChart` for beat 2 ("A map of where to invest in more data next.").
- **§ 5 What this unlocks.** Headline "The pipeline becomes operational." Three nested beats (Operational / Institutional / Mission). Institutional carries the EIS detail (NY State environmental impact statement scheduled to conclude end of 2028). Lise Montefiore pullquote (Water Quality and Data Scientist, Natrx) hinges between the three-beat block and the closing portability paragraph. Closes with `nyoyster.webp` (also the OG image).

**Persistent chrome.** `SiteChromeProvider` + right-edge drawer with two tabs. **Glossary** is 25 alphabetized entries; Natrx Assess and any future product entries carry `productName: true` and render with italic + medium-weight `<dt>` styling per the editorial chrome rules. **Press contact** is two side-by-side cards (Andi Cross, BOP Director of Communications, with phone; Dylan DiBona, Natrx press). No CTAs anywhere. `Footer` has the partnership lockup with each logo linked to its org site (natrx.io, billionoysterproject.org).

**Editorial chrome — Natrx Assess.** Every body-text occurrence renders in serif italic + pure white (`text-white`). First occurrence on the page (§ 3 intro: "Two custom data products were generated by Natrx Assess") wraps in `<GlossaryTerm termId="natrx-assess">` so readers can jump to the drawer definition. Subsequent occurrences (§ 4 Beat 1, § 5 closing portability graf, walkthrough steps 4 and 5) carry the same styling but no link. Figure captions are intentionally not styled — chrome, not body voice.

**Analytics.** Vercel Analytics + Speed Insights wired with five typed editorial events: `section_reached`, `walkthrough_step`, `drawer_opened`, `glossary_term_clicked`, `top_ranked_viewed`. Enabled in the Vercel dashboard.

**Auth gate.** `src/middleware.ts` (note: `src/`, not project root — root location is silently ignored on src-layout projects) + `src/app/login` + `src/app/api/auth/login`. Vercel Deployment Protection is **off** at the platform level so the branded gate is the only gate. `AUTH_DISABLED=true` no-ops it without removing files.

Known dead-code paths kept for inertia: `src/components/hero/CoastlineTest.tsx`, `src/app/test-map/`, `src/lib/land.ts`, most of `src/lib/projection.ts` (only `calculateMarkerRadius` is still used), `src/app/site/[siteId]/` stub. Production maps no longer reference `public/data/nyc-boroughs.geojson` / `nj-shoreline.geojson` / `westchester.geojson` / `upstate-ny-ct.geojson`; they remain only because the diagnostic routes still import them.
