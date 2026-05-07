import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedEntrance'
import { HERO_STATS } from '@/lib/constants'

export function StatStack() {
  return (
    <StaggerContainer
      staggerDelay={0.15}
      delayChildren={0.7}
      className="flex flex-col gap-6 mt-8"
    >
      {HERO_STATS.map((stat, index) => (
        <StaggerItem
          key={stat.label}
          className={`flex items-baseline gap-5 pb-5 ${
            index < HERO_STATS.length - 1 ? 'border-b border-rule' : ''
          }`}
        >
          <div className="font-serif font-light text-stat-num text-ivory tabular-nums flex-shrink-0 min-w-[124px]">
            {stat.value.toLocaleString()}
            {'unit' in stat && (
              <span className="text-stat-unit text-ivory-dim ml-1">
                {stat.unit}
              </span>
            )}
          </div>
          <div className="font-mono text-label uppercase text-ivory-dim pb-1.5">
            {stat.label}
            <span className="block font-sans text-body-sm normal-case tracking-normal text-ivory-faint mt-1">
              {stat.qualifier}
            </span>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
