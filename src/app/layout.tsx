import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

// Fraunces with optical sizing and italic support
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  // Canonical host for absolute URL resolution (OG images, Twitter cards,
  // any other absolute path metadata Next.js generates). Without this,
  // Next.js falls back to http://localhost:3000 and link previews on
  // external scrapers (Slack, FB, X) get a broken image URL.
  metadataBase: new URL('https://bop.natrx.report'),
  title: "Restoring New York Harbor's Oyster Reefs | Billion Oyster Project × Natrx",
  description:
    'A site prioritization framework for Billion Oyster Project, developed in partnership with Natrx. 78 candidate sites across 2,604 acres of urban estuary.',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: "Restoring New York Harbor's Oyster Reefs",
    description:
      'Where should New York Harbor prioritize building oyster reefs? A data-driven framework for Billion Oyster Project.',
    type: 'website',
    images: [
      {
        url: '/site-imagery/nyoyster.webp',
        width: 1201,
        height: 901,
        alt: 'A New York Harbor oyster, with the city skyline behind it',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Restoring New York Harbor's Oyster Reefs",
    description:
      'Where should New York Harbor prioritize building oyster reefs? A data-driven framework for Billion Oyster Project.',
    images: ['/site-imagery/nyoyster.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-deep text-ivory font-sans font-light antialiased overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
