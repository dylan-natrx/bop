# NCCF: Status

**Last updated 2026-08-28, end of the third session (editorial and design review).**

Read this first. It says where the page actually is and what is stale.

---

## Files of record

| File | Status |
|---|---|
| `reference/vanishing-edge-draft2.html` | **Current.** The design and structure of record. Seven beats, real photography, the three-step interactive. Edited throughout 2026-08-28; the sha and byte count in earlier notes are superseded. |
| `reference/vanishing-edge-reference.html` | Superseded. The six-beat build. |
| `../../nccf-packet-amendment-03.md` | **Void.** Written against the six-beat build. Do not run Phase 7 from it. |
| `NCCF-copy-deck-draft-3.docx` (in `NCCF x Natrx/`) | Transcribed from the build. Marks on it apply directly. Predates the 2026-08-28 copy changes below. |

**The filename still says `vanishing-edge`. The page no longer does.** "The Vanishing Edge" was scrubbed 2026-08-28 as a copywritten title. The file keeps the name because `src/app/projects/nccf/route.ts` reads that literal path and because the name is how three sessions of notes refer to it. Renaming it is a Claude Code task, not an edit.

---

## Claude Code: what is actually merged

Earlier versions of this file said Phase 6 was unmerged and listed three pieces of work. **All of it is on `main`.** Corrected 2026-08-28 against the git log:

| Commit | What |
|---|---|
| `f12758b` | Phase 6: NCCF shell, tokens and chrome |
| `ad4e84e` | Amendment 04a: contain the login title; gated `/preview` |
| `0d89b2e` | Amendment 04a: login title takes the card scale |
| `ad0dd7c` | Amendment 04b: serve draft 2 at the tenant root; `/preview` retired |

**Outstanding:** the full port into the Next platform, which is amendment 04 and has not been written. Plus the two packets below.

**Phase 7 remains void.**

---

## The deployed site is behind the file

`nccf.natrx.report` serves whatever is committed. Everything from 2026-08-28 lives in the working tree only. Anyone reviewing the live site is looking at the 2026-08-27 build. Deploying the current reference file is packet work and is queued.

---

## Session 3 changes, 2026-08-28

All applied to `reference/vanishing-edge-draft2.html`. Editorial rationale is in `EDITORIAL.md` under the 2026-08-28 amendments; every number traces to `CLAIMS.md`.

### Register corrections that changed the page

**The cost framing came back.** `CLAIMS.md` had retired percent-of-program-spend, attributing the retirement to Nick. That was a register error: Nick proposed the framing himself on 2026-07-22 and his apples-to-oranges caveat belonged to a different claim. What was wrong was the number. The page now says the analysis came to about one percent of the grant.

**The grant is fully sourced.** $421,238,074 to the Atlantic Conservation Coalition, ~$30M to NCCF over five years, 595 acres. The award's 595 acres is the SOW's 600. Same program. **This closes the old open item asking Nick to confirm the grant funds this scope.**

**North Carolina has more than 12,000 miles of estuarine shoreline**, sourced to NC DEQ. The 2,900 is what this project measured. The interactive previously stated 2,900 as the state total, which was a factual error and is fixed.

**43.44% is the published concentration figure.**

**Navy Shell's county is decoupled from the page.** The peak retreat is no longer attributed to Dare in the body copy, the bar label or the interactive. Dare as worst county overall and Hyde second are confirmed and stay.

### Copy

Beat 1 loses "at one meter resolution" from the deck. Beat 2's "hard part" becomes "difficult part" so Brady's line in Beat 5 reads as a callback. Beat 3 loses the unsourced six-figures sentence. Beat 4 states the 90/10 split plainly instead of pointing at "that imbalance." Beat 5 gains the reason the work runs in two passes, gains actors in place of the passive run, loses the pixel arithmetic, and gains the survey-limit comparison and the cost percentage. Beat 7 loses "pre-scoping."

**Pixel arithmetic is retired.** The page states the movement it needed to catch and states that publicly available satellite imagery cannot see it. No invented units.

### The interactive

One vocabulary, **pass**, everywhere. Steps are *Pass 1 · Satellite imagery*, *Pass 2 · Aerial photography*, *The result · Where it's worst*. The headnote's restatement of the two-pass setup is cut; the step notes already do that work. Note 0 opens on the state's 12,000+ miles.

### Design

**The supergraphic fills its column by construction.** `.sg` is a container and `.sgnum` is `40cqw`, which is the measured width of "43.44%" solved against the column rather than guessed against the viewport. It cannot overrun again if the figure changes. The two 900px rules became container queries.

**The coast band draws north to south.** Per-point transition delay keyed to `cy` over 1.25s, points at `r=1.15` instead of `0.8`. Verified by sampling opacity mid-animation: at 750ms the northern trace is at 0.73 and the mid and southern points are still at 0. Reduced motion gets it fully drawn, no animation.

**The chapter rail no longer disappears beside the interactive.** The palette check tested vertical overlap only, so the dark `.labnote` panel on the right flipped the rail to near-white while it sat over paper. The test now requires horizontal overlap.

**ATLANTIC OCEAN is set in ink** on both maps. It was paper white on a 10% ink field, which is to say invisible.

---

## Still open

1. **The voice.** Better than it was. Beat 5 has actors now. Not finished.
2. **The headline.** Reopened and parked. *Everyone knows North Carolina's coast is eroding. But how much? And where?* is still in the file.
3. **The HTML page title.** "The Vanishing Edge" is gone. The replacement is a placeholder. The story is the approach, not the finding, and the title should say so.
4. **Navy Shell's county.** The only remaining question for Nick. The page no longer depends on it.
5. **Publishing the cost percentage effectively publishes the $350K contract value**, since the ratio times the public $30M reconstructs it. Dylan and Nick.
6. **The rail collides with the coast band's NORTH CAROLINA label.** Reviewed 2026-08-28 and deliberately not fixed.
7. **"The result · Where it's worst"** wraps to two lines in the control panel.
8. **Jacob's title and name spelling for print.** Jacob's NOAA sequestration citation.
9. **Getty video licence.** Three clips in `_assets`, none used.
10. **Audio version.** Discussed, not started.
11. **`INTERVIEW-JACOB-2026-08-17.md` still says the dataset "tops out near -15 ft/yr."** `CLAIMS.md` corrected that to -45.91. Two files in the repo contradict each other.

---

## Mobile

**The page is not responsive in production, and the first cause is structural.**

`vanishing-edge-draft2.html` is a fragment. No doctype, no `<html>`, no `<head>`, and **no `<meta name="viewport">`**. It was authored for the Artifact tool, which injects its own skeleton. `src/app/projects/nccf/route.ts` serves it verbatim, so nothing injects it, and a phone lays the page out at roughly 1000px. Measured on a 390px device: `window.innerWidth` reports 1029. Every `max-width` breakpoint therefore never fires.

Note that `route.ts`'s own docblock asserts the file "is a complete standalone HTML document with its own `<head>`." It is not. That comment is how this got past review.

**First fix:** wrap the served output in a real document in the route handler. Wrapping there rather than in the reference file keeps the file editable in the design loop and keeps its identity as the artifact of record.

**Second, the real responsive pass.** Desktop-first stylesheet with mobile rules bolted on per component. Never designed at phone width. Known work once the viewport is fixed:

- Vertical rhythm. `section{padding:15vh 0}` plus `.pull{padding:15vh}` plus the footer's `12vh` margin. On an 844px phone that is ~127px above and below every beat, seven times.
- Type has no mobile step below the clamp floors: `h1` floors at 46px, `h2` at 34px, `.closing.tight` at 26px, all tuned for desktop.
- The interactive. `.labrow` stacks under 900px and the stacked version has never been reviewed. The map falls back to `aspect-ratio:16/10`, which is landscape geometry in a portrait column.
- The coast band's 2:1 viewBox needs its own portrait crop.
- The supergraphic is now container-sized, so it fits by construction, but the overprinted sentence has not been reviewed under 900px.
- The ink field and closing quotes are `vw`-based and untested.
- Photo prints and their halftone shadows at small sizes.
- Tap targets. `.labside button` is roughly 32px tall against a 44px floor.
- Whether the chapter rail earns its place on a phone at all.

---

## Session 5, 2026-08-28 evening

Amendment 05 Phases 1 and 2 are merged and live (`636c8cb`), including the camera fix (`f671b00`).
The page is served as a real document, the responsive pass is in, and production is verified.

### Applied to the reference file this session

- **Headline breaks before the ink-2 question.** `<br>` before the `<em>`. **No extra leading**, deliberately: the colour change carries the separation.
- **Hero rhythm tightened.** `#b1` bottom padding 11vh to 5vh, new `#b2{padding-top:4vh}`, coast band bottom margin 12vh to 7vh. Deck-to-band gap measured at 130px, down from about 234px.
- **Curly apostrophes throughout.** 16 straight apostrophes converted in the prose. The interactive's step notes are JS single-quoted strings and contained none. **All quotes and apostrophes on this page are curly from here on.**

### Decisions taken

- **The phone Contents bar stays.** It was built for phones deliberately. **The open sheet takes the ink colour**, not paper, which also resolves its contrast problem: reversed type on ink clears AA, where the current pale-ink-on-paper links sit at 1.57:1.
- **The desktop rail stays**, and the collisions get designed around rather than architected away. A fly-out bug was considered and rejected: it trades away the always-visible progress indicator, which is the thing providing the depth.
- **Masthead becomes `NCCF × Natrx`**, multiplication sign, matching the BOP lockup.
- **Supergraphic is locked** at the full-bleed numeral with the overprinted sentence.
- **The cost percentage stays on the page.** Dylan's call, made knowing it reconstructs the contract value against the public $30M award.
- **Beat 3 carries no cost figure.** Reviewed and left as is.
- **No password at launch.**

### Open, and this is where we stopped

1. **The interactive's step 3.** It currently returns to the step-1 camera, so the reader goes out, in, and back, and the payoff reads as an absence rather than a finding. Agreed it needs rebuilding. See the section below.
2. ~~The beat order.~~ **Done. See below.**
3. **The page title.** Still a placeholder. The steer is that the story is the approach and the title should answer "why is this news," not "the coast is eroding."
4. **The headline.** Parked. Needs a working session.
5. **Rail label for beat 5** if the collisions get fixed. Editorial, so it needs Dylan.
6. **`og:image`.** Decided it should be the interactive, green survey boxes on the wash with the measured points, rendered at 1200x630. Not built.
7. **The Lise Montefiore review gate.** Still unresolved, still the longest lead time left.
8. **Launch date.** Dylan's. Note the page currently promises the Federation's data goes public "this fall"; if that slips past launch the promise is live on a public page.
9. **Repo out of Insync's sync scope.** Three git incidents today, one costing a working file. Scheduled.

---

## The interactive, where it stands

**The problem.** Step 1 is the full coast, step 3 returns to the full coast. Out, in, back. The only difference at the third stop is faint boxes and a stronger wash, so it reads as a round trip rather than a payoff. It also breaks the original rule that each step changes scale.

**What the data allows.** Searched the repo and the project folder: **the pass-1 change analysis output does not exist in any form.** No hexagons, no change raster, no wetland-change values. It cannot be drawn from what we hold, and a fabricated version is what voided Phase 7.

**What we do own:** 5,004 coastline points with rates, the 39 areas with a worst rate and transect count each, and **`deciles` in `nccf-figdata.json`, the ten-decile concentration curve (43.44, 19.04, and falling). Real, ours, and never drawn.** The bar chart was cut as redundant with the supergraphic, but that judgment predates the interactive's rebuild.

**The direction, agreed 2026-08-28.** Step 1 becomes a conceptual demonstration of the comparison rather than a coverage wash: push into one real stretch of coastline, show marsh at the first date, the same stretch at the second, and the difference, then pull out and sweep the region.

**Two conditions on that, and they are not negotiable.** The marsh band must be visibly schematic and unlike the data views, and the caption must say it demonstrates how the comparison works rather than what it found. Illustrating an operation is legitimate; displaying an invented result is not.

**Held pending the proto-story review.** Dylan's call 2026-08-28: the data ask goes to Nick with the proto-story rather than as a separate request, so the interactive's third step is parked until then. Deliberately parked, not stalled. **The beat swap was decoupled and executed, see below; the dependency runs the other way now, and the interactive must end on something about the method.**

**The ending depends on one thing.** If Nick can supply the 1,354 hexagon centroids with their wetland-change values, step 3 becomes the real agreement between the two passes, which would also let the page *show* the under-four-percent honesty instead of asserting it. If he cannot, step 3 becomes the concentration curve, which is a finding we own outright but which argues against swapping beats 4 and 5, since the interactive would then be about the finding rather than the method.

**Step 2 is good and stays.**

---

## Amendment 06 applied (2026-08-28, Claude Code)

Closed: masthead is the NCCF × Natrx lockup; readable small text (captions,
figure legends, byline) moved to ink-70; inactive rail links to ink-70 with
numbers at ink-45; glosslink text in full ink with the tint underline kept;
glossary tabs regained a visible focus ring; town labels paint above the
measured points (Beaufort legible); coast band's NORTH CAROLINA label moved
clear of the rail; rail gutter added; the phone Contents sheet takes the ink
colour per the 6b decision; share metadata (description, og:*, twitter:card)
added to the served wrapper with og:title mirroring the page title.

Held, per instruction: the lab control states (Task 5 — inside the
interactive, which is mid-redesign). Task 8 (get .git out of Insync's sync
scope) is proposed only — options in the PR; Dylan executes.

Amended after the beat swap: the rail-label dependency dissolved ("04 The
method" does not wrap), so 6a closed fully — the gutter experiment was
removed (it caused two other labels to wrap; measured clearances are 78px
to content and 24px to the map label without it), and inactive rail
numbers moved to ink-70 (2.78:1 at ink-45 failed AA; verifier finding).

Still open, unchanged: og:image (needs the pass-2 render at 1200x630),
the interactive rebuild, beat order, title, headline, Montefiore gate,
launch date.

---

## Beats 4 and 5 swapped, 2026-08-28

**The method beat now comes before the finding beat.** `b4` is the method, `b5` is the finding.

**Why, on story grounds alone.** Beat 3 ends on "which stretches to protect, in what order, and on what
evidence." The next beat should be the evidence. It was the conclusion. The tell was that the finding
beat had to stop and explain transects before its number could mean anything, which is method
exposition smuggled into the wrong beat. The locked spine also runs measure-then-find, and the page
was running it backwards.

**An earlier note in this file made the swap depend on how the interactive ends. That was backwards
and is withdrawn.** The order is wrong independently. Deciding the swap constrains the interactive,
not the reverse.

**The consequence, and it is binding.** The interactive now sits in a beat about method, so **step 3
must end on something about the method.** The concentration-curve fallback is therefore off the
table: it would put the finding inside the method beat. If Nick cannot supply the hexagon values,
step 3 needs a different method-serving idea, or the interactive drops to two steps.

### What changed in the file

- The two `<section>` blocks and their ids swapped. The method beat is `b4`, the finding is `b5`.
- Rail labels: **04 The method**, **05 The finding**. The method beat's kicker changed from
  "How it was measured" to "The method". **This also fixes the wrapping rail label**, which was the
  original reason Amendment 06 task 6a needed an editorial decision. **6a no longer needs a new
  string from Dylan.**
- Section headlines unchanged: "More coast than anyone could look at" and "The loss is not spread
  evenly".

### Copy, two edits only

**The transect explanation moved into the method beat**, folded into the second-pass sentence:
Natrx set about 93,000 fixed points along those 2,900 miles, each on land with a line running out to
the water's edge, measured five times across the decade to give a rate.

**The finding beat now opens on the number:** "Half of those 93,000 spots are pulling back faster
than eight and a half inches per year. Four in ten are losing more than a foot." Then the ranking
sentence. Same words as before minus the explanation that moved, with "93,000" carried forward so
the reference survives.

Nothing else moved. Supergraphic, the Dare paragraph, the scale bars, the 90/10 paragraph and the
rest of the method beat are untouched.

### Verified at 1440

Section order and ids correct, interactive in `b4`, supergraphic in `b5`, rail labels and hrefs
correct, scroll-spy tracks every beat, zero page errors.

**One testing note for whoever checks this next:** the page sets `html{scroll-behavior:smooth}`, so
a scripted `scrollTo` followed by a short wait reads the rail mid-animation and looks stuck. Disable
smooth scrolling in the harness before asserting on scroll-spy state.

---

## Correction, 2026-09-02: the screening-to-survey sequence

**An earlier rule in this file said "the wide screen did not select the 39 survey areas." That
overstates the case and is withdrawn.** It was built from interview fragments and was never checked
against the contract. The SOW says the opposite of what we were enforcing.

**Phase II, Wetlands Assessment & Change Analysis:**

> "Natrx will conduct a natural asset inventory of NC's flooded vegetation and a change analysis
> within the region outlined in Figure 1 **to best understand where further analysis is warranted.**
> The change analysis will highlight wetland loss hotspots, and **identify areas addressable for the
> Phase III erosion and carbon analysis.**"

**Phase III, Erosion & Carbon Analysis:**

> "**Once addressable areas are identified during Phase II**, Natrx will conduct spatial analysis to
> model carbon distribution in combination with erosion rates for those areas in order to prioritize
> opportunity sites."

So the wide pass came first and its contracted job was to identify the areas the granular pass would
measure. Nick's own framing matches: *"you can be more intelligent about where you exercise your
shoreline change analysis budget"* (2026-07-22, 13:06).

**What is true, and what the page may say.** The change analysis identified the addressable areas.
The final site list was settled with the Federation, per the SOW's Phase IV: *"The final selection of
shoreline segments will be determined in coordination with NCCF."* And coverage then expanded far
beyond the plan, 25 subprojects becoming 39, to the point where Nick jokes the screening phase was
almost redundant.

**Publishable:** the first pass pointed to the areas worth measuring, and the final list was settled
with the Coastal Federation. Both halves, together.

**Not publishable:** that the screen alone picked the sites, with no client role. And still not
publishable, unchanged: any claim that the wide pass *predicts* erosion. The r² of 0.038 governs that
separately and is untouched by this correction.

**Cost of the error.** This rule was enforced through three editorial sessions and shaped the
interactive twice. Check the contract before writing a rule from an interview.

---

## Session 6, 2026-09-01 / 09-02

**Everything below is in the working tree and uncommitted. `main` is still at `a3ccedd`. The live
site is the 2026-08-28 build and shows none of it.**

### What went into the page

**Beat 2 gained a before/after slider.** NASA Earth Observatory Landsat scenes of the mainland side
of Dare County, 1 October 2005 and 13 October 2024, centred on Manns Harbor. Unlabelled `_lrg`
source images, so the wipe cannot slice a burned-in caption; the dates and the Manns Harbor pin are
DOM elements over the frame. Credit line sits over the image. NASA imagery is usable with credit
(see `OPEN-QUESTIONS.md`). Figure is capped at 620px and measured flush to the text column at 1280,
1440 and 1512, in both quirks and standards mode.

**Dylan reported the slider reading wider than the content rail and it could not be reproduced.**
Measured 620/620/same-left at three widths. His call: not browser zoom, something else, move on.
Left unresolved and noted here so the next person does not re-measure it from scratch.

**Beat 7 copy drafted and in.** Grant, South Atlantic Salt Marsh Initiative, Boyd on Florence, the
datasets going public this fall.

**The interactive was rebuilt as two passes with three notes.** Pass 1 is the satellite screen with
the search corridor drawn on the coast; pass 2 zooms to the measured stretch and paints the
measured shoreline. Copy rewritten in plain sentences, no fragments.

**How the pass-2 map is drawn now, and why.** 5,004 measured points aggregate into 780 short
stretches on a 2.6-unit grid. Each stretch is scored by **how much land it is losing in total**, not
by its median rate, and banded by contribution quartile. Radii run 0.9 to 3.8. Palest painted
first, so the worst marks sit on top.

The check that validates it:

| Share of stretches | Share of all loss |
|---|---|
| top 4.2% | 25% |
| top 12.9% | 50% |
| top 30.4% | 75% |
| **worst-losing 10%** | **43.2%** |

That 43.2% lands on the page's published 43.44%, derived independently at a different unit of
aggregation. The finding survives the change of aggregation, which is the strongest thing we can
say about it.

### Bugs found and fixed this session

- **`mix-blend-mode: multiply` on the points group.** Multiply darkens every overlap, so two pale
  marks rendered darker than one severe one and the colour scale collapsed. Removed. This is what
  Dylan was seeing when he said the map showed no variation.
- **Colouring by median rate showed nothing.** Median answers how fast a stretch typically moves and
  deliberately discards the tail, which is where the whole finding lives. Under median, the darkest
  band held 12.4% of loss. Under sum of loss it holds 43.2%.
- **Z-order inverted.** Stretches were written worst-first, so SVG painted the darkest first and
  every pale mark covered them. Sorted palest-first.
- **`<use href="#ncLand">` for the corridor was invisible.** ID-specificity fill and stroke on
  `#ncLand` beat the `.corr` class inside the use shadow tree. Replaced with a real `<path>` and the
  duplicated `d`, which costs 80KB.
- **Reveals fired out of document order** (Dylan, on beat 7). The single observer used
  `threshold:.18`, so a short paragraph reaches 18% of its own height in fewer scrolled pixels than
  a tall one above it and can beat it in. Text reveals now use a second observer at `threshold:0`
  with `rootMargin:'0px 0px -14% 0px'`, which triggers on the top edge crossing a fixed line and is
  strictly document-ordered for stacked blocks. Graphics keep the area threshold, since the
  coast-band draw and the scale bars want to be properly in view before they animate.

### Open on the interactive, and this is where we stopped

**Dylan's question, unanswered:** on the pass-2 map the cluster at the bottom of the frame, around
Beaufort and Oriental, reads as the heaviest. The page says Dare is worst by far with Hyde second.
Either the map misleads or the copy does, and nobody has checked which. The likely innocent
explanation is that convoluted shoreline packs more stretches into less screen, so a busy area reads
heavy without carrying the most loss. **That is a hypothesis, not an answer.** The test is total
loss per named region, computed and compared against `CLAIMS.md`. **This is a `CLAIMS.md` collision
until someone runs it.**

**Other open items on the interactive:** 84 stretches are gaining ground while the copy says every
mark is losing. The palest band washes out against the white land fill. Whether to label Manns
Harbor on the pass-2 map, which collides with Manteo at about 16px.

**Dylan's call, 2026-09-02: stop.** The interactive is not close enough to justify more of this
session. It picks up in a fresh thread.

### Mobile

**Not started, deliberately.** Dylan's call: the phone pass is not worth doing until the interactive
is right. The rebuilt interactive has never been seen at 390px. `MID_N` was re-derived arithmetically
and never verified visually. The corridor, the new point set and the longer notes are all unchecked
on a phone.

### What is left, in the order it blocks things

1. **Answer the Beaufort question with the data.** Blocks trusting the pass-2 map, and possibly
   blocks a line of Beat 5 copy.
2. **Finish the interactive.** Pass 2's read, the gaining stretches, the palest band, labels.
3. **Commit and deploy.** Five modified files. Nothing from two sessions is live.
4. **Phone pass**, after 1 and 2.
5. **Page title.** Still a placeholder. The steer: why this is news, and the news is the approach.
6. **Headline.** Parked, needs a working session.
7. **`og:image`.** The interactive at pass 2, 1200x630. Not built.
8. **Nick's bundle**, going with the proto-story: hexagon change-analysis values, the image-quality
   artifact, the -45.91 versus -45.60 reconciliation, Navy Shell's county for completeness.
9. **Lise Montefiore review gate.** Open since July. Longest lead time to launch.
10. **Federation ghost forest photo permission**, with Jacob. Asked, not answered.
11. **`INTERVIEW-JACOB-2026-08-17.md` still says the dataset tops out near -15 ft/yr.** `CLAIMS.md`
    says -45.91. Two files in the repo contradict each other.
12. **Insync and `.git`.** Still scheduled, still not done.

---

## Session 7, 2026-09-02

### The Beaufort question is answered, and it is a real collision

Computed total land loss per county from all 93,418 transects, as `rect_width ×
land_change_ft_per_year` summed over eroding transects. Surveyed shoreline only.

| County | Sites | Transects | Miles surveyed | Loss sq ft/yr | Share |
|---|---|---|---|---|---|
| Hyde | 13 | 27,695 | 566 | 4,782,539 | 39.0% |
| Carteret | 14 | 42,926 | 490 | 3,769,808 | 30.7% |
| Dare | 8 | 10,380 | 220 | 2,624,949 | 21.4% |
| Pamlico | 3 | 8,937 | 197 | 895,606 | 7.3% |
| Pender/Onslow | 1 | 3,480 | 79 | 201,614 | 1.6% |

The 780 drawn stretches were reprojected back to lat/lon off the town markers (fit is
sub-pixel, so the map geometry is sound). Of the 101 marks in the two darkest bands:
**Carteret 52, Hyde 33, Dare 14.** Carteret holds 365 of the 780 marks.

**Dylan’s eye was right and the convoluted-shoreline hypothesis is wrong.** The Beaufort
cluster reads heaviest because it is heaviest, on the quantity the map encodes.

**Neither side is wrong. They encode different quantities.** Dare leads every intensity
measure: mean rate −2.08 ft/yr against Hyde’s −1.67 and Carteret’s −1.28, 10.5% of its
transects past 5 ft/yr against 9.4% and 8.9%, 11,960 sq ft lost per surveyed mile against
8,450 and 7,699, and the peak at −45.9. Hyde is second on those, so “Hyde close behind”
survives.

**The collision is one word.** Beat 5 says Dare “is the hardest hit overall,” a few hundred
pixels below a map whose marks mean total land lost, on which Dare is third. Proposed fix,
**not yet applied, Dylan’s call**: cut “overall,” name the metric. “Dare County, which takes
in much of the Outer Banks, is eroding fastest.”

**The larger risk, and it is not fixed by the copy edit.** County totals here rank the survey
allocation, not the counties. Carteret got 490 surveyed miles, Dare 220. Any reporter who
repeats this computation gets a different county ranking out of the page’s own data.

**County assignment is geographic inference** from layer centroids against known place names,
not a boundary-file join. Mouse Harbor, Rattan Bay and Long Shoal River sit near county lines
and could move. None of them changes the ranking.

### The interactive was rebuilt as three stops

Checked against the source calls first, not the synthesis. Nick, 2026-07-22: “It’s basically
telling you there are levels of focus. It’s blurry at the top... You’re starting at the top
and working your way down in a very logical methodological way.” Jacob, 2026-08-17: “I could
throw a dart at the map and find a place that needs a project,” and “now we have the
shorelines prioritized, so that’s step one done.”

The thing to demonstrate is the narrowing, not the concentration statistic. **Dylan’s call:
three stops, no fourth.** A physical-inspection stop was considered and cut, because we do not
know where field visits will happen and the page would be asserting it.

- **01 Before.** The whole coast, undifferentiated. 12,000+ miles.
- **02 Satellite.** A focus scrim narrows to the search region, and a coarse cell grid renders
  the grain the wide pass works at. **The cells are uniform coverage, not results.** The pass-1
  change-analysis output still does not exist in any form and nothing on this map claims to be
  it. The note carries both halves of the 09-02 SOW correction: the screen showed where marsh
  became open water, and the Federation’s own priorities set which stretches got measured.
- **03 Aerial.** Cells drop out, the measured stretches paint in at full resolution. Blurry to
  sharp, which is Nick’s metaphor rendered literally. This also revives the “zoom, blurry to
  sharp” concept beat that `DESIGN-DIRECTION.md` has carried as blocked on imagery since July.
  It was only ever blocked as a photographic effect.

**43.44% is no longer asserted inside the interactive.** It lives in Beat 5 with its own
caption. The interactive’s job is the method.

### Data changes in the map

Regenerated `#ncPts` from the 39 layers on the same 2.6-unit grid and the same
cumulative-loss quartile banding. **778 stretches drawn, 66 net-gaining stretches dropped.**
The copy said every mark was losing and 84 were not; that is now true by construction and the
caption says eroding stretches only. Band counts 28 / 76 / 153 / 521 against the previous
33 / 68 / 136 / 502, so the published concentration check survives the regeneration.

**The palest band was darkened.** Ramp is now #EFC2B2, #E79B80, #DA6A45, alert.

### UI, desktop and mobile

- **The wizard is gone.** No disabled buttons, no “Start over.” A three-segment stepper
  overlays the bottom of the map, 52px desktop and 56px mobile, both clear of the 44px floor.
- **Controls sit on the map**, per Dylan. The left control rail and the `.labside` column are
  retired. `.labrow` is the positioning context; `.labstage`, the legend and the note are its
  children.
- **The note is a card over the map on desktop** at min(38ch, 37%), and drops below the map on
  mobile, where an opaque card was eating two thirds of the frame.
- **Mobile map is portrait**, `aspect-ratio:3/4`, replacing the 16/10 landscape fallback.
- **Legend added.** Four swatches, “land lost / more.” Bottom-right on desktop, above the note
  on mobile. There was none before.
- **Swipe advances the stop** on the stage; arrow keys work on the stepper.
- Cameras re-derived: `MID` is now [382, 120, 566, 356], which fits the whole measured region
  including the Carteret cluster clear of the stepper. `MID_N` [520, 140, 236, 315] and
  `FULL_N` [335, 25, 430, 573] are portrait crops **verified visually at 390**, which
  `MID_N` never was.

Rendered and checked at 390 and 1440 in Chromium, all three stops, zero page errors.

### Open

1. **Beat 5’s “hardest hit overall.”** Dylan’s call, above. Not applied.
2. **The headline.** Dylan’s steer, 2026-09-02: end-goal oriented, in the zone of “before we
   can do anything about the eroding coast we have to know where to act first.” Frames the work
   as responsible rather than merely novel, and it clears the EDITORIAL problem that any
   “but where?” construction implies nobody knew. Not written.
3. **Not deployed.** The rebuild is in the working tree only.
4. **Dead CSS.** The `.labside` and `.labctl` rules are still in the stylesheet and no longer
   match anything. Left in place deliberately this session; sweep them before launch.
5. Unchanged and still open: page title, `og:image`, Nick’s bundle, Montefiore gate, launch
   date, Federation ghost forest permission, the −45.91 / −45.60 reconciliation, the
   `INTERVIEW-JACOB-2026-08-17.md` −15 ft/yr contradiction, Insync and `.git`.

**Correction to session 6’s note.** That session recorded its work as uncommitted with `main`
at `a3ccedd`. It is committed and pushed: `main` and `origin/main` are both at `eb8881d`,
working tree otherwise clean. Whether Vercel has served it is unverified.

---

## Pass 2 is a line, not dots, 2026-09-02

**The root error, found on Dylan's review.** The aerial pass measured a continuous shoreline:
93,017 transects with geometry, ordered by `id`, spaced a median of 112 feet apart. It was
drawn as 778 dots on a 2.6-unit grid. That reads as "they sampled 778 places," which is the
opposite of what happened and the opposite of the method the beat is about.

It also caused the "everything looks worst" complaint, twice. A dot has no length, so a mark
covering half a mile and a mark covering six miles looked identical, and the only way to
encode magnitude was area, which forced acres, which is a unit the reader has no feel for.

**Now drawn as the measured line.** Per layer, transects sorted by `id`, resampled to a
vertex every 0.75 units, broken where consecutive transects are more than 3 units apart,
consecutive same-band vertices merged into polylines. 1,817 polylines in four paths, 79KB.

**Colour is the retreat rate**, and the thresholds are `CLAIMS.md` figures already published
on the page: under 1 ft/yr, 1 to 2, 2 to 5, over 5. Which means 40.7%, 23.5% and 8.3% of
transects fall past those marks, all CONFIRMED. Length is now drawn to scale, so the eye adds
up total loss on its own and the encoding can be the intuitive unit.

**This retires the acres legend** discussed earlier the same day, and the per-stretch acre
bands never shipped. It also retires "eroding stretches only": accreting shore is drawn in the
under-1 band rather than gapped, which is truer to a continuous survey.

**Copy collision, flagged not resolved.** Dylan's line for the note was "The orange indicates
the biggest loss." The encoding is now speed, not amount, so it reads as "The orange is where
the shore is retreating fastest." His words, one clause changed to match what the map does.

**Still homeless.** Removing the captions took out the only statement that the Federation's
own priorities helped set which stretches were measured. The 09-02 SOW correction requires
both halves wherever the page describes the screening-to-survey sequence, and the Beat 4 prose
does not carry it.

