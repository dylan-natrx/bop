import { NextResponse, type NextRequest } from 'next/server'
import { resolveHost, getTenant } from '@/lib/platform/tenants'
import { mintSessionValue, sessionCookieName } from '@/lib/platform/gate'
import { verifyTenantCredential } from '@/lib/platform/credentials'

/**
 * POST /api/auth/login
 *
 * Body: { username: string, password: string, from?: string }
 *
 * The tenant is resolved from the request hostname, exactly as the
 * middleware resolves it. The submitted credential is verified against
 * the tenant's bcrypt hash in the registry (lib/platform/tenants.ts) —
 * no plaintext credential exists anywhere in this codebase.
 *
 * On success: sets the tenant-scoped httpOnly session cookie (an HMAC
 * value; see lib/platform/gate.ts), returns { ok: true, redirect }.
 * On failure: 401 with { ok: false, error }.
 */

/** Block path traversal / open-redirect via the `from` field. */
function safeRedirect(from: unknown): string {
  if (typeof from !== 'string') return '/'
  if (!from.startsWith('/')) return '/'
  if (from.startsWith('//')) return '/'
  if (from.startsWith('/login')) return '/'
  return from
}

export async function POST(request: NextRequest) {
  const resolution = resolveHost(
    request.headers.get('host'),
    request.nextUrl.searchParams,
  )
  const tenant = resolution.kind === 'tenant' ? getTenant(resolution.slug) : null
  if (!tenant || tenant.accessMode === 'draft') {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 })
  }

  let body: { username?: unknown; password?: unknown; from?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request.' },
      { status: 400 },
    )
  }

  const username = typeof body.username === 'string' ? body.username : ''
  const password = typeof body.password === 'string' ? body.password : ''

  const valid = await verifyTenantCredential(tenant, username, password)
  if (!valid) {
    // Constant-ish delay on failure to discourage credential stuffing.
    // 250ms is enough to be noticeable but not painful for legitimate users.
    await new Promise((r) => setTimeout(r, 250))
    return NextResponse.json(
      { ok: false, error: 'Incorrect username or password.' },
      { status: 401 },
    )
  }

  const redirect = safeRedirect(body.from)
  const response = NextResponse.json({ ok: true, redirect })

  // 30-day, host-only cookie: a session on one subdomain grants nothing
  // on any other. httpOnly so JS can't read it; secure in prod.
  response.cookies.set(sessionCookieName(tenant.slug), await mintSessionValue(tenant), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })

  return response
}
