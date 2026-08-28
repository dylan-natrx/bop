'use client'

import { useEffect, useState } from 'react'

/**
 * Left vertical rail: the six beats, scrollspy-tracked. Under 1080px it
 * collapses to a bottom sheet behind the Contents toggle (CSS handles the
 * layout swap; this component owns open state and the active beat).
 */

const BEATS: [string, string][] = [
  ['01', 'The question'],
  ['02', 'The problem'],
  ['03', 'The finding'],
  ['04', 'The method'],
  ['05', 'The payoff'],
  ['06', 'What happens now'],
]

export default function BeatRail() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>('.nccf-root section'))
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = secs.indexOf(entry.target as HTMLElement)
          if (i >= 0) setActive(i)
        }
      },
      { rootMargin: '-46% 0px -46% 0px' },
    )
    secs.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  return (
    <>
      <button id="railBtn" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Contents'}
      </button>
      <nav id="rail" aria-label="Contents" className={open ? 'open' : undefined}>
        <ol id="railList">
          {BEATS.map(([n, label], i) => (
            <li key={n}>
              <a
                href={`#b${i + 1}`}
                className={active === i ? 'on' : undefined}
                aria-current={active === i ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="n">{n}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
