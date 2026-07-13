/**
 * Coastline path data for NY Harbor map
 *
 * Extended outward so land masses continue beyond SVG viewport.
 * Inner edges (facing water) stay geographically accurate.
 * Each land mass is a SEPARATE polygon with water gaps between them.
 */

export interface CoastlineSegment {
  id: string
  coordinates: [number, number][]
}

export const COASTLINES: Record<string, [number, number][]> = {
  // NEW JERSEY - western land mass along Hudson River
  // Separated from Staten Island by Kill Van Kull / Arthur Kill
  new_jersey: [
    // Start at southwest corner (off-screen)
    [-74.52, 40.48],
    [-74.50, 40.52],
    [-74.52, 40.65],
    [-74.50, 40.80],
    [-74.52, 40.95],
    [-74.50, 41.10],
    [-74.52, 41.30],
    // Northwest corner (off-screen)
    [-74.45, 41.35],
    [-74.35, 41.38],
    [-74.25, 41.36],
    [-74.15, 41.38],
    [-74.05, 41.35],
    // Hudson River - Palisades (detailed eastern shore)
    [-73.99, 41.05],
    [-73.985, 41.02],
    [-73.98, 40.99],
    [-73.978, 40.96],
    [-73.98, 40.93],
    [-73.985, 40.90],
    [-73.99, 40.87],
    [-73.995, 40.84],
    [-74.00, 40.81],
    [-74.01, 40.78],
    [-74.02, 40.75],
    [-74.025, 40.73],
    [-74.03, 40.71],
    // Weehawken / Hoboken / Jersey City waterfront
    [-74.04, 40.695],
    [-74.05, 40.68],
    [-74.065, 40.665],
    [-74.08, 40.65],
    [-74.095, 40.635],
    [-74.11, 40.62],
    [-74.125, 40.605],
    [-74.14, 40.59],
    [-74.155, 40.575],
    [-74.17, 40.56],
    // Bayonne - approach to Kill Van Kull
    [-74.185, 40.545],
    [-74.20, 40.53],
    [-74.215, 40.515],
    [-74.23, 40.50],
    // Kill Van Kull entrance (STOP HERE - water gap to Staten Island)
    [-74.245, 40.485],
    [-74.26, 40.475],
    // South along Arthur Kill (western side, facing Staten Island across water)
    [-74.265, 40.46],
    [-74.27, 40.445],
    [-74.275, 40.43],
    // Southwest extension (off-screen)
    [-74.32, 40.42],
    [-74.40, 40.44],
    [-74.52, 40.48],
  ],

  // STATEN ISLAND - separate island south of Kill Van Kull
  // Clear water gap from NJ on north/west, from Brooklyn on east
  staten_island: [
    // Northern shore - Kill Van Kull (faces NJ across water)
    [-74.24, 40.515],
    [-74.225, 40.52],
    [-74.21, 40.525],
    [-74.19, 40.528],
    [-74.17, 40.535],
    [-74.15, 40.545],
    [-74.13, 40.555],
    [-74.11, 40.565],
    [-74.09, 40.575],
    // The Narrows (eastern tip, faces Brooklyn across water)
    [-74.07, 40.59],
    [-74.055, 40.605],
    [-74.05, 40.62],
    [-74.055, 40.635],
    [-74.065, 40.648],
    [-74.08, 40.66],
    [-74.095, 40.668],
    [-74.11, 40.672],
    // Western shore - Arthur Kill (faces NJ across water)
    [-74.13, 40.67],
    [-74.15, 40.665],
    [-74.17, 40.655],
    [-74.185, 40.64],
    [-74.20, 40.62],
    [-74.21, 40.60],
    [-74.22, 40.58],
    [-74.225, 40.56],
    [-74.23, 40.54],
    [-74.235, 40.52],
    [-74.24, 40.515],
  ],

  // MANHATTAN - narrow island between Hudson and East River
  manhattan: [
    // Southern tip - Battery
    [-74.018, 40.700],
    [-74.012, 40.702],
    [-74.005, 40.705],
    [-73.998, 40.708],
    // East side - East River
    [-73.99, 40.712],
    [-73.982, 40.72],
    [-73.975, 40.73],
    [-73.968, 40.74],
    [-73.962, 40.75],
    [-73.956, 40.76],
    [-73.95, 40.77],
    [-73.944, 40.78],
    [-73.938, 40.79],
    [-73.932, 40.80],
    [-73.928, 40.815],
    [-73.924, 40.83],
    [-73.922, 40.845],
    [-73.92, 40.86],
    // Northern tip - Inwood
    [-73.915, 40.872],
    [-73.91, 40.878],
    // West side - Hudson River
    [-73.918, 40.875],
    [-73.928, 40.868],
    [-73.94, 40.858],
    [-73.952, 40.845],
    [-73.962, 40.832],
    [-73.972, 40.818],
    [-73.98, 40.805],
    [-73.986, 40.79],
    [-73.992, 40.775],
    [-73.998, 40.76],
    [-74.004, 40.745],
    [-74.01, 40.73],
    [-74.015, 40.715],
    [-74.018, 40.700],
  ],

  // BROOKLYN / QUEENS (Long Island western end)
  // Separated from Staten Island by The Narrows, from Manhattan by East River
  brooklyn_queens: [
    // Northwest corner - East River (faces Manhattan)
    [-73.98, 40.70],
    [-73.97, 40.695],
    [-73.96, 40.69],
    [-73.95, 40.685],
    // Brooklyn waterfront heading south
    [-73.96, 40.675],
    [-73.97, 40.665],
    [-73.975, 40.655],
    [-73.98, 40.645],
    [-73.985, 40.635],
    [-73.99, 40.625],
    [-73.992, 40.615],
    [-73.995, 40.605],
    [-73.997, 40.595],
    [-74.00, 40.585],
    // Red Hook / Gowanus area
    [-74.005, 40.575],
    [-74.008, 40.565],
    [-74.005, 40.555],
    [-74.00, 40.548],
    // The Narrows (faces Staten Island across water)
    [-73.99, 40.542],
    [-73.98, 40.538],
    [-73.97, 40.535],
    [-73.96, 40.535],
    // Coney Island / southern shore
    [-73.95, 40.538],
    [-73.94, 40.542],
    [-73.93, 40.548],
    [-73.92, 40.555],
    [-73.91, 40.56],
    [-73.90, 40.565],
    [-73.89, 40.568],
    [-73.88, 40.57],
    // Jamaica Bay area (simplified)
    [-73.86, 40.575],
    [-73.84, 40.58],
    [-73.82, 40.59],
    [-73.80, 40.60],
    [-73.78, 40.62],
    [-73.76, 40.65],
    [-73.75, 40.70],
    [-73.74, 40.75],
    [-73.735, 40.80],
    [-73.73, 40.85],
    // Northern Queens - Long Island Sound approach
    [-73.735, 40.87],
    [-73.75, 40.875],
    [-73.77, 40.865],
    [-73.79, 40.85],
    [-73.81, 40.84],
    [-73.83, 40.835],
    [-73.85, 40.84],
    [-73.87, 40.85],
    [-73.89, 40.86],
    // East River - Queens side (faces Bronx/Manhattan)
    [-73.905, 40.855],
    [-73.915, 40.845],
    [-73.92, 40.83],
    [-73.925, 40.815],
    [-73.93, 40.80],
    [-73.935, 40.785],
    [-73.94, 40.77],
    [-73.945, 40.755],
    [-73.95, 40.74],
    [-73.955, 40.725],
    [-73.96, 40.71],
    [-73.97, 40.705],
    [-73.98, 40.70],
  ],

  // BRONX / WESTCHESTER - northern land mass
  bronx: [
    // Connection point near Manhattan (Harlem River)
    [-73.91, 40.878],
    [-73.90, 40.875],
    [-73.89, 40.87],
    [-73.88, 40.865],
    // South Bronx waterfront
    [-73.87, 40.858],
    [-73.86, 40.85],
    [-73.85, 40.842],
    [-73.84, 40.835],
    [-73.83, 40.83],
    [-73.82, 40.828],
    [-73.81, 40.83],
    [-73.80, 40.835],
    [-73.79, 40.845],
    [-73.78, 40.858],
    [-73.77, 40.87],
    // Long Island Sound shore
    [-73.775, 40.885],
    [-73.785, 40.90],
    [-73.80, 40.92],
    [-73.82, 40.94],
    [-73.85, 40.96],
    [-73.87, 40.99],
    [-73.86, 41.02],
    [-73.85, 41.06],
    // Northern extension (off-screen)
    [-73.84, 41.12],
    [-73.85, 41.20],
    [-73.84, 41.28],
    [-73.86, 41.35],
    // Northeast corner (off-screen)
    [-73.75, 41.38],
    [-73.65, 41.36],
    [-73.55, 41.38],
    [-73.48, 41.35],
    // Eastern extension (off-screen) - Long Island continues
    [-73.50, 41.20],
    [-73.48, 41.05],
    [-73.50, 40.92],
    [-73.48, 40.88],
    // Returns along Long Island Sound
    [-73.55, 40.875],
    [-73.62, 40.87],
    [-73.68, 40.872],
    [-73.72, 40.87],
    [-73.74, 40.872],
    [-73.76, 40.868],
    [-73.77, 40.87],
    [-73.80, 40.872],
    [-73.84, 40.875],
    [-73.88, 40.878],
    [-73.91, 40.878],
  ],

  // SANDY HOOK / RARITAN BAY - southern coastline
  raritan_south: [
    // Southwest (off-screen)
    [-74.52, 40.35],
    [-74.48, 40.40],
    [-74.50, 40.45],
    // Northern shore - Raritan Bay
    [-74.40, 40.465],
    [-74.32, 40.47],
    [-74.25, 40.475],
    [-74.20, 40.49],
    [-74.15, 40.50],
    [-74.10, 40.505],
    [-74.05, 40.50],
    [-74.00, 40.495],
    [-73.95, 40.49],
    [-73.90, 40.488],
    [-73.85, 40.49],
    [-73.80, 40.495],
    [-73.75, 40.50],
    [-73.70, 40.505],
    [-73.65, 40.51],
    // Southeast (off-screen)
    [-73.55, 40.505],
    [-73.48, 40.50],
    [-73.50, 40.42],
    [-73.48, 40.35],
    // Southern shore (off-screen)
    [-73.60, 40.34],
    [-73.75, 40.33],
    [-73.90, 40.32],
    [-74.10, 40.33],
    [-74.30, 40.32],
    [-74.52, 40.35],
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
