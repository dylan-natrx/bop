'use client'

import { SUITABILITY_GRADIENT_CSS } from '@/lib/colors'

interface LegendProps {
  className?: string
}

/**
 * Suitability score legend with gradient bar
 */
export function SuitabilityLegend({ className = '' }: LegendProps) {
  return (
    <div className={className}>
      <div className="font-mono text-eyebrow uppercase text-ivory-dim mb-2">
        Suitability score
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
 * Active design pulse indicator for legends
 */
export function DesignPulseLegend({ className = '' }: LegendProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-2.5 h-2.5 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-teal-bright" />
        <div className="absolute -inset-0.5 rounded-full border border-teal-bright animate-pulse-halo" />
      </div>
      <span className="text-body-sm text-ivory-dim">Active design</span>
    </div>
  )
}
