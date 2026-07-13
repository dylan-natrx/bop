import { Headline } from './Headline'
import { StatStack } from './StatStack'
import { HeroFigure } from './HeroFigure'
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="max-w-scaffold mx-auto px-scaffold-x pt-scaffold-top pb-scaffold-bottom min-h-screen flex flex-col scroll-mt-14"
    >
      {/* Headline area: two columns */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <Headline />
        <StatStack />
      </div>

      {/* Standfirst. Khoury's note: readers need to know what the score does
          and does not measure before they meet the map, or they form a
          misconception the rest of the page has to undo. Sits between the
          lede and the figure so it reads as the takeaway, not more lede. */}
      <AnimatedEntrance delay={0.65} duration={1.2}>
        <div className="mt-14 lg:mt-16 border-t border-b border-rule py-5 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-3 lg:gap-8 lg:items-baseline">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint whitespace-nowrap">
              How to read the map
            </div>
            <p className="font-serif italic font-light text-ivory text-lg lg:text-xl leading-snug max-w-[68ch]">
              Every site is scored on one question: how well the water suits
              oysters. Salinity, food, oxygen. What a reef costs to build there,
              and what it takes to permit, is a separate question the framework
              keeps separate.
            </p>
          </div>
        </div>
      </AnimatedEntrance>

      {/* Map figure */}
      <HeroFigure />
    </section>
  )
}
