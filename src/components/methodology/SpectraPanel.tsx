'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { StepConfig, SpectraCurve } from './steps'

/**
 * Custom SVG spectra panel for the methodology walkthrough.
 *
 * Hand-tuned curves per the spec — these are illustrative shapes, not
 * pixel-mapped projections of the actual transfer functions. The
 * accompanying "Show the math" disclosure on Step 3 provides the
 * literal composite formula for readers who want precision.
 */
interface SpectraPanelProps {
  step: StepConfig
}

const CURVE_HEIGHT = 110 // px per curve plot
const CURVE_PADDING_X = 8 // viewbox horizontal padding
const CURVE_PADDING_Y = 12 // viewbox vertical padding
const VB_W = 200
const VB_H = 80

// Maps the curve key to its plot definition
interface CurveDef {
  key: SpectraCurve
  title: string
  xLabel: string
  xTicks: { x: number; label: string }[]
  /**
   * SVG path string for the curve in a 0..200 × 0..80 viewbox.
   * Y is inverted in SVG so high suitability = low Y.
   */
  path: string
  /** Favorable zone rect (rendered subtly under the curve) */
  favorableZone: { x: number; width: number }
  /** Annotation label and its rough position over the plot */
  annotation: { text: string; x: number; y: number }
}

const CURVE_DEFS: Record<SpectraCurve, CurveDef> = {
  salinity: {
    key: 'salinity',
    title: 'Salinity',
    xLabel: 'PSU',
    xTicks: [
      { x: 0, label: '0' },
      { x: 22, label: '5' },
      { x: 55, label: '12' },
      { x: 89, label: '20' },
      { x: 178, label: '40' },
    ],
    // 0-45 PSU → x 0-200. 12-20 PSU plateau (x 53-89) at y ~9 (≈0.89 suitability).
    // Steep rise from 5 PSU (x 22) to 12 PSU; smooth descent from 20 to 40 PSU.
    path: `
      M 0 76
      L 22 76
      C 32 76, 44 25, 55 10
      L 89 10
      C 105 10, 140 60, 178 76
      L 200 76
    `,
    favorableZone: { x: 55, width: 34 },
    annotation: { text: 'Optimum 12–20 PSU', x: 72, y: 22 },
  },
  chla: {
    key: 'chla',
    title: 'Chlorophyll-a',
    xLabel: 'µg/L',
    xTicks: [
      { x: 0, label: '0' },
      { x: 100, label: '20' },
      { x: 200, label: '40' },
    ],
    // Linear from (0, 76) to (200, 6). Hatched zone above 20 µg/L (x >= 100).
    path: `M 0 76 L 200 6`,
    favorableZone: { x: 50, width: 50 }, // 10-20 µg/L sweet spot before eutrophication
    annotation: { text: 'Linear food response', x: 50, y: 22 },
  },
  do: {
    key: 'do',
    title: 'Dissolved oxygen',
    xLabel: '% below 3 mg/L',
    xTicks: [
      { x: 0, label: '0%' },
      { x: 13, label: '2%' },
      { x: 67, label: '10%' },
      { x: 200, label: '30%+' },
    ],
    // Step function: 1.0 below 2%, 0.75 between 2-10%, 0.5 above 10%.
    // Y: 0 = suitability 1.0; 76 = suitability 0.
    // suitability 1.0 → y 6; 0.75 → y 23.5; 0.5 → y 41.
    path: `
      M 0 6
      L 13 6
      L 13 23.5
      L 67 23.5
      L 67 41
      L 200 41
    `,
    favorableZone: { x: 0, width: 13 },
    annotation: { text: 'Hypoxia threshold, 3 mg/L', x: 16, y: 16 },
  },
  wave: {
    key: 'wave',
    title: 'Wave exposure',
    xLabel: 'feet',
    xTicks: [
      { x: 0, label: '0' },
      { x: 50, label: '1' },
      { x: 100, label: '2' },
      { x: 150, label: '3' },
      { x: 200, label: '4+' },
    ],
    // Hump shape with peak around 1 ft, decline starting at 2, threshold flag at 3.
    path: `
      M 0 76
      C 18 76, 32 24, 50 14
      C 70 8, 85 12, 100 22
      C 120 36, 140 60, 150 70
      L 200 76
    `,
    favorableZone: { x: 28, width: 60 },
    annotation: { text: 'Optimum, flagged above 3 ft', x: 30, y: 24 },
  },
}

export function SpectraPanel({ step }: SpectraPanelProps) {
  return (
    <div
      className="flex flex-col gap-6"
      role="region"
      aria-label="Variable suitability curves"
    >
      <div>
        <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-1.5">
          Suitability curves
        </div>
        <div className="font-sans text-[12px] text-ivory-faint leading-relaxed max-w-[40ch]">
          Shapes of each variable&apos;s suitability function. As the walkthrough advances, curves stack.
        </div>
      </div>

      <AnimatePresence>
        {step.visibleCurves.map((curveKey) => (
          <CurvePlot
            key={curveKey}
            curve={CURVE_DEFS[curveKey]}
            isFocus={step.focusCurve === curveKey}
            showGoldilocksBand={
              step.showGoldilocksBand &&
              (curveKey === 'salinity' ||
                curveKey === 'chla' ||
                curveKey === 'do')
            }
            showDanger={curveKey === 'chla'}
            showFlagThreshold={curveKey === 'wave'}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {step.showErosionAnnotation && (
          <AnnotationBlock
            key="erosion"
            eyebrow="Shoreline erosion"
            body="Erosion is not a suitability variable. It is a flag for co-benefit. Sites adjacent to actively eroding shorelines are tagged, because oyster reefs function as natural breakwaters."
          />
        )}
        {step.showFiltersAnnotation && (
          <AnnotationBlock
            key="filters"
            eyebrow="Context filters"
            body="Not suitability variables. Constraints on which suitable sites are also actionable: parkland proximity, combined sewer outfalls, separate stormwater outfalls."
          />
        )}
        {step.showMathDisclosure && (
          <MathDisclosure key="math" />
        )}
      </AnimatePresence>
    </div>
  )
}

interface CurvePlotProps {
  curve: CurveDef
  isFocus: boolean
  showGoldilocksBand: boolean
  showDanger: boolean
  showFlagThreshold: boolean
}

function CurvePlot({
  curve,
  isFocus,
  showGoldilocksBand,
  showDanger,
  showFlagThreshold,
}: CurvePlotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: isFocus ? 1 : 0.55, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-bg-mid/45 border border-rule-soft rounded-card px-4 pt-3 pb-2"
      aria-label={`${curve.title} suitability curve`}
    >
      <div className="flex items-baseline justify-between mb-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory-dim">
          {curve.title}
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory-faint">
          {curve.xLabel}
        </div>
      </div>

      <svg
        viewBox={`-${CURVE_PADDING_X} -${CURVE_PADDING_Y} ${VB_W + CURVE_PADDING_X * 2} ${VB_H + CURVE_PADDING_Y * 2}`}
        className="w-full"
        style={{ height: CURVE_HEIGHT }}
        preserveAspectRatio="none"
      >
        {/* Favorable zone background */}
        {showGoldilocksBand && (
          <rect
            x={curve.favorableZone.x}
            y={-CURVE_PADDING_Y}
            width={curve.favorableZone.width}
            height={VB_H + CURVE_PADDING_Y * 2}
            fill="rgba(111, 227, 208, 0.08)"
          />
        )}

        {/* Eutrophication "danger zone" for chl-a */}
        {showDanger && (
          <DangerZone />
        )}

        {/* Wave flag threshold line at x=150 (= 3 ft) */}
        {showFlagThreshold && (
          <g>
            <line
              x1={150}
              y1={-CURVE_PADDING_Y / 2}
              x2={150}
              y2={VB_H + CURVE_PADDING_Y / 2}
              stroke="rgba(43, 168, 160, 0.42)"
              strokeWidth={0.6}
              strokeDasharray="3 2"
            />
          </g>
        )}

        {/* Axis baseline */}
        <line
          x1={0}
          y1={VB_H}
          x2={VB_W}
          y2={VB_H}
          stroke="rgba(242, 237, 227, 0.12)"
          strokeWidth={0.5}
        />

        {/* Tick marks */}
        {curve.xTicks.map((tick) => (
          <g key={tick.label}>
            <line
              x1={tick.x}
              y1={VB_H}
              x2={tick.x}
              y2={VB_H + 2}
              stroke="rgba(242, 237, 227, 0.18)"
              strokeWidth={0.5}
            />
            <text
              x={tick.x}
              y={VB_H + 8}
              textAnchor="middle"
              fill="rgba(184, 176, 160, 0.55)"
              style={{
                fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
                fontSize: 5,
                letterSpacing: '0.18em',
              }}
            >
              {tick.label}
            </text>
          </g>
        ))}

        {/* Filled area under the curve */}
        <path
          d={`${curve.path} L 200 ${VB_H} L 0 ${VB_H} Z`}
          fill="rgba(19, 125, 118, 0.14)"
        />

        {/* The curve itself */}
        <path
          d={curve.path}
          fill="none"
          stroke="#2BA8A0"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Annotation */}
        <text
          x={curve.annotation.x}
          y={curve.annotation.y}
          fill="rgba(184, 176, 160, 0.78)"
          style={{
            fontFamily: 'var(--font-fraunces), ui-serif, serif',
            fontStyle: 'italic',
            fontSize: 6.5,
          }}
        >
          {curve.annotation.text}
        </text>
      </svg>
    </motion.div>
  )
}

function DangerZone() {
  // Hatched stripe pattern across the high end (x 100-200 = 20-40 µg/L)
  const stripes = []
  for (let i = 0; i < 14; i++) {
    const x = 100 + i * 7
    stripes.push(
      <line
        key={i}
        x1={x}
        y1={-CURVE_PADDING_Y}
        x2={x - 10}
        y2={VB_H + CURVE_PADDING_Y}
        stroke="rgba(184, 176, 160, 0.18)"
        strokeWidth={0.5}
      />
    )
  }
  return (
    <g>
      <rect
        x={100}
        y={-CURVE_PADDING_Y}
        width={100}
        height={VB_H + CURVE_PADDING_Y * 2}
        fill="rgba(184, 176, 160, 0.04)"
      />
      {stripes}
      <text
        x={150}
        y={VB_H - 6}
        textAnchor="middle"
        fill="rgba(184, 176, 160, 0.6)"
        style={{
          fontFamily: 'var(--font-jetbrains), ui-monospace, monospace',
          fontSize: 5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        Eutrophication
      </text>
    </g>
  )
}

function AnnotationBlock({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border-l-2 border-teal/50 pl-4 py-1"
    >
      <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-1">
        {eyebrow}
      </div>
      <div className="font-sans text-[12px] text-ivory-dim leading-relaxed">
        {body}
      </div>
    </motion.div>
  )
}

function MathDisclosure() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="
          font-mono text-eyebrow uppercase text-ivory-faint hover:text-ivory
          transition-colors duration-200
        "
      >
        {isOpen ? 'Hide the math' : 'Show the math'} →
      </button>
      {isOpen && (
        <div className="mt-3 text-[12px] font-sans text-ivory-dim leading-relaxed border-l-2 border-rule pl-4 py-1">
          <div className="font-mono text-[12px] text-ivory mb-2">
            composite = (sal_score + chla_score) ÷ 2 × do_score
          </div>
          <p>
            The literal composite is not a three-way intersection of the curves above. The two water-quality scores are averaged first, then multiplied by the dissolved-oxygen score, so DO acts as a hard ceiling on the other two. The stacked curves teach the <em>concept</em> of constraints adding up; this formula is the math.
          </p>
        </div>
      )}
    </motion.div>
  )
}
