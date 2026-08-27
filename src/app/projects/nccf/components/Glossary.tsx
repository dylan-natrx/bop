'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Right slide-out glossary drawer plus scrim. Owns the open state; the
 * masthead trigger talks to it over window events (toggle in, state out).
 * Closes on scrim click, close button, or Escape. Focus moves to the close
 * button on open and back to the trigger on close. Content is verbatim from
 * the reference build.
 */
export default function Glossary() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  const set = useCallback((next: boolean) => setOpen(next), [])

  useEffect(() => {
    const onToggle = () => setOpen((o) => !o)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('nccf:gloss-toggle', onToggle)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('nccf:gloss-toggle', onToggle)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('nccf:gloss-state', { detail: { open } }))
    if (open) {
      closeRef.current?.focus()
      wasOpen.current = true
    } else if (wasOpen.current) {
      document.getElementById('glossBtn')?.focus()
    }
  }, [open])

  return (
    <>
      <div id="scrim" className={open ? 'on' : undefined} onClick={() => set(false)} />
      <aside
        id="gloss"
        className={open ? 'on' : undefined}
        aria-hidden={!open}
        aria-label="Glossary and contacts"
      >
        <button id="glossClose" ref={closeRef} onClick={() => set(false)}>
          Close
        </button>
        <h3>Plain terms</h3>
        <dl>
          <dt>Marsh</dt>
          <dd>
            Low, salty grassland at the edge of the sounds. It floods and drains with the tide and
            it holds the shoreline together.
          </dd>
          <dt>Transect</dt>
          <dd>
            A measuring line drawn from a fixed point out to the water. Measure it in two different
            years and the difference tells you how far the shore moved.
          </dd>
          <dt>Erosion rate</dt>
          <dd>
            How far the shoreline retreats in a year, in feet. A rate of one foot a year means ten
            feet of land gone in a decade.
          </dd>
          <dt>Accretion</dt>
          <dd>
            The opposite of erosion. Land being added instead of lost. Parts of this coast are
            gaining ground.
          </dd>
          <dt>Living shoreline</dt>
          <dd>
            A low structure of stone or oyster shell built offshore to absorb wave energy so the
            marsh behind it stops washing away.
          </dd>
          <dt>Ghost forest</dt>
          <dd>
            A stand of dead trees killed by salt water pushing inland, with marsh moving in around
            them.
          </dd>
        </dl>
        <h3>Who did what</h3>
        <div className="who">
          <b>North Carolina Coastal Federation</b>
          <span>Program lead and partner</span>
        </div>
        <div className="who">
          <b>Natrx</b>
          <span>The analysis, using Natrx Assess</span>
        </div>
        <h3>Contact</h3>
        <div className="who">
          <b>Dylan DiBona</b>
          <span>Press &middot; dylan@natrx.io</span>
        </div>
        <h3>Data</h3>
        <div className="who">
          <span>
            2012 to 2022, five sets of aerial photographs. Datasets published by the Coastal
            Federation, fall 2026.
          </span>
        </div>
      </aside>
    </>
  )
}
