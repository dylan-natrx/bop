/**
 * The tenant registry. Identity and access policy only — no colors, no
 * fonts, no logo paths, no brand config. Design lives entirely inside each
 * project's own directory. If a field would only ever be read by one
 * project, it does not belong here.
 *
 * Adding a project = one directory under app/projects/, one entry here,
 * one DNS record.
 */

export type AccessMode = 'draft' | 'gated' | 'public'

export type Tenant = {
  /** Matches the subdomain: <slug>.natrx.report */
  slug: string
  displayName: string
  /**
   * draft  → 404 for everyone (exists in code, not launched)
   * gated  → shared-credential gate (passwordHash required)
   * public → no gate
   */
  accessMode: AccessMode
  /**
   * bcrypt hash over the string "<username>:<password>". The plaintext
   * credential exists nowhere in this codebase. null when public.
   */
  passwordHash: string | null
  /** 302 target for /media. null → /media 404s. */
  mediaUrl: string | null
}

export const TENANTS: readonly Tenant[] = [
  {
    slug: 'bop',
    displayName: 'Billion Oyster Project',
    // Ungated 2026-07-15 (pre-publication; the URL has not been shared).
    // The page carries robots noindex until launch — see its layout.tsx.
    accessMode: 'public',
    passwordHash: null,
    mediaUrl: 'https://share.natrx.io/billion-oyster-project',
  },
  {
    slug: 'demo',
    displayName: 'Platform Demo',
    accessMode: 'gated',
    passwordHash: '$2b$12$V7KLoLKRj.ebpwBXEmVI4eYte9A/oljRS9ghvdZbF7R4zrAMVy0XO',
    mediaUrl: null,
  },
  {
    // Per-tenant credential hash — not shared with demo or any other tenant.
    slug: 'nccf',
    displayName: 'North Carolina Coastal Federation',
    accessMode: 'gated',
    passwordHash: '$2b$12$UjW3NFrRES0ADe15cWKCA.1d3PZpbiMyWa.M5wFvB3nymqMjk14OG',
    mediaUrl: null,
  },
]

export function getTenant(slug: string): Tenant | null {
  return TENANTS.find((t) => t.slug === slug) ?? null
}

const PLATFORM_APEX = 'natrx.report'

export type HostResolution =
  | { kind: 'apex' }
  | { kind: 'tenant'; slug: string }

/**
 * Hostname → what this request is addressing.
 *
 *   natrx.report / www.natrx.report   → apex (holding page)
 *   <sub>.natrx.report                → tenant slug <sub> (may be unknown;
 *                                       the gate turns unknown into 404)
 *   anything else (localhost, Vercel  → dev/preview fallback tenant:
 *   preview URLs)                       ?tenant= param, then
 *                                       PLATFORM_DEFAULT_TENANT, then 'bop'
 */
export function resolveHost(
  host: string | null,
  searchParams?: URLSearchParams,
): HostResolution {
  const hostname = (host ?? '').toLowerCase().split(':')[0]
  if (hostname === PLATFORM_APEX || hostname === `www.${PLATFORM_APEX}`) {
    return { kind: 'apex' }
  }
  if (hostname.endsWith(`.${PLATFORM_APEX}`)) {
    const sub = hostname.slice(0, -(PLATFORM_APEX.length + 1))
    // Nested subdomains (a.b.natrx.report) resolve as unknown tenants.
    return { kind: 'tenant', slug: sub }
  }
  const override = searchParams?.get('tenant')
  return {
    kind: 'tenant',
    slug: override || process.env.PLATFORM_DEFAULT_TENANT || 'bop',
  }
}
