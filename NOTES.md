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

## Credential rotation, not history scrubbing (2026-08-27)

The shared gate credential that predated the platform restructure was
exposed: it sat in plaintext in `harness/lib.mjs` in a repo that is
public on GitHub, so it lives in clonable git history regardless of
what HEAD says. Treated as burned. What was done about it:

- Every gated tenant now carries its own per-tenant bcrypt hash in
  `src/lib/platform/tenants.ts` (`demo` rotated, `nccf` minted fresh);
  the old credential authenticates nowhere.
- History was NOT rewritten and nothing was force-pushed. Rotation was
  chosen over scrubbing deliberately: scrubbing public history is
  theater once a repo has been cloned, rotation actually revokes.
- The plaintext no longer appears anywhere in the working tree; the two
  historical quotes in `docs/SESSION_HANDOFF.md` are redacted.

## Harness monitoring gap: six silent weeks (2026-08-27)

When BOP went `public` on 2026-07-15, its `/api/auth/login` began
rejecting every credential with 401 (a public tenant has no
`passwordHash`). The harness logged in unconditionally, so
`node check.mjs` against production failed at login from that date
until Phase 1 (2026-08-27) taught it to continue unauthenticated on
401. A monitoring gap, not a code defect: nobody ran the harness in
the interval, so nothing surfaced it. If the harness goes unused for
weeks again, run it once against production after any access-mode
change.

## NCCF data provenance (2026-08-27)

- Source is the public ArcGIS Online webmap item
  `f0ec44faf40a4f208c35bb099b2dcea3` (portal
  `indi3f437e80d142.maps.arcgis.com`), 39 operational layers, 93,418
  transect points. Mirrored to `src/app/projects/nccf/data/layers/` as
  static GeoJSON by `scripts/fetch-nccf-layers.ts` (deterministic; the
  38.8 MB raw mirror is gitignored and reproducible on demand).
  Committed instead: `manifest.json` plus the display derivative
  `coastline.json` / `sites.json` from
  `scripts/derive-nccf-display.ts`. The page has NO runtime ArcGIS
  dependency: no embed, no iframe, no fetch.
- `docs/nccf/CLAIMS.md` is the authority for every number that reaches
  the NCCF page. Its figures were independently reproduced from the
  public layer data on 2026-08-27 (all eight verification checks in
  packet Amendment 02 matched exactly).

## NCCF pre-send to-do (2026-08-27)

- Complete Open Graph / sharing overhaul for the NCCF page: og:title,
  og:description, og:image, twitter card. The draft 2 document served at
  the tenant root currently carries none.
- The page title needs to be written. "The Vanishing Edge" is the working
  document title, not an approved one.
