'use client'

import { useCallback, useRef } from 'react'
import { useFireOnView } from '@/hooks/useFireOnView'
import { track } from '@/lib/track'

interface SectionViewTrackerProps {
  /** Section id matches the element id used elsewhere (e.g. "methodology") */
  section: string
}

/**
 * Invisible analytics-only marker. Renders a zero-height span at the top of
 * each SectionShell. Fires section_reached once per session per section the
 * first time it intersects the viewport. Keeps SectionShell server-rendered.
 */
export function SectionViewTracker({ section }: SectionViewTrackerProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const onView = useCallback(() => track('section_reached', { section }), [section])
  useFireOnView(ref, onView, { threshold: 0.01, skipInitial: true })
  return <span ref={ref} aria-hidden="true" className="block w-0 h-0" />
}
