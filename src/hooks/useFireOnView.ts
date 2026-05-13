'use client'

import { useEffect, useRef, type RefObject } from 'react'

interface Options {
  /** Visibility threshold (0..1) before the callback fires. Defaults to 0.5. */
  threshold?: number
  /** Skip the callback if the user has not yet scrolled (avoid first-paint noise). */
  skipInitial?: boolean
}

/**
 * Attach to an element ref. Calls `onView` exactly once, the first time the
 * element scrolls into view past `threshold`. Disconnects the observer
 * immediately after firing so it stays cheap.
 *
 * Used for analytics-only fire-and-forget signals (section_reached,
 * top_ranked_viewed). Not appropriate for animation triggers — use Framer's
 * own viewport prop for those.
 */
export function useFireOnView<T extends Element>(
  ref: RefObject<T | null>,
  onView: () => void,
  { threshold = 0.5, skipInitial = false }: Options = {}
) {
  const firedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || firedRef.current) return
    if (typeof IntersectionObserver === 'undefined') return

    const initialScrollY = skipInitial ? window.scrollY : -Infinity
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        if (skipInitial && window.scrollY === initialScrollY) return
        if (firedRef.current) return
        firedRef.current = true
        onView()
        observer.disconnect()
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, onView, threshold, skipInitial])
}
