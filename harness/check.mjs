/**
 * The single regression command.
 *
 *   node check.mjs <url>
 *
 * Captures <url> into .last-run/ and diffs against the committed baseline/.
 *
 *   - Content diff is EXACT-MATCH. Any delta at all is a FAIL. A content
 *     failure means: halt the restructure and report. Do not fix forward.
 *   - Screenshot diff is perceptual (pixelmatch), FAIL above FAIL_RATIO.
 *     Diff images land in .last-run/diff/ for inspection.
 *
 * Exit code 0 = pass, 1 = fail, 2 = harness error.
 */

import fs from 'node:fs'
import path from 'node:path'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import { capture, BASELINE_DIR, IMAGE_FILES, PIXEL_THRESHOLD, FAIL_RATIO } from './lib.mjs'

const url = process.argv[2]
if (!url) {
  console.error('Usage: node check.mjs <url>')
  process.exit(2)
}
if (!fs.existsSync(path.join(BASELINE_DIR, 'content.sha256'))) {
  console.error('No baseline found. Run `node capture.mjs` against production first.')
  process.exit(2)
}

const runDir = path.join(import.meta.dirname, '.last-run')
const diffDir = path.join(runDir, 'diff')

console.log(`Checking ${url} against baseline...`)
await capture(url, runDir)
fs.mkdirSync(diffDir, { recursive: true })

let failed = false

// ---- Content: exact match ----
const baseHash = fs.readFileSync(path.join(BASELINE_DIR, 'content.sha256'), 'utf8').trim()
const runHash = fs.readFileSync(path.join(runDir, 'content.sha256'), 'utf8').trim()
if (baseHash === runHash) {
  console.log(`CONTENT  PASS  sha256 identical (${baseHash.slice(0, 16)}…)`)
} else {
  failed = true
  console.log('CONTENT  FAIL  sha256 mismatch')
  console.log(`  baseline: ${baseHash}`)
  console.log(`  this run: ${runHash}`)
  reportContentDiff(
    JSON.parse(fs.readFileSync(path.join(BASELINE_DIR, 'content.json'), 'utf8')),
    JSON.parse(fs.readFileSync(path.join(runDir, 'content.json'), 'utf8')),
  )
}

// ---- Screenshots: perceptual ----
for (const file of IMAGE_FILES) {
  const basePath = path.join(BASELINE_DIR, file)
  const runPath = path.join(runDir, file)
  if (!fs.existsSync(basePath) || !fs.existsSync(runPath)) {
    failed = true
    console.log(`PIXELS   FAIL  ${file}: missing (${!fs.existsSync(basePath) ? 'baseline' : 'run'})`)
    continue
  }
  const a = PNG.sync.read(fs.readFileSync(basePath))
  const b = PNG.sync.read(fs.readFileSync(runPath))
  // Dimension drift is itself a layout change; pad so the overflow counts as diff.
  const width = Math.max(a.width, b.width)
  const height = Math.max(a.height, b.height)
  const pa = pad(a, width, height)
  const pb = pad(b, width, height)
  const diff = new PNG({ width, height })
  const diffPixels = pixelmatch(pa.data, pb.data, diff.data, width, height, {
    threshold: PIXEL_THRESHOLD,
  })
  const ratio = diffPixels / (width * height)
  const dims = a.width === b.width && a.height === b.height
    ? ''
    : `  [dims ${a.width}x${a.height} -> ${b.width}x${b.height}]`
  if (ratio <= FAIL_RATIO) {
    console.log(`PIXELS   PASS  ${file}: ${(ratio * 100).toFixed(4)}% differs${dims}`)
    if (dims) {
      failed = true
      console.log(`PIXELS   FAIL  ${file}: dimensions changed despite low pixel delta`)
    }
  } else {
    failed = true
    fs.writeFileSync(path.join(diffDir, file), PNG.sync.write(diff))
    console.log(
      `PIXELS   FAIL  ${file}: ${(ratio * 100).toFixed(4)}% differs (limit ${(FAIL_RATIO * 100).toFixed(2)}%)${dims} -> diff/${file}`,
    )
  }
}

console.log(failed ? '\nRESULT: FAIL' : '\nRESULT: PASS')
process.exit(failed ? 1 : 0)

function pad(png, width, height) {
  if (png.width === width && png.height === height) return png
  const out = new PNG({ width, height })
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0)
  return out
}

/** Human-readable pointer at the first divergences, section by section. */
function reportContentDiff(base, run) {
  const sections = [
    ['page.texts', base.page?.texts, run.page?.texts],
    ['page.attrs', base.page?.attrs, run.page?.attrs],
    ['login.texts', base.login?.texts, run.login?.texts],
    ['login.attrs', base.login?.attrs, run.login?.attrs],
    ['drawerGlossary.texts', base.drawerGlossary?.texts, run.drawerGlossary?.texts],
    ['drawerPress.texts', base.drawerPress?.texts, run.drawerPress?.texts],
    ...Object.keys(base.walkthroughSteps ?? {}).map((k) => [
      `walkthroughSteps.${k}.texts`,
      base.walkthroughSteps?.[k]?.texts,
      run.walkthroughSteps?.[k]?.texts,
    ]),
  ]
  const baseMetaStr = JSON.stringify(base.meta)
  const runMetaStr = JSON.stringify(run.meta)
  if (baseMetaStr !== runMetaStr) {
    console.log('  meta differs:')
    console.log(`    baseline: ${baseMetaStr}`)
    console.log(`    this run: ${runMetaStr}`)
  }
  for (const [label, a, b] of sections) {
    if (!a || !b) {
      if (JSON.stringify(a) !== JSON.stringify(b)) console.log(`  ${label}: present/absent mismatch`)
      continue
    }
    if (a.length !== b.length) console.log(`  ${label}: ${a.length} strings -> ${b.length}`)
    let shown = 0
    const n = Math.max(a.length, b.length)
    for (let i = 0; i < n && shown < 10; i++) {
      if (a[i] !== b[i]) {
        console.log(`  ${label}[${i}]:`)
        console.log(`    baseline: ${JSON.stringify(a[i])}`)
        console.log(`    this run: ${JSON.stringify(b[i])}`)
        shown++
      }
    }
    if (shown === 10) console.log(`  ${label}: further diffs suppressed…`)
  }
  console.log('  Full manifests: baseline/content.json vs .last-run/content.json')
}
