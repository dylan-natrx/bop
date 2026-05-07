/**
 * Coastline path data for NY Harbor map
 *
 * Extended outward so land masses continue beyond SVG viewport.
 * Inner edges (facing water) stay geographically accurate.
 * Outer edges use intermediate vertices with slight irregularity
 * to suggest natural coastlines exiting the viewport.
 */

export interface CoastlineSegment {
  id: string
  coordinates: [number, number][]
}

export const COASTLINES: Record<string, [number, number][]> = {
  // Staten Island - extended west and south with smoothed corners
  staten_island: [
    [-74.52, 40.42], // extended southwest (offset)
    [-74.48, 40.46], // intermediate
    [-74.51, 40.48], // intermediate
    [-74.49, 40.505], // extended west (offset)
    [-74.255, 40.5],
    [-74.245, 40.493],
    [-74.23, 40.495],
    [-74.19, 40.505],
    [-74.155, 40.53],
    [-74.125, 40.56],
    [-74.075, 40.57],
    [-74.06, 40.595],
    [-74.08, 40.625],
    [-74.13, 40.645],
    [-74.18, 40.642],
    [-74.2, 40.625],
    [-74.215, 40.605],
    [-74.245, 40.58],
    [-74.255, 40.555],
    [-74.255, 40.5],
    [-74.28, 40.47], // intermediate
    [-74.32, 40.44], // extended south (offset)
    [-74.38, 40.43], // intermediate
    [-74.45, 40.425], // intermediate
    [-74.52, 40.42], // close polygon
  ],

  // NJ West - extended west to -74.50 with curved northwest corner
  nj_west: [
    [-74.52, 40.33], // extended southwest (offset)
    [-74.48, 40.38], // intermediate
    [-74.51, 40.55], // intermediate
    [-74.49, 40.75], // intermediate
    [-74.52, 40.95], // intermediate
    [-74.50, 41.15], // intermediate
    [-74.52, 41.32], // intermediate
    [-74.48, 41.38], // extended northwest (offset)
    [-74.35, 41.42], // intermediate - curve along top
    [-74.20, 41.39], // intermediate
    [-74.08, 41.41], // intermediate
    [-73.978, 41.04],
    [-73.985, 40.935],
    [-74.005, 40.86],
    [-74.02, 40.795],
    [-74.03, 40.745],
    [-74.055, 40.72],
    [-74.085, 40.69],
    [-74.12, 40.66],
    [-74.155, 40.625],
    [-74.185, 40.58],
    [-74.22, 40.5],
    [-74.26, 40.47],
    [-74.26, 40.439],
    [-74.32, 40.41], // intermediate
    [-74.40, 40.36], // intermediate
    [-74.52, 40.33], // close polygon
  ],

  // Manhattan - inner edges stay accurate
  manhattan: [
    [-74.018, 40.703],
    [-74.0, 40.708],
    [-73.985, 40.715],
    [-73.972, 40.73],
    [-73.962, 40.745],
    [-73.953, 40.762],
    [-73.945, 40.778],
    [-73.935, 40.795],
    [-73.925, 40.815],
    [-73.928, 40.835],
    [-73.925, 40.86],
    [-73.91, 40.875],
    [-73.925, 40.872],
    [-73.945, 40.86],
    [-73.965, 40.84],
    [-73.978, 40.815],
    [-73.985, 40.79],
    [-73.992, 40.77],
    [-74.003, 40.755],
    [-74.012, 40.738],
    [-74.015, 40.725],
    [-74.018, 40.71],
    [-74.018, 40.703],
  ],

  // Bronx North - extended north with curved northeast corner
  bronx_north: [
    [-73.91, 40.875],
    [-73.89, 40.87],
    [-73.86, 40.85],
    [-73.835, 40.83],
    [-73.795, 40.82],
    [-73.77, 40.835],
    [-73.77, 40.87],
    [-73.785, 40.89],
    [-73.795, 40.92],
    [-73.88, 40.96],
    [-73.87, 41.0],
    [-73.86, 41.05],
    [-73.85, 41.12], // intermediate
    [-73.87, 41.20], // intermediate
    [-73.84, 41.28], // intermediate
    [-73.86, 41.37], // extended north (offset)
    [-73.72, 41.36], // intermediate - curve along top
    [-73.60, 41.38], // intermediate
    [-73.48, 41.34], // extended northeast (offset)
    [-73.49, 41.18], // intermediate - curve down east side
    [-73.52, 41.02], // intermediate
    [-73.48, 40.90], // intermediate
    [-73.51, 40.85], // extended east (offset)
    [-73.73, 40.87],
    [-73.755, 40.86],
    [-73.77, 40.87],
    [-73.91, 40.875],
  ],

  // Long Island - extended east with smoothed right edge
  long_island: [
    [-74.03, 40.58],
    [-74.0, 40.58],
    [-73.975, 40.575],
    [-73.945, 40.572],
    [-73.91, 40.578],
    [-73.88, 40.58],
    [-73.87, 40.585],
    [-73.88, 40.61],
    [-73.84, 40.625],
    [-73.82, 40.61],
    [-73.815, 40.58],
    [-73.8, 40.57],
    [-73.77, 40.56],
    [-73.73, 40.585],
    [-73.73, 40.86],
    [-73.62, 40.87], // intermediate - curve to east
    [-73.54, 40.85], // intermediate
    [-73.48, 40.88], // extended east (offset)
    [-73.50, 40.76], // intermediate - curve down east edge
    [-73.47, 40.65], // intermediate
    [-73.51, 40.55], // intermediate
    [-73.48, 40.47], // extended southeast (offset)
    [-73.58, 40.44], // intermediate - curve along bottom
    [-73.68, 40.46], // intermediate
    [-73.75, 40.43], // extended south (offset)
    [-73.77, 40.56],
    [-73.8, 40.57],
    [-73.815, 40.58],
    [-73.82, 40.61],
    [-73.84, 40.625],
    [-73.88, 40.61],
    [-73.87, 40.585],
    [-73.88, 40.58],
    [-73.91, 40.578],
    [-73.945, 40.572],
    [-73.975, 40.575],
    [-74.0, 40.58],
    [-74.03, 40.58],
  ],

  // Southern coastal element below Staten Island / Raritan Bay
  raritan_south: [
    [-74.52, 40.33], // southwest corner (offset)
    [-74.48, 40.42], // intermediate
    [-74.51, 40.50], // intermediate
    [-74.30, 40.48],
    [-74.22, 40.50],
    [-74.18, 40.52],
    [-74.10, 40.50],
    [-74.05, 40.47],
    [-73.95, 40.45],
    [-73.80, 40.45],
    [-73.65, 40.46], // intermediate
    [-73.55, 40.44], // intermediate
    [-73.48, 40.47], // extended east (offset)
    [-73.50, 40.38], // intermediate - curve down
    [-73.47, 40.32], // extended southeast (offset)
    [-73.60, 40.34], // intermediate - curve along bottom
    [-73.80, 40.32], // intermediate
    [-74.05, 40.33], // intermediate
    [-74.30, 40.31], // intermediate
    [-74.52, 40.33], // close polygon
  ],
}

/**
 * Get all coastline segments as an array
 */
export function getCoastlineSegments(): CoastlineSegment[] {
  return Object.entries(COASTLINES).map(([id, coordinates]) => ({
    id,
    coordinates,
  }))
}
