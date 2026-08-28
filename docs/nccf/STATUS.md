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
