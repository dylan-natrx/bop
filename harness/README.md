# BOP regression harness

Proves that `bop.natrx.report` renders identically across the platform
restructure. Self-contained: its own `package.json`, no changes to the app.

## One-time setup

```sh
cd harness
npm install
npx playwright install chromium
```

## The single command

```sh
node check.mjs <url>
```

Captures `<url>` (authenticating through the gate) into `.last-run/` and
diffs against the committed `baseline/`:

- **Content: exact match.** Every text string in DOM order, reader-facing
  attribute strings (`alt`, `aria-label`, `placeholder`, `title`), document
  title and description/OG/Twitter meta, the drawer in both states, and the
  walkthrough copy at all six steps. Hashed; any delta is a FAIL. A content
  failure halts the restructure — report it, do not fix forward.
- **Pixels: perceptual.** Full-page screenshots at 390 / 768 / 1440, plus
  element states: hero map, walkthrough (map + spectra) at all six steps,
  drawer glossary and press contact. pixelmatch threshold 0.1, failing when
  more than 0.2% of pixels differ. Diff images land in `.last-run/diff/`.

Exit code 0 = pass, 1 = fail, 2 = harness error.

## Re-baselining (destructive, deliberate)

```sh
node capture.mjs                       # capture production into baseline/
node capture.mjs <url> --out some-dir  # capture elsewhere, non-destructive
```

Only re-baseline against production, and only when Dylan has approved a
change to what production should look like.

## Credentials

Defaults to the shared preview credentials. Override with
`HARNESS_USERNAME` / `HARNESS_PASSWORD` if they ever rotate.

## Determinism notes

- Reduced motion emulated; page fully scrolled once to fire every one-shot
  entrance; Web Animations finished/cancelled and CSS animations disabled
  before every screenshot (kills the pulse-halo loop).
- Chromium launched with `--force-color-profile=srgb --disable-lcd-text`
  so text antialiasing is stable run-to-run.
- Mapbox renders via headless WebGL; captures are guarded by a blank-canvas
  check so a failed WebGL init cannot masquerade as a passing map.
- The maps are WebGL renders, so run-to-run pixel noise is expected there;
  the 0.2% budget was set from the measured noise floor of two back-to-back
  production captures (see `NOISE_FLOOR.md` after first calibration).
