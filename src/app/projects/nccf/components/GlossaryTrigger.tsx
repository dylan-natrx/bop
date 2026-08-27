'use client'

import { useEffect, useState } from 'react'

/**
 * The masthead's glossary button. Holds no drawer state of its own: it
 * broadcasts a toggle event that Glossary.tsx owns, and mirrors the open
 * state (for aria-expanded) from the state events Glossary broadcasts back.
 */
export default function GlossaryTrigger() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onState = (e: Event) => setOpen((e as CustomEvent<{ open: boolean }>).detail.open)
    window.addEventListener('nccf:gloss-state', onState)
    return () => window.removeEventListener('nccf:gloss-state', onState)
  }, [])

  return (
    <button
      id="glossBtn"
      aria-expanded={open}
      aria-controls="gloss"
      onClick={() => window.dispatchEvent(new CustomEvent('nccf:gloss-toggle'))}
    >
      Glossary
    </button>
  )
}
