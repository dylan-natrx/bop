/**
 * Suitability score color utilities
 *
 * Design rules from CLAUDE.md:
 * - Sites at score ≥ 0.50 render in the gradient (dark teal at 0.50 through bright aqua at 0.87)
 * - Sites below 0.50 render in a single muted gray-teal at ~0.45 opacity
 */

// Gradient stops for scores ≥ 0.50
const SUITABILITY_GRADIENT = {
  low: { score: 0.5, color: [42, 74, 86] as const }, // #2A4A56 at 0.50
  mid: { score: 0.685, color: [19, 125, 118] as const }, // #137D76 at midpoint
  high: { score: 0.87, color: [111, 227, 208] as const }, // #6FE3D0 at 0.87
}

// Muted color for scores < 0.50
const BELOW_THRESHOLD_COLOR = 'rgba(42, 74, 86, 0.45)'

// Threshold for gradient vs muted treatment
const THRESHOLD = 0.5

/**
 * Linear interpolation between two values
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Interpolate between two RGB colors
 */
function lerpColor(
  c1: readonly [number, number, number],
  c2: readonly [number, number, number],
  t: number
): string {
  const r = Math.round(lerp(c1[0], c2[0], t))
  const g = Math.round(lerp(c1[1], c2[1], t))
  const b = Math.round(lerp(c1[2], c2[2], t))
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Get the color for a suitability score
 *
 * @param score - Suitability score (0-1)
 * @returns CSS color string
 */
export function getSuitabilityColor(score: number): string {
  // Below threshold: muted gray-teal
  if (score < THRESHOLD) {
    return BELOW_THRESHOLD_COLOR
  }

  const { low, mid, high } = SUITABILITY_GRADIENT

  // Normalize score to 0-1 within the gradient range
  const normalizedScore = Math.min(
    1,
    Math.max(0, (score - low.score) / (high.score - low.score))
  )

  // Two-segment gradient: low→mid, mid→high
  const midPoint = (mid.score - low.score) / (high.score - low.score)

  if (normalizedScore <= midPoint) {
    // Low to mid segment
    const t = normalizedScore / midPoint
    return lerpColor(low.color, mid.color, t)
  } else {
    // Mid to high segment
    const t = (normalizedScore - midPoint) / (1 - midPoint)
    return lerpColor(mid.color, high.color, t)
  }
}

/**
 * Check if a score is above the gradient threshold
 */
export function isAboveThreshold(score: number): boolean {
  return score >= THRESHOLD
}

/**
 * CSS gradient string for legends
 */
export const SUITABILITY_GRADIENT_CSS =
  'linear-gradient(90deg, #2A4A56 0%, #137D76 50%, #6FE3D0 100%)'

/**
 * Get opacity for a site based on its score
 * Sites below threshold render at reduced opacity
 */
export function getSuitabilityOpacity(score: number): number {
  return score >= THRESHOLD ? 1 : 0.6
}
