import Image from 'next/image'
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance'

/**
 * Page footer. Sits at the bottom of the page, after Section 5.
 *
 * Intentionally quiet: partnership lockup + a single editorial credit
 * line. Per the build brief, no CTAs, no contact form, no buttons.
 * Methodology and data details previously lived here but read as
 * marketing chrome at the end of a journalism-style piece; they're
 * dropped and the press contact / source materials note lives in the
 * right-edge drawer (PressContactPanel) instead.
 */
export function Footer() {
  return (
    <AnimatedEntrance delay={0.2} duration={0.8}>
      <footer
        className="
          max-w-scaffold mx-auto px-scaffold-x
          mt-24 lg:mt-32 pt-10 pb-16
          border-t border-rule
          flex flex-col lg:flex-row lg:items-end lg:justify-between
          gap-8 lg:gap-16
        "
      >
        {/* Partnership lockup */}
        <div className="flex items-center gap-8">
          <Image
            src="/images/natrx-logo-white.png"
            alt="Natrx"
            width={140}
            height={28}
            className="h-7 w-auto opacity-95"
          />
          <div className="w-px h-7 bg-rule" />
          <Image
            src="/images/bop-logo.png"
            alt="Billion Oyster Project"
            width={88}
            height={44}
            className="h-11 w-auto opacity-90"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Editorial credit line */}
        <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint leading-[1.8] lg:text-right">
          Site prioritization framework
          <br />
          New York Harbor &middot; February 2026
        </div>
      </footer>
    </AnimatedEntrance>
  )
}
