import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import './styles/bop.css'

/**
 * BOP's own layout: its typefaces, its metadata, its stylesheet. Nothing
 * here is shared with any other project; the root layout above this is an
 * unopinionated html/body shell.
 *
 * The font variable classes live on the wrapper div (a nested layout
 * cannot touch <html>), and bop.css maps them onto the generic
 * --project-font-* slots the Tailwind font utilities read. Body-level
 * styling (background gradients, noise overlay) lives in bop.css, which
 * only ever loads on BOP routes.
 */

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

export default function BopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} project-bop font-sans`}
    >
      {children}
    </div>
  )
}
