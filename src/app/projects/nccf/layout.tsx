import type { Metadata } from 'next'
import { Darker_Grotesque, Familjen_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './styles/nccf.css'

/**
 * NCCF tenant's own nested layout: its typefaces, its metadata, its
 * stylesheet. Deliberately shares nothing with any other project. The root
 * layout above this renders the html/body shell; this layout only wraps
 * children in a div carrying the font variables. Body-level styling lives
 * in nccf.css, which only ever loads on nccf routes.
 *
 * Typefaces are self-hosted through next/font — no request to
 * fonts.googleapis.com leaves the page (the reference build's <link> was a
 * standalone-file convenience and is deliberately not ported).
 */

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-darker-grotesque',
  display: 'swap',
})

const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-familjen',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Vanishing Edge',
  description:
    'A gated project page for the North Carolina Coastal Federation on the natrx.report platform.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NccfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${darkerGrotesque.variable} ${familjenGrotesk.variable} ${plexMono.variable} nccf-root`}
    >
      {children}
    </div>
  )
}
