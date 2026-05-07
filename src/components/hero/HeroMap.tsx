'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { RankingSite } from '@/types/site'
import type { RankingsFeatureCollection } from '@/types/geojson'
import { Tooltip, SiteTooltipContent } from '@/components/ui/Tooltip'
import {
  getSuitabilityColor,
  getSuitabilityOpacity,
  getSuitabilityStroke,
} from '@/lib/colors'
import {
  calculateProjection,
  projectPoint,
  calculateMarkerRadius,
  DEFAULT_VIEW,
} from '@/lib/projection'
import { calculateCentroid } from '@/lib/data'
import { COASTLINES } from '@/lib/land'

// Place labels for geographic context
const PLACE_LABELS = [
  { name: 'MANHATTAN', x: 0.38, y: 0.35 },
  { name: 'BROOKLYN', x: 0.52, y: 0.52 },
  { name: 'STATEN ISLAND', x: 0.22, y: 0.68 },
  { name: 'QUEENS', x: 0.62, y: 0.32 },
  { name: 'BRONX', x: 0.52, y: 0.18 },
  { name: 'NEW JERSEY', x: 0.12, y: 0.40 },
]

interface HeroMapProps {
  geojson: RankingsFeatureCollection
  sites: RankingSite[]
  hoveredRanks: number[]
  onHoverRanks: (ranks: number[]) => void
}

export function HeroMap({ geojson, sites, hoveredRanks, onHoverRanks }: HeroMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSite, setHoveredSite] = useState<RankingSite | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Calculate site centroids and projection
  const sitesWithCentroids = useMemo(() => {
    return geojson.features.map((feature) => {
      const props = feature.properties as RankingSite
      const centroid = calculateCentroid(
        feature.geometry.coordinates as number[][][][] | number[][][]
      )
      return {
        ...props,
        lng: centroid[0],
        lat: centroid[1],
      }
    })
  }, [geojson])

  // Calculate projection parameters
  const projection = useMemo(() => {
    return calculateProjection(sitesWithCentroids)
  }, [sitesWithCentroids])

  // Calculate marker radius range
  const acreageRange = useMemo(() => {
    const acres = sites.map((s) => s.Acres)
    return { min: Math.min(...acres), max: Math.max(...acres) }
  }, [sites])

  // Handle mouse events
  const handleMouseMove = useCallback(
    (e: React.MouseEvent, site: RankingSite) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
      setHoveredSite(site)
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredSite(null)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[720px]">
      <svg
        viewBox={`0 0 ${DEFAULT_VIEW.width} ${DEFAULT_VIEW.height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          {/* Depth gradient for ocean background */}
          <radialGradient id="depthGrad" cx="50%" cy="55%" r="65%">
            <stop offset="0%" stopColor="#0d2640" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#061321" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#020A12" stopOpacity="1" />
          </radialGradient>
          {/* Glow filter for top-ranked sites */}
          <filter id="top-ranked-glow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Background */}
        <rect
          width={DEFAULT_VIEW.width}
          height={DEFAULT_VIEW.height}
          fill="url(#depthGrad)"
        />

        {/* Water layer - subtle teal tint */}
        <rect
          width={DEFAULT_VIEW.width}
          height={DEFAULT_VIEW.height}
          fill="rgba(19, 125, 118, 0.06)"
        />

        {/* Land masses */}
        <g fill="#04101C" fillOpacity="0.85" stroke="rgba(70, 110, 145, 0.18)" strokeWidth="1">
          {Object.entries(COASTLINES).map(([id, coords]) => {
            const pathData = coords
              .map((coord, i) => {
                const { x, y } = projectPoint(coord[0], coord[1], projection)
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
              })
              .join(' ') + ' Z'
            return <path key={id} d={pathData} />
          })}
        </g>

        {/* Place labels */}
        <g>
          {PLACE_LABELS.map((label) => (
            <text
              key={label.name}
              x={label.x * DEFAULT_VIEW.width}
              y={label.y * DEFAULT_VIEW.height}
              className="font-mono text-[9px] uppercase fill-ivory-faint opacity-65"
              style={{ letterSpacing: '0.22em' }}
            >
              {label.name}
            </text>
          ))}
        </g>

        {/* Site markers */}
        <g>
          {sitesWithCentroids.map((site) => {
            const { x, y } = projectPoint(site.lng, site.lat, projection)
            const baseRadius = calculateMarkerRadius(
              site.Acres,
              acreageRange.min,
              acreageRange.max
            )
            const color = getSuitabilityColor(site.Score)
            const baseOpacity = getSuitabilityOpacity(site.Score)
            const strokeProps = getSuitabilityStroke(site.Score)
            const isTopRanked = site.Rank <= 10
            const isTooltipHovered = hoveredSite?.id === site.id
            const isBelowThreshold = site.Score < 0.5

            // Bidirectional hover state
            const isRankHovered = hoveredRanks.includes(site.Rank)
            const hasActiveHover = hoveredRanks.length > 0

            // Top-ranked sites get 1.15× radius boost
            const radius = isTopRanked ? baseRadius * 1.15 : baseRadius

            // Determine opacity based on hover state
            let opacity = baseOpacity
            if (hasActiveHover && isTopRanked && !isRankHovered && !isBelowThreshold) {
              // Dim non-hovered top-ranked sites
              opacity = 0.5
            }

            // Scale up when hovered (either from panel or direct)
            const isScaled = isRankHovered || isTooltipHovered
            const displayRadius = isScaled ? radius * 1.3 : radius

            return (
              <g
                key={site.id}
                className="cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, site)}
                onMouseEnter={() => {
                  if (isTopRanked) {
                    onHoverRanks([site.Rank])
                  }
                }}
                onMouseLeave={() => {
                  handleMouseLeave()
                  if (isTopRanked) {
                    onHoverRanks([])
                  }
                }}
              >
                {/* Pulsing halo for top-ranked sites (rank 1-10) */}
                {isTopRanked && (
                  <circle
                    cx={x}
                    cy={y}
                    r={radius + 5}
                    fill="none"
                    stroke="#2BA8A0"
                    strokeWidth="1"
                    className="animate-pulse-halo"
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      opacity: isRankHovered ? 1 : 0.85,
                      transition: 'opacity 200ms ease',
                    }}
                  />
                )}

                {/* Solid outer ring when hovered */}
                {isTopRanked && isRankHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r={displayRadius + 3}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    style={{
                      transition: 'all 200ms ease',
                    }}
                  />
                )}

                {/* Site marker with glow for top-ranked */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={color}
                  opacity={opacity}
                  stroke={strokeProps.stroke}
                  strokeWidth={strokeProps.strokeWidth}
                  filter={isTopRanked ? 'url(#top-ranked-glow)' : undefined}
                  initial={{ r: 0 }}
                  animate={{ r: displayRadius }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </g>
            )
          })}
        </g>
      </svg>

      {/* Tooltip */}
      <Tooltip
        x={mousePos.x}
        y={mousePos.y}
        visible={hoveredSite !== null}
        containerRef={containerRef}
      >
        {hoveredSite && (
          <SiteTooltipContent
            name={hoveredSite.Site}
            status={
              hoveredSite.Status === 'Design'
                ? 'Active design'
                : 'Proposed future site'
            }
            rank={hoveredSite.Rank}
            score={hoveredSite.Score}
            acres={hoveredSite.Acres}
          />
        )}
      </Tooltip>
    </div>
  )
}
