import type { Metadata } from 'next'
import { IBM_Plex_Serif, Space_Grotesk } from 'next/font/google'
import './styles/nccf.css'

/**
 * NCCF tenant's own nested layout: its typefaces, its metadata, its
 * stylesheet. Deliberately shares nothing with any other project. The root
 * layout above this renders the html/body shell; this layout only wraps
 * children in a div carrying the font variables. Body-level styling lives
 * in nccf.css, which only ever loads on nccf routes.
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-plex-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'North Carolina Coastal Federation',
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
    <div className={`${spaceGrotesk.variable} ${plexSerif.variable} nccf-root`}>
      {children}
    </div>
  )
}
