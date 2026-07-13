'use client'

import { SUITABILITY_GRADIENT_CSS } from '@/app/projects/bop/lib/colors'

interface LegendProps {
  className?: string
}

/**
 * Site score legend with gradient bar
 */
export function SuitabilityLegend({ className = '' }: LegendProps) {
  return (
    <div className={className}>
      <div className="font-mono text-eyebrow uppercase text-ivory-dim mb-2">
        Site score
      </div>
      <div
        className="w-full h-1.5 rounded-sm"
        style={{ background: SUITABILITY_GRADIENT_CSS }}
      />
      <div className="flex justify-between mt-1.5 font-mono text-[9.5px] tracking-wide text-ivory-dim">
        <span>0.20</span>
        <span>0.50</span>
        <span>0.87</span>
      </div>
    </div>
  )
}

/**
 * Site-area legend. Dot radius on the map encodes acreage on a square-root
 * scale (see calculateMarkerRadius: 3px at 0 acres, 8px at the 470-acre max).
 * The circles below are drawn at the exact radii the map uses, so the legend
 * is a true reference rather than a decorative approximation.
 */
const AREA_STOPS = [
  { acres: 5, radius: 3.52 },
  { acres: 100, radius: 5.31 },
  { acres: 470, radius: 8 },
]

export function AreaLegend({ className = '' }: LegendProps) {
  return (
    <div className={className}>
      <div className="font-mono text-eyebrow uppercase text-ivory-dim mb-2.5">
        Site area
      </div>
      <div className="flex items-end gap-4">
        {AREA_STOPS.map(({ acres, radius }) => (
          <div key={acres} className="flex flex-col items-center gap-1.5">
            <div
              className="rounded-full bg-ivory-dim/45"
              style={{ width: radius * 2, height: radius * 2 }}
            />
            <span className="font-mono text-[9.5px] tracking-wide text-ivory-dim tabular-nums">
              {acres} ac
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Top-ranked pulse indicator for legends
 */
export function TopRankedLegend({ className = '' }: LegendProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-2.5 h-2.5 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-teal-bright" />
        <div className="absolute -inset-0.5 rounded-full border border-teal-bright animate-pulse-halo" />
      </div>
      <span className="text-body-sm text-ivory-dim">Top-ranked (1-10)</span>
    </div>
  )
}
