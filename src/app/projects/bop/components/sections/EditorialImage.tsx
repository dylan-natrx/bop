import Image from 'next/image'
import type { ReactNode } from 'react'

interface EditorialImageProps {
  /** Source path under /public */
  src: string
  /** Alt text */
  alt: string
  /** Width of source image in px */
  width: number
  /** Height of source image in px */
  height: number
  /** Aspect ratio of the displayed image block (overrides source aspect). Defaults to source proportions. */
  aspect?: string
  /** Optional caption shown below the image */
  caption?: ReactNode
  className?: string
}

/**
 * Real image rendered inside an editorial-styled bordered frame, matching
 * the surrounding ImagePlaceholder treatment so swapping the two does not
 * disrupt the section's layout.
 *
 * The image fills the frame via object-cover and respects the aspect ratio
 * passed in. The frame itself has the same border + rounded-card treatment
 * as ImagePlaceholder so transitions between final and placeholder visuals
 * are seamless.
 */
export function EditorialImage({
  src,
  alt,
  width,
  height,
  aspect,
  caption,
  className = '',
}: EditorialImageProps) {
  return (
    <figure className={className}>
      <div
        className="
          relative w-full overflow-hidden
          border border-rule rounded-card
          bg-bg-deep
        "
        style={{ aspectRatio: aspect ?? `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint leading-relaxed">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
