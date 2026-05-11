'use client'

import { STEP_COUNT } from './steps'

interface WalkthroughControlsProps {
  /** 1-indexed current step */
  currentStep: number
  onPrevious: () => void
  onNext: () => void
  onJumpTo: (step: number) => void
  /** Called when the user clicks the Step 6 "Continue reading" affordance */
  onContinueReading: () => void
}

/**
 * Stacked vertical layout suited to a narrow column.
 * Row 1: step counter + six-dot indicator.
 * Row 2: Previous / Next (or Continue reading on the last step).
 */
export function WalkthroughControls({
  currentStep,
  onPrevious,
  onNext,
  onJumpTo,
  onContinueReading,
}: WalkthroughControlsProps) {
  const isFirst = currentStep === 1
  const isLast = currentStep === STEP_COUNT

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: indicator */}
      <div className="flex items-center justify-between gap-3">
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

      {/* Row 2: linear nav */}
      <div className="flex items-center justify-between gap-3">
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

        {isLast ? (
          <button
            type="button"
            onClick={onContinueReading}
            className="
              font-mono text-eyebrow uppercase tracking-[0.22em]
              text-teal-aqua hover:text-ivory
              transition-colors duration-200
            "
          >
            Continue reading →
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next step"
            className="
              font-mono text-eyebrow uppercase tracking-[0.22em]
              text-ivory hover:text-teal-aqua
              transition-colors duration-200
            "
          >
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
