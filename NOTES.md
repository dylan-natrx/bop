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

## Minor

- `src/lib/pdf/` is an empty, untracked directory left from earlier
  work. Harmless; delete whenever convenient.
- Pre-existing lint warnings (two `<img>` usages in the login page, two
  unused `eslint-disable` directives in the map components) predate the
  restructure and were left as-is.
