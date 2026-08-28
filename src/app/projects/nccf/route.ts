import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * The tenant root serves the current design of record —
 * docs/nccf/reference/vanishing-edge-draft2.html — behind the platform
 * gate (this segment sits inside the middleware matcher).
 *
 * The reference file is a FRAGMENT, not a complete document: it begins at
 * <title> and carries no doctype, <html>, <head> or viewport meta, because
 * it is authored for the Artifact tool, which injects its own skeleton.
 * Served raw, a phone lays it out at ~1000px and no max-width breakpoint
 * ever fires. So the handler wraps it in a real document — once, at module
 * load. The fragment's own leading <title>/<link>/<style> are hoisted into
 * <head> by the HTML parser, which handles this correctly; the fragment's
 * contents are not reformatted, so the file stays byte-editable in the
 * design loop and keeps its identity as the artifact of record.
 *
 * The file is read from disk once at module load — the literal
 * process.cwd() join is what Vercel's output file tracing follows to
 * include the file in the deployed function. Do not refactor it into a
 * variable or helper. It is deliberately NOT in public/ (the /data
 * exclusion in the middleware matcher makes public/ world-readable).
 */

const fragment = readFileSync(
  join(process.cwd(), 'docs/nccf/reference/vanishing-edge-draft2.html'),
  'utf-8',
)

// Share metadata lives in the wrapper, not the reference file. og:title
// mirrors the fragment's own <title> so a future title decision propagates
// without touching this handler. og:image is deferred until the pass-2
// render exists (STATUS.md open item); no robots directive — access mode
// is an open decision.
const pageTitle =
  fragment.match(/<title>(.*?)<\/title>/)?.[1] ?? 'nccf.natrx.report'
const description =
  'Ten years of shoreline change, measured along 2,900 miles of eastern ' +
  'North Carolina’s coast. Nearly half of the land lost came from one ' +
  'tenth of the shoreline.'

const meta =
  `<meta name="description" content="${description}">` +
  `<meta property="og:title" content="${pageTitle}">` +
  `<meta property="og:description" content="${description}">` +
  '<meta property="og:type" content="article">' +
  '<meta property="og:site_name" content="natrx.report">' +
  '<meta name="twitter:card" content="summary_large_image">'

const html =
  '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  meta +
  fragment +
  '</body></html>'

export const dynamic = 'force-dynamic'

export function GET() {
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
