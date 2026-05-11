'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useRankingsData } from '@/hooks/useRankingsData'
import { useStatisticsData } from '@/hooks/useStatisticsData'

import { STEPS, STEP_COUNT } from './steps'
import { WalkthroughMap } from './WalkthroughMap'
import { SpectraPanel } from './SpectraPanel'
import { WalkthroughControls } from './WalkthroughControls'

/**
 * The six-step methodology walkthrough.
 *
 * Reader-controlled progression. Map and spectra panel update together at
 * each step. Keyboard nav: arrow keys / space to advance, shift+arrow / shift+space
 * to reverse. Escape does nothing (this is not a modal).
 */
export function MethodologyWalkthrough() {
  const { geojson: rankings, isLoading: rLoading, error: rError } = useRankingsData()
  const { byId: stats, isLoading: sLoading, error: sError } = useStatisticsData()

  // 1-indexed step
  const [currentStep, setCurrentStep] = useState(1)
  const step = useMemo(() => STEPS[currentStep - 1], [currentStep])

  const goNext = useCallback(
    () => setCurrentStep((s) => Math.min(STEP_COUNT, s + 1)),
    []
  )
  const goPrev = useCallback(() => setCurrentStep((s) => Math.max(1, s - 1)), [])
  const jumpTo = useCallback(
    (n: number) => setCurrentStep(() => Math.min(STEP_COUNT, Math.max(1, n))),
    []
  )

// Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trap keys when a focusable input owns them
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return
      }
      if (e.key === 'ArrowRight' || (e.key === ' ' && !e.shiftKey)) {
        // Only act when the walkthrough is in viewport (cheap check via document.activeElement scope)
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  if (rError || sError) {
    return (
      <div className="border border-rule rounded-card p-8 text-ivory-dim font-mono text-body-sm">
        Failed to load walkthrough data: {(rError ?? sError)?.message}
      </div>
    )
  }

  if (rLoading || sLoading || !rankings) {
    return (
      <div className="border border-rule rounded-card p-8 text-ivory-dim font-mono text-body-sm min-h-[560px] flex items-center justify-center">
        <span className="animate-pulse">Loading walkthrough…</span>
      </div>
    )
  }

  return (
    <div
      className="
        border border-rule rounded-card overflow-hidden
        bg-gradient-to-br from-[#082030] to-[#04101C]
      "
      role="region"
      aria-label="Methodology walkthrough"
    >
      {/* Step header */}
      <div className="px-5 lg:px-8 pt-5 lg:pt-6 pb-4 border-b border-rule-soft">
        <div className="flex items-baseline justify-between gap-6">
          <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint tabular-nums">
            Step {step.id} of {STEP_COUNT}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.h3
            key={step.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-1.5 font-serif font-light text-ivory text-xl lg:text-2xl leading-tight"
          >
            {step.title}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Panels: map on the left, spectra stack on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
        <div className="lg:border-r lg:border-rule-soft">
          <WalkthroughMap rankings={rankings} stats={stats} step={step} />
        </div>
        <div className="px-5 py-5 lg:px-6 lg:py-5 lg:h-[440px] overflow-y-auto">
          <SpectraPanel step={step} onJumpToStep={jumpTo} />
        </div>
      </div>

      {/* Bottom strip: copy spans the full width; controls anchor bottom-right */}
      <div className="border-t border-rule-soft px-5 lg:px-8 py-5 lg:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-sans text-[13px] lg:text-[14px] font-light leading-[1.6] space-y-3"
          >
            {/* First paragraph: lede inline with the first body paragraph */}
            <p>
              <span className="text-ivory">{step.lede}</span>
              {step.bodyParagraphs[0] ? (
                <>
                  {' '}
                  <span className="text-ivory-dim">{step.bodyParagraphs[0]}</span>
                </>
              ) : null}
            </p>
            {/* Subsequent paragraphs */}
            {step.bodyParagraphs.slice(1).map((paragraph, i) => (
              <p key={i} className="text-ivory-dim">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 lg:mt-6">
          <WalkthroughControls
            currentStep={currentStep}
            onPrevious={goPrev}
            onNext={goNext}
            onJumpTo={jumpTo}
          />
        </div>
      </div>
    </div>
  )
}
