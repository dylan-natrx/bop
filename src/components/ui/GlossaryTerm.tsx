'use client'

import type { ReactNode } from 'react'
import { useDrawer } from '@/components/chrome/SiteChromeProvider'

interface GlossaryTermProps {
  /**
   * Stable identifier matching an entry in glossary-data.ts (e.g. "estuary",
   * "allee-effect"). Clicking the term opens the drawer scrolled to the entry.
   */
  termId: string
  children: ReactNode
}

/**
 * Inline link that opens the persistent right-edge drawer's glossary tab and
 * scrolls to the matching entry. Wrap any term in body copy that has a
 * glossary definition:
 *
 *   <GlossaryTerm termId="estuary">estuary</GlossaryTerm>
 *
 * Visual treatment: dotted underline in soft teal, becomes solid teal-bright
 * on hover. Inherits font, color, and line-height from the surrounding prose.
 */
export function GlossaryTerm({ termId, children }: GlossaryTermProps) {
  const { open } = useDrawer()

  return (
    <button
      type="button"
      onClick={() => open('glossary', termId)}
      style={{
        font: 'inherit',
        color: 'inherit',
        lineHeight: 'inherit',
        background: 'none',
        padding: 0,
        margin: 0,
        border: 0,
        display: 'inline',
        cursor: 'pointer',
      }}
      className="
        underline decoration-dotted underline-offset-4 decoration-teal/60
        hover:decoration-solid hover:decoration-teal-bright hover:text-ivory
        transition-colors duration-200
      "
    >
      {children}
    </button>
  )
}
