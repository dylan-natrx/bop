'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import mapboxgl, { type Map as MapboxMap } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import type { RankingSite, SiteStats } from '@/types/site'
import type { RankingsFeatureCollection } from '@/types/geojson'
import { Tooltip, SiteTooltipContent } from '@/components/ui/Tooltip'
import { calculateCentroid } from '@/lib/data'
import { calculateMarkerRadius } from '@/lib/projection'
import type { StepConfig } from './steps'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

const HARBOR_BOUNDS: [[number, number], [number, number]] = [
  [-74.3, 40.42],
  [-73.7, 41.05],
]

const BOROUGH_LABELS: { name: string; lng: number; lat: number }[] = [
  { name: 'MANHATTAN', lng: -73.97, lat: 40.78 },
  { name: 'BROOKLYN', lng: -73.94, lat: 40.65 },
  { name: 'QUEENS', lng: -73.81, lat: 40.73 },
  { name: 'BRONX', lng: -73.87, lat: 40.85 },
  { name: 'STATEN ISLAND', lng: -74.16, lat: 40.58 },
  { name: 'NEW JERSEY', lng: -74.22, lat: 40.72 },
]

interface WalkthroughMapProps {
  rankings: RankingsFeatureCollection
  stats: Record<string, SiteStats>
  step: StepConfig
}

interface WalkthroughSiteProps {
  id: string
  Site: string
  Status: 'Design' | 'Proposed Future Site'
  Rank: number
  Acres: number
  Score: number
  sal_score: number
  chla_score: number
  do_score: number
  NearWave: 'Yes' | 'No'
  NearErosion: 'Yes' | 'No'
  NearPark: 'Yes' | 'No'
  NearCSO: 'Yes' | 'No'
  NearMS4: 'Yes' | 'No'
  _radius: number
  _displayScore: number
  /** When 1, the site has been dimmed out by an active filter this step. */
  _filteredOut: 0 | 1
}

function computeDisplayScore(
  p: { sal_score: number; chla_score: number; do_score: number },
  colorMode: StepConfig['colorMode']
): number {
  if (colorMode === 'salinity') return p.sal_score ?? 0
  if (colorMode === 'salinity_chla')
    return ((p.sal_score ?? 0) + (p.chla_score ?? 0)) / 2
  return (((p.sal_score ?? 0) + (p.chla_score ?? 0)) / 2) * (p.do_score ?? 0)
}

/**
 * Decide whether a site is "filtered out" (dimmed) for the current step.
 *
 * Narrowing semantics:
 *   - Wave (step 4+): sites flagged for excessive wave exposure are dimmed.
 *   - Erosion (step 5+): NOT a filter. Erosion-adjacent sites are highlighted
 *     positively because the reef-as-breakwater co-benefit is desirable.
 *   - Practical filters (step 6): CSO and MS4 proximity dim sites for
 *     permitting/feasibility reasons. Park proximity is positive — park-
 *     adjacent sites stay visible.
 */
function isFilteredOut(p: WalkthroughSiteProps, visibleFlags: StepConfig['visibleFlags']): boolean {
  if (visibleFlags.includes('wave') && p.NearWave === 'Yes') return true
  if (visibleFlags.includes('cso') && p.NearCSO === 'Yes') return true
  if (visibleFlags.includes('ms4') && p.NearMS4 === 'Yes') return true
  return false
}

export function WalkthroughMap({ rankings, stats, step }: WalkthroughMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapNodeRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const labelMarkersRef = useRef<mapboxgl.Marker[]>([])
  const [hoveredSite, setHoveredSite] = useState<WalkthroughSiteProps | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const sitesGeoJson = useMemo(() => {
    const valid = rankings.features.filter((f) => {
      const acres = (f.properties as RankingSite).Acres
      return typeof acres === 'number' && acres > 0
    })
    const acresVals = valid.map((f) => (f.properties as RankingSite).Acres)
    const minA = Math.min(...acresVals)
    const maxA = Math.max(...acresVals)

    const features = valid.map((feature) => {
      const rankProps = feature.properties as RankingSite
      const stat = stats[String(rankProps.id)] ?? ({} as Partial<SiteStats>)
      const centroid = calculateCentroid(
        feature.geometry.coordinates as number[][][][] | number[][][]
      )

      const sal_score = Number(stat.sal_score ?? 0)
      const chla_score = Number(stat.chla_score ?? 0)
      const do_score = Number(stat.do_score ?? 0)

      const NearWave: 'Yes' | 'No' =
        Number(stat.wave_sup_3ft ?? 0) > 0 || rankProps.WaveExposure === 'Yes'
          ? 'Yes'
          : 'No'
      const NearErosion: 'Yes' | 'No' =
        Number(stat.erosion_gt_1_ft_yr ?? 0) > 0 || rankProps.Erosion === 'Yes'
          ? 'Yes'
          : 'No'

      const radius = calculateMarkerRadius(rankProps.Acres, minA, maxA, 3.5, 8)

      const partial: Omit<WalkthroughSiteProps, '_filteredOut'> = {
        id: rankProps.id,
        Site: rankProps.Site,
        Status: rankProps.Status,
        Rank: rankProps.Rank,
        Acres: rankProps.Acres,
        Score: rankProps.Score,
        sal_score,
        chla_score,
        do_score,
        NearWave,
        NearErosion,
        NearPark: rankProps.NearPark === 'Yes' ? 'Yes' : 'No',
        NearCSO: rankProps.NearCSO === 'Yes' ? 'Yes' : 'No',
        NearMS4: rankProps.NearMS4 === 'Yes' ? 'Yes' : 'No',
        _radius: radius,
        _displayScore: computeDisplayScore({ sal_score, chla_score, do_score }, step.colorMode),
      }
      const props: WalkthroughSiteProps = {
        ...partial,
        _filteredOut: isFilteredOut(partial as WalkthroughSiteProps, step.visibleFlags) ? 1 : 0,
      }

      return {
        type: 'Feature' as const,
        id: Number(rankProps.id),
        geometry: { type: 'Point' as const, coordinates: centroid },
        properties: props,
      }
    })

    return {
      type: 'FeatureCollection' as const,
      features,
    }
  }, [rankings, stats, step.colorMode, step.visibleFlags])

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) return
    if (!MAPBOX_TOKEN) {
      setErrorMsg('Missing NEXT_PUBLIC_MAPBOX_TOKEN at build time.')
      return
    }
    mapboxgl.accessToken = MAPBOX_TOKEN

    let map: MapboxMap
    try {
      map = new mapboxgl.Map({
        container: mapNodeRef.current,
        style: {
          version: 8,
          name: 'BOP Walkthrough Dark',
          sources: {
            'land-nyc': { type: 'geojson', data: '/data/nyc-boroughs.geojson' },
            'land-nj': { type: 'geojson', data: '/data/nj-shoreline.geojson' },
            'land-westchester': { type: 'geojson', data: '/data/westchester.geojson' },
            'land-upstate': { type: 'geojson', data: '/data/upstate-ny-ct.geojson' },
            'water-hudson': { type: 'geojson', data: '/data/hudson-river.geojson' },
            sites: { type: 'geojson', data: sitesGeoJson, promoteId: 'id' },
          },
          layers: [
            { id: 'background', type: 'background', paint: { 'background-color': '#061321' } },
            { id: 'land-upstate-fill', type: 'fill', source: 'land-upstate', paint: { 'fill-color': '#15314A', 'fill-opacity': 1 } },
            { id: 'land-westchester-fill', type: 'fill', source: 'land-westchester', paint: { 'fill-color': '#15314A', 'fill-opacity': 1 } },
            { id: 'land-nj-fill', type: 'fill', source: 'land-nj', paint: { 'fill-color': '#15314A', 'fill-opacity': 1 } },
            { id: 'land-nyc-fill', type: 'fill', source: 'land-nyc', paint: { 'fill-color': '#15314A', 'fill-opacity': 1 } },
            { id: 'land-nyc-edge', type: 'line', source: 'land-nyc', paint: { 'line-color': 'rgba(120, 158, 184, 0.35)', 'line-width': 1.1 } },
            { id: 'land-nj-edge', type: 'line', source: 'land-nj', paint: { 'line-color': 'rgba(120, 158, 184, 0.35)', 'line-width': 1.1 } },
            { id: 'land-upstate-edge', type: 'line', source: 'land-upstate', paint: { 'line-color': 'rgba(120, 158, 184, 0.35)', 'line-width': 1.1 } },
            { id: 'water-hudson-fill', type: 'fill', source: 'water-hudson', paint: { 'fill-color': '#061321', 'fill-opacity': 1 } },
            { id: 'land-westchester-edge', type: 'line', source: 'land-westchester', paint: { 'line-color': 'rgba(120, 158, 184, 0.35)', 'line-width': 1.1 } },

            // Erosion highlight ring — only visible at step 5+ as a co-benefit indicator
            {
              id: 'erosion-highlight',
              type: 'circle',
              source: 'sites',
              filter: ['all',
                ['==', ['get', 'NearErosion'], 'Yes'],
                ['==', ['get', '_filteredOut'], 0],
              ],
              paint: {
                'circle-radius': ['+', ['get', '_radius'], 3.5],
                'circle-color': 'rgba(0,0,0,0)',
                'circle-stroke-color': '#6FE3D0',
                'circle-stroke-width': 1.2,
                'circle-stroke-opacity': 0,
                'circle-stroke-opacity-transition': { duration: 600 },
              },
            },

            // Site circles. Opacity, color, and stroke respond to the step.
            {
              id: 'sites-circle',
              type: 'circle',
              source: 'sites',
              paint: {
                'circle-radius': ['get', '_radius'],
                'circle-color': [
                  'case',
                  ['<', ['get', '_displayScore'], 0.5],
                  'rgba(80, 105, 115, 0.85)',
                  ['interpolate', ['linear'], ['get', '_displayScore'],
                    0.5, '#2A4A56',
                    0.685, '#137D76',
                    0.87, '#6FE3D0'],
                ],
                'circle-stroke-color': [
                  'case',
                  ['<', ['get', '_displayScore'], 0.5],
                  'rgba(0,0,0,0)',
                  'rgba(111, 227, 208, 0.55)',
                ],
                'circle-stroke-width': [
                  'case',
                  ['<', ['get', '_displayScore'], 0.5], 0,
                  1.2,
                ],
                'circle-opacity': [
                  'case',
                  // Filtered-out sites fade hard
                  ['==', ['get', '_filteredOut'], 1], 0.18,
                  // Below-threshold sites stay muted (existing behavior)
                  ['<', ['get', '_displayScore'], 0.5], 0.45,
                  1,
                ],
                'circle-stroke-opacity': [
                  'case',
                  ['==', ['get', '_filteredOut'], 1], 0.18,
                  ['<', ['get', '_displayScore'], 0.5], 0.45,
                  1,
                ],
                'circle-color-transition': { duration: 600 },
                'circle-opacity-transition': { duration: 600 },
                'circle-stroke-opacity-transition': { duration: 600 },
                'circle-stroke-width-transition': { duration: 600 },
              },
            },
          ],
        },
        bounds: HARBOR_BOUNDS,
        fitBoundsOptions: { padding: { top: 14, right: 16, bottom: 22, left: 16 } },
        projection: 'mercator',
        attributionControl: false,
        interactive: false,
        doubleClickZoom: false,
        dragPan: false,
        dragRotate: false,
        scrollZoom: false,
        keyboard: false,
        touchZoomRotate: false,
        pitchWithRotate: false,
        maxZoom: 13,
      })
    } catch (err) {
      setErrorMsg(`Mapbox init threw: ${err instanceof Error ? err.message : String(err)}`)
      return
    }
    mapRef.current = map

    map.on('error', (e) => {
      // eslint-disable-next-line no-console
      console.error('[WalkthroughMap] Mapbox error', e)
    })

    map.on('load', () => {
      labelMarkersRef.current = BOROUGH_LABELS.map((label) => {
        const el = document.createElement('div')
        el.textContent = label.name
        el.style.cssText = `
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(184, 176, 160, 0.55);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
          text-shadow: 0 0 6px rgba(6, 19, 33, 0.9);
        `
        return new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([label.lng, label.lat])
          .addTo(map)
      })

      map.on('mousemove', 'sites-circle', (e) => {
        if (!e.features?.length) return
        map.getCanvas().style.cursor = 'pointer'
        const props = e.features[0].properties as unknown as WalkthroughSiteProps
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          setMousePos({
            x: e.originalEvent.clientX - rect.left,
            y: e.originalEvent.clientY - rect.top,
          })
        }
        setHoveredSite(props)
      })
      map.on('mouseleave', 'sites-circle', () => {
        map.getCanvas().style.cursor = ''
        setHoveredSite(null)
      })

      setMapReady(true)
    })

    const resizeObserver = new ResizeObserver(() => map.resize())
    if (mapNodeRef.current) resizeObserver.observe(mapNodeRef.current)

    return () => {
      resizeObserver.disconnect()
      labelMarkersRef.current.forEach((m) => m.remove())
      labelMarkersRef.current = []
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push updated sites when the step changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    const source = map.getSource('sites') as mapboxgl.GeoJSONSource | undefined
    if (source) {
      source.setData(sitesGeoJson as unknown as GeoJSON.FeatureCollection)
    }
  }, [sitesGeoJson, mapReady])

  // Erosion highlight opacity per step
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    const showErosion = step.visibleFlags.includes('erosion') ? 0.85 : 0
    map.setPaintProperty('erosion-highlight', 'circle-stroke-opacity', showErosion)
  }, [step.visibleFlags, mapReady])

  if (!MAPBOX_TOKEN) {
    return (
      <div className="relative w-full h-full min-h-[380px] flex items-center justify-center p-6 text-center text-ivory-dim font-mono text-body-sm">
        Missing NEXT_PUBLIC_MAPBOX_TOKEN.
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] lg:min-h-[420px]"
    >
      <div
        ref={mapNodeRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {errorMsg && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 pointer-events-none">
          <div className="max-w-[400px] w-full p-4 bg-bg-deep/95 border border-rule rounded-card font-mono text-[12px] text-ivory">
            {errorMsg}
          </div>
        </div>
      )}

      <Tooltip
        x={mousePos.x}
        y={mousePos.y}
        visible={hoveredSite !== null}
        containerRef={containerRef}
      >
        {hoveredSite && (
          <SiteTooltipContent
            name={hoveredSite.Site}
            status={hoveredSite.Status === 'Design' ? 'Active design' : 'Proposed future site'}
            rank={hoveredSite.Rank}
            score={hoveredSite.Score}
            acres={hoveredSite.Acres}
          />
        )}
      </Tooltip>
    </div>
  )
}
