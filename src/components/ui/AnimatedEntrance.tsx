'use client'

import { motion, Variants } from 'framer-motion'
import type { ReactNode, JSX } from 'react'

/**
 * Entrance animation variants matching hero_reference.html choreography
 */
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

interface AnimatedEntranceProps {
  children: ReactNode
  /** Animation type */
  variant?: 'fadeUp' | 'fadeIn'
  /** Delay in seconds */
  delay?: number
  /** Duration in seconds */
  duration?: number
  /** Additional className */
  className?: string
  /** Element to render as */
  as?: keyof JSX.IntrinsicElements
}

/**
 * Wrapper component for entrance animations
 *
 * Uses Framer Motion for declarative animation control.
 * Matches the choreography from hero_reference.html.
 */
export function AnimatedEntrance({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 1.2,
  className = '',
  as = 'div',
}: AnimatedEntranceProps) {
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variant === 'fadeUp' ? fadeUpVariants : fadeInVariants}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * Container for staggered children animations
 */
interface StaggerContainerProps {
  children: ReactNode
  /** Stagger delay between children in seconds */
  staggerDelay?: number
  /** Initial delay before first child in seconds */
  delayChildren?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.15,
  delayChildren = 0.2,
  className = '',
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Child item for use within StaggerContainer
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={fadeUpVariants} className={className}>
      {children}
    </motion.div>
  )
}
