import { NextResponse, type NextRequest } from 'next/server'

/**
 * POST /api/auth/login
 *
 * Body: { username: string, password: string, from?: string }
 *
 * On success: sets `bop-auth` httpOnly cookie containing AUTH_TOKEN,
 * returns { ok: true, redirect: <from or "/"> }.
 *
 * On failure: returns 401 with { ok: false, error: <message> }.
 *
 * The middleware (middleware.ts at project root) is the consumer of the
 * cookie. It compares the cookie value against AUTH_TOKEN; any match
 * passes the gate.
 *
 * Credentials and the token live in env vars (defaults are fine for local
 * dev; production should set them):
 *   AUTH_USERNAME   shared username       (default: natrx)
 *   AUTH_PASSWORD   shared password       (default: resili3nc3)
 *   AUTH_TOKEN      bop-auth cookie value (default: bop-preview-2026)
 */

const AUTH_USERNAME = process.env.AUTH_USERNAME ?? 'natrx'
const AUTH_PASSWORD = process.env.AUTH_PASSWORD ?? 'resili3nc3'
const AUTH_TOKEN = process.env.AUTH_TOKEN ?? 'bop-preview-2026'

/** Block path traversal / open-redirect via the `from` field. */
function safeRedirect(from: unknown): string {
  if (typeof from !== 'string') return '/'
  if (!from.startsWith('/')) return '/'
  if (from.startsWith('//')) return '/'
  if (from.startsWith('/login')) return '/'
  return from
}

export async function POST(request: NextRequest) {
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

  if (username !== AUTH_USERNAME || password !== AUTH_PASSWORD) {
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

  // 30-day cookie. httpOnly so JS can't read it; secure in prod.
  response.cookies.set('bop-auth', AUTH_TOKEN, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })

  return response
}
