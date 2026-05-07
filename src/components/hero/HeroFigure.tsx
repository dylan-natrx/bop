'use client'

import { useState, useCallback } from 'react'
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance'
import { FigurePanel } from './FigurePanel'
import { HeroMap } from './HeroMap'
import { useRankingsData } from '@/hooks/useRankingsData'

export function HeroFigure() {
  const { geojson, sites, isLoading, error } = useRankingsData()

  // Bidirectional hover state shared between panel and map
  const [hoveredRanks, setHoveredRanks] = useState<number[]>([])

  const handleHoverRanks = useCallback((ranks: number[]) => {
    setHoveredRanks(ranks)
  }, [])

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
            hoveredRanks={hoveredRanks}
            onHoverRanks={handleHoverRanks}
          />

          {/* Right panel: Map */}
          <div className="relative">
            {isLoading || !geojson ? (
              <div className="absolute inset-0 flex items-center justify-center text-ivory-dim">
                <div className="animate-pulse">Loading map...</div>
              </div>
            ) : (
              <HeroMap
                geojson={geojson}
                sites={sites}
                hoveredRanks={hoveredRanks}
                onHoverRanks={handleHoverRanks}
              />
            )}
          </div>
        </div>
      </figure>
    </AnimatedEntrance>
  )
}
