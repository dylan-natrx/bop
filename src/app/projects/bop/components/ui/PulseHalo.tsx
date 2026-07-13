'use client'

interface PulseHaloProps {
  /** Size of the inner dot in pixels */
  size?: number
  /** Color of the pulse (CSS color) */
  color?: string
  className?: string
}

/**
 * Pulsing halo effect for active design sites
 *
 * Matches the animation from hero_reference.html:
 * - 2.6s ease-in-out infinite
 * - Scale 1 → 1.7
 * - Opacity 0.6 → 0
 */
export function PulseHalo({
  size = 10,
  color = 'var(--teal-bright, #2BA8A0)',
  className = '',
}: PulseHaloProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Core dot */}
      <span
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      />
      {/* Pulsing halo */}
      <span
        className="absolute rounded-full animate-pulse-halo"
        style={{
          width: size + 6,
          height: size + 6,
          border: `1px solid ${color}`,
        }}
      />
    </span>
  )
}
