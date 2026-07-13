import { AnimatedEntrance } from '@/app/projects/bop/components/ui/AnimatedEntrance'

export function Headline() {
  return (
    <div>
      <AnimatedEntrance delay={0.2} duration={1.2}>
        <h1 className="font-serif font-light text-hero-headline text-ivory mb-7">
          <span className="block">Restoring</span>
          <span className="block">New York Harbor&apos;s</span>
          <span className="block">Oyster Reefs.</span>
          <em className="block italic text-teal-bright mt-2">But where?</em>
        </h1>
      </AnimatedEntrance>

      <AnimatedEntrance delay={0.5} duration={1.2}>
        <p className="max-w-[580px] text-body text-ivory-dim font-light">
          Oysters are <strong className="text-ivory font-normal">ecological infrastructure</strong>.
          A single adult can filter as much as fifty gallons of water a day;
          their reefs build habitat for fish and crabs and dampen the wave
          energy that erodes shorelines. New York Harbor was once one of the
          most oyster-rich estuaries on Earth. Restoring those reefs is a
          multi-decade project, and Billion Oyster Project has set a goal of{' '}
          <strong className="text-ivory font-normal">one billion oysters by 2030</strong>.{' '}
          <strong className="text-ivory font-normal">Budgets are finite</strong>.
          This framework gives Billion Oyster Project a defensible way to
          prioritize which of{' '}
          <strong className="text-ivory font-normal">78 candidate sites</strong> and{' '}
          <strong className="text-ivory font-normal">2,604 acres</strong> of urban
          estuary get restored first.
        </p>
      </AnimatedEntrance>
    </div>
  )
}
