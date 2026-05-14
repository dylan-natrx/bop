import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: "Restoring New York Harbor's Oyster Reefs — Access",
  description:
    'Restricted preview. Press contact: dylan@mondayandpartners.com.',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * Password gate. Custom-branded preview access while the page is not yet
 * public. To disable, set AUTH_DISABLED=true (the middleware no-ops and
 * this page is unreachable). To remove entirely, delete middleware.ts
 * and this route.
 */
export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-bg-deep">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* BOP × Natrx lockup, big and centered */}
        <div className="flex items-center gap-6 lg:gap-8 mb-12 lg:mb-16">
          <img
            src="/images/bop-logo.png"
            alt="Billion Oyster Project"
            className="h-14 lg:h-20 w-auto"
          />
          <span
            aria-hidden="true"
            className="font-serif font-light text-ivory-faint text-2xl lg:text-3xl"
          >
            ×
          </span>
          <img
            src="/images/natrx-logo-white.png"
            alt="Natrx"
            className="h-10 lg:h-14 w-auto"
          />
        </div>

        {/* Headline + lede */}
        <h1
          className="
            font-serif font-light text-ivory
            text-3xl lg:text-4xl
            leading-[1.1]
            text-center
            max-w-[24ch]
            mb-3
          "
        >
          Restoring New York Harbor&apos;s Oyster Reefs.
        </h1>
        <p
          className="
            font-sans text-ivory-dim font-light
            text-[14px] lg:text-[15px]
            leading-[1.55]
            text-center
            max-w-[42ch]
            mb-10 lg:mb-12
          "
        >
          A site prioritization framework developed in partnership by Natrx
          and Billion Oyster Project. This preview is private while editorial
          review is in progress.
        </p>

        {/* Login form (client component for state) */}
        <Suspense fallback={<FormSkeleton />}>
          <LoginForm />
        </Suspense>

        {/* Press contact footer */}
        <div className="mt-10 lg:mt-12 text-center">
          <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint mb-2">
            Press access
          </div>
          <a
            href="mailto:dylan@mondayandpartners.com"
            className="
              font-sans text-[13px] text-ivory-dim hover:text-ivory
              underline decoration-dotted underline-offset-4 decoration-teal/60
              hover:decoration-teal-bright hover:decoration-solid
              transition-colors duration-200
            "
          >
            dylan@mondayandpartners.com
          </a>
        </div>
      </div>
    </main>
  )
}

function FormSkeleton() {
  return (
    <div className="w-full h-48 animate-pulse">
      <div className="h-12 bg-bg-soft/30 rounded mb-4" />
      <div className="h-12 bg-bg-soft/30 rounded mb-4" />
      <div className="h-12 bg-teal/30 rounded" />
    </div>
  )
}
