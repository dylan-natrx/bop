'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import mapboxgl, { type Map as MapboxMap, type Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import type { RankingSite } from '@/types/site'
import type { RankingsFeatureCollection } from '@/types/geojson'
import { Tooltip, SiteTooltipContent } from '@/components/ui/Tooltip'
import { calculateCentroid } from '@/lib/data'
import { calculateMarkerRadius } from '@/lib/projection'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

const HARBOR_BOUNDS: [[number, number], [number, number]] = [
  [-74.30, 40.42],
  [-73.70, 41.05],
]

const BOROUGH_LABELS: { name: string; lng: number; lat: number }[] = [
  { name: 'MANHATTAN', lng: -73.97, lat: 40.78 },
  { name: 'BROOKLYN', lng: -73.94, lat: 40.65 },
  { name: 'QUEENS', lng: -73.81, lat: 40.73 },
  { name: 'BRONX', lng: -73.87, lat: 40.85 },
  { name: 'STATEN ISLAND', lng: -74.16, lat: 40.58 },
  { name: 'NEW JERSEY', lng: -74.22, lat: 40.72 },
]

// Water-body labels — smaller, italic, more faint than borough labels
const WATER_LABELS: { name: string; lng: number; lat: number; rotate?: number }[] = [
  { name: 'Upper Bay', lng: -74.045, lat: 40.665 },
  { name: 'Lower Bay', lng: -74.040, lat: 40.520 },
  { name: 'Raritan Bay', lng: -74.180, lat: 40.490 },
  { name: 'Jamaica Bay', lng: -73.862, lat: 40.610 },
  { name: 'East River', lng: -73.930, lat: 40.780, rotate: -55 },
  { name: 'Hudson River', lng: -74.005, lat: 40.815, rotate: -78 },
  { name: 'Arthur Kill', lng: -74.215, lat: 40.605, rotate: -80 },
]

interface SiteCentroidProps extends RankingSite {
  _radius: number
  _isTop10: 0 | 1
}

interface HeroMapProps {
  geojson: RankingsFeatureCollection
  sites: RankingSite[]
  hoveredRanks: number[]
  onHoverRanks: (ranks: number[]) => void
}

export function HeroMap({ geojson, hoveredRanks, onHoverRanks }: HeroMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapNodeRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const haloMarkersRef = useRef<Marker[]>([])
  const labelMarkersRef = useRef<Marker[]>([])
  const hoveredFeatureIdRef = useRef<string | number | null>(null)

  const [hoveredSite, setHoveredSite] = useState<RankingSite | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Build a centroid-based GeoJSON with computed properties
  const sitesGeoJson = useMemo(() => {
    const validSites = geojson.features.filter((f) => {
      const acres = (f.properties as RankingSite).Acres
      return typeof acres === 'number' && acres > 0
    })
    const acres = validSites.map((f) => (f.properties as RankingSite).Acres)
    const minAcres = Math.min(...acres)
    const maxAcres = Math.max(...acres)

    const features = validSites.map((feature) => {
      const props = feature.properties as RankingSite
      const centroid = calculateCentroid(
        feature.geometry.coordinates as number[][][][] | number[][][]
      )
      const baseRadius = calculateMarkerRadius(
        props.Acres,
        minAcres,
        maxAcres,
        4,
        9
      )
      const isTop10 = props.Rank <= 10
      const data: SiteCentroidProps = {
        ...props,
        _radius: isTop10 ? baseRadius * 1.15 : baseRadius,
        _isTop10: isTop10 ? 1 : 0,
      }
      return {
        type: 'Feature' as const,
        id: Number(props.id),
        geometry: { type: 'Point' as const, coordinates: centroid },
        properties: data,
      }
    })

    return {
      type: 'FeatureCollection' as const,
      features,
    }
  }, [geojson])

  // Stable callback for hover propagation up to FigurePanel
  const onHoverRanksRef = useRef(onHoverRanks)
  useEffect(() => {
    onHoverRanksRef.current = onHoverRanks
  }, [onHoverRanks])

  // Initialize map once
  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) return
    if (!MAPBOX_TOKEN) {
      setErrorMsg('Missing NEXT_PUBLIC_MAPBOX_TOKEN at build time. The env var is not present in the Vercel build environment.')
      return
    }

    mapboxgl.accessToken = MAPBOX_TOKEN

    let map: MapboxMap
    try {
      map = new mapboxgl.Map({
      container: mapNodeRef.current,
      style: {
        version: 8,
        name: 'BOP Hero Dark',
        sources: {
          'land-nyc': {
            type: 'geojson',
            data: '/data/nyc-boroughs.geojson',
          },
          'land-nj': {
            type: 'geojson',
            data: '/data/nj-shoreline.geojson',
          },
          'land-westchester': {
            type: 'geojson',
            data: '/data/westchester.geojson',
          },
          sites: {
            type: 'geojson',
            data: sitesGeoJson,
            promoteId: 'id',
          },
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#061321' },
          },
          {
            id: 'land-westchester-fill',
            type: 'fill',
            source: 'land-westchester',
            paint: {
              'fill-color': '#0E2236',
              'fill-opacity': 1,
            },
          },
          {
            id: 'land-nj-fill',
            type: 'fill',
            source: 'land-nj',
            paint: {
              'fill-color': '#0E2236',
              'fill-opacity': 1,
            },
          },
          {
            id: 'land-nyc-fill',
            type: 'fill',
            source: 'land-nyc',
            paint: {
              'fill-color': '#0E2236',
              'fill-opacity': 1,
            },
          },
          {
            id: 'land-nyc-edge',
            type: 'line',
            source: 'land-nyc',
            paint: {
              'line-color': 'rgba(120, 158, 184, 0.35)',
              'line-width': 1.1,
            },
          },
          {
            id: 'land-nj-edge',
            type: 'line',
            source: 'land-nj',
            paint: {
              'line-color': 'rgba(120, 158, 184, 0.35)',
              'line-width': 1.1,
            },
          },
          {
            id: 'land-westchester-edge',
            type: 'line',
            source: 'land-westchester',
            paint: {
              'line-color': 'rgba(120, 158, 184, 0.35)',
              'line-width': 1.1,
            },
          },
          {
            id: 'sites-circle',
            type: 'circle',
            source: 'sites',
            paint: {
              'circle-radius': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                ['*', ['get', '_radius'], 1.3],
                ['get', '_radius'],
              ],
              'circle-color': [
                'case',
                ['<', ['get', 'Score'], 0.5],
                'rgba(80, 105, 115, 0.85)',
                [
                  'interpolate',
                  ['linear'],
                  ['get', 'Score'],
                  0.5,
                  '#2A4A56',
                  0.685,
                  '#137D76',
                  0.87,
                  '#6FE3D0',
                ],
              ],
              'circle-stroke-color': [
                'case',
                ['<', ['get', 'Score'], 0.5],
                'rgba(0, 0, 0, 0)',
                'rgba(111, 227, 208, 0.55)',
              ],
              'circle-stroke-width': [
                'case',
                ['<', ['get', 'Score'], 0.5],
                0,
                1.5,
              ],
              'circle-opacity': [
                'case',
                ['<', ['get', 'Score'], 0.5],
                0.45,
                1,
              ],
              'circle-blur': [
                'case',
                ['==', ['get', '_isTop10'], 1],
                0.18,
                0,
              ],
            },
          },
        ],
      },
      bounds: HARBOR_BOUNDS,
      fitBoundsOptions: {
        padding: { top: 20, right: 24, bottom: 36, left: 24 },
      },
      projection: 'mercator', // Mapbox 3.x defaults to globe; force flat
      attributionControl: false,
      interactive: false, // hero is for looking, not panning
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
      const message = err instanceof Error ? err.message : String(err)
      setErrorMsg(`Mapbox init threw: ${message}`)
      return
    }

    mapRef.current = map

    // Surface any Mapbox-emitted error directly into the UI
    map.on('error', (e) => {
      const err = e?.error
      const message = err
        ? (err instanceof Error ? err.message : String(err))
        : 'Mapbox emitted an unspecified error'
      // eslint-disable-next-line no-console
      console.error('[HeroMap] Mapbox error', e)
      setErrorMsg(message)
    })

    map.on('load', () => {
      // Borough labels — JetBrains Mono uppercase
      const boroughMarkers = BOROUGH_LABELS.map((label) => {
        const el = document.createElement('div')
        el.textContent = label.name
        el.style.cssText = `
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(184, 176, 160, 0.7);
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

      // Water-body labels — Fraunces italic, smaller, more faint, sometimes angled
      const waterMarkers = WATER_LABELS.map((label) => {
        const el = document.createElement('div')
        el.textContent = label.name
        el.style.cssText = `
          font-family: var(--font-fraunces), ui-serif, serif;
          font-style: italic;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: rgba(184, 176, 160, 0.42);
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
          text-shadow: 0 0 6px rgba(6, 19, 33, 0.9);
          transform: ${label.rotate ? `rotate(${label.rotate}deg)` : 'none'};
          transform-origin: center;
        `
        return new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([label.lng, label.lat])
          .addTo(map)
      })

      labelMarkersRef.current = [...boroughMarkers, ...waterMarkers]

      // Top-10 pulsing halos as DOM markers
      const top10 = sitesGeoJson.features.filter(
        (f) => f.properties._isTop10 === 1
      )
      haloMarkersRef.current = top10.map((feature) => {
        const props = feature.properties
        const haloDiameter = props._radius * 2 + 14

        const halo = document.createElement('div')
        halo.className = 'animate-pulse-halo'
        halo.style.cssText = `
          width: ${haloDiameter}px;
          height: ${haloDiameter}px;
          border-radius: 50%;
          border: 1px solid #2BA8A0;
          pointer-events: none;
          will-change: transform, opacity;
        `
        halo.dataset.rank = String(props.Rank)

        return new mapboxgl.Marker({
          element: halo,
          anchor: 'center',
        })
          .setLngLat(feature.geometry.coordinates as [number, number])
          .addTo(map)
      })

      // Hover handling on the sites circle layer
      map.on('mousemove', 'sites-circle', (e) => {
        if (!e.features?.length) return
        map.getCanvas().style.cursor = 'pointer'

        const feature = e.features[0]
        const props = feature.properties as unknown as SiteCentroidProps

        // Update feature-state on the hovered point
        const featureId = feature.id
        if (
          featureId !== undefined &&
          hoveredFeatureIdRef.current !== featureId
        ) {
          if (hoveredFeatureIdRef.current !== null) {
            map.setFeatureState(
              { source: 'sites', id: hoveredFeatureIdRef.current },
              { hover: false }
            )
          }
          map.setFeatureState(
            { source: 'sites', id: featureId },
            { hover: true }
          )
          hoveredFeatureIdRef.current = featureId
        }

        // Update tooltip position
        const containerRect = containerRef.current?.getBoundingClientRect()
        if (containerRect) {
          setMousePos({
            x: e.originalEvent.clientX - containerRect.left,
            y: e.originalEvent.clientY - containerRect.top,
          })
        }

        setHoveredSite(props as unknown as RankingSite)

        // Notify parent for bidirectional highlight when top-10
        if (props._isTop10 === 1) {
          onHoverRanksRef.current([Number(props.Rank)])
        }
      })

      map.on('mouseleave', 'sites-circle', () => {
        map.getCanvas().style.cursor = ''
        if (hoveredFeatureIdRef.current !== null) {
          map.setFeatureState(
            { source: 'sites', id: hoveredFeatureIdRef.current },
            { hover: false }
          )
          hoveredFeatureIdRef.current = null
        }
        setHoveredSite(null)
        onHoverRanksRef.current([])
      })
    })

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
      map.resize()
    })
    if (mapNodeRef.current) {
      resizeObserver.observe(mapNodeRef.current)
    }

    return () => {
      resizeObserver.disconnect()
      haloMarkersRef.current.forEach((m) => m.remove())
      haloMarkersRef.current = []
      labelMarkersRef.current.forEach((m) => m.remove())
      labelMarkersRef.current = []
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push updated site data through the existing source when geojson changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const source = map.getSource('sites') as
      | mapboxgl.GeoJSONSource
      | undefined
    if (source) {
      source.setData(sitesGeoJson as unknown as GeoJSON.FeatureCollection)
    }
  }, [sitesGeoJson])

  // Bidirectional hover: when FigurePanel lifts a rank, light up corresponding site
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return

    const targetRanks = new Set(hoveredRanks)
    sitesGeoJson.features.forEach((feature) => {
      const id = feature.id
      const rank = feature.properties.Rank
      if (id === undefined) return
      const shouldHover = targetRanks.has(rank)
      map.setFeatureState({ source: 'sites', id }, { hover: shouldHover })
    })

    // Dim non-hovered top-10 halos when something is hovered
    haloMarkersRef.current.forEach((marker) => {
      const el = marker.getElement()
      const rank = Number(el.dataset.rank)
      if (hoveredRanks.length === 0) {
        el.style.opacity = ''
      } else if (targetRanks.has(rank)) {
        el.style.opacity = '1'
      } else {
        el.style.opacity = '0.32'
      }
    })

    return () => {
      // Clear synthesized hover state when ranks change
      sitesGeoJson.features.forEach((feature) => {
        const id = feature.id
        if (id !== undefined) {
          map.setFeatureState({ source: 'sites', id }, { hover: false })
        }
      })
    }
  }, [hoveredRanks, sitesGeoJson])

  // Build-time token guard (NEXT_PUBLIC_* inlined at build, so this fires only
  // if the env var was not present in the build environment)
  const tokenMissing = !MAPBOX_TOKEN

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[640px] lg:min-h-[720px]">
      <div
        ref={mapNodeRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {(tokenMissing || errorMsg) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none">
          <div
            className="
              max-w-[520px] w-full
              border border-rule rounded-card
              bg-bg-deep/95
              p-6
              text-ivory text-body-sm leading-relaxed
              backdrop-blur-sm
              pointer-events-auto
            "
            role="alert"
          >
            <div className="font-mono text-eyebrow uppercase text-teal-bright/80 mb-2">
              Map could not render
            </div>
            <div className="font-mono text-[13px] text-ivory whitespace-pre-wrap break-words">
              {tokenMissing
                ? 'Missing NEXT_PUBLIC_MAPBOX_TOKEN at build time. Confirm the env var is set on the live Vercel project (Preview + Production + Development) and push a new commit to rebuild.'
                : errorMsg}
            </div>
            <div className="mt-3 text-ivory-dim text-[12px] font-sans">
              Common causes:
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Token URL restrictions on Mapbox.com exclude the Vercel preview domain</li>
                <li>Token revoked or expired</li>
                <li>Style spec rejected by mapbox-gl validation</li>
              </ul>
            </div>
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
