import type { ReactNode } from 'react'
import { ImagePlaceholder } from './ImagePlaceholder'

interface TopRankedCalloutProps {
  /** Site name */
  name: string
  /** Pre-formatted meta line (rank, score, waterbody) */
  meta: string
  /** Body copy as ReactNode (may include inline italics) */
  body: ReactNode
  /** Caption for the site's image once real imagery is in place */
  imageCaption: string
}

/**
 * Editorial card for one of the top-ranked sites surfaced by the framework.
 * Three of these sit in a row in Section 3 below the methodology walkthrough.
 *
 * Layout: image at the top, then site name in Fraunces serif, meta line in
 * JetBrains Mono, body copy in Inter. Matches the page's dark editorial
 * register and uses the suitability gradient stops for the meta accent.
 */
export function TopRankedCallout({
  name,
  meta,
  body,
  imageCaption,
}: TopRankedCalloutProps) {
  return (
    <article className="
      flex flex-col gap-4
      border border-rule rounded-card
      bg-bg-mid/30
      p-5 lg:p-6
    ">
      <ImagePlaceholder
        kicker="Site visual"
        caption={imageCaption}
        aspect="4 / 3"
      />

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
