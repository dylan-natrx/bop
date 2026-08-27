'use client'

import { useEffect } from 'react'

/**
 * Drives the reveal choreography: .rv / .dec / .ladder elements gain .in on
 * first intersection, and any .pl plate children stagger in at 380ms per
 * plate index (Phase 7's figures; harmless before they exist). Renders
 * nothing. With JS disabled a <noscript> style in page.tsx makes all .rv
 * content visible; under prefers-reduced-motion the CSS overrides win.
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('in')
          entry.target
            .querySelectorAll<HTMLElement>('.pl')
            .forEach((l) =>
              setTimeout(() => l.classList.add('on'), 380 * Number(l.dataset.d ?? 0)),
            )
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('.rv,.dec,.ladder').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return null
}
