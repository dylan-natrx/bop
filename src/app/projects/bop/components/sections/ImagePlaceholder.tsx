import type { ReactNode } from 'react'

interface ImagePlaceholderProps {
  /** Caption text shown over the placeholder until final imagery lands */
  caption: ReactNode
  /** Aspect ratio, defaults to 4:3. Use '16/9' for wider, '1/1' for square */
  aspect?: string
  /** Optional kicker label shown above the caption (e.g. "FIG.") */
  kicker?: string
  className?: string
}

/**
 * Bordered placeholder for an image block. Visually announces "image will go
 * here" without pretending to be real content. Used until final imagery is
 * hand-placed by the editorial team.
 */
export function ImagePlaceholder({
  caption,
  aspect = '4 / 3',
  kicker,
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div className={className}>
      <div
        role="presentation"
        aria-label="Image placeholder"
        className="
          relative w-full
          border border-dashed border-rule rounded-card
          bg-bg-deep/40
          flex items-center justify-center
          p-6
        "
        style={{ aspectRatio: aspect }}
      >
        <div className="text-center max-w-[40ch]">
          <div className="font-mono text-eyebrow uppercase text-teal-bright/70 mb-2">
            {kicker ?? 'Image placeholder'}
          </div>
          <div className="font-serif italic text-ivory-dim text-[13px] leading-relaxed">
            {caption}
          </div>
        </div>
      </div>
    </div>
  )
}
