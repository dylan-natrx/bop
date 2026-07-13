/**
 * Hero map projection utilities
 *
 * Custom projection for the static SVG hero map.
 * Matches the projection logic from hero_reference.html.
 */

export interface MapBounds {
  lngMin: number
  lngMax: number
  latMin: number
  latMax: number
}

export interface ViewDimensions {
  width: number
  height: number
  padX: number
  padY: number
}

/**
 * Default view dimensions matching hero_reference.html
 */
export const DEFAULT_VIEW: ViewDimensions = {
  width: 1100,
  height: 900,
  padX: 0.02,
  padY: 0.02,
}

/**
 * Calculate projection parameters from site coordinates
 */
export function calculateProjection(
  sites: Array<{ lng: number; lat: number }>,
  view: ViewDimensions = DEFAULT_VIEW
) {
  const lngs = sites.map((s) => s.lng)
  const lats = sites.map((s) => s.lat)

  const bounds: MapBounds = {
    lngMin: Math.min(...lngs),
    lngMax: Math.max(...lngs),
    latMin: Math.min(...lats),
    latMax: Math.max(...lats),
  }

  const usableW = view.width * (1 - 2 * view.padX)
  const usableH = view.height * (1 - 2 * view.padY)

  const lngRange = bounds.lngMax - bounds.lngMin
  const latRange = bounds.latMax - bounds.latMin
  const midLat = (bounds.latMin + bounds.latMax) / 2

  // Mercator scale factor
  const lngScale = Math.cos((midLat * Math.PI) / 180)

  // Aspect ratio comparison
  const dataAR = (lngRange * lngScale) / latRange
  const viewAR = usableW / usableH

  let scaleX: number
  let scaleY: number
  let offsetX: number
  let offsetY: number

  if (dataAR > viewAR) {
    // Data is wider than view
    scaleX = usableW / lngRange
    scaleY = scaleX / lngScale
    offsetX = view.width * view.padX
    offsetY = (view.height - latRange * scaleY) / 2
  } else {
    // Data is taller than view
    scaleY = usableH / latRange
    scaleX = scaleY * lngScale
    offsetX = (view.width - lngRange * scaleX) / 2
    offsetY = view.height * view.padY
  }

  return { bounds, scaleX, scaleY, offsetX, offsetY }
}

/**
 * Project a geographic coordinate to SVG coordinates
 */
export function projectPoint(
  lng: number,
  lat: number,
  projection: ReturnType<typeof calculateProjection>,
  view: ViewDimensions = DEFAULT_VIEW
): { x: number; y: number } {
  const { bounds, scaleX, scaleY, offsetX, offsetY } = projection

  const x = (lng - bounds.lngMin) * scaleX + offsetX
  const y = view.height - ((lat - bounds.latMin) * scaleY + offsetY)

  return { x, y }
}

/**
 * Calculate marker radius based on acreage
 * Smaller sites get smaller markers, larger sites get larger markers
 */
export function calculateMarkerRadius(
  acres: number,
  minAcres: number,
  maxAcres: number,
  minRadius: number = 3,
  maxRadius: number = 8
): number {
  // Use square root scaling for area-to-radius
  const normalized = Math.sqrt(acres - minAcres) / Math.sqrt(maxAcres - minAcres)
  return minRadius + normalized * (maxRadius - minRadius)
}
