import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Gated preview of the current design of record:
 * docs/nccf/reference/vanishing-edge-draft2.html, served verbatim.
 *
 * The file is read from disk once at module load — the literal
 * process.cwd() join is what Vercel's output file tracing follows to
 * include the file in the deployed function. It is deliberately NOT in
 * public/ (the /data exclusion in the middleware matcher makes public/
 * world-readable); this path is inside the matcher, so the tenant gate
 * applies to it exactly as it does to the page.
 *
 * The scaffold page at / is untouched; this is a separate URL.
 */

const html = readFileSync(
  join(process.cwd(), 'docs/nccf/reference/vanishing-edge-draft2.html'),
  'utf-8',
)

export const dynamic = 'force-dynamic'

export function GET() {
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
