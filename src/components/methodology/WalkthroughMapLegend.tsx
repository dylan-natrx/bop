'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { StepConfig } from './steps'

interface WalkthroughMapLegendProps {
  step: StepConfig
}

/**
 * Legend strip pinned to the bottom of the walkthrough map.
 *
 * Horizontal single row, centered. Entries are introduced cumulatively as
 * the walkthrough progresses, matching the symbols the reader sees on the
 * map dots above:
 *   - Always visible: suitable site (bright), below threshold (faded)
 *   - From step 4: cost flag (amber outer ring)
 *   - From step 5: co-benefit (teal-aqua inner ring)
 *   - At step 6 only: priority project (outer teal-aqua halo around top-10)
 *
 * Vocabulary note: the bright dots are "suitable sites" — they passed the
 * biology gate. At step 6 the top-ten of those become "priority projects,"
 * marked with the halo. The legend's vocabulary mirrors the body copy.
 *
 * Labels are terse on purpose. The body copy below the map names which
 * specific flags (wave, CSO, MS4, erosion, parkland) fold into each ring
 * at each step. Hovering a bright site shows full values via tooltip.
 */
export function WalkthroughMapLegend({ step }: WalkthroughMapLegendProps) {
  const showCost = step.visibleFlags.includes('wave')
  const showCoBenefit = step.visibleFlags.includes('erosion')
  const showPriority = step.id === 6

  return (
    <div
      aria-label="Map legend"
      className="
        absolute bottom-0 left-0 right-0 z-10
        px-4 py-2
        bg-bg-deep/80 backdrop-blur-sm
        border-t border-rule-soft
        flex items-center justify-center
        gap-x-5 lg:gap-x-7
        flex-wrap
        pointer-events-none
      "
    >
      <AnimatePresence initial={false}>
        {showPriority ? (
          <motion.div
            key="priority"
            layout
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LegendEntry symbol={<PriorityHalo />} label="Priority project" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <LegendEntry symbol={<SuitableDot />} label="Suitable site" />
      <LegendEntry symbol={<FadedDot />} label="Below threshold" />

      <AnimatePresence initial={false}>
        {showCost ? (
          <motion.div
            key="cost"
            layout
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LegendEntry symbol={<CostRing />} label="Cost flag" />
          </motion.div>
        ) : null}

        {showCoBenefit ? (
          <motion.div
            key="cobenefit"
            layout
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LegendEntry symbol={<CoBenefitRing />} label="Co-benefit" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function LegendEntry({
  symbol,
  label,
}: {
  symbol: React.ReactNode
  label: string
}) {
  return (
    <div className="flex items-center gap-2 font-sans text-[11px] text-ivory-dim leading-none whitespace-nowrap">
      {symbol}
      <span>{label}</span>
    </div>
  )
}

// Symbol primitives — match the geometry of the actual map circle layers.

function SuitableDot() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="4.5" fill="#6FE3D0" stroke="rgba(111,227,208,0.55)" strokeWidth="1.2" />
    </svg>
  )
}

function FadedDot() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="4.5" fill="rgba(80, 105, 115, 0.85)" opacity="0.4" />
    </svg>
  )
}

function CostRing() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="3" fill="#6FE3D0" />
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="#D9B47A" strokeWidth="1.1" />
    </svg>
  )
}

function CoBenefitRing() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="3" fill="#6FE3D0" />
      <circle cx="8" cy="8" r="5.5" fill="none" stroke="#6FE3D0" strokeWidth="1.1" />
    </svg>
  )
}

function PriorityHalo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <circle cx="9" cy="9" r="8" fill="rgba(111, 227, 208, 0.10)" stroke="#6FE3D0" strokeWidth="1.0" strokeOpacity="0.6" />
      <circle cx="9" cy="9" r="3.5" fill="#6FE3D0" stroke="rgba(111,227,208,0.55)" strokeWidth="1.2" />
    </svg>
  )
}
