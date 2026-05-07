'use client'

import { useMemo } from 'react'
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance'
import { FigurePanel } from './FigurePanel'
import { HeroMap } from './HeroMap'
import { useRankingsData } from '@/hooks/useRankingsData'
import { getDesignPipelineSites } from '@/lib/data'

export function HeroFigure() {
  const { geojson, sites, isLoading, error } = useRankingsData()

  // Calculate design pipeline stats
  const designStats = useMemo(() => {
    if (!sites.length) return { count: 0, acreage: 0 }
    const designSites = getDesignPipelineSites(sites)
    const acreage = designSites.reduce((sum, site) => sum + site.Acres, 0)
    return { count: designSites.length, acreage }
  }, [sites])

  if (error) {
    return (
      <div className="mt-20 w-full border border-rule rounded-card p-8 text-ivory-dim">
        Failed to load site data. Please refresh.
      </div>
    )
  }

  return (
    <AnimatedEntrance delay={0.7} duration={1.5}>
      <figure className="mt-20 w-full border border-rule rounded-card overflow-hidden bg-gradient-to-br from-[#082030] to-[#04101C]">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-[720px]">
          {/* Left panel */}
          <FigurePanel
            designSiteCount={designStats.count}
            designAcreage={designStats.acreage}
          />

          {/* Right panel: Map */}
          <div className="relative">
            {isLoading || !geojson ? (
              <div className="absolute inset-0 flex items-center justify-center text-ivory-dim">
                <div className="animate-pulse">Loading map...</div>
              </div>
            ) : (
              <HeroMap geojson={geojson} sites={sites} />
            )}
          </div>
        </div>
      </figure>
    </AnimatedEntrance>
  )
}
