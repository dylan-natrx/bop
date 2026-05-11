# Issues and Solutions

Running log of gotchas. Newest first. The 2026-05-11 rebuild session entries are the high-value ones; the older items from the SVG-era hero are kept for reference.

---

## 2026-05-11 — Mapbox rebuild session

### Mapbox CSS overrides container positioning (silent rendering failure)

**Symptom:** Map area renders empty, dark navy rectangle. No error in browser console. DOM inspection shows the `.mapboxgl-canvas` element exists with proper dimensions (e.g. 1084 × 300 px). Borough/water DOM labels and halo DOM markers all exist in the DOM with correct geographic transforms.

**Root cause:** `mapbox-gl/dist/mapbox-gl.css`, imported in the page bundle, defines `.mapboxgl-map { position: relative; overflow: hidden; ... }`. That stylesheet loads **after** Tailwind in the page bundle, so its `.mapboxgl-map` rules win the CSS specificity tie against Tailwind utility classes. Mapbox adds the `mapboxgl-map` class to the container div on init. The container's `absolute inset-0` (Tailwind) gets turned into `position: relative` with inset offsets that have no effect, and the div collapses to content height = 0. The canvas inside is itself absolutely positioned by Mapbox so it doesn't push the parent. Result: canvas falls back to a 300 px height minimum and the harbor is squashed into a thin band.

**Fix:** use inline `style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}` on the Mapbox container ref. Inline styles always win over imported stylesheet rules.

**Verification:** spun up the local dev server, ran headless Chromium via Playwright, queried `mapDivRect` via `getBoundingClientRect`. Before fix: height 0. After fix: height 860.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### Pulse animation clobbers Mapbox marker positioning

**Symptom:** All 12 top-10 halo markers stack on top of each other at the upper-left corner of the figure. Sites' actual canvas-drawn circles render in the correct geographic positions, but the halo overlays don't follow them. The user reported "a single animating dot in the upper left corner."

**Root cause:** Mapbox positions every Marker element via inline `transform: translate(X px, Y px) translate(-50%, -50%) translate(0px, 0px)`. The pulse-halo keyframes (`animate-pulse-halo` in tailwind.config.ts) also write to `transform` with `scale(...)`. Browsers can only resolve one `transform` property per element. During animation frames, the CSS animation's value takes precedence over the inline value Mapbox set, so the marker loses its positioning at `0%` and `100%` of the cycle and renders at `transform: scale(1)` which is effectively `translate(0, 0)` relative to its parent's content origin (the canvas container's top-left, which is the upper-left of the map area).

**Fix:** nest. Outer wrapper div holds Mapbox's positioning transform. Inner div with `animate-pulse-halo` class handles the scale. `data-rank` moves to the wrapper since `marker.getElement()` returns the wrapper and the bidirectional hover code reads `el.dataset.rank` from it.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### Mapbox 3.x default projection can be globe, not mercator

**Symptom:** Bounds-fit appears to land off-target in some configurations.

**Fix:** explicitly pass `projection: 'mercator'` to the `new mapboxgl.Map({...})` constructor. Defensive; harmless if mercator is already the default for the config.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### NEXT_PUBLIC_* env vars are baked at build time

**Symptom:** Updated `NEXT_PUBLIC_MAPBOX_TOKEN` on Vercel, but the preview still shows the old (broken) token value.

**Cause:** `NEXT_PUBLIC_*` variables are inlined into the JS bundle by Next.js at build time. The bundle for a previous build still has the previous value. Updating the env var on Vercel does nothing until a fresh build runs.

**Fix:** push an empty commit (`git commit --allow-empty -m "Retrigger build"`) and push. Vercel rebuilds with the current env vars.

### Mapbox token was truncated in Vercel storage

**Symptom:** Map renders an inline error: "A valid Mapbox access token is required to use Mapbox GL JS."

**Investigation:** The token in our local `.env.local` is 94 characters. The token baked into the production JS bundle was 85 characters — the signature segment was cut by 9 chars. Mapbox rejects truncated tokens because the signature doesn't validate against the payload.

**How it happened:** unclear. Possibly paste corruption during a prior dashboard add. The `.env.local.example` file in the repo also had a truncated value at one point — restored to a placeholder in commit `8c81b94` before that leaked further.

**Fix:** removed the existing entries via `vercel env rm NEXT_PUBLIC_MAPBOX_TOKEN <env>` (one per scope), then re-added the clean 94-char value piped from a tmp file: `vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production < /tmp/mbx.txt`. Stripped quotes and trailing literal `\n` from the file value first.

**Sanity check tool:** to see what's actually in the deployed bundle:
```bash
PROD=bop-<slug>-dylan-natrx.vercel.app
vercel curl / --deployment "$PROD" 2>/dev/null > /tmp/prod.html
PAGE_CHUNK=$(grep -oE '/_next/static/chunks/app/page-[a-z0-9]+\.js' /tmp/prod.html | head -1)
vercel curl "$PAGE_CHUNK" --deployment "$PROD" 2>/dev/null \
  | grep -oE "pk\.eyJ[A-Za-z0-9_.-]{20,}" | head -1
```
Should return a 94-character `pk.eyJ...` token.

### Vercel CLI "Personal Account as scope" error

**Symptom:** `vercel link --scope dylan-natrx` fails with "You cannot set your Personal Account as the scope."

**Cause:** the personal Vercel account `dylan-natrx` and the team `dylan-natrx` share the same slug. The CLI matches the personal account first.

**Fix:** use the team ID instead. `vercel link --yes --project bop --scope team_soKrd53s4rItez1X38348FFe`. Team ID lives in `.vercel/project.json`.

### `vercel env pull` omits NEXT_PUBLIC_* values in some cases

**Symptom:** Pulled production env file shows `NEXT_PUBLIC_MAPBOX_TOKEN=` (empty value, length 0) even though `vercel env ls` shows the variable as set.

**Behavior:** Not a bug per se, just an inconsistency in how the CLI serializes the env pull file format for certain variables. Trust `vercel env ls` for ground truth on whether a value exists. Trust an actual bundle inspection (curl + grep) for what's getting baked into builds.

### Two GitHub accounts authed, pushes 403 on the wrong one

**Symptom:** `git push` succeeds at first, then suddenly returns "Permission to dylan-natrx/bop.git denied to dylandibona."

**Cause:** `gh auth status` shows two accounts authenticated (`dylan-natrx` team account and `dylandibona` personal). Git operations use the active gh account. When auth flips to `dylandibona`, pushes to the team repo fail.

**Fix:** `gh auth switch --user dylan-natrx`. Run periodically if pushes 403 unexpectedly.

### `git filter-branch` deletes untracked files from the working tree

**Symptom:** Local-only reference files (e.g. `_master_docs/`, `_overview-documents/`, working brief markdowns) disappear from disk after running `git filter-branch` to remove them from history.

**Cause:** `git filter-branch` rewrites history AND updates the working tree to match the new HEAD. If the files only existed in the commit that's being rewritten (as opposed to existing as truly untracked files), the working tree update removes them.

**Recovery:** while the original commit still exists in the local pack (which it does until `git gc --prune=now`), pull the files back via:
```bash
git checkout <bloat-commit-sha> -- <paths...>
git reset HEAD -- <paths...>   # unstage so they're untracked again
```
After the recovery you can safely `git push --force` to update origin.

**Prevention:** before filter-branch, manually back up the working tree. And: don't use `git add -A` near untracked reference docs. The `.gitignore` now blocks `_master_docs/` and `_overview-documents/` to prevent re-occurrence.

### Two Vercel projects with the same name (apparent — actually was one)

**Symptom:** Spent ~30 minutes thinking we had two Vercel projects (`bop_storytelling_tool` and `bop`) both deploying off the GitHub repo, with env vars only set on one of them.

**Actual cause:** It was one Vercel project (`prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`), but the CLI's scope had drifted to a different team/account context, making `vercel list` and `vercel env` operations appear to target a "stub" project that didn't really exist. Once the CLI was re-linked with the team ID (see above), the apparent duality resolved.

**Lesson:** when CLI behavior contradicts dashboard reality, check `.vercel/project.json` and `vercel teams ls` before assuming there are multiple projects.

### Hero figure height collapsing on short viewports

**Symptom:** With DevTools open or on a half-height window, the figure renders fine but the map area inside it is compressed to ~300 px tall and the harbor reads as empty.

**Cause:** Old constraint `lg:h-[min(85vh,800px)]` ties figure height to viewport height. When the viewport is short (e.g. 400 px tall), 85vh = 340 px and the figure shrinks proportionally.

**Fix:** floor the height with min-h that doesn't depend on viewport.
```
min-h-[640px] lg:min-h-[720px] lg:h-[min(90vh,860px)]
```
Both the grid container (in HeroFigure) AND the HeroMap inner container need min-h, because `h-full` doesn't always resolve through grid stretch reliably.

**File:** [src/components/hero/HeroFigure.tsx](../src/components/hero/HeroFigure.tsx), [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### NJ shoreline polygon was too crude (32 points for the whole state)

**Symptom:** New Jersey rendered as a blocky polygon that visually overlapped Manhattan and Staten Island areas. Straight lines between sparse coastal points cut through the harbor.

**Cause:** The original `nj-shoreline.geojson` was a 32-point generalized state outline. Westchester was similar at 59 points.

**Fix:** replaced with US Census 2010 Cartographic Boundary 500k files. NJ now has 755 points, Westchester 332 points. Public domain. Sources:
- States: `https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json`
- Counties: `https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_500k.json`

Counties file has invalid UTF-8 bytes; load with `encoding='latin-1'` if parsing in Python.

### Mapbox preview URL gated behind Vercel auth

**Symptom:** `curl` returns 401 with "Authentication Required" HTML when fetching a Vercel deployment URL.

**Fix:** use `vercel curl <path> --deployment <deploy-url>` which generates a bypass token via the CLI's auth. Path must be relative (`/`, not the full URL).

### Headless browser bounced through Vercel auth wall

**Symptom:** Playwright `page.goto(<production-url>)` ended up on a vercel.com auth page instead of our site. No figure in the resulting DOM.

**Fix:** test against the local dev server (`http://localhost:3033/`) instead, which has no auth wall and runs the same code.

---

## Pre-rebuild SVG hero session (kept for historical reference)

These predate the Mapbox switch. The fixes still inform the visual register the user wants to carry forward.

### Turbopack cache corruption

**Symptom:** Internal server error, "Cannot find module '../chunks/ssr/[turbopack]_runtime.js'"

**Fix:** `rm -rf .next && npm run dev`. Happens after rapid file changes.

### Land/water contrast inverted

**Symptom:** Land appeared brighter than water on the SVG hero, causing visual confusion.

**Fix:** Changed `--land` from `#0B1D2F` → `#04101C` (darker). Added water layer at `rgba(19, 125, 118, 0.06)`. (For the current Mapbox-based hero, land is `#0E2236` and water is `#061321`.)

### Boxy coastline corners

**Symptom:** Extended SVG coastline polygons had visible right-angle corners at outer edges.

**Fix:** Replaced abrupt outer vertices with sequences of 3–5 intermediate vertices with slight lat/lng offsets. (Obsolete with Mapbox; the new boundary GeoJSONs handle this naturally.)

### "Pipeline" terminology confusion

**Symptom:** "Pipeline" implied industrial process rather than BOP's design queue.

**Fix:** Project-wide rename. Use "Sites already in design" for the 11 Design-status sites, "Candidate sites" for the full pool of 78.

### Below-threshold sites too prominent

**Symptom:** Sites with Score < 0.5 visually competed with high-suitability sites.

**Fix:** Below-threshold color → `rgba(80, 105, 115, 0.32)` muted with no stroke. ≥ 0.5 sites get full color + 1.5px teal-aqua stroke. (Carried into the Mapbox circle layer expression.)

### Top-ranked sites not distinctive enough

**Symptom:** Rank 1–10 sites didn't stand out from the 78-site field.

**Fix:** 1.15× radius boost + pulsing halo at scale 1→2×, opacity 0.85→0, 2.6s ease-in-out. Bidirectional hover with the FigurePanel. All carried into the Mapbox implementation.
