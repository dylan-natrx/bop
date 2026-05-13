import type { ReactNode } from 'react'

interface PullquoteProps {
  /** The quote body. Pass as ReactNode so inline italics or breaks can be authored. */
  children: ReactNode
  /** Speaker name (rendered uppercase mono) */
  attribution: string
  /** Optional speaker role / affiliation (rendered uppercase mono, dimmer) */
  role?: string
  /** Extra classes for the wrapper if a specific section needs different gutter */
  className?: string
}

/**
 * Editorial pullquote: large serif italic quote, mono uppercase attribution.
 * Designed to sit inline between body blocks. Width is constrained so it
 * reads as a quoted aside rather than a section heading.
 *
 * Treatment notes:
 * - Quote uses Fraunces italic at the same scale as section subheads
 * - Attribution uses JetBrains Mono uppercase, tracked, in ivory-faint
 * - Left vertical rule in teal-bright to mark it as a callout without
 *   competing with section eyebrows
 */
export function Pullquote({
  children,
  attribution,
  role,
  className = '',
}: PullquoteProps) {
  return (
    <figure
      className={`
        max-w-[60ch] mx-auto
        border-l-2 border-teal-bright
        pl-6 lg:pl-8 py-2
        ${className}
      `}
    >
      <blockquote
        className="
          font-serif italic font-light text-ivory
          text-xl lg:text-2xl
          leading-[1.4]
        "
      >
        {children}
      </blockquote>
      <figcaption
        className="
          mt-4
          font-mono text-eyebrow uppercase tracking-[0.22em]
          text-ivory-faint
        "
      >
        <span className="text-ivory-dim">{attribution}</span>
        {role ? (
          <>
            <span aria-hidden="true">&nbsp;·&nbsp;</span>
            <span>{role}</span>
          </>
        ) : null}
      </figcaption>
    </figure>
  )
}
