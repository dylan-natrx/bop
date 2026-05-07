import Image from 'next/image'
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance'

export function Footer() {
  return (
    <AnimatedEntrance delay={0.5} duration={1}>
      <footer className="mt-16 pt-7 border-t border-rule grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
        <div className="flex flex-col gap-4">
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
              className="h-11 w-auto opacity-92"
            />
          </div>

          {/* Methodology credit */}
          <div className="font-mono text-eyebrow uppercase text-ivory-faint leading-relaxed">
            <strong className="text-ivory-dim font-medium">Methodology:</strong>{' '}
            Natrx Assess (shoreline change analysis, wind-driven wave modeling,
            site-level water-quality synthesis)
            <br />
            <strong className="text-ivory-dim font-medium">Data:</strong> Phase
            II site prioritization analysis, February 2026 — 78 candidate sites
            across New York Harbor
          </div>
        </div>

        {/* Section navigation cue */}
        <div className="flex flex-col items-start lg:items-end gap-2.5">
          <div className="flex items-center gap-3 font-mono text-eyebrow uppercase text-ivory">
            The framework
            <span className="w-5 h-px bg-ivory relative animate-nudge after:content-[''] after:absolute after:right-0 after:-top-0.5 after:w-1 after:h-1 after:border-r after:border-b after:border-ivory after:rotate-[-45deg]" />
          </div>
          <div className="font-mono text-eyebrow uppercase text-ivory-faint">
            How the sites were scored
          </div>
        </div>
      </footer>
    </AnimatedEntrance>
  )
}
