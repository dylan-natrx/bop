# NOTES

Observations logged during the platform restructure. Nothing here is
part of the current build; items are candidates for later PRs.

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
