import type { ReactNode } from 'react'

interface FindingBeatProps {
  /** Short subhead summarizing the beat's argument */
  subhead: string
  /** Body copy as ReactNode (may include inline italics) */
  body: ReactNode
  /**
   * Visual that accompanies the body. Right-of-body on lg+, below-body on
   * narrower viewports. Pass an ImagePlaceholder, a custom chart, or null
   * if no visual is needed for this beat.
   */
  visual?: ReactNode
}

/**
 * Section 4 building block. Two of these stack in §4, each carrying one of
 * the two patterns the ranking surfaced.
 *
 * Layout: subhead, body copy, optional visual to the right (or below on
 * narrow viewports).
 */
export function FindingBeat({
  subhead,
  body,
  visual,
}: FindingBeatProps) {
  return (
    <article className="border-t border-rule-soft pt-10 lg:pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <header className="lg:col-span-12 mb-2">
          <h3 className="font-serif font-light text-ivory text-2xl lg:text-3xl leading-snug">
            {subhead}
          </h3>
        </header>

        <div
          className={
            visual
              ? 'lg:col-span-7 font-sans text-body text-ivory-dim font-light leading-[1.65]'
              : 'lg:col-span-10 lg:col-start-2 font-sans text-body text-ivory-dim font-light leading-[1.65]'
          }
        >
          {body}
        </div>

        {visual ? (
          <div className="lg:col-span-5 flex flex-col justify-center">
            {visual}
          </div>
        ) : null}
      </div>
    </article>
  )
}
