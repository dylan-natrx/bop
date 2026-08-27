import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * The tenant root serves the current design of record —
 * docs/nccf/reference/vanishing-edge-draft2.html — verbatim, behind the
 * platform gate (this segment sits inside the middleware matcher).
 *
 * A route handler rather than a page component because the file is a
 * complete standalone HTML document with its own <head>, styles and
 * scripts; a page.tsx cannot return one. The Phase 6 scaffold page moved
 * to ./scaffold-page.tsx (unrouted) — Amendment 04's real port rebuilds
 * on the shell (layout.tsx, nccf.css, components/, login/), all intact.
 *
 * The file is read from disk once at module load — the literal
 * process.cwd() join is what Vercel's output file tracing follows to
 * include the file in the deployed function. It is deliberately NOT in
 * public/ (the /data exclusion in the middleware matcher makes public/
 * world-readable).
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
