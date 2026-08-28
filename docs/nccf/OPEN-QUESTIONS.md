# NCCF: Open Questions

Ordered by what blocks the most downstream work. Rebuilt 2026-08-27 against the SOW, the Jacob Boyd interview, and Nick's July 22 interview and email.

---

## 1. The credential is burned

**Owner:** Dylan
**Blocks:** Phase 2 of the packet, and any external send
**Severity:** highest thing on this list

The platform repo is public. the retired shared credential sat in `harness/lib.mjs` on a public GitHub repo and is quoted twice more in `docs/SESSION_HANDOFF.md`. Removing it from HEAD does not remove it from history, and history on a public repo is assumed cloned.

Consequences:
- NCCF cannot ship on the demo hash. Already decided, now non-negotiable.
- The demo tenant's own hash needs rotating.
- Scrubbing history is largely theater at this point. Rotation is the fix.

---

## 2. Does the Lise review gate still apply?

**Owner:** Dylan
**Blocks:** publication, if it applies

The July claims register said nothing ships without Lise Montefiore's review. Dylan's current read is that she reviewed BOP and not this page.

If the gate applies, she is the right reader for the correlation language and the erosion thresholds, and her review has the longest lead time of anything left. If it does not, the page has no scientific reader outside the two people who produced the analysis, and that is worth deciding deliberately rather than by default.

Separately, and settled: she is a Natrx collaborator, not an outside referee. If the page names her, it says so.

---

## 3. Confirm the 4,000 sq mi change-analysis footprint

**Downgraded 2026-08-28.** The page does not use the figure and does not need it. This blocks other
materials, not this page. Off Nick's critical path.


**Owner:** Nick (single focused question), Dylan (sweep)
**Blocks:** any headline use of the study's size

The project was announced publicly as a 4,000 sq mi study. An earlier briefing said 800. Two analyses at two resolutions, both true if labeled. Nick said 4,000 sounds right but he would have to check.

Needed: the confirm, then a sweep of every existing material so each number is labeled to its analysis. This one is already public and already inconsistent, which makes it a correction waiting to happen.

---

## 4. Two things Nick owes

**Owner:** Dylan to ask, Nick to supply

**The image-quality artifact.** Nick has said on record that poor-imagery grids were flagged before the correlations ran. A dated artifact (notebook, commit, message) turns a recollection into documentation. The page's central methodological claim rests on the sequence.

**A peak erosion rate for Dare County.** "Dare County by far" is confirmed and quotable. A number attached to it, from the final dataset, would give the page its concrete anchor and would formally retire the 50 ft/yr figure by replacing it.

---

## 5. The citation Jacob owes

**Owner:** Jacob

He attributed a per-acre marsh sequestration rate to NOAA on the 08-17 call and could not name the source: "I can look at that and send it to you."

Under the locked carbon decision the page does not need this figure. Get it anyway, because it will come up in any interview that follows publication, and because it is a different number from the Temmink global figure and the two must not be merged.

---

## 6. Jacob's title and name for print

**Owner:** Dylan

Committed to on the call. "Salt Marsh Program Director, North Carolina Coastal Federation" is what the SOW says. Confirm the exact rendering and preferred name spelling with him.

---

## 7. The publication date

**Owner:** Jacob / NCCF
**Blocks:** the launch peg

Datasets and the tool go public on the Federation's site "by this fall at some point," via ArcGIS Online. Report review slipped because Federation staff were at a conference through much of July. There is no date.

A page that links to a dataset that is not yet public is a page with a broken promise in it. Either the page launches after the data does, or it does not link.

Open sub-question: NCCF got about a quarter of the way into building the tool out in ArcGIS Online with Nick, and Jacob does not know whether they will host it themselves. That affects whether `nccf.natrx.report` is the destination or a companion to something on the Federation's site.

---

## 8. Imagery, the gating production asset

**Owner:** Nick or Tyler

The page's three interactive beats all need imagery nobody has yet:
- A statewide-to-one-meter sequence ending at a Dare County location.
- Five temporal frames (2012, 2014, 2016, 2019, 2022) for one retreating spot, ideally Dare.
- One or two genuinely ambiguous NAIP tiles with a known answer.

The concept is sound without them. The page cannot be built without them. This is the first production task.

---

## 9. Access mode at launch

**Owner:** Dylan
**Blocks:** nothing yet

NCCF ships `gated` per the packet, with a fresh hash. The question is what happens at launch: flip to `public` for the press push, or stay gated and drive press to a different asset.

Related, and not NCCF's problem but do not lose it: BOP is `public` with `noindex` still on. Deliberate as of 2026-07-15, when the URL had not been shared. Press contacts now sit on the drawer. Worth reconfirming that still holds.

---

## Resolved

**Carbon framing.** Locked 2026-08-27. One paragraph, grant purpose only, plus the 600-acre program target. No CO2e tonnage, no Verra or REDD+ or VM numbers, no global percentage. See `EDITORIAL.md`.

**The 50 ft/yr figure.** Traced to Stop-Loss (Gulf reef projects, 15–150 ft/yr), not NCCF. NCCF marsh tops out near -15. Jacob is not a second source; Dylan supplied the number in the interview. Off the page.

**The 5% carbon figure.** Real, citable, and excluded. Temmink et al. 2022, *Science*: 1.9 Gt, ~4.5%, scope is coastal wetlands as a class. Belongs to a different Natrx thesis.

**Image-quality pre-registration.** Answered on record by Nick. Flagging came first. Artifact still wanted, see #4.

**The correlation.** Real, highly significant, weak in magnitude. rho = 0.349, p < 10^-39, n = 1,354, r² = 0.038. The triage thesis holds. The page states both halves.

**Reviewer independence.** There is no independent scientific reviewer. Jacob is the client. Lise is on the team. The page does not imply otherwise and buys credibility by naming its limits instead. See #2 for what remains open.

**Grid 8 divergence.** Explained by the area-versus-shoreline, tide-state confounder Nick described. Not a standalone hole.

**The gray grids.** Cut the "absence is the point" framing from the July design doc. Nick: the gray grids are where the granular survey was not run, because focus was Pamlico and Core Sounds. A scoping choice, not a profound silence.

**Ranked top-ten list.** Do not build. Concentration finding carries the point. Dare can be named as worst.

**Concentration robustness.** 43.5% from ~76k eroding transect points, equally weighted. At r² ≥ 0.5 the top decile still gives ~39%. Safe to headline.

---

## Closed 2026-08-28

**The EPA grant and NCCF's share.** $421,238,074 to the Atlantic Conservation Coalition, ~$30M to
NCCF over five years, 595 acres. The award's 595 acres is the SOW's 600. Same program, established
from public documents. Nick does not need to confirm it.

**North Carolina's total estuarine shoreline.** More than 12,000 miles, sourced to NC DEQ,
Division of Coastal Management. Resolves the PENDING on the Natrx one-pager's figure.

**The cost framing.** Percent-of-program-spend was retired in `CLAIMS.md` on a mis-attribution.
Nick proposed the framing himself. Live again, at about one percent, against the $30M award.

**Navy Shell's county** is still owed by Nick, but the page has been decoupled from the answer and
no longer blocks on it.

---

## Closed and opened, 2026-08-28 evening

**Closed: Navy Shell's county.** Resolved to Dare from the repo layer data plus a sourced reference point. See `CLAIMS.md`. Nick's confirmation is still welcome and no longer blocks anything.

**Closed: access mode at launch.** No password once launched.

**Opened: the pass-1 change analysis output.** Needed to finish the interactive's third step in the version that is about the method rather than the finding. **Owner: Nick.** The ask is the 1,354 hexagon centroids with their wetland-change values, the ones that went into the correlation. Coarse is fine. If it cannot be produced, the fallback is the concentration curve from `nccf-figdata.json`, which also settles the beat-order question against swapping.

**Opened: `og:image`.** Agreed it is the interactive at pass 2, rendered at 1200x630. Nobody has built it.
