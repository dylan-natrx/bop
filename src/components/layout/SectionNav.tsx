'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface NavItem {
  /** DOM id of the section to anchor to */
  id: string
  /** Short label for the nav bar */
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Top' },
  { id: 'stakes-and-problem', label: 'Stakes' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'analysis-made-visible', label: 'Findings' },
  { id: 'what-this-enables', label: 'At scale' },
]

const NAV_H = 56

/**
 * Sticky top navigation bar with section links and scroll-spy active state.
 *
 * Desktop (md+): brand lockup left, four section links right with an
 * IntersectionObserver-driven underline indicator. Click smooth-scrolls.
 *
 * Mobile (< md): brand lockup left, hamburger button right. Tap opens a
 * dropdown with all five section links and the current section
 * highlighted. Tap a link → smooth scroll + close menu. Tap outside or
 * press Escape → close.
 *
 * The brand lockup on the left doubles as a "scroll to top" affordance on
 * both breakpoints.
 */
export function SectionNav() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return
      }
      setMobileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const top = window.scrollY + rect.top - NAV_H
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const handleClick = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      scrollToId(id)
    },
    [scrollToId]
  )

  const handleMobileClick = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      scrollToId(id)
      setMobileOpen(false)
    },
    [scrollToId]
  )

  return (
    <nav
      className="
        sticky top-0 z-30
        bg-bg-deep/85 backdrop-blur-md
        border-b border-rule
      "
      aria-label="Section navigation"
    >
      <div className="max-w-scaffold mx-auto px-scaffold-x flex items-center justify-between h-14">
        {/* Brand lockup, also functions as "scroll to top" */}
        <a
          href="#hero"
          onClick={handleClick('hero')}
          className="
            font-sans text-label uppercase tracking-[0.18em]
            text-ivory hover:text-teal-aqua
            transition-colors duration-200
          "
        >
          Billion Oyster Project
          <span className="text-teal-bright mx-1.5 font-medium">×</span>
          Natrx
        </a>

        {/* Desktop section links */}
        <ul className="hidden md:flex items-stretch gap-1">
          {NAV_ITEMS.slice(1).map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`
                    relative inline-flex items-center h-14 px-4
                    font-mono text-eyebrow uppercase tracking-[0.22em]
                    transition-colors duration-200
                    ${isActive ? 'text-ivory' : 'text-ivory-faint hover:text-ivory-dim'}
                  `}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`
                      absolute left-4 right-4 bottom-0 h-px
                      transition-colors duration-200
                      ${isActive ? 'bg-teal-bright' : 'bg-transparent'}
                    `}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger trigger */}
        <div className="relative md:hidden">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-haspopup="menu"
            aria-label="Open section navigation"
            className="
              inline-flex items-center justify-center
              w-10 h-10 -mr-2
              text-ivory-dim hover:text-ivory
              transition-colors duration-200
            "
          >
            <HamburgerIcon open={mobileOpen} />
          </button>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                ref={menuRef}
                role="menu"
                aria-label="Section navigation"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="
                  absolute top-full right-0 mt-2 z-40
                  w-[min(80vw,260px)]
                  border border-rule rounded-card
                  bg-bg-mid/95 backdrop-blur-md
                  shadow-lg shadow-black/40
                  overflow-hidden
                "
              >
                <ul className="py-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeId === item.id
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          role="menuitem"
                          onClick={handleMobileClick(item.id)}
                          aria-current={isActive ? 'true' : undefined}
                          className={`
                            flex items-center gap-3 w-full px-4 py-3
                            font-mono text-eyebrow uppercase tracking-[0.22em]
                            transition-colors duration-150
                            ${isActive
                              ? 'bg-bg-soft/60 text-ivory'
                              : 'text-ivory-dim hover:bg-bg-soft/40 hover:text-ivory'}
                          `}
                        >
                          <span
                            aria-hidden="true"
                            className={`
                              w-1.5 h-1.5 rounded-full shrink-0
                              ${isActive ? 'bg-teal-bright' : 'bg-ivory-faint/40'}
                            `}
                          />
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  // Three stacked lines that morph to an X when open.
  const transition = { duration: 0.18, ease: 'easeOut' as const }
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      aria-hidden="true"
      className="block"
    >
      <motion.line
        x1="3"
        x2="19"
        y1="6"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={open ? { y1: 11, y2: 11, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
        style={{ originX: '11px', originY: '11px' }}
        transition={transition}
      />
      <motion.line
        x1="3"
        x2="19"
        y1="11"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.line
        x1="3"
        x2="19"
        y1="16"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={open ? { y1: 11, y2: 11, rotate: -45 } : { y1: 16, y2: 16, rotate: 0 }}
        style={{ originX: '11px', originY: '11px' }}
        transition={transition}
      />
    </svg>
  )
}
