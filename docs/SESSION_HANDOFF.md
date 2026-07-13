# Session Handoff

**Pick up here.** This is the single doc to read first when resuming work. It assumes nothing about prior context.

Last meaningful work: **2026-07-13 — BOP client review round, shipped in 4 commits (`6301891`, `3b2d007`, `1a4daf8`, `5ca05b9`), all on `main`. Read the next section first.**

Prior state: 2026-05-26. **v1 is live at https://bop.natrx.report behind the password gate.** All five sections have real copy and real visuals. Map storytelling rebuilt: biology gates (steps 1–3), external factors overlay as flag markers (steps 4–6), priority projects revealed at step 6 with a pulsing halo. Spectra panel uses a two-color treatment (teal = biology, amber = external). Legend evolved into a horizontal strip pinned to the bottom of the map. Mobile section nav got a hamburger menu. Custom domain wired up with Cloudflare DNS + per-domain Vercel CNAME target. Three pullquotes (Carolyn Khoury §2, Mike McCann §3, Lise Montefiore PhD §5). Vercel Analytics + Speed Insights are live with custom editorial events.

---

## BOP client review round (2026-07-13) — READ THIS FIRST

Source: Google Doc `260630_BillionOysterProject_Comments_on_Natrx_site` (comments from **Mike McCann**, Director of Science and Research, and **Carolyn Khoury**, Director of Restoration). Every item in that doc is now closed. Four commits, all pushed to `main`.

### The two changes that alter the story

**1. Arthur Kill sits in a federal Superfund cleanup area.** This is the big one. The page previously said Arthur Kill "sits in calm water with little hard data nearby, which makes it the clearest place to go study next." That is wrong, and McCann flagged it. Arthur Kill ranks #1 on water quality *and* is among the hardest sites in the harbor to permit. Rather than delete the line, we inverted it: the tension is now the strongest material on the page, because it is the framework's own logic made flesh (the score measures water only; cost and permitting are contextual layers that are never folded into the number).

Landed in three places:
- `steps.tsx` step 6: the wrong line is gone, replaced with the Superfund + permitting reality.
- `MethodologyMadeVisible.tsx`: second paragraph on the Arthur Kill `TopRankedCallout` ("The sediment is a work in progress…").
- `WhatAnalysisMadeVisible.tsx`: **new leading beat**, "The best water is not always the easiest place to build." Runs full width (no `visual`) and governs how the reader reads the two beats after it. Section headline is now "Three patterns the ranking surfaced."

⚠️ **OPEN WITH McCANN: the exact phrasing.** We say Arthur Kill "falls inside a federal Superfund cleanup area," deliberately **not** "is a Superfund site." Arthur Kill is a tidal strait *within* Superfund-affected sediment (LCP Chemicals, Linden NJ, listed 1998, mercury; and the Diamond Alkali natural resource damage restoration area), not itself an NPL listing. McCann's comment used the looser shorthand. He will be the one a reporter calls, so get him to sign off on the wording before this goes public.

**2. The framing moved from funding to connectivity.** Khoury rejected "earn the next dollar" and any ROI-flavored language: these are not for-profit projects. § 3's headline is now "How a framework finds the sites that connect a harbor into a self-sustaining system." Her direction: *connectivity* is the key concept, and the goal is getting "the self-sustaining wheel turning." The § 3 headline is my rendering of her note and is **not yet client-approved**.

### Everything else from the doc, all shipped

- **Goal date is 2030, not 2035.** Everywhere (hero lede, hero stat, § 2, § 5). McCann's instruction. Note this contradicts BOP's widely published "one billion by 2035," so it is worth a sanity check that the goal genuinely moved.
- **"200 million have been reintroduced so far."** Previously the page said "the harbor holds under 200 million today," a standing-population claim. McCann: "200M is not our current population size." Now in the § 5 Mission beat. (We render it as "*Roughly* 200 million"; he said "200 million" flat. Trivial, but it is a word we added.)
- **Filtration claim hedged:** "A single adult **can filter as much as** fifty gallons of water a day." Hedged in both the hero lede and the `filter-feeder` glossary entry (they had drifted apart).
- **"restored first," not "funded first."** Hero lede.
- **"Salinity," not "salt,"** in all body copy. McCann: "I think the audience can handle the term."
- **"Billion Oyster Project," never "BOP,"** in all reader-facing copy, per their brand guidelines. Code identifiers, Mapbox style names, cookie names and file paths are untouched.
- **No harvest implication.** "It guards a shoreline and feeds a harbor" → "…and cleans the water around it." NYC restoration oysters are inedible by design; do not reintroduce any language that suggests otherwise.
- **Latin binomials italicised.** New optional `latinName` field on `GlossaryEntry`; `GlossaryPanel` renders it in italic parens. Eastern oyster (*Crassostrea virginica*) is the only current user.
- **Parks is never a bottleneck.** Khoury's verbatim rewrite of the "opportunistic" paragraph in § 2: "For years, the work moved ahead opportunistically: restoration advanced when a partner provided access or when a specific project received funding." Parks has always said yes to them; the old copy implied otherwise.
- **Decade-of-data line** added to § 2, Khoury's verbatim: "…a decade of data that has shown that, across regions and years, oysters are spawning, and recruitment is occurring harborwide."
- **Critical-mass context** in § 2: ten to fifteen sites is what it takes to get oysters reproducing together (the Allee effect), not an arbitrary target.
- **GEIS / permitting block** in § 5 rewritten to Khoury's supplied language and **split into two beats** ("The agencies" / "The review") because she flagged the combined block ran long. Note her text says "the Billion Oyster Project's decision-making"; we dropped the article for consistency with McCann's brand note. Flag if they want it back.
- **Geography named plainly.** "The harbor's old industrial west shore" was not legible as Arthur Kill. Now "the tidal strait between Staten Island and New Jersey" / "the western edge of the harbor."
- **Cate Collinson pullquote** added to § 3 (see below).
- **Hero standfirst** added between the lede and the map, per Khoury's note that readers must understand what the score does *before* they meet the map: *"Every site is scored on one question: how well the water suits oysters. Salinity, food, oxygen. What a reef costs to build there, and what it takes to permit, is a separate question the framework keeps separate."* Hairline rules top and bottom, mono eyebrow "How to read the map." This also sets up the new § 4 beat.

### The Living Breakwaters image was from a different project

`public/site-imagery/shoreline-change.png` depicted a marsh-island system that is **not Staten Island** and was captioned "Shoreline change at Living Breakwaters, 2010 to 2025." It came from some other Natrx project. On a page whose entire argument is analytical rigor, this was the single most dangerous asset on the site.

Replaced with `shoreline-change-living-breakwaters.png`: the **real** Living Breakwaters page (site ID 36) extracted at 400 DPI from `BOP_Wave_Analysis_Report.pdf`, which *Natrx Assess* generated from this project's own data. Caption now credits the Esri/Maxar basemap and explains the red/blue scale.

**Known aesthetic tension:** the real image is a light satellite basemap with a white legend box, so it sits differently against the dark editorial page than the old (fake, dark-toned) one did. The honest fix, if it bothers anyone, is to **ask Nick Brady for the underlying shoreline-change point data** so we can render a dark, web-native version. Worth doing regardless. Do not solve this by going back to a prettier image that isn't ours.

The Wave Analysis Report has a real per-site page for **every** site (53 pages, IDs listed in its TOC). Arthur Kill is pages 21–25, Living Breakwaters 28–34. If any section needs site imagery, pull it from there. Extraction recipe: `pdftoppm -r 400 -f <page> -l <page> -png`, then crop the aerial at fractional bounds `(0.063W, 0.094H) → (0.457W, 0.2865H)` to get the map without the tiny source strip.

### Cate Collinson quote — how it was sourced, in case it's questioned

Khoury asked for a quote from **Cate Collinson** (Associate Director of Restoration Projects), who found Natrx and established the collaboration. The Gemini transcript of the 2026-05-18 interview (`_overview-documents/BOP x Natrx_ Project Background Interview…Gemini.md`) has **zero Collinson speaker labels** — the diarization filed every turn from BOP's end of the call under Carolyn Khoury, because they shared a mic.

But one of those turns is Cate introducing herself, and the handoff is explicit in the transcript:

> **Carolyn Khoury:** …So, that's a new way of doing the restoration for us. So, I'll let Kate go though.
> **[labeled Carolyn Khoury]:** My name is Kate Collinsson and I am the associate director of restoration projects here. I work under Carolyn…

That turn is unambiguously Cate, and it contains the collaboration quote. It is the **only** passage in the transcript that can be safely attributed to her; do not attribute anything else in that voice without going back to the video. Spelling is "Cate Collinson" (Khoury's doc and her email `ccollinson@`); the ASR guessed "Kate Collinsson."

Placed in § 3 in the intro column, beside the paragraph describing the engagement, matching the in-column treatment § 2 gives the Khoury quote. **The page now carries four pullquotes:** Khoury (§ 2), Collinson (§ 3 intro), McCann (§ 3, before the walkthrough), Montefiore (§ 5).

Also verified while in there: the existing Khoury pullquote is a faithful condensation of what she actually said (transcript turns 26 and 29). It's clean.

### Pre-existing bugs the QA pass caught (all fixed)

These were already live and had nothing to do with the client comments:

1. **§ 4 beat closed on a banned construction.** "The framework doesn't only rank the harbor. It shows where the next bit of effort will pay off most." That is the negation-then-reveal cliché, split across two sentences so it slipped past every previous read. Rewritten.
2. **"Six tied sites."** The hero `FigurePanel` described the Living Breakwaters cluster as tied. They score 0.79 / 0.79 / 0.78 / 0.76 / 0.76 / 0.74, and the score range printed directly beside it contradicted the word. Now "Six sites · Ranks 2-7."
3. **"At scale" in the sticky nav.** The brief explicitly rejects that phrase, and it was on every screen. Now matches the § 5 eyebrow, "What this unlocks."
4. **Salinity stated two ways.** The spectra curve annotates the optimum at 12–20 PSU; the glossary said oysters thrive at 10–25. A reader clicking the glossary term while looking at the curve got two different windows. Aligned to the scoring function, and the definition now names the harbor-specific recalibration (BOP's local knowledge is why the thresholds moved off the literature), which is the better fact anyway.
5. **Press panel linked to `bop.nyc`** while the footer linked to `billionoysterproject.org`. Unified.
6. **Press panel was missing the source-materials line** the brief calls for. Added, editorial in register, no CTA.

### Other implementation notes from this round

- **`SpectraPanel` x-axis labels are back.** A previous session had deliberately stripped them ("the curve title + annotation already tell the reader what they need to know"). McCann disagreed. They render as **HTML, not SVG `<text>`**, because the plot uses `preserveAspectRatio="none"` and would stretch the type. `CURVE_HEIGHT` went 78 → 132 so the 440px column shows **two** plots at a time instead of three, which gives the labels room.
- **New `AreaLegend`** in `Legend.tsx`. Circles are drawn at the exact radii the map uses (`calculateMarkerRadius`, sqrt scale, 3px at 0 ac → 8px at the 470 ac max), so it is a true reference rather than a decorative approximation. McCann couldn't tell what dot size meant; it's acreage.
- **`FindingBeat` already supported a missing `visual`** (falls back to a wider centred column). No component change was needed for the new full-width § 4 beat.

### Still open

1. **McCann sign-off on the Superfund phrasing.** See above. Highest priority.
2. **Confirm the 2030 goal date** is a real shift and not a slip in the comment doc.
3. **Visual review of the rendered page.** Three things were changed without eyes on the result: the light satellite shoreline image against the dark page, the taller spectra plots against the map height, and whether the new hero standfirst crowds the map.
4. **§ 3 headline** ("…connect a harbor into a self-sustaining system") is my rendering of Khoury's note, not her words. Needs approval.
5. **Ask Nick Brady for the shoreline-change point data** so the § 4 image can become web-native and dark.

---

**Recent editorial polish (May 14–18) — what's changed since the v1 launch state:**
- § 2 expanded to four paragraphs (harbor history → opportunistic siting → systemwide shift with the 10–15 funded sites / 2029–2030 target → "the framework on this page is how Billion Oyster Project and Natrx built that capability together"). Carolyn Khoury pullquote between paragraphs 3 and 4. Inline `candidate-site` `<GlossaryTerm>` in paragraph 3.
- § 5 reshaped: Operational beat to one sentence, Institutional expanded to six sentences with the NY State EIS detail (scheduled to conclude end of 2028), Mission tightened. Lise Montefiore pullquote replaced with new water-quality copy; role updated to "Water Quality and Data Scientist, Natrx"; credential simplified to PhD. Closing portability paragraph opens to "restoration practitioners at every scale."
- Press contact rebuilt as two side-by-side cards. Andi Cross (BOP, Director of Communications, +1 484 501 3326). Dylan DiBona (Natrx, press contact, dylan@natrx.io). Each eyebrow links to its org site. Source-materials line dropped.
- Footer logos now link to natrx.io and billionoysterproject.org.
- Natrx Assess added to glossary as the first `productName: true` entry (italic + medium-weight `<dt>` in the drawer). Every body-text occurrence renders in serif italic + pure white. First occurrence on the page (§ 3 intro) wraps in `<GlossaryTerm termId="natrx-assess">`; subsequent occurrences are styled but unlinked.

**Scientific review edits (May 26) — Lise Montefiore (Natrx Water Quality & Data Scientist). The why: the framework ranks the 78 candidates against each other on water-quality variables; it is not a calibrated Habitat Suitability Index, and Lise flagged that the copy (Figure 1 especially) was implying it might be. What changed:**
- **Score reframed as a relative "Site score."** New § 3 paragraph after the "two questions in order" graf: the score "is a relative measure of water-quality conditions across the 78 candidates… A score of 0.90 ranks better than a score of 0.10, but neither carries an absolute claim about habitat quality." "Suitability score" relabeled **Site score** across all chrome — hero legend, Fig. 1 caption, map hover tooltip, and the glossary entry (renamed from "Composite score and DO-modifier"; id `composite-score` → `site-score`; moved to its alphabetical slot between "Shoreline change analysis (MEIP)" and "Spat"; definition rewritten as a relative measure, dropping the old DO-multiplier explanation, which still lives in the walkthrough's "Show the math" disclosure). "Relative site score" is reserved for the § 3 first-use prose only.
- **"Calibrated" removed.** § 3: "mixes both dimensions, calibrated to each location" → "integrates both dimensions across all 78 sites." § 5: dropped ", calibrated to the place." `grep calibrat` is clean.
- **Walkthrough score-curve subtitles** "Habitat suitability" → "Scoring function" on the three biology curves (salinity, chlorophyll-a, dissolved oxygen). Wave keeps its own subtitle — it is a teaching curve, not a scored input — and the two annotation blocks (erosion, filters) have no subtitle. Only three plots literally read "Habitat suitability," not the six the brief assumed.
- **Salinity plot citation** added beneath the curve, figure-caption styled: "Scoring function adapted from Starke et al. (2011)." Implemented as a new optional `citation` field on `CurveDef` in `SpectraPanel.tsx`.
- **Chlorophyll-a plot** lost the eutrophication threshold band + "Eutrophication" label; the linear food-response curve and its "Linear food response" annotation stay. The `DangerZone` function and the `showDanger` prop were removed (chla was the only consumer). The Eutrophication *glossary* entry is untouched — it's a defined term, not the plot.
- **Body sweep:** hero stat "evaluated for oyster suitability" → "ranked for restoration priority"; § 4 "top tier of the suitability ranking" → "top tier of the site ranking"; walkthrough "the suitable set" (×3) → "the qualifying set."
- **Step 2 copy** revised so the consequence of too much food points at the dissolved-oxygen step (where the framework actually flags it) instead of a "danger zone" visual that no longer exists.
- **aria-label** "Variable suitability curves" → "Variable scoring functions" (screen-reader users read the renamed plots too).
- **Held for Lise's next pass:** new salinity + dissolved-oxygen threshold values (incoming data — both plots otherwise unchanged); the lower-stakes "suitable" *adjective* uses ("each suitable site," the map legend's "Suitable site," § 4 "most suitable for," two spectra annotations); the Habitat Suitability Index glossary entry (kept — it draws the HSI contrast and aids defensibility).
- **Shipped:** commit `3c1120a` to `main`, local `next build` clean, Vercel production status green. Code symbols (`SuitabilityLegend`, `SUITABILITY_GRADIENT*`, `SuitableDot`) left unchanged — internal identifiers with no reader surface; renaming them is a separate hygiene task, not a narrative correction.

**The editorial spine for the entire methodology section, locked:**
> The framework's complete recommendation isn't just "top-10 by biology." It's "top-10 by biology, with full cost/permitting/co-benefit context attached."

Steps 1–3 narrow by biology. Steps 4–6 attach context without narrowing further. The priority halo at step 6 reveals the top-10 inside the wider suitable set, with all flag rings visible. Arthur Kill ends step 6 with priority halo + cost ring + co-benefit ring + bright dot — exactly what the framework says about it: strongest biology, with engineering cost and permitting friction known, and shoreline co-benefit attached.

**Vocabulary locked across the page:**
- Candidate sites = the original 78
- Site score = the relative water-quality score (renamed from "suitability score" on May 26). "Relative site score" appears only in the § 3 first-use prose.
- Qualifying set = the sites that pass the biology gate (22, bright dot). Called "the suitable set" in walkthrough copy until May 26.
- Priority project = top-10 by composite (haloed at step 6 only)
- Reserve = qualifying but not in top-10 (12, bright but unhaloed)

Note the current half-state, by design: the *set* is now the "qualifying set," but individual sites are still described with the adjective "suitable site" (and the map legend still reads "Suitable site"). Those adjective uses are held for Lise's review pass — don't sweep them unprompted.

---

## The project in one paragraph

A media-grade, public-facing explainer page documenting the Billion Oyster Project × Natrx site prioritization framework for New York Harbor oyster restoration. Built in Next.js 15 + Mapbox GL JS + Tailwind, deployed on Vercel. Primary audience is climate/infrastructure reporters (Bloomberg Green, Grist, ICN, NYT Climate, Bloomberg CityLab, MIT Tech Review); secondary is general public. The page also functions as a Natrx capability demonstration. Five sections (1 Hero, 2 Stakes & problem, 3 Methodology, 4 What the analysis made visible, 5 What this enables). Editorial dark mode, Fraunces serif + Inter sans + JetBrains Mono. Strict tone rules in [CLAUDE.md](../CLAUDE.md).

---

## Where to look first

| Doc | Read for |
|---|---|
| [CLAUDE.md](../CLAUDE.md) | Editorial brief: locked decisions, tone rules, five-section structure, palette, type. **Read first** when in doubt. |
| [docs/SPEC_NOTES.md](SPEC_NOTES.md) | Tech stack, component architecture, design tokens, data files, analytics wiring |
| [docs/PROJECT_STATUS.md](PROJECT_STATUS.md) | Per-section status, outstanding polish, technical debt |
| [docs/ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md) | Every gotcha encountered and how it was fixed. Read before debugging anything map-related |
| `hero_reference.html` | Canonical visual reference for the dark editorial register. Open in a browser |
| `_overview-documents/BOP_Explainer_Build_Brief.md` (untracked, local) | Original build brief (pre-Next.js direction; archived for design rationale) |
| `_overview-documents/BOP_Explainer_Page_Brief.md` (untracked, local) | Original editorial brief — audience, story spine, voice |
| `_overview-documents/BOP_Natrx_Project_Narrative_DRAFT_v0_2.md` (untracked, local) | Master narrative, source of truth for all copy |
| `_overview-documents/BOP_Project_Handoff.md` (untracked, local) | Earlier general partnership handoff doc (people, voice rules). Superseded by this file for build state |
| `_overview-documents/*Gemini.md` (untracked, local) | Auto-generated meeting transcripts (May 7 internal call, May 18 BOP interview) |

The untracked references live in your local working tree only — `_overview-documents/` is gitignored because the contents are source material, not source code.

---

## Pre-public access gate

The site is gated by a custom-branded password page while in editorial review. Architecture:

- **`src/middleware.ts`** — Next.js middleware. Checks `bop-auth` cookie on every request. Missing or invalid → redirect to `/login?from=<original-path>`. Matcher excludes `_next/static`, `_next/image`, `_vercel`, `favicon.ico`, `/images`, `/site-imagery`, `/data`, `/login`, `/api/auth`. **Lives in `src/`, not project root** — see ISSUES doc; root location is silently ignored on `src/`-layout projects.
- **`src/app/login/page.tsx`** — BOP × Natrx branded login page. Form is a Suspense-wrapped client component.
- **`src/app/api/auth/login/route.ts`** — POST handler validating credentials against env vars, setting `bop-auth` cookie on success.

Env vars (defaults in code are safe-for-local-dev; set on Vercel for prod):
- `AUTH_USERNAME` — default: `natrx`
- `AUTH_PASSWORD` — default: `resili3nc3`
- `AUTH_TOKEN` — the cookie value (default: `bop-preview-2026`). Rotate to invalidate all sessions.
- `AUTH_DISABLED=true` — optional, no-ops the gate without removing files.

**To remove when public:** delete `src/middleware.ts` (and optionally `src/app/login` and `src/app/api/auth`). Or set `AUTH_DISABLED=true`.

**Vercel Deployment Protection must be OFF** for the custom gate to be the only gate. The platform-level Vercel Auth intercepts before middleware runs and would mask the branded page. Disabled at `vercel.com/dylan-natrx/bop/settings/deployment-protection` → Vercel Authentication → Disabled for Production.

---

## Where things are deployed

- **GitHub:** `dylan-natrx/bop` on `main`. All work goes directly to `main`. **Push under the `dylan-natrx` GitHub account** (`gh auth switch --user dylan-natrx` if pushes start 403-ing — the auth flip is a recurring annoyance).
- **Vercel project:** `dylan-natrx/bop` (project ID `prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`). Linked locally via `.vercel/project.json`. Every push to `main` triggers a Production deploy.
- **Production URLs:** Vercel generates a new URL per deploy (`bop-<slug>-dylan-natrx.vercel.app`). No custom domain configured yet.
- **Mapbox token:** `NEXT_PUBLIC_MAPBOX_TOKEN` is set on Vercel for Production, Preview, and Development. Mirrored locally in `.env.local` (gitignored). The token is 94 characters; anything shorter is truncated. See ISSUES doc.
- **Analytics dashboards:** `vercel.com/dylan-natrx/bop/analytics` (page views + custom events) and `vercel.com/dylan-natrx/bop/speed-insights` (Core Web Vitals). Both have to be **enabled once per project** in the Vercel dashboard — the package install alone isn't enough.

---

## What's built (v1 feature-complete)

**§ 1 Hero ([src/components/hero/](../src/components/hero/))** — done. Topbar replaced by the sticky `SectionNav` (4 link nav with scroll-spy). Headline, lede, 4-stat stack, two-column figure with `FigurePanel` on the left and `HeroMap` (Mapbox GL JS, custom dark inline style) on the right. All 78 sites render as a circle layer colored by composite score. Top-10 get pulsing halos. Borough + water-body labels render as DOM markers. Hover tooltip works. Bidirectional hover between FigurePanel and HeroMap works.

**§ 2 Stakes & problem ([StakesAndProblem.tsx](../src/components/sections/StakesAndProblem.tsx))** — done. Headline "Rebuilding the harbor's oyster reefs, and choosing where to start." Four body paragraphs: harbor history (350 sq mi reef, 15-foot visibility, food web) → opportunistic siting "happened" at proof-of-concept scale → the shift to systemwide planning with the 10–15 funded sites by 2029–2030 target (inline `<GlossaryTerm termId="candidate-site">` link on "candidate restoration sites") → "the framework on this page is how Billion Oyster Project and Natrx built that capability together." Carolyn Khoury pullquote ("we've moved from considering each restoration site individually to understanding what the whole system needs to support a self-sustaining population") between paragraphs 3 and 4. Portrait-format `EditorialImage` (`section2.jpg`) right column.

**§ 3 Methodology, made visible ([MethodologyMadeVisible.tsx](../src/components/sections/MethodologyMadeVisible.tsx))** — done. Headline "How a framework finds the sites that connect a harbor into a self-sustaining system." (was "…that earn the next dollar"; Khoury rejected the ROI framing 2026-07-13.) Intro credits the partnership and lands on the framework asking two questions in order. The phrase "Two custom data products were generated by *Natrx Assess*" carries the page's first-encounter `<GlossaryTerm termId="natrx-assess">` wrapper around the italic `<em>` so readers can jump to the drawer entry on first contact. A `Pullquote` from Mike McCann (BOP Director of Science and Research) sits between the intro and the walkthrough — on the confidence-layer framing ("knowing where we're confident and where we're not is exactly what we want when we're making these decisions"). Below the pullquote: the six-step `MethodologyWalkthrough` (`WalkthroughMap` 3fr / `SpectraPanel` 2fr / bottom strip with copy + controls right-anchored). Step 4 and step 5 titles render *Natrx Assess* italic + white inline. Below the walkthrough: three `TopRankedCallout` cards (Arthur Kill / Living Breakwaters cluster / Wolfe's Pond) each with a live `SiteMiniMap`.

**§ 4 What the analysis made visible ([WhatAnalysisMadeVisible.tsx](../src/components/sections/WhatAnalysisMadeVisible.tsx))** — done. Headline "Three patterns the ranking surfaced." **Three** `FindingBeat` components as of 2026-07-13: a new full-width leading beat ("The best water is not always the easiest place to build.") carrying the Arthur Kill Superfund disclosure, then beat 1 ("Oysters and shorelines, one intervention.") with `EditorialImage` of shoreline change at Living Breakwaters; beat 2 ("A map of where to invest in more data next.") with `ConfidenceDistributionChart` (stacked horizontal bar showing the 8/14/24/14/18 tier distribution). Beat 2 is the data-investment framing — naming the unevenness of observational coverage and closing on the framework's role as a map of where to send the next round of monitoring effort. Italic closing thread unchanged.

**§ 5 What this unlocks ([WhatThisEnables.tsx](../src/components/sections/WhatThisEnables.tsx))** — done. Eyebrow "What this unlocks." Headline "The pipeline becomes operational." Three nested beats with teal-bright mono kickers — **Operational** (one sentence: BOP can now move priority sites toward design and permitting at the same time, with the comparative ranking guiding where to commit time and capital first), **Institutional** (six sentences with the NY State Environmental Impact Statement detail — scheduled to conclude by end of 2028 — and the "regulators have been wanting" framing), **Mission** (the 2030 one-billion-oyster target is now operationally achievable because the framework makes a parallel pipeline credible). A `Pullquote` from Lise Montefiore, PhD (Water Quality and Data Scientist, Natrx) hinges between the three beats and the closing paragraph ("Water quality data in a harbor like this is complex. Our work was to extract it from many monitoring stations and turn it into something BOP could make decisions from."). Closing paragraph opens to "coastal districts, state agencies, port authorities, foundations, and restoration practitioners at every scale" and renders *Natrx Assess* italic + white. Closes with `nyoyster.webp` (also the page's Open Graph image). Section id stays `what-this-enables` so anchors and nav don't break.

**Persistent page chrome:**
- `SectionNav` ([src/components/layout/SectionNav.tsx](../src/components/layout/SectionNav.tsx)) — sticky top, brand lockup left, four short links right (Stakes / Methodology / Findings / What this unlocks). "At scale" was removed 2026-07-13 — the brief bans the phrase. IntersectionObserver scroll-spy.
- `SiteChromeProvider` ([src/components/chrome/](../src/components/chrome/)) — right-edge drawer affordance + drawer. Two tabs: **Glossary** (25 alphabetized entries; `productName: true` entries — currently only Natrx Assess — render the term in italic + medium-weight) and **Press contact** (two side-by-side cards: Andi Cross / BOP / phone, Dylan DiBona / Natrx / email; each eyebrow links to org site). Drawer opens on edge-tab click, on `<GlossaryTerm>` click anywhere in the body, or programmatically.
- `Footer` ([src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx)) — partnership lockup with each logo linked to its org site (natrx.io, billionoysterproject.org), divider rule, single editorial credit line.

**Analytics:** Vercel Analytics + Speed Insights wired in `app/layout.tsx`. Custom event wrapper at [src/lib/track.ts](../src/lib/track.ts). Five typed events: `section_reached`, `walkthrough_step`, `drawer_opened`, `glossary_term_clicked`, `top_ranked_viewed`. Page views, geo, referrers visible on the Hobby tier; custom event breakdowns require Pro Analytics ($10/mo base + overage, separate from the Vercel Pro developer subscription).

**Pullquote component ([Pullquote.tsx](../src/components/sections/Pullquote.tsx))** — Fraunces italic body at section-subhead scale, JetBrains Mono uppercase attribution + role separated by a middle dot, left vertical rule in teal-bright, `max-w-[60ch]` centered. Four instances on the page: Khoury (§2), Collinson (§3 intro), McCann (§3, before the walkthrough), Montefiore (§5).

---

## Critical learnings (cumulative across sessions)

If you only read one section of this doc, read this one.

### Map data architecture (current, post-OSM rebuild)

**Two GeoJSON sources drive every map on the page:**

- `public/data/region-land.geojson` (~614KB, 132 polygons) — single master land source. Built from OpenStreetMap `natural=coastline` data for the NYC region (bbox 40.4–41.5 lat, −74.4 to −71.7 lng), stitched into closed island rings (Long Island, Manhattan, Staten Island) and one open mainland ring (NJ + NY mainland + CT) closed along the bbox edges. Simplified to 0.0002° tolerance. Same fidelity everywhere; no seams between county / state polygons.
- `public/data/hudson-river.geojson` (~55KB) — Hudson River polygon, derived from OSM `natural=water` `water=river` multipolygon relations in the Hudson Valley bbox (Tappan Zee, named and unnamed Hudson River segments). Drawn ON TOP of the land fill with `#061321` (water bg color) so it carves out the river visually. NJ and Westchester polygons would otherwise pave the river over because their political boundaries run down the middle.

**Layer order in the Mapbox style (HeroMap, WalkthroughMap, SiteMiniMap):**
1. `background` (deep navy water, `#061321`)
2. `land-region-fill` (`#15314A`, all land)
3. `water-hudson-fill` (`#061321`, carves out the Hudson)
4. `land-region-edge` (`rgba(120, 158, 184, 0.35)`, coastline outline)
5. `water-hudson-edge` (same outline color for the river banks)
6. site circles / interaction layers

The older patchwork of four polygons (`nyc-boroughs`, `nj-shoreline`, `westchester`, `upstate-ny-ct`) is no longer referenced by production maps. The files are still on disk because the diagnostic `/test-map` route and `CoastlineTest` component reference them. Don't delete them without also pruning those references.

### Why the OSM rebuild was necessary

The previous patchwork had three concrete problems that all stemmed from mixing data sources at different resolutions:

1. **Seam between NYC and Long Island** — the upstate polygon's harbor-exclusion clip ran at lng −73.72 (a straight rectangle edge). The NYC boroughs polygon's eastern coast at Queens runs at the actual Queens-Nassau border. Where they joined, the edge stroke drew a visible vertical line through the landmass.
2. **Hudson disappeared above Manhattan** — NJ, Westchester, and the upstate polygons each trace their political boundary down the middle of the Hudson. They collectively paved the river. Hand-traced ribbon attempts looked unnatural at the Tappan Zee.
3. **Coarse polygon edges** — at 16-pt (CT) and 68-pt (NY State at PublicaMundi) resolution, the polygon's straight-line segments showed as visible wedges in the visible map area.

The OSM rebuild solved all three at once: same fidelity for every coast, real Hudson polygon, no political-boundary artifacts in the river.

### Editorial tone rules (carry forward, no exceptions)

- **No em dashes anywhere.** Use commas, periods, colons, parentheses, or semicolons.
- **No negation-led copy.** Never open a body block with "Not X" or pair an assertion with its negation in the same breath. This recurred multiple times on the spectra panel; if you're tempted to write "X, not Y" reverse it to lead with the affirmative. (Detail in `memory/feedback_no_negation_jargon_copy.md`.)
- **No abstract single-word jargon** like "constructability" or "actionability" when a verb phrase explains what it does.
- **No "It's not X, it's Y"** constructions — AI cliché.
- **No "unexpected", "surprise", "discovery", "happy accident"** in § 4. The shoreline erosion data was a deliverable, not a discovery.
- **No CTAs anywhere on the page** — no "talk to us," no buttons styled as conversion targets. Press contact in the drawer is editorial, not sales.
- **Past tense for completed work, present tense for the partnership and the framework.** The 26-week engagement is past. The partnership is ongoing.
- **Natrx Assess: italicized + pure white (`text-white`) in every body-text occurrence.** First occurrence on the page (§ 3 intro) is wrapped in `<GlossaryTerm termId="natrx-assess">`; subsequent body mentions (§ 4 Beat 1, § 5 closing portability graf, walkthrough steps 4 and 5) carry the same styling but no link, so the inline glossary affordance reads as a first-encounter introduction. Figure captions (e.g. § 4 "Source: Natrx Assess…") are intentionally unstyled — chrome, not body voice. No product card treatment, no CTA.

### Mapbox gotchas

- **`mapbox-gl/dist/mapbox-gl.css` overrides `position: absolute` on the map container.** Use inline `style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}` on the container ref. Inline beats imported CSS. See HeroMap.tsx.
- **Mapbox marker positioning conflicts with CSS animations on transform.** Nest: outer wrapper holds Mapbox's positioning transform, inner div has the animation class. See the halo creation code in HeroMap.tsx.
- **Mapbox 3.x default projection can be globe.** Explicitly pass `projection: 'mercator'` to the constructor.
- **Custom inline style with geojson sources is fully self-hosted.** No tiles, no Mapbox-hosted styles. The token is still required at init.
- **Mapbox emits no clear error when a token is truncated** — it returns "A valid Mapbox access token is required." The Mapbox public token is exactly 94 characters. If yours is shorter, suspect paste/copy truncation. We hit this in production; the Vercel-stored token was 85 chars.
- **Dev server HMR is unreliable when geojson files change.** The map gets into a stuck `loaded: false` state with no useful error in the console. When this happens: kill the dev server with `pkill -f "next"`, sleep 2, and restart. The production build is the authoritative validator — `npm run build` and inspecting the prod deploy is the verification path that actually works when HMR is glitching.

### NEXT_PUBLIC_* env vars on Vercel

- Inlined at build time. Updating the env var without rebuilding does nothing.
- After changing the env var on Vercel, trigger a rebuild (`git commit --allow-empty -m "Retrigger build" && git push`).
- `vercel env pull` does not always include NEXT_PUBLIC_* values in the file. Use `vercel env ls` for ground truth.

### Git + GitHub

- Two GitHub accounts authed (`dylan-natrx` and `dylandibona`). Pushes need `dylan-natrx` active. If a push 403s, run `gh auth switch --user dylan-natrx`. This still trips us occasionally.
- **In Cowork, the shell is a sandboxed Linux VM, not your Mac.** It has no `gh` login, no SSH keys, no keychain access, and cannot `git push`. Claude can commit locally; **you** run `git push`. (In Claude Code the shell *is* your machine, so git works normally there — that difference caused an hour of confusion on 2026-07-13.) The GitHub *connector* is a third thing again: an API client that can commit via `push_files` if, and only if, the OAuth grant covers the `dylan-natrx` scope. The Vercel connector currently 403s for exactly this reason: `Not authorized: Trying to access resource under scope "dylan-natrx"`. When re-authorizing either connector, explicitly grant the `dylan-natrx` account/team, not just the personal scope.
- **Cowork cannot delete files in the repo by default,** which strands `.git/index.lock` after every git command and breaks the next one. Fix: call `allow_cowork_file_delete` once per session.
- **Never use `git add -A`** near the local-only reference docs (`_master_docs/`, `_overview-documents/`, and the loose top-level `BOP_*.md` notes). The `.gitignore` covers them but the discipline still matters.

### Layout / CSS gotchas specific to this page

- The hero figure's height needs an explicit floor: `min-h-[640px] lg:min-h-[720px] lg:h-[min(90vh,860px)]`. Without it, short viewports compress the map.
- The hero figure was previously breaking out of the section scaffold with `w-[95vw]` — the browser absorbed the overflow with `margin-right: -112px`, pushing the figure left of center. Fix: drop the breakout so the figure fits the section content area naturally. See HeroFigure.tsx.
- Land fill color is `#15314A` (palette token `bg-soft`). Earlier `#0E2236` was only 8/15/21 RGB above water `#061321` — too low contrast, land read as water where polygon edges sat off-screen.
- `text-shadow: 0 0 6px rgba(6, 19, 33, 0.9)` on borough/water labels — keeps them legible over varied land/water rendering.

### Build & deploy verification (when HMR fails)

When dev HMR is stuck and `npm run dev` won't load the map cleanly:
1. `npm run build` — production build is the source of truth for whether code compiles
2. Push to main and wait for Vercel
3. Open the production URL in a real browser
4. If you need to inspect the prod bundle directly: `vercel curl <path> --deployment <url>`

---

## Analytics dashboards — first-time access

The packages and event wiring shipped in commit `b4f8f8b`. Before any data arrives, **you must enable Analytics on the Vercel project once**:

1. Visit `https://vercel.com/dylan-natrx/bop`
2. Open the **Analytics** tab in the project nav → click **Enable**
3. Open the **Speed Insights** tab → click **Enable**

Both are free on Hobby. Data starts within a minute of the next production page view.

**What lives where:**
- Standard metrics (page views, top referrers, geo, devices): `/analytics`
- Custom events: same page, scroll to the Events section. Five events to look at:
  - `section_reached` (property: `section`) — drop-off across §1 → §5
  - `walkthrough_step` (properties: `step` 1–6, `via` next/previous/jump/keyboard) — methodology engagement
  - `drawer_opened` — total drawer opens
  - `glossary_term_clicked` (property: `term_id`) — which definitions readers look up
  - `top_ranked_viewed` (property: `site`) — Arthur Kill vs Living Breakwaters vs Wolfe's Pond view counts
- Core Web Vitals: `/speed-insights` — LCP, CLS, INP, broken down by route

---

## What needs to happen next

In priority order:

1. **Enable Analytics + Speed Insights in the Vercel dashboard** (one-time, ~30 seconds).
2. **Mobile QA pass.** All sections have been built lg-first. Real mobile verification still pending.
3. **Visual review of map fidelity on the production deploy.** The OSM rebuild was verified via queryRenderedFeatures and the production build, but the user's eye is the final acceptance gate.
4. **Optional follow-up:** the "Applied Filters" panel in the methodology walkthrough should be re-passed to read as a confident running summary, not a glossary of definitions. See `memory/project_applied_filters_panel_rewrite.md`.
5. **Optional follow-up:** delete the dead-code paths — `src/components/hero/CoastlineTest.tsx`, `src/app/test-map/page.tsx`, `src/lib/land.ts` (legacy SVG coastline), `src/lib/projection.ts` projections (only `calculateMarkerRadius` is still used). And once those are gone, delete the now-unused `public/data/nyc-boroughs.geojson` / `nj-shoreline.geojson` / `westchester.geojson` / `upstate-ny-ct.geojson` files (production no longer references them).

Always reference [CLAUDE.md](../CLAUDE.md) for the locked editorial decisions before writing copy.

---

## Data files

| File | Source | Used by |
|---|---|---|
| `public/data/region-land.geojson` | OSM coastline ways via Overpass API, stitched + simplified | All production maps |
| `public/data/hudson-river.geojson` | OSM `water=river` multipolygon relations, unioned + simplified | All production maps |
| `public/data/rankings.geojson` | Natrx pipeline GeoJSON copy | `useRankingsData()` and every map's `sites` source |
| `public/data/statistics.geojson` | Natrx pipeline statistics | `useStatisticsData()` for the walkthrough |
| `public/data/nyc-boroughs.geojson`, `nj-shoreline.geojson`, `westchester.geojson`, `upstate-ny-ct.geojson` | Legacy patchwork, US Census 500k + handmade | `CoastlineTest` + `/test-map` debugging routes only. Not referenced by production maps. |
| `BOP_Feb2026_Pipeline_Rankings.geojson` (repo root) | Source of truth from Natrx | Reference; the file copied into `public/data/rankings.geojson` is what the app loads |
| `BOP_Feb2026_Pipeline_statistics.geojson` (repo root) | Source of truth | Same |

The OSM data was fetched via Overpass:
- Coastlines: `way[natural=coastline](40.4,-74.4,41.5,-71.7);` (10.6MB raw)
- Hudson: `way[natural=water](40.85,-74.05,41.5,-73.7); relation[natural=water](...)` (5.8MB raw), filtered to `water=river` with `Hudson River` or unnamed water=river relations in the Hudson valley

If you need to regenerate the files, the Overpass queries and stitching script logic are documented in the `658489c` and `85bcab4` commits.

---

## Verification workflow

```bash
npm run dev               # Dev server. HMR may glitch on geojson changes — restart if so.
npm run build             # Authoritative source of truth for whether the code compiles.
npm run start             # Production server locally on port 3000.
```

When the dev server's map is stuck:
```bash
pkill -f "next" && sleep 2 && npm run dev
```

After pushing to main:
- Vercel auto-deploys (~30–45s).
- Open the production URL in a real browser. Inspect the map.
- If you need to verify what's in the bundle: `vercel curl <path> --deployment <url>`.

---

## Terminology lock (editorial)

| Say | Not |
|---|---|
| Site score (chart UI) / relative site score (§ 3 first-use prose) | Suitability score · Habitat Suitability Index · Confidence |
| Data support / monitoring coverage | Confidence (for ConfidenceRule) |
| Sites already in design | Pipeline |
| Candidate sites | Pipeline sites |
| Reef restoration | Oyster farming / aquaculture |
| Three patterns the ranking surfaced | Unexpected finding / surprise / discovery |
| Restored first | Funded first |
| Salinity | Salt |
| Billion Oyster Project | BOP (in any reader-facing copy) |
| Connectivity / a self-sustaining system | Earning the next dollar / ROI framing (these are not for-profit projects) |
| Falls inside a federal Superfund cleanup area | Is a Superfund site (Arthur Kill is a waterway within Superfund-affected sediment, not an NPL listing) |
| How buildable / where data is strong | Constructability / data-strength jargon |
| Operational conditions / context filters | "Constraints, not scores" or other negation-led prose |

No em dashes anywhere. No "It's not X, it's Y." Past tense for completed work, present tense for the partnership and the framework.
