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
      <figure className="mt-20 w-[95vw] max-w-[1480px] mx-auto border border-rule rounded-card overflow-hidden bg-gradient-to-br from-[#082030] to-[#04101C]">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-[640px] lg:min-h-[720px] lg:h-[min(90vh,860px)]">
          {/* Left panel */}
          <FigurePanel
            hoveredRanks={hoveredRanks}
            onHoverRanks={handleHoverRanks}
          />

          {/* Right panel: Map - overflow hidden to crop vertical overflow */}
          <div className="relative overflow-hidden">
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
