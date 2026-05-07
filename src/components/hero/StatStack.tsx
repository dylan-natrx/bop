import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedEntrance'
import { HERO_STATS } from '@/lib/constants'

export function StatStack() {
  return (
    <StaggerContainer
      staggerDelay={0.15}
      delayChildren={0.7}
      className="mt-8"
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-6">
        {HERO_STATS.map((stat, index) => {
          // Handle both numeric values and display strings (e.g., "1 billion")
          const displayNum = 'displayValue' in stat
            ? stat.displayValue
            : stat.value.toLocaleString()

          return (
            <StaggerItem
              key={stat.label}
              className={`contents`}
            >
              {/* Number column */}
              <div
                className={`font-serif font-light text-stat-num text-ivory ${
                  'displayValue' in stat ? '' : 'tabular-nums'
                } ${index < HERO_STATS.length - 1 ? 'pb-5 border-b border-rule' : ''}`}
              >
                {displayNum}
                {'unit' in stat && (
                  <span className="text-stat-unit text-ivory-dim ml-1">
                    {stat.unit}
                  </span>
                )}
              </div>
              {/* Label column */}
              <div
                className={`font-mono text-label uppercase text-ivory-dim ${
                  index < HERO_STATS.length - 1 ? 'pb-5 border-b border-rule' : ''
                }`}
              >
                {stat.label}
                <span className="block font-sans text-body-sm normal-case tracking-normal text-ivory-faint mt-1">
                  {stat.qualifier}
                </span>
              </div>
            </StaggerItem>
          )
        })}
      </div>
    </StaggerContainer>
  )
}
