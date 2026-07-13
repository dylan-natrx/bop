import type { ReactNode } from 'react'

interface PlaceholderBlockProps {
  /** Component name in PascalCase, e.g. "MethodologyWalkthrough" */
  componentName: string
  /** One-line description of what this component will do */
  description: string
  /** Optional rendered children for sub-placeholders / planned sub-components */
  children?: ReactNode
  /** Min height of the block in px (controls visual weight on the page) */
  minHeight?: number
}

/**
 * A clearly-marked placeholder for a planned component.
 * Visually announces "this is structure, not content" so it can never
 * be confused with finished work.
 */
export function PlaceholderBlock({
  componentName,
  description,
  children,
  minHeight = 320,
}: PlaceholderBlockProps) {
  return (
    <div
      className="
        relative w-full
        border border-dashed border-rule rounded-card
        bg-bg-deep/40
        p-10 lg:p-14
        flex flex-col gap-6
      "
      style={{ minHeight }}
      role="presentation"
      aria-label={`Placeholder for ${componentName}`}
    >
      <div className="flex flex-col gap-2">
        <div className="font-mono text-eyebrow uppercase text-teal-bright/70">
          Component placeholder
        </div>
        <div className="font-mono text-[15px] tracking-wide text-ivory">
          {'<'}
          {componentName}
          {' />'}
        </div>
        <div className="font-sans text-body-sm text-ivory-dim font-light max-w-[60ch] leading-relaxed">
          {description}
        </div>
      </div>
      {children ? (
        <div className="mt-auto pt-6 border-t border-rule-soft">{children}</div>
      ) : null}
    </div>
  )
}
