'use client'

import { AreaLegend, SuitabilityLegend, TopRankedLegend } from '@/app/projects/bop/components/ui/Legend'
import { TOP_RANKED_SITES } from '@/app/projects/bop/lib/constants'

// Rank mappings for each panel entry
const RANK_MAPPINGS: Record<string, number[]> = {
  'Arthur Kill': [1],
  'Living Breakwaters': [2, 3, 4, 5, 6, 7],
  "Wolfe's Pond": [8],
  'Conch Basin': [9],
}

interface FigurePanelProps {
  hoveredRanks: number[]
  onHoverRanks: (ranks: number[]) => void
}

export function FigurePanel({ hoveredRanks, onHoverRanks }: FigurePanelProps) {
  return (
    <div className="flex flex-col gap-6 p-8 pr-7 border-r border-rule">
      {/* Caption */}
      <div className="flex flex-col gap-2.5">
        <div className="font-mono text-eyebrow uppercase text-ivory-faint">
          Fig. 1 · The 78 sites
        </div>
        <div className="font-serif italic font-light text-body text-ivory leading-snug">
          All 78 possible sites across New York Harbor. Dot size is the acreage
          of the site. Dot color is how well the water suits oysters.
        </div>
      </div>

      <div className="h-px bg-rule" />

      {/* Top-ranked sites */}
      <div className="flex flex-col gap-2.5">
        <div className="font-mono text-eyebrow uppercase text-ivory-dim mb-1">
          Top-ranked sites
        </div>
        <div className="flex flex-col gap-1">
          {TOP_RANKED_SITES.map((site) => {
            const ranks = RANK_MAPPINGS[site.name] || []
            const isHovered = hoveredRanks.length > 0 && ranks.some(r => hoveredRanks.includes(r))

            return (
              <div
                key={site.name}
                className={`
                  grid grid-cols-[1fr_auto] items-baseline gap-3 px-2 py-1.5 -mx-2 rounded
                  transition-colors duration-200 ease-out cursor-default
                  ${isHovered ? 'bg-white/[0.04]' : ''}
                `}
                onMouseEnter={() => onHoverRanks(ranks)}
                onMouseLeave={() => onHoverRanks([])}
              >
                <div>
                  <div className="font-sans text-body-sm text-ivory">
                    {site.name}
                  </div>
                  <div className="font-mono text-[10px] tracking-wide text-ivory-faint mt-0.5">
                    {site.meta}
                  </div>
                </div>
                <div className={`
                  font-mono text-[12px] tracking-wide tabular-nums text-right
                  transition-colors duration-200 ease-out
                  ${isHovered ? 'text-ivory' : 'text-teal-aqua'}
                `}>
                  {site.score}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend (pushed to bottom) */}
      <div className="mt-auto pt-4">
        <SuitabilityLegend />
        <AreaLegend className="mt-5" />
        <TopRankedLegend className="mt-4" />
      </div>
    </div>
  )
}
