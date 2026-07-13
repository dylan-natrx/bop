/**
 * Capture harness artifacts from a deployment.
 *
 *   node capture.mjs [url] [--out <dir>]
 *
 * Defaults: url = https://bop.natrx.report, out = ./baseline
 * `--out baseline` (the default) is the destructive one: it replaces the
 * committed baseline. Only do that against production, deliberately.
 */

import path from 'node:path'
import { capture, DEFAULT_URL, BASELINE_DIR } from './lib.mjs'

const args = process.argv.slice(2)
let url = DEFAULT_URL
let outDir = BASELINE_DIR
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') {
    outDir = path.resolve(import.meta.dirname, args[++i])
  } else if (!args[i].startsWith('-')) {
    url = args[i]
  }
}

console.log(`Capturing ${url} -> ${outDir}`)
await capture(url, outDir)
console.log('Capture complete.')
