'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import mapboxgl, { type Map as MapboxMap, type LngLatBoundsLike } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useRankingsData } from '@/hooks/useRankingsData'
import type { RankingSite } from '@/types/site'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

interface SiteMiniMapProps {
  /** IDs of sites to highlight; the map zooms to the bounds of all matching features. */
  siteIds: string[]
  /** Aspect ratio for the map container. Default 4 / 3. */
  aspect?: string
  /** Optional padding on the bounds fit, in pixels. */
  padding?: number
}

/**
 * Small, static Mapbox view zoomed to a single site or a tight cluster of
 * sites. Uses the same dark editorial style as Map 1 and Map 2 so the three
 * top-ranked callouts read as one visual system with the rest of the page.
 *
 * Rendered as a static map (no pan, zoom, or scroll). The site polygons fill
 * in teal-aqua with a brighter stroke; surrounding land masses provide
 * geographic context.
 */
export function SiteMiniMap({
  siteIds,
  aspect = '4 / 3',
  padding = 28,
}: SiteMiniMapProps) {
  const { geojson, isLoading } = useRankingsData()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapNodeRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Filter the GeoJSON to just the matching sites + compute bounds.
  const { highlightGeoJson, bounds } = useMemo(() => {
    if (!geojson) return { highlightGeoJson: null, bounds: null as LngLatBoundsLike | null }
    const idSet = new Set(siteIds)
    const features = geojson.features.filter(
      (f) => idSet.has((f.properties as RankingSite).id)
    )
    if (features.length === 0) return { highlightGeoJson: null, bounds: null }

    // Build bbox from all the points in all features
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity
    const walk = (coords: unknown): void => {
      if (Array.isArray(coords) && typeof coords[0] === 'number') {
        const [lng, lat] = coords as [number, number]
        if (lng < minLng) minLng = lng
        if (lat < minLat) minLat = lat
        if (lng > maxLng) maxLng = lng
        if (lat > maxLat) maxLat = lat
      } else if (Array.isArray(coords)) {
        for (const c of coords) walk(c)
      }
    }
    features.forEach((f) => walk(f.geometry.coordinates))

    return {
      highlightGeoJson: { type: 'FeatureCollection' as const, features },
      bounds: [
        [minLng, minLat],
        [maxLng, maxLat],
      ] as LngLatBoundsLike,
    }
  }, [geojson, siteIds])

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current || !MAPBOX_TOKEN) return
    if (!highlightGeoJson || !bounds) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    let map: MapboxMap
    try {
      map = new mapboxgl.Map({
        container: mapNodeRef.current,
        style: {
          version: 8,
          name: 'BOP Mini Map',
          sources: {
            'land-region': { type: 'geojson', data: '/data/region-land.geojson' },
            'water-hudson': { type: 'geojson', data: '/data/hudson-river.geojson' },
            highlight: { type: 'geojson', data: highlightGeoJson as unknown as GeoJSON.FeatureCollection },
          },
          layers: [
            { id: 'background', type: 'background', paint: { 'background-color': '#061321' } },
            { id: 'land-region-fill', type: 'fill', source: 'land-region', paint: { 'fill-color': '#15314A', 'fill-opacity': 1 } },
            { id: 'water-hudson-fill', type: 'fill', source: 'water-hudson', paint: { 'fill-color': '#061321', 'fill-opacity': 1 } },
            {
              id: 'land-region-edge',
              type: 'line',
              source: 'land-region',
              paint: { 'line-color': 'rgba(120, 158, 184, 0.35)', 'line-width': 0.9 },
            },
            {
              id: 'water-hudson-edge',
              type: 'line',
              source: 'water-hudson',
              paint: { 'line-color': 'rgba(120, 158, 184, 0.35)', 'line-width': 0.9 },
            },
            // Highlight: filled polygon for the focal site(s)
            {
              id: 'highlight-fill',
              type: 'fill',
              source: 'highlight',
              paint: { 'fill-color': '#6FE3D0', 'fill-opacity': 0.55 },
            },
            // Highlight outline for definition at low zoom
            {
              id: 'highlight-outline',
              type: 'line',
              source: 'highlight',
              paint: { 'line-color': '#6FE3D0', 'line-width': 1.6, 'line-opacity': 0.95 },
            },
          ],
        },
        bounds,
        fitBoundsOptions: { padding, animate: false, maxZoom: 14 },
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
      })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err))
      return
    }

    mapRef.current = map

    map.on('error', () => {
      // Stay quiet — the static mini-maps shouldn't surface errors in cards
    })

    const resizeObserver = new ResizeObserver(() => map.resize())
    if (mapNodeRef.current) resizeObserver.observe(mapNodeRef.current)

    return () => {
      resizeObserver.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [highlightGeoJson, bounds, padding])

  if (!MAPBOX_TOKEN) {
    return (
      <div
        className="
          relative w-full
          border border-rule rounded-card
          bg-bg-deep
          flex items-center justify-center
          text-ivory-dim font-mono text-eyebrow uppercase
          p-4 text-center
        "
        style={{ aspectRatio: aspect }}
      >
        Map token missing
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="
        relative w-full
        border border-rule rounded-card overflow-hidden
        bg-bg-deep
      "
      style={{ aspectRatio: aspect }}
    >
      {isLoading || !highlightGeoJson ? (
        <div className="absolute inset-0 flex items-center justify-center text-ivory-dim font-mono text-eyebrow uppercase">
          <span className="animate-pulse">Loading map…</span>
        </div>
      ) : (
        <div
          ref={mapNodeRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      )}
      {errorMsg ? (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-ivory-dim font-mono text-eyebrow uppercase text-center">
          {errorMsg}
        </div>
      ) : null}
    </div>
  )
}
