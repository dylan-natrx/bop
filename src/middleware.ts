import { NextResponse, type NextRequest } from 'next/server'
import { resolveHost } from '@/lib/platform/tenants'
import { evaluateTenantGate, sessionCookieName } from '@/lib/platform/gate'

/**
 * Platform middleware: hostname → tenant → gate → route.
 *
 *   natrx.report            → the platform holding page (/platform)
 *   <slug>.natrx.report     → that tenant, through its access gate
 *   unknown.natrx.report    → 404
 *   localhost / previews    → dev fallback tenant (?tenant= param, then
 *                             PLATFORM_DEFAULT_TENANT, then 'bop')
 *
 * Access gate (see lib/platform/gate.ts): gated tenants require a valid
 * HMAC session cookie; otherwise redirect to /login?from=<path>. There is
 * no disable flag and no plaintext credential anywhere — a tenant is open
 * only by being accessMode: 'public' in the registry.
 *
 * Tenant traffic is rewritten into that project's route group:
 *   bop.natrx.report/x → /projects/bop/x. The public URL never contains
 * /projects/…; a request that already does falls through the rewrite to
 * /projects/<slug>/projects/… and 404s, so project routes have exactly
 * one address.
 */
function rewriteToProject(request: NextRequest, slug: string) {
  const url = request.nextUrl.clone()
  const path = url.pathname === '/' ? '' : url.pathname
  url.pathname = `/projects/${slug}${path}`
  return NextResponse.rewrite(url)
}

export async function middleware(request: NextRequest) {
  const resolution = resolveHost(
    request.headers.get('host'),
    request.nextUrl.searchParams,
  )

  if (resolution.kind === 'apex') {
    // The apex serves only the holding page.
    if (request.nextUrl.pathname === '/') {
      return NextResponse.rewrite(new URL('/platform', request.url))
    }
    return new NextResponse('Not found', { status: 404 })
  }

  const { pathname } = request.nextUrl

  // The login page is project-owned UI but must be reachable ungated.
  // (Unknown tenants still 404 below because the gate runs first for
  // everything else, and /projects/<unknown>/login has no route.)
  if (pathname === '/login' || pathname.startsWith('/login/')) {
    return rewriteToProject(request, resolution.slug)
  }

  const cookieValue = request.cookies.get(sessionCookieName(resolution.slug))?.value
  const { status } = await evaluateTenantGate(resolution.slug, cookieValue)

  if (status === 'not_found' || status === 'draft') {
    return new NextResponse('Not found', { status: 404 })
  }

  if (status === 'locked') {
    // Redirect to /login, preserving the requested path so we can bounce
    // back after a successful login.
    const loginUrl = new URL('/login', request.url)
    const requestedPath = request.nextUrl.pathname + request.nextUrl.search
    if (requestedPath && requestedPath !== '/') {
      loginUrl.searchParams.set('from', requestedPath)
    }
    return NextResponse.redirect(loginUrl)
  }

  return rewriteToProject(request, resolution.slug)
}

/**
 * Exclusions:
 *   - _next/static, _next/image  Next.js bundle + image optimization
 *   - favicon.ico                root favicon
 *   - images, site-imagery, data static assets used by the login page and
 *                                the OG image
 *   - api/auth                   the credential POST endpoint
 *
 * /login is no longer excluded: the middleware rewrites it into the
 * tenant's project directory (ungated) so each project owns its gate UI.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon\\.ico|images|site-imagery|data|api/auth).*)',
  ],
}
