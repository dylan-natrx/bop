'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { STEPS, STEP_COUNT } from './steps'

interface WalkthroughControlsProps {
  /** 1-indexed current step */
  currentStep: number
  onPrevious: () => void
  onNext: () => void
  onJumpTo: (step: number) => void
}

/**
 * Step nav for the methodology walkthrough. Renders TWO presentations from
 * the same state — only one is visible at any given breakpoint:
 *
 *   lg+   Flat row, inline in the walkthrough header beside the step title:
 *         Step N / 6   • • • • • •   ← Previous   Next →
 *
 *   < lg  Compact pill "3 / 6 ▾" in the header. Tap opens a popover menu
 *         that lists all six steps with the current step highlighted, plus
 *         Previous / Next buttons. Closes on outside click, Escape, or any
 *         menu action.
 *
 * Both presentations share the same state from the parent (currentStep,
 * onPrevious, onNext, onJumpTo). The mobile open/closed state lives here.
 */
export function WalkthroughControls({
  currentStep,
  onPrevious,
  onNext,
  onJumpTo,
}: WalkthroughControlsProps) {
  const isFirst = currentStep === 1
  const isLast = currentStep === STEP_COUNT

  return (
    <>
      <DesktopRow
        currentStep={currentStep}
        isFirst={isFirst}
        isLast={isLast}
        onPrevious={onPrevious}
        onNext={onNext}
        onJumpTo={onJumpTo}
      />
      <MobilePillMenu
        currentStep={currentStep}
        isFirst={isFirst}
        isLast={isLast}
        onPrevious={onPrevious}
        onNext={onNext}
        onJumpTo={onJumpTo}
      />
    </>
  )
}

// -- Desktop: flat row inline with the title --------------------------------

interface RowProps {
  currentStep: number
  isFirst: boolean
  isLast: boolean
  onPrevious: () => void
  onNext: () => void
  onJumpTo: (step: number) => void
}

function DesktopRow({
  currentStep,
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onJumpTo,
}: RowProps) {
  return (
    <div className="hidden lg:flex items-center gap-x-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint tabular-nums">
          Step {currentStep} / {STEP_COUNT}
        </span>
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Walkthrough progress"
        >
          {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((n) => {
            const isActive = n === currentStep
            const isPast = n < currentStep
            return (
              <button
                key={n}
                type="button"
                role="tab"
                aria-label={`Jump to step ${n}`}
                aria-selected={isActive}
                onClick={() => onJumpTo(n)}
                className="group p-1 -m-1"
              >
                <span
                  className={`
                    block rounded-full transition-all duration-200
                    ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-teal-bright'
                        : isPast
                        ? 'w-1.5 h-1.5 bg-teal/60 group-hover:bg-teal'
                        : 'w-1.5 h-1.5 bg-ivory-faint/50 group-hover:bg-ivory-dim'
                    }
                  `}
                />
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          aria-label="Previous step"
          className="
            font-mono text-eyebrow uppercase tracking-[0.22em]
            text-ivory-dim hover:text-ivory
            disabled:text-ivory-faint/40 disabled:cursor-not-allowed disabled:hover:text-ivory-faint/40
            transition-colors duration-200
          "
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          aria-label="Next step"
          className="
            font-mono text-eyebrow uppercase tracking-[0.22em]
            text-ivory hover:text-teal-aqua
            disabled:text-ivory-faint/40 disabled:cursor-not-allowed disabled:hover:text-ivory-faint/40
            transition-colors duration-200
          "
        >
          Next →
        </button>
      </div>
    </div>
  )
}

// -- Mobile: compact pill that opens a step menu ----------------------------

function MobilePillMenu({
  currentStep,
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onJumpTo,
}: RowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <div className="relative flex lg:hidden flex-shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Walkthrough steps"
        className="
          inline-flex items-center gap-2
          font-mono text-eyebrow uppercase tracking-[0.22em] tabular-nums
          text-ivory-dim hover:text-ivory
          border border-rule rounded-full
          px-3 py-1.5
          transition-colors duration-200
          backdrop-blur-sm
        "
      >
        <span>
          {currentStep} / {STEP_COUNT}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M2 4l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label="Walkthrough steps"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="
              absolute top-full right-0 mt-2 z-30
              w-[min(82vw,320px)]
              border border-rule rounded-card
              bg-bg-mid/95 backdrop-blur-md
              shadow-lg shadow-black/40
              overflow-hidden
            "
          >
            <ul className="py-2">
              {STEPS.map((s) => {
                const isActive = s.id === currentStep
                const isPast = s.id < currentStep
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onJumpTo(s.id)
                        close()
                      }}
                      className={`
                        w-full text-left
                        flex items-baseline gap-3
                        px-4 py-2.5
                        transition-colors duration-150
                        ${isActive ? 'bg-bg-soft/60' : 'hover:bg-bg-soft/40'}
                      `}
                    >
                      <span
                        className={`
                          font-mono text-[10px] uppercase tracking-[0.22em] tabular-nums
                          shrink-0 w-6
                          ${
                            isActive
                              ? 'text-teal-bright'
                              : isPast
                              ? 'text-teal/70'
                              : 'text-ivory-faint'
                          }
                        `}
                        aria-hidden="true"
                      >
                        {s.id}
                      </span>
                      <span
                        className={`
                          font-serif font-light leading-snug
                          ${isActive ? 'text-ivory' : 'text-ivory-dim'}
                        `}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-rule-soft flex items-center justify-between px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  onPrevious()
                  close()
                }}
                disabled={isFirst}
                aria-label="Previous step"
                className="
                  font-mono text-eyebrow uppercase tracking-[0.22em]
                  text-ivory-dim hover:text-ivory
                  disabled:text-ivory-faint/40 disabled:cursor-not-allowed disabled:hover:text-ivory-faint/40
                  transition-colors duration-200
                "
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => {
                  onNext()
                  close()
                }}
                disabled={isLast}
                aria-label="Next step"
                className="
                  font-mono text-eyebrow uppercase tracking-[0.22em]
                  text-ivory hover:text-teal-aqua
                  disabled:text-ivory-faint/40 disabled:cursor-not-allowed disabled:hover:text-ivory-faint/40
                  transition-colors duration-200
                "
              >
                Next →
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
