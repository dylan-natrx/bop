import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'North Carolina Coastal Federation | Access',
  description: 'Gated project page. Credentials are held by the platform team.',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Password gate for the nccf tenant. The form is a client component that
 * reads ?from= via useSearchParams, so it must sit under a Suspense
 * boundary (CSR bailout rule).
 */
export default function LoginPage() {
  return (
    <main className="nccf-login-wrap">
      <div className="nccf-login-card">
        <p className="nccf-kicker">natrx.report platform</p>
        <h1 className="nccf-login-title">North Carolina Coastal Federation</h1>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p className="nccf-login-note">
          Credentials are held by the platform team.
        </p>
      </div>
    </main>
  )
}
