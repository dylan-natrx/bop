interface Tier {
  /** Internal name (Nick's pipeline labels) */
  internal: 'high' | 'moderate+' | 'moderate' | 'moderate-' | 'low'
  /** Public-facing label per DATA_SUPPORT_LABELS in src/types/site.ts */
  label: 'Robust' | 'Strong' | 'Adequate' | 'Limited' | 'Sparse'
  /** Number of sites in this tier across the 78-site pipeline */
  count: number
  /** Color for this tier; ramps from teal-aqua (best) to muted teal (sparse) */
  color: string
}

// Counts verified against public/data/rankings.geojson ConfidenceRule
// distribution: 8 high + 14 moderate+ + 24 moderate + 14 moderate- + 18 low = 78.
const TIERS: Tier[] = [
  { internal: 'high', label: 'Robust', count: 8, color: '#6FE3D0' },
  { internal: 'moderate+', label: 'Strong', count: 14, color: '#2BA8A0' },
  { internal: 'moderate', label: 'Adequate', count: 24, color: '#137D76' },
  { internal: 'moderate-', label: 'Limited', count: 14, color: '#3F5C68' },
  { internal: 'low', label: 'Sparse', count: 18, color: '#506973' },
]

const TOTAL = TIERS.reduce((sum, t) => sum + t.count, 0)

/**
 * Horizontal stacked bar showing how the 78 candidate sites distribute
 * across the five data-support tiers. Lives in Section 4 Beat 2.
 *
 * The tiers use the public-facing labels (Robust / Strong / Adequate /
 * Limited / Sparse). Internal names (high / moderate+ / etc.) stay in
 * the data file and out of the reader-facing UI per CLAUDE.md.
 */
export function ConfidenceDistributionChart() {
  return (
    <figure
      className="
        border border-rule rounded-card
        bg-bg-mid/30
        px-5 lg:px-6 py-5 lg:py-6
        flex flex-col gap-4
      "
      aria-label="Distribution of data support across the 78-site pipeline"
    >
      <figcaption className="font-serif italic text-ivory-dim text-[12.5px] leading-snug">
        Data support across the 78-site pipeline.
      </figcaption>

      {/* The bar itself */}
      <div
        className="flex w-full h-4 rounded-full overflow-hidden"
        role="img"
        aria-label={TIERS.map((t) => `${t.label}: ${t.count} sites`).join('; ')}
      >
        {TIERS.map((tier) => (
          <div
            key={tier.internal}
            style={{ flex: tier.count, backgroundColor: tier.color }}
            className="h-full"
          />
        ))}
      </div>

      {/* Per-tier labels and counts */}
      <div className="flex w-full" aria-hidden="true">
        {TIERS.map((tier) => (
          <div
            key={tier.internal}
            style={{ flex: tier.count }}
            className="flex flex-col items-start gap-0.5 pr-2"
          >
            <div
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: tier.color }}
            >
              {tier.label}
            </div>
            <div className="font-serif text-ivory text-base tabular-nums leading-none">
              {tier.count}
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory-faint tabular-nums">
        {TOTAL} candidate sites
      </div>
    </figure>
  )
}
