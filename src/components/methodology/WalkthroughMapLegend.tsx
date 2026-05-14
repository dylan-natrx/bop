'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { StepConfig } from './steps'

interface WalkthroughMapLegendProps {
  step: StepConfig
}

/**
 * Legend panel pinned to the bottom-right of the walkthrough map.
 *
 * Evolves per step. Entries are introduced cumulatively:
 *   - Always visible: priority site (bright), below threshold (faded gray)
 *   - From step 4: cost flag ring (amber) — wave; later CSO and MS4 too
 *   - From step 5: co-benefit ring (teal-aqua) — erosion; later park too
 *
 * Reads as the reader's key for what the rings on the map mean. Body
 * copy under the map explains why each ring is being introduced; this
 * is the lookup card.
 */
export function WalkthroughMapLegend({ step }: WalkthroughMapLegendProps) {
  const showCost = step.visibleFlags.includes('wave')
  const showCoBenefit = step.visibleFlags.includes('erosion')

  // At step 6 the cost flag rolls in CSO + MS4, and co-benefit rolls in
  // park. Until then the labels read as the single flag the step introduces.
  const costLabel = step.id >= 6
    ? 'Cost flag (wave, CSO, MS4)'
    : 'Cost flag (wave exposure)'
  const coBenefitLabel = step.id >= 6
    ? 'Co-benefit (erosion, parkland)'
    : 'Co-benefit (shoreline erosion)'

  return (
    <div
      aria-label="Map legend"
      className="
        absolute bottom-3 right-3 z-10
        w-[min(78vw,260px)]
        px-4 py-3
        bg-bg-deep/85 backdrop-blur-sm
        border border-rule
        rounded
        flex flex-col gap-2
        pointer-events-none
      "
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory-faint mb-0.5">
        Legend
      </div>

      <LegendRow>
        <PriorityDot />
        <span>Priority site</span>
      </LegendRow>

      <LegendRow>
        <FadedDot />
        <span>Below threshold</span>
      </LegendRow>

      <AnimatePresence initial={false}>
        {showCost ? (
          <motion.div
            key="cost"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LegendRow>
              <CostRing />
              <span>{costLabel}</span>
            </LegendRow>
          </motion.div>
        ) : null}

        {showCoBenefit ? (
          <motion.div
            key="cobenefit"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LegendRow>
              <CoBenefitRing />
              <span>{coBenefitLabel}</span>
            </LegendRow>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function LegendRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-sans text-[11.5px] text-ivory-dim leading-none">
      {children}
    </div>
  )
}

// Symbol primitives. Each one is sized to match the map dot's visual.

function PriorityDot() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <circle cx="9" cy="9" r="5" fill="#6FE3D0" stroke="rgba(111,227,208,0.55)" strokeWidth="1.2" />
    </svg>
  )
}

function FadedDot() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <circle cx="9" cy="9" r="5" fill="rgba(80, 105, 115, 0.85)" opacity="0.4" />
    </svg>
  )
}

function CostRing() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <circle cx="9" cy="9" r="3.5" fill="#6FE3D0" />
      <circle cx="9" cy="9" r="7.5" fill="none" stroke="#D9B47A" strokeWidth="1.1" />
    </svg>
  )
}

function CoBenefitRing() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <circle cx="9" cy="9" r="3.5" fill="#6FE3D0" />
      <circle cx="9" cy="9" r="6" fill="none" stroke="#6FE3D0" strokeWidth="1.1" />
    </svg>
  )
}
