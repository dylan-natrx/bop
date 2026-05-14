import { NextResponse, type NextRequest } from 'next/server'

/**
 * Password gate for the pre-public preview.
 *
 * Behavior:
 *   - Unauthenticated requests redirect to /login?from=<original-path>.
 *   - Authenticated requests (valid `bop-auth` cookie) pass through.
 *   - To DISABLE the gate (e.g. when the page goes public), set the env var
 *     `AUTH_DISABLED=true`. The matcher below still runs but the middleware
 *     becomes a no-op. Easier than touching the matcher when you want to
 *     re-enable temporarily.
 *
 * Credentials and cookie value live in env vars:
 *   AUTH_USERNAME      shared username (default: natrx)
 *   AUTH_PASSWORD      shared password (default: resili3nc3)
 *   AUTH_TOKEN         the value stored in the bop-auth cookie. Anything
 *                      that matches passes. Default is a fixed string so
 *                      local dev works without configuring env vars; in
 *                      production set this to a long random string.
 *
 * Cookie semantics: a single shared session token. Anyone with the cookie
 * value is "in." Rotate by changing AUTH_TOKEN — all sessions invalidate.
 *
 * Removed when going public: delete this file. The login page and
 * /api/auth/login route can stay (harmless) or be deleted in the same
 * commit.
 */

const AUTH_TOKEN = process.env.AUTH_TOKEN ?? 'bop-preview-2026'
const AUTH_DISABLED = process.env.AUTH_DISABLED === 'true'

export function middleware(request: NextRequest) {
  if (AUTH_DISABLED) return NextResponse.next()

  const cookie = request.cookies.get('bop-auth')?.value
  if (cookie === AUTH_TOKEN) return NextResponse.next()

  // Redirect to /login, preserving the requested path so we can bounce
  // back after a successful login.
  const loginUrl = new URL('/login', request.url)
  const requestedPath = request.nextUrl.pathname + request.nextUrl.search
  if (requestedPath && requestedPath !== '/') {
    loginUrl.searchParams.set('from', requestedPath)
  }
  return NextResponse.redirect(loginUrl)
}

/**
 * Exclusions:
 *   - _next/static, _next/image  Next.js bundle + image optimization
 *   - favicon.ico                root favicon
 *   - images, site-imagery, data static assets used by the login page and
 *                                the OG image
 *   - login                      the gate itself
 *   - api/auth                   the credential POST endpoint
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon\\.ico|images|site-imagery|data|login|api/auth).*)',
  ],
}
