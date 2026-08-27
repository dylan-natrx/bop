# NCCF Shoreline Erosion Analysis

Public-facing project page for the Natrx engagement with the North Carolina Coastal Federation. Second project on the `natrx.report` platform, after Billion Oyster Project.

**Status:** Pre-production. Data is in. Editorial is locked. Nothing has been designed.
**Home:** `nccf.natrx.report`, not yet provisioned.
**Target:** publication follows NCCF's own data release, expected fall 2026. No date yet.

---

## Documents here

| File | What it holds |
|---|---|
| `EDITORIAL.md` | The spine, the lead, the carbon decision, register and rules. **Locked 2026-08-27.** |
| `CLAIMS.md` | Every number, its source, and whether it can be published. **Read before writing any copy.** |
| `OPEN-QUESTIONS.md` | What blocks the build. Owners and status. |
| `DESIGN-DIRECTION.md` | How this page differs structurally from BOP, and why. |

Read `EDITORIAL.md` and `CLAIMS.md` first. Everything else depends on what can actually be asserted.

## Where these came from

Rebuilt 2026-08-27 from primary sources, replacing a July draft set that predated both the SOW read and the Jacob Boyd interview. Sources, all in the sibling `NCCF x Natrx/` folder:

- The signed SOW, 2025-04-04, Natrx to NCCF, $350,000 across four phases
- Jacob Boyd interview, 2026-08-17, transcribed to `files/INTERVIEW-JACOB-2026-08-17.md`
- Nick Brady interview and follow-up email, 2026-07-22
- Nick Brady update call, 2026-06-17
- Wetland Stop-Loss executive summary, Natrx internal memo
- The July document set, preserved at `NCCF x Natrx/files/`

The July originals are superseded, not deleted. Where they disagree with these, these govern.

## The short version

A coast that everyone knew was eroding had never been measured whole. When it was, the loss turned out to be concentrated: the fastest 10% of eroding locations account for 43.5% of all land lost. The lead is economic. Better erosion data lets living shorelines be sized to the conditions actually measured at a site, rather than built to whatever the permit allows, which is less tonnage and less public money for the same protection. That framing comes from the client, on record.

Carbon appears once, as the reason the grant exists, plus the program's 600-acre protection target. Natrx measured no carbon. No tonnage figures, no Verra, no global percentages. See `EDITORIAL.md`.

## What this is not

**It is not BOP with different colors.** Scaffold from `src/app/projects/demo/`. If the NCCF page ends up as a five-section scroll with a hero map and a slide-out drawer, the platform was expensive theming.

## Current blockers

Four that matter, all in `OPEN-QUESTIONS.md`:

1. **The shared credential is burned.** The repo is public and the retired shared credential is in its history. NCCF needs a fresh hash, and demo's needs rotating.
2. **Whether the Lise Montefiore review gate still applies.** If it does, it has the longest lead time left.
3. **The imagery.** Three concept beats depend on temporal frames and ambiguous NAIP tiles that nobody has yet. Gating production task.
4. **The publication date.** No page ships promising a dataset that is not public.
