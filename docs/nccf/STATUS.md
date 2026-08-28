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
