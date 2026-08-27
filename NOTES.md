# NOTES

Observations logged during the platform restructure. Nothing here is
part of the current build; items are candidates for later PRs.

## Phase 1 repo hygiene (2026-08-27)

Root-level clutter moved into place; no app code touched.

- BOP data assets (`BOP_Feb2026_Pipeline_Rankings.geojson`,
  `BOP_Feb2026_Pipeline_statistics.geojson`, `bop_site_rankings_v2.csv`,
  `final_assessment.xlsx`, `bop.png`) moved to
  `src/app/projects/bop/data/`.
- Reference PDFs (`BOP Master Document Final.pdf`,
  `BOP_Wave_Analysis_Report.pdf`) moved to `docs/bop/`, along with the
  gitignored `_master_docs/`, `_overview-documents/`, and
  `_screenshots/` (ignore patterns match at any depth, so no
  `.gitignore` edits were needed).
- `natrx-report-platform-packet-v2.md` (gitignored; contains a
  plaintext credential) and `Natrx Logo and Tagline - White.png`
  (byte-identical duplicate of `public/images/natrx-logo-white.png`)
  moved to `docs/platform/`.
- `bop_hero_v2.html` and `bop_hero_v3.html` deleted (orphaned, zero
  references). `hero_reference.html` preserved at
  `docs/bop/legacy/hero_reference.html` because six source comments and
  `CLAUDE.md` cite it as the canonical visual reference.
- `scripts/split-statistics.ts` and
  `scripts/generate-framework-primer.ts` repointed to read the
  statistics geojson from `src/app/projects/bop/data/`; both re-run with
  byte-identical `public/data` output.
- Harness credentials are now env-only: `harness/lib.mjs` no longer has
  plaintext fallbacks and exits 2 with a clear message if
  `HARNESS_USERNAME` / `HARNESS_PASSWORD` are unset;
  `harness/README.md` documents them as required. (The retired
  credential is still quoted twice in `docs/SESSION_HANDOFF.md` as a
  historical note.)
- `CLAUDE.md` still references some old root paths
  (`final_assessment.xlsx`, `bop.png`, `hero_reference.html`);
  stale-docs cleanup deferred to a later pass.

## Dead diagnostic routes still publicly resolving (2026-07-13)

- `src/app/projects/bop/site/[siteId]/` — stub page ("Full site detail
  panel coming soon"), reachable at `bop.natrx.report/site/<id>` through
  the tenant rewrite. Never linked from the narrative.
- `src/app/projects/bop/test-map/` — coastline test harness page,
  reachable at `bop.natrx.report/test-map`. Imports the otherwise-unused
  `CoastlineTest.tsx`.

Flagged by Dylan for removal in a later PR (2026-07-13). Do not remove
as part of the platform build. Related dead code that would go with
them: `components/hero/CoastlineTest.tsx`, `lib/land.ts`, and most of
`lib/projection.ts` (only `calculateMarkerRadius` is still used).

## BOP launch-day checklist (2026-07-15)

The BOP gate came off pre-publication (accessMode: 'public', hash
dropped). Two things to do when the page actually launches:

- Remove `robots: { index: false, follow: false }` from
  `src/app/projects/bop/layout.tsx` so search engines can index it.
- Optionally prune `src/app/projects/bop/login/` and re-baseline the
  harness (its baseline still captures the pre-auth /login page).

## Minor

- `src/lib/pdf/` is an empty, untracked directory left from earlier
  work. Harmless; delete whenever convenient.
- Pre-existing lint warnings (two `<img>` usages in the login page, two
  unused `eslint-disable` directives in the map components) predate the
  restructure and were left as-is.
