import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

/**
 * Root layout: an unopinionated shell. html, body, platform analytics,
 * nothing else. Fonts, metadata, palette, and every other design decision
 * belong to the project layouts under app/projects/<slug>/ — a project's
 * stylesheet only loads on that project's routes, so projects can style
 * body itself without ever colliding.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
