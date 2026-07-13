'use client'

import { useCallback, useRef, type ReactNode } from 'react'
import { SiteMiniMap } from './SiteMiniMap'
import { useFireOnView } from '@/app/projects/bop/hooks/useFireOnView'
import { track } from '@/app/projects/bop/lib/track'

interface TopRankedCalloutProps {
  /** Site name */
  name: string
  /** Pre-formatted meta line (rank, score, waterbody) */
  meta: string
  /** Body copy as ReactNode (may include inline italics) */
  body: ReactNode
  /**
   * IDs of the sites this card represents. Single site for Arthur Kill and
   * Wolfe's Pond; six IDs for the Living Breakwaters cluster. The card's
   * mini-map zooms to fit all matching site polygons.
   */
  siteIds: string[]
}

/**
 * Editorial card for one of the top-ranked sites surfaced by the framework.
 * Three of these sit in a row in Section 3 below the methodology walkthrough.
 *
 * Layout: a live Mapbox mini-map at the top, zoomed to the site polygon(s)
 * with the matching geometry highlighted in teal-aqua. Below the map, the
 * site name in Fraunces, meta line in JetBrains Mono, body copy in Inter.
 * The mini-map uses the same dark editorial style as Map 1 and Map 2 so
 * the cards read as one visual system with the rest of the page.
 */
export function TopRankedCallout({
  name,
  meta,
  body,
  siteIds,
}: TopRankedCalloutProps) {
  const ref = useRef<HTMLElement | null>(null)
  const onView = useCallback(() => track('top_ranked_viewed', { site: name }), [name])
  useFireOnView(ref, onView, { threshold: 0.6, skipInitial: true })

  return (
    <article
      ref={ref}
      className="
      flex flex-col gap-4
      border border-rule rounded-card
      bg-bg-mid/30
      p-5 lg:p-6
    ">
      <SiteMiniMap siteIds={siteIds} aspect="4 / 3" />

      <div className="flex flex-col gap-1">
        <h3 className="font-serif font-light text-ivory text-xl lg:text-2xl leading-tight">
          {name}
        </h3>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-aqua tabular-nums">
          {meta}
        </div>
      </div>

      <div className="font-sans text-[13px] text-ivory-dim font-light leading-[1.6]">
        {body}
      </div>
    </article>
  )
}
