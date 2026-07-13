/**
 * Credential verification for the login route. Kept out of gate.ts so the
 * Edge middleware bundle never pulls in bcryptjs — this module must only
 * ever be imported from Node-runtime code (route handlers).
 */

import bcrypt from 'bcryptjs'
import type { Tenant } from './tenants'

/**
 * bcrypt compare over the combined "<username>:<password>" string — both
 * halves of the shared credential are enforced, and neither exists in
 * plaintext anywhere in the repo.
 */
export async function verifyTenantCredential(
  tenant: Tenant,
  username: string,
  password: string,
): Promise<boolean> {
  if (!tenant.passwordHash) return false
  return bcrypt.compare(`${username}:${password}`, tenant.passwordHash)
}
