import { SuitabilityLegend, DesignPulseLegend } from '@/components/ui/Legend'
import { TOP_RANKED_SITES } from '@/lib/constants'

interface FigurePanelProps {
  designSiteCount: number
  designAcreage: number
}

export function FigurePanel({
  designSiteCount,
  designAcreage,
}: FigurePanelProps) {
  return (
    <div className="flex flex-col gap-6 p-8 pr-7 border-r border-rule">
      {/* Caption */}
      <div className="flex flex-col gap-2.5">
        <div className="font-mono text-eyebrow uppercase text-ivory-faint">
          Fig. 1 — Site distribution
        </div>
        <div className="font-serif italic font-light text-body text-ivory leading-snug">
          All 78 candidate sites across New York Harbor, sized by acreage and
          colored by suitability score.
        </div>
      </div>

      <div className="h-px bg-rule" />

      {/* Top-ranked sites */}
      <div className="flex flex-col gap-2.5">
        <div className="font-mono text-eyebrow uppercase text-ivory-dim mb-1">
          Top-ranked sites
        </div>
        <div className="flex flex-col gap-2">
          {TOP_RANKED_SITES.map((site) => (
            <div
              key={site.name}
              className="grid grid-cols-[1fr_auto] items-baseline gap-3"
            >
              <div>
                <div className="font-sans text-body-sm text-ivory">
                  {site.name}
                </div>
                <div className="font-mono text-[10px] tracking-wide text-ivory-faint mt-0.5">
                  {site.meta}
                </div>
              </div>
              <div className="font-mono text-[12px] tracking-wide text-teal-aqua tabular-nums text-right">
                {site.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-rule" />

      {/* Design pipeline summary */}
      <div className="font-sans text-[12.5px] leading-relaxed text-ivory-dim">
        <strong className="text-ivory font-medium">{designSiteCount} sites</strong>{' '}
        currently in active design, totaling{' '}
        <strong className="text-ivory font-medium">
          {designAcreage.toFixed(0)} acres
        </strong>{' '}
        of reef habitat moving toward construction.
      </div>

      {/* Legend (pushed to bottom) */}
      <div className="mt-auto pt-4">
        <SuitabilityLegend />
        <DesignPulseLegend className="mt-3.5" />
      </div>
    </div>
  )
}
