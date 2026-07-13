import { Suspense } from 'react'
import Link from 'next/link'

interface SitePageProps {
  params: Promise<{
    siteId: string
  }>
}

export default async function SitePage({ params }: SitePageProps) {
  const { siteId } = await params

  return (
    <main className="max-w-scaffold mx-auto px-scaffold-x py-scaffold-top min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-ivory-dim hover:text-ivory transition-colors mb-8"
      >
        <span>←</span>
        <span className="font-mono text-eyebrow uppercase">Back to overview</span>
      </Link>

      <Suspense
        fallback={
          <div className="animate-pulse text-ivory-dim">Loading site data...</div>
        }
      >
        <SiteDetailContent siteId={siteId} />
      </Suspense>
    </main>
  )
}

async function SiteDetailContent({ siteId }: { siteId: string }) {
  // This will be fully implemented in Site Detail section (§ 05)
  // For now, just show a placeholder
  return (
    <div className="border border-rule rounded-card p-8">
      <h1 className="font-serif text-3xl text-ivory mb-4">
        Site Detail: {siteId}
      </h1>
      <p className="text-ivory-dim">
        Full site detail panel coming soon.
      </p>
      <p className="text-ivory-faint mt-4 text-sm">
        This page loads data from /data/sites/{siteId}.json
      </p>
    </div>
  )
}
