# Session Handoff

**Pick up here.** This is the single doc to read first when resuming work. It assumes nothing about prior context.

Last meaningful work: 2026-05-11. Map 1 (the hero) now renders the New York Harbor and reads cleanly. Sections 2–5 are scaffolded but contain no real copy.

---

## The project in one paragraph

A media-grade, public-facing explainer page documenting the Billion Oyster Project × Natrx site prioritization framework for New York Harbor oyster restoration. Built in Next.js 15 + Mapbox GL JS + Tailwind, deployed on Vercel. Primary audience is climate/infrastructure reporters (Bloomberg Green, Grist, ICN, NYT Climate, Bloomberg CityLab, MIT Tech Review); secondary is general public. The page also functions as a Natrx capability demonstration. Five sections (1 Hero, 2 Stakes & problem, 3 Methodology, 4 What the analysis made visible, 5 What this enables). Editorial dark mode, Fraunces serif + Inter sans + JetBrains Mono. Strict tone rules in [CLAUDE.md](../CLAUDE.md).

---

## Where to look first

| Doc | Read for |
|---|---|
| [CLAUDE.md](../CLAUDE.md) | Editorial brief: locked decisions, tone rules, five-section structure, palette, type. **Read first** when in doubt. |
| [docs/SPEC_NOTES.md](SPEC_NOTES.md) | Tech stack, component architecture, design tokens, data files |
| [docs/PROJECT_STATUS.md](PROJECT_STATUS.md) | Completion checklist per section. What's done, what's outstanding |
| [docs/ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md) | Every gotcha encountered and how it was fixed. Read before debugging anything map-related |
| `hero_reference.html` | Canonical visual reference for the dark editorial register. Open in a browser |
| `BOP_Explainer_Build_Brief.md` (untracked, local) | The current build brief (the spec we work against) |
| `_overview-documents/BOP_Natrx_Project_Narrative_DRAFT_v0_2.md` (untracked, local) | Master narrative, source of truth for all copy |

The two untracked references live in your local working tree only — they're in `.gitignore` because they're source material (some are large PDFs / Word docs), not source code.

---

## Where things are deployed

- **GitHub:** `dylan-natrx/bop` on `main`. There are no other branches. All work goes directly to `main`. **Push under the `dylan-natrx` GitHub account** (`gh auth switch --user dylan-natrx` if pushes start 403-ing).
- **Vercel project:** `dylan-natrx/bop` (project ID `prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`). One project. Linked locally via `.vercel/project.json`. Every push to main triggers a Production deploy.
- **Production URLs:** Vercel generates a new URL per deploy (e.g. `bop-<slug>-dylan-natrx.vercel.app`). The most recent production deploy is the canonical URL. No custom domain configured.
- **Mapbox token:** `NEXT_PUBLIC_MAPBOX_TOKEN` is set on Vercel for Production, Preview, and Development. Mirrored locally in `.env.local` (gitignored). The token is 94 characters — if you see anything shorter, it's truncated, see Issues doc.

---

## What's built

**§ 1 Hero ([src/components/hero/](../src/components/hero/))** — functional. Topbar, headline, lede, 4-stat stack, two-column figure with `FigurePanel` on the left and `HeroMap` (Mapbox GL JS, custom dark inline style) on the right. All 78 sites render as a circle layer colored by composite score. Top-10 get pulsing halos. Borough + water-body labels render as DOM markers. Hover tooltip works. Bidirectional hover between FigurePanel and HeroMap works.

**§ 2 Stakes & problem ([StakesAndProblem.tsx](../src/components/sections/StakesAndProblem.tsx))** — structural scaffold only. Placeholder bracketed copy.

**§ 3 Methodology, made visible ([MethodologyMadeVisible.tsx](../src/components/sections/MethodologyMadeVisible.tsx))** — structural scaffold. Three `PlaceholderBlock`s for `<MethodologyWalkthrough />` (Map 2 + spectra), `<TopRankedCallout />` ×3 (Arthur Kill, Living Breakwaters, Wolfe's Pond).

**§ 4 What the analysis made visible ([WhatAnalysisMadeVisible.tsx](../src/components/sections/WhatAnalysisMadeVisible.tsx))** — structural scaffold. Two `<FindingBeat />` placeholders + the italic closing thread line.

**§ 5 What this enables ([WhatThisEnables.tsx](../src/components/sections/WhatThisEnables.tsx))** — structural scaffold. `<Glossary />` placeholder.

Shared section primitives: [SectionShell.tsx](../src/components/sections/SectionShell.tsx) (eyebrow + max-width + scaffold padding) and [PlaceholderBlock.tsx](../src/components/sections/PlaceholderBlock.tsx) (dashed-border component placeholder, can't be confused with real content).

---

## What needs to happen next

In priority order:

1. **Real copy for § 2.** Two paragraphs, ~80 words each. Source: `_overview-documents/BOP_Natrx_Project_Narrative_DRAFT_v0_2.md`, sections "Part 1: What was at stake" and "Part 2: The structural problem."
2. **Map 2 + spectra panel for § 3.** Six-step guided sequence with reader-controlled Previous/Next. See [CLAUDE.md § 3 section spec](../CLAUDE.md) for the full breakdown. Use the same Mapbox style as Map 1; add the spectra panel as a separate SVG component to the right.
3. **`<TopRankedCallout />` component for § 3.** Three cards: Arthur Kill #1 (0.87), Living Breakwaters cluster #2–7 (0.74–0.79), Wolfe's Pond #8 (0.65). Visuals can pull from `_master_docs/2.BOP_Wave_Analysis_Report_compressed.pdf` (per-site aerial + wind rose).
4. **`<FindingBeat />` component for § 4.** Two beats (erosion co-benefit, data confidence). Italic closing thread already in the section component.
5. **`<Glossary />` component for § 5.** ~18 plain-language definitions. Source list in CLAUDE.md. Collapsed by default.

Always reference [CLAUDE.md](../CLAUDE.md) for the locked section content before writing copy.

---

## Critical learnings from the rebuild session (2026-05-11)

If you only read one section of this doc, read this one.

### Mapbox

- **`mapbox-gl/dist/mapbox-gl.css` overrides `position: absolute` on the map container.** The mapbox stylesheet is imported in the page bundle and loads after Tailwind. Its `.mapboxgl-map { position: relative }` wins the specificity race and turns your `absolute inset-0` into `position: relative` with inset offsets that have no effect. The container collapses to height 0 and the canvas falls back to a 300px minimum.
  **Fix:** use inline style for the map container's position and size — inline beats imported CSS every time. See [HeroMap.tsx](../src/components/hero/HeroMap.tsx) where the `mapNodeRef` div uses `style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}`.
- **Mapbox marker positioning conflicts with CSS animations on transform.** Mapbox positions every Marker via inline `transform: translate(...)`. If your animation also writes to transform (e.g. `transform: scale()` in pulse-halo keyframes), CSS animation precedence overwrites the positioning and the marker snaps to (0, 0) within its parent.
  **Fix:** nest. Outer wrapper holds Mapbox's positioning transform; inner div has the animation class. The two transforms live on separate elements. See the halo creation code in [HeroMap.tsx](../src/components/hero/HeroMap.tsx).
- **Mapbox 3.x default projection can be globe, not mercator.** This isn't always the case but it's safer to set `projection: 'mercator'` explicitly in the `new mapboxgl.Map({...})` config. Globe with tight harbor bounds can render off-target.
- **Custom style with `geojson` sources is fully self-hosted.** No tiles, no Mapbox-hosted styles. The token is still required at init (Mapbox enforces it) even though we don't fetch anything from Mapbox's servers.

### NEXT_PUBLIC_* env vars on Vercel

- `NEXT_PUBLIC_MAPBOX_TOKEN` is **baked in at build time**, not read at runtime. Updating the env var without a fresh build does nothing.
- After changing the env var on Vercel, trigger a rebuild (empty commit + push works fine).
- `vercel env pull <file> --environment=production` does not always include `NEXT_PUBLIC_*` values in the file (or shows them as empty). Do not infer "the var is unset" from a missing-from-file line. Use `vercel env ls` for ground truth instead.
- **Tokens can be silently truncated** by paste or by some intermediate copy step. The Mapbox public token is 94 characters and has shape `pk.{payload}.{signature}`. If yours doesn't end with `_w` (or whatever your signature suffix is), suspect truncation. We hit this — the Vercel-stored token was 85 chars (signature cut). Mapbox returned the generic "A valid Mapbox access token is required" error.

### Vercel CLI quirks

- `vercel link --scope <team-slug>` can fail with "You cannot set your Personal Account as the scope" when a personal account and a team have the same slug. Use `--scope <team-id>` (e.g. `team_soKrd53s4rItez1X38348FFe`). The team ID lives in `.vercel/project.json`.
- `vercel curl <path> --deployment <url>` is how you fetch through Vercel's deployment-protection wall. Path must be relative (e.g. `/`, `/data/x.geojson`), not a full URL.
- `vercel env add NAME production` reads the value from **stdin or interactive prompt**, not from a positional arg. Use `vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production < value.txt` to pipe a clean value.
- Generic deployment status: `vercel list --yes` (the `--yes` accepts the project link prompt non-interactively).

### Git + GitHub

- Two GitHub accounts authed (`dylan-natrx` and `dylandibona`). Pushes need the `dylan-natrx` account active. If a push 403s, run `gh auth switch --user dylan-natrx`.
- **`git filter-branch` rewrites both history AND the working tree.** If a file existed only in a commit you're filtering out, the working tree loses that file too. Always copy any untracked-but-on-disk files to a safe location before running filter-branch. We had to recover from this once — pulled the files back from `origin/main` via `git checkout <bloat-commit> -- <paths>` then `git reset HEAD -- <paths>` to unstage.
- **Never use `git add -A` near the local-only reference docs** (`_master_docs/`, `_overview-documents/`, and the loose top-level `BOP_*.md` notes). Those are now in `.gitignore` to prevent the accident, but it's worth keeping the discipline. Always specify the files you mean.

### Layout / CSS gotchas specific to this page

- The hero figure's height needs an explicit floor that doesn't depend on the viewport. We use `min-h-[640px] lg:min-h-[720px] lg:h-[min(90vh,860px)]`. Without the floor, `lg:h-[min(85vh,...)]` collapsed the map on short viewports (e.g. when DevTools is open).
- The HeroMap inner container also needs `min-h-[640px] lg:min-h-[720px]`. Don't trust `h-full` to resolve through grid stretch.
- `text-shadow: 0 0 6px rgba(6, 19, 33, 0.9)` on the borough and water labels — that's what keeps them legible over the varied land/water rendering. Don't remove.

---

## Data files

| File | Source | Use |
|---|---|---|
| `BOP_Feb2026_Pipeline_Rankings.geojson` (repo root) | Source of truth from Natrx | 78 sites, rankings, scores, flags. Imported via `useRankingsData()` |
| `BOP_Feb2026_Pipeline_statistics.geojson` (repo root) | Source of truth from Natrx | Bootstrap CIs, nearest-station distances, depth distribution per site. For § 4 / future site detail |
| `public/data/rankings.geojson` | Copy of pipeline rankings | What the Mapbox sources fetch at runtime |
| `public/data/nyc-boroughs.geojson` | NYC Open Data, high res | NYC borough fills on Map 1 |
| `public/data/nj-shoreline.geojson` | US Census 2010 500k state boundaries | NJ fill on Map 1 (755 pts, upgraded from 32) |
| `public/data/westchester.geojson` | US Census 2010 500k county boundaries | Westchester fill on Map 1 (332 pts, upgraded from 59) |

If you need to upgrade the boundaries again, source:
- States: `https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json`
- Counties: `https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_500k.json`

Both are public domain (US Census Cartographic Boundary Files). The counties file is UTF-8 invalid in spots — load with `encoding='latin-1'` if parsing with Python.

---

## Verification workflow

Before pushing anything map-related:

1. `npm run build` — catches type errors and bundler issues
2. `npm run dev` + open a browser to `localhost:3000` — visual confirmation
3. If you can't open a browser, use headless Playwright (this is what we used to debug the invisible-map issue):
   ```bash
   npx playwright install chromium  # one-time
   node -e "<inline script using playwright.chromium>"
   ```
   See [ISSUES_AND_SOLUTIONS.md](ISSUES_AND_SOLUTIONS.md) for the full inspection script.

After pushing to main:

1. Vercel auto-deploys (~30–45s).
2. `vercel list --yes` to see deployment status.
3. `vercel curl / --deployment <preview-url>` to fetch the served HTML through deployment protection if you need to verify what shipped.

---

## Terminology lock (editorial)

| Say | Not |
|---|---|
| Suitability score | Confidence |
| Data support / monitoring coverage | Confidence (for ConfidenceRule) |
| Sites already in design | Pipeline |
| Candidate sites | Pipeline sites |
| Reef restoration | Oyster farming / aquaculture |
| What the analysis made visible | Unexpected finding / surprise / discovery |

No em dashes anywhere. No "It's not X, it's Y" constructions. Past tense for completed work, present tense for the partnership and the framework.
