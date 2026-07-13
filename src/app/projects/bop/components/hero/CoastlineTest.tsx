'use client'

import { useEffect, useState } from 'react'

interface GeoJSONFeature {
  type: string
  properties: { boroname?: string; name?: string }
  geometry: {
    type: string
    coordinates: number[][][][] | number[][][]
  }
}

interface GeoJSONCollection {
  type: string
  features: GeoJSONFeature[]
}

// Simple Mercator projection
function project(
  lng: number,
  lat: number,
  bounds: { minLng: number; maxLng: number; minLat: number; maxLat: number },
  width: number,
  height: number,
  padding: number = 40
) {
  const usableWidth = width - padding * 2
  const usableHeight = height - padding * 2

  const lngRange = bounds.maxLng - bounds.minLng
  const latRange = bounds.maxLat - bounds.minLat

  // Mercator scale factor
  const midLat = (bounds.minLat + bounds.maxLat) / 2
  const lngScale = Math.cos((midLat * Math.PI) / 180)

  // Calculate scale to fit
  const scaleX = usableWidth / lngRange
  const scaleY = usableHeight / latRange / lngScale
  const scale = Math.min(scaleX, scaleY)

  // Center the map
  const offsetX = padding + (usableWidth - lngRange * scale) / 2
  const offsetY = padding + (usableHeight - latRange * scale * lngScale) / 2

  const x = offsetX + (lng - bounds.minLng) * scale
  const y = offsetY + (bounds.maxLat - lat) * scale * lngScale

  return { x, y }
}

// Convert a ring of coordinates to SVG path
function ringToPath(
  ring: number[][],
  bounds: { minLng: number; maxLng: number; minLat: number; maxLat: number },
  width: number,
  height: number
): string {
  return ring
    .map((coord, i) => {
      const { x, y } = project(coord[0], coord[1], bounds, width, height)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ') + ' Z'
}

// Convert MultiPolygon or Polygon to SVG paths
function geometryToPaths(
  geometry: { type: string; coordinates: number[][][][] | number[][][] },
  bounds: { minLng: number; maxLng: number; minLat: number; maxLat: number },
  width: number,
  height: number
): string[] {
  const paths: string[] = []

  if (geometry.type === 'MultiPolygon') {
    const coords = geometry.coordinates as number[][][][]
    for (const polygon of coords) {
      // Each polygon has rings - first is outer, rest are holes
      for (const ring of polygon) {
        paths.push(ringToPath(ring, bounds, width, height))
      }
    }
  } else if (geometry.type === 'Polygon') {
    const coords = geometry.coordinates as number[][][]
    for (const ring of coords) {
      paths.push(ringToPath(ring, bounds, width, height))
    }
  }

  return paths
}

export function CoastlineTest() {
  const [nycData, setNycData] = useState<GeoJSONCollection | null>(null)
  const [njData, setNjData] = useState<GeoJSONCollection | null>(null)
  const [error, setError] = useState<string | null>(null)

  const WIDTH = 1100
  const HEIGHT = 900

  useEffect(() => {
    Promise.all([
      fetch('/data/nyc-boroughs.geojson').then(r => r.json()),
      fetch('/data/nj-shoreline.geojson').then(r => r.json()),
    ])
      .then(([nyc, nj]) => {
        setNycData(nyc)
        setNjData(nj)
      })
      .catch(err => setError(err.message))
  }, [])

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!nycData) {
    return <div className="text-white">Loading...</div>
  }

  // Calculate bounds from NYC data
  let minLng = Infinity, maxLng = -Infinity
  let minLat = Infinity, maxLat = -Infinity

  const extractBounds = (coords: number[][]) => {
    for (const [lng, lat] of coords) {
      minLng = Math.min(minLng, lng)
      maxLng = Math.max(maxLng, lng)
      minLat = Math.min(minLat, lat)
      maxLat = Math.max(maxLat, lat)
    }
  }

  for (const feature of nycData.features) {
    const geom = feature.geometry
    if (geom.type === 'MultiPolygon') {
      for (const polygon of geom.coordinates as number[][][][]) {
        for (const ring of polygon) {
          extractBounds(ring)
        }
      }
    } else if (geom.type === 'Polygon') {
      for (const ring of geom.coordinates as number[][][]) {
        extractBounds(ring)
      }
    }
  }

  // Expand bounds slightly for padding and to include NJ
  const lngPad = (maxLng - minLng) * 0.15
  const latPad = (maxLat - minLat) * 0.1
  minLng -= lngPad
  maxLng += lngPad * 0.5
  minLat -= latPad
  maxLat += latPad

  const bounds = { minLng, maxLng, minLat, maxLat }

  return (
    <div className="w-full h-full bg-[#061321]">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* NYC Boroughs */}
        {nycData.features.map((feature, fi) => {
          const paths = geometryToPaths(feature.geometry, bounds, WIDTH, HEIGHT)
          return (
            <g key={`nyc-${fi}`}>
              {paths.map((d, pi) => (
                <path
                  key={`nyc-${fi}-${pi}`}
                  d={d}
                  fill="#0B1D2F"
                  stroke="rgba(70, 110, 145, 0.3)"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          )
        })}

        {/* NJ */}
        {njData?.features.map((feature, fi) => {
          const paths = geometryToPaths(feature.geometry, bounds, WIDTH, HEIGHT)
          return (
            <g key={`nj-${fi}`}>
              {paths.map((d, pi) => (
                <path
                  key={`nj-${fi}-${pi}`}
                  d={d}
                  fill="#0B1D2F"
                  stroke="rgba(70, 110, 145, 0.3)"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
