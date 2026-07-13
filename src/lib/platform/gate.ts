/**
 * The access gate. Single entry point, used by every gated surface.
 *
 * Modeled on evaluateShareGate in the unified app (natrx-marketing-suite,
 * web/src/lib/shares/access.ts): resolve tenant, evaluate access mode,
 * check credential, return a decision. Mirroring that shape keeps the
 * eventual fold into the unified app a swap, not a reconciliation.
 *
 * Session model, also mirroring the unified app's share gate:
 *   - Login verifies the submitted credential against the tenant's bcrypt
 *     hash (no plaintext credential exists anywhere in this codebase).
 *   - On success we set an httpOnly cookie whose value is
 *     HMAC-SHA256(PLATFORM_SESSION_SECRET, "<slug>:<passwordHash>").
 *     Rotating either the tenant password or the secret invalidates all
 *     of that tenant's sessions.
 *   - The cookie is host-only (no Domain attribute), so a session on
 *     bop.natrx.report grants nothing on any other subdomain.
 *
 * Everything here except verifyTenantCredential must stay Edge-safe
 * (Web Crypto only): the middleware runs it on every request. bcrypt is
 * loaded lazily and only ever runs in the login route (Node runtime).
 */

import { getTenant, type Tenant } from './tenants'

export type GateStatus = 'ok' | 'not_found' | 'draft' | 'locked'

export type GateDecision = {
  status: GateStatus
  tenant: Tenant | null
}

export function sessionCookieName(slug: string): string {
  return `nx-report-${slug}`
}

function sessionSecret(): string {
  const secret = process.env.PLATFORM_SESSION_SECRET
  if (!secret) {
    throw new Error(
      'PLATFORM_SESSION_SECRET is not set. Gated tenants fail closed without it.',
    )
  }
  return secret
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** The session cookie value that proves access to this tenant. */
export async function mintSessionValue(tenant: Tenant): Promise<string> {
  return hmacHex(sessionSecret(), `${tenant.slug}:${tenant.passwordHash}`)
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/**
 * The gate decision for a request.
 *
 *   not_found → no such tenant: 404
 *   draft     → tenant exists but is unlaunched: 404
 *   locked    → gated and no valid session: send to login
 *   ok        → serve the project
 */
export async function evaluateTenantGate(
  slug: string,
  sessionCookieValue: string | undefined,
): Promise<GateDecision> {
  const tenant = getTenant(slug)
  if (!tenant) return { status: 'not_found', tenant: null }
  if (tenant.accessMode === 'draft') return { status: 'draft', tenant }
  if (tenant.accessMode === 'public' || !tenant.passwordHash) {
    return { status: 'ok', tenant }
  }
  if (!sessionCookieValue) return { status: 'locked', tenant }
  try {
    const expected = await mintSessionValue(tenant)
    return {
      status: safeEqual(sessionCookieValue, expected) ? 'ok' : 'locked',
      tenant,
    }
  } catch {
    // Missing/broken secret: fail closed.
    return { status: 'locked', tenant }
  }
}

/**
 * Credential check for the login route. bcrypt compare over the combined
 * "<username>:<password>" string — both halves of the shared credential
 * are enforced, and neither exists in plaintext anywhere in the repo.
 * Node runtime only (bcryptjs is loaded lazily so the Edge middleware
 * bundle never pulls it in).
 */
export async function verifyTenantCredential(
  tenant: Tenant,
  username: string,
  password: string,
): Promise<boolean> {
  if (!tenant.passwordHash) return false
  const { default: bcrypt } = await import('bcryptjs')
  return bcrypt.compare(`${username}:${password}`, tenant.passwordHash)
}
