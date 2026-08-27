# NCCF: Design Direction

**Nothing here is final. This document exists to prevent the wrong thing from being built, not to specify the right one.**

---

## The prime directive

**This page must not look like BOP.**

The `natrx.report` platform was built so each project owns its design entirely. Its own typeface, palette, layout, structure. Nothing is shared but routing and the gate. An ESLint rule enforces the no-cross-project-import boundary.

If NCCF ships as BOP in a different color, the platform was expensive theming and the effort was wasted.

The risk is highest right now. BOP is the strongest thing in the portfolio, and any model or designer given both will pattern-match to it. Resist that specifically. **Scaffold from `src/app/projects/demo/`, never from `bop/`.**

---

## Why the pages are structurally different

**BOP is a ranking problem.** Many candidate sites, limited budget, which one first. Prospective. It asks the reader to compare across space.

**NCCF is an observation problem.** A coast that everyone knew was eroding had never been measured whole. Retrospective. It asks the reader to watch something that already happened, then understand what the measurement changed.

| | BOP | NCCF |
|---|---|---|
| Question | Where should we build? | What did we lose, and where? |
| Tense | Prospective | Retrospective |
| Primary axis | Space | **Time** |
| Reader's job | Compare | **Witness, then understand** |
| Data object | 78 candidate sites | 93,004 transects, 2012–2022 |
| Register | Possibility | Loss, then agency |

**BOP moves through space. NCCF moves through time.** That single difference should drive every decision.

---

## What the data wants to be

Shapes the findings naturally take. A designer should push against these rather than accept them.

**The decade.** Five temporal points, 2012 to 2022, at one meter. The reader watches the coastline retreat. The page's most obvious asset and the thing BOP structurally could not do.

**The concentration.** The fastest 10% of locations account for 43.5% of all land lost. The most important number on the project, and it is a distribution rather than a map. The heavy tail is the finding.

**The correlation, honestly.** The scatter is unflattering, which is why it belongs. A page that shows a moderate correlation and explains why moderate is sufficient for triage is more credible than one that shows a clean line. Do not clean it up.

**The gray grids are not a design element.** The July draft framed the unsurveyed grids as meaningful absence. That framing is cut. They are where the granular survey was not run because focus was Pamlico and Core Sounds. A scoping choice. Do not build a section on it.

---

## Things to avoid, specifically

- A five-section scroll. BOP's shape.
- A slide-out drawer. BOP's chrome.
- A hero map with a walkthrough. BOP's opening.
- Serif display type on a dark ground. BOP's voice.
- BOP's palette, gradients, or noise overlay.
- Treating the ArcGIS map as the centerpiece. It is a source, not a design.

None of these are bad. They are taken.

---

## Concept beats carried forward

From the July concept brief, still sound and still unbuilt.

**The zoom.** Scroll drives blurry to sharp. Opens statewide and soft, sharpens and narrows with every scroll, ends at one meter on a single retreating marsh edge in Dare County. Resolution and story resolve together.

**The witness.** One place, five frames, 2012 to 2022. Scrub time and watch the marsh edge crawl backward.

**Draw the line.** Give the reader a genuinely ambiguous NAIP tile, marsh or water, high tide or low, and let them trace where they think the shoreline is. Then show how slippery it is. This humanizes the judgment Nick insisted on, and it inoculates the page against "you just ran a script."

All three depend on imagery nobody has yet. See `OPEN-QUESTIONS.md` #8. That is the gating production task.

---

## Technical constraints from the platform

The platform imposes almost nothing, which is the point. Two things are non-negotiable and one has bitten two separate agents.

**Font-slot variables must be declared on the project wrapper, never on `:root`.** CSS custom properties substitute their `var()` references eagerly where declared. If the font slots are declared on `:root` but the `next/font` variables only exist further down the tree, the whole `font-family` declaration is discarded and the page silently renders in browser serif. Assume a third agent will walk into this.

**Nothing project-specific goes in the root layout, `globals.css`, or `tailwind.config.ts`.** Tokens are named in the Tailwind config and point at CSS variables each project defines in its own stylesheet.

**Data loading.** BOP loads by runtime `fetch()` from `public/data/`, and `/data` bypasses the middleware matcher. NCCF can follow that pattern or not; it is not a shared dependency.

Everything else is open.

---

## On using Claude Design

Claude Design produces the design. It does not produce the platform integration.

A design tool with no knowledge of the platform's conventions will produce a beautiful standalone artifact that then has to be adapted into a project directory with a nested layout, its own font loading, and its own stylesheet. That adaptation is real work and it is where the font-slot bug lives.

Decide up front whether Claude Design is producing the design or producing the code. "Produces the code, then adapt it" is a larger job than either.

---

## Before any of this

Two things still change the page's structure rather than its wording:

1. **The imagery.** Without the temporal frames and the ambiguous tiles, two of the three concept beats do not exist and the page is a different page.
2. **The publication date.** Whether NCCF hosts the tool themselves determines whether this page is the destination or a companion.

The carbon question, which used to sit here, is closed. It is one paragraph and it does not shape the structure.
