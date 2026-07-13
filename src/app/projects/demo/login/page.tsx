import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Platform isolation demo | Access',
  description: 'Internal demo. Credentials are held by the platform team.',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Password gate for the demo tenant. The form is a client component that
 * reads ?from= via useSearchParams, so it must sit under a Suspense
 * boundary (CSR bailout rule).
 */
export default function LoginPage() {
  return (
    <main className="demo-login-wrap">
      <div className="demo-login-card">
        <p className="demo-kicker">Internal / natrx.report platform</p>
        <h1 className="demo-login-title">Platform isolation demo</h1>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p className="demo-login-note">
          Internal demo. Credentials are held by the platform team.
        </p>
      </div>
    </main>
  )
}
