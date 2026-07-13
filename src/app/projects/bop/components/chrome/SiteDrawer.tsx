'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useDrawer, type DrawerTab } from './SiteChromeProvider'
import { GlossaryPanel } from './GlossaryPanel'
import { PressContactPanel } from './PressContactPanel'

export function SiteDrawer() {
  const { isOpen, close, activeTab, setActiveTab, anchor } = useDrawer()
  const contentRef = useRef<HTMLDivElement>(null)

  // When an anchor is supplied (e.g. an inline GlossaryTerm click),
  // scroll the matching entry into view after the drawer finishes opening.
  useEffect(() => {
    if (!isOpen || !anchor) return
    const id = `glossary-term-${anchor}`
    // Wait for the drawer's slide-in to settle so the scroll lands on the final position
    const t = setTimeout(() => {
      const el = contentRef.current?.querySelector(`#${id}`) as HTMLElement | null
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 340)
    return () => clearTimeout(t)
  }, [isOpen, anchor])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop dim */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            id="site-drawer"
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Glossary and press contact"
            className="
              fixed top-0 right-0 z-50
              h-screen
              w-full sm:w-[480px] lg:w-[540px]
              bg-bg-deep border-l border-rule
              flex flex-col
              shadow-[ -24px_0_60px_-20px_rgba(0,0,0,0.7)]
            "
          >
            <DrawerHeader
              activeTab={activeTab}
              onSelect={setActiveTab}
              onClose={close}
            />

            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto px-8 lg:px-10 pt-8 pb-16"
            >
              {activeTab === 'glossary' ? <GlossaryPanel /> : <PressContactPanel />}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

interface DrawerHeaderProps {
  activeTab: DrawerTab
  onSelect: (tab: DrawerTab) => void
  onClose: () => void
}

function DrawerHeader({ activeTab, onSelect, onClose }: DrawerHeaderProps) {
  return (
    <div className="flex items-stretch justify-between border-b border-rule">
      <div className="flex" role="tablist" aria-label="Drawer sections">
        <DrawerTabButton
          isActive={activeTab === 'glossary'}
          onClick={() => onSelect('glossary')}
          controls="drawer-panel-glossary"
        >
          Glossary
        </DrawerTabButton>
        <DrawerTabButton
          isActive={activeTab === 'press'}
          onClick={() => onSelect('press')}
          controls="drawer-panel-press"
        >
          Press contact
        </DrawerTabButton>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close drawer"
        className="
          px-5
          text-ivory-faint hover:text-ivory
          transition-colors duration-200
        "
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 3 L13 13 M13 3 L3 13" />
        </svg>
      </button>
    </div>
  )
}

interface DrawerTabButtonProps {
  isActive: boolean
  onClick: () => void
  controls: string
  children: React.ReactNode
}

function DrawerTabButton({
  isActive,
  onClick,
  controls,
  children,
}: DrawerTabButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={controls}
      onClick={onClick}
      className={`
        px-5 py-4
        font-mono text-eyebrow uppercase tracking-[0.22em]
        border-b-2
        transition-colors duration-200
        ${
          isActive
            ? 'text-ivory border-teal-bright'
            : 'text-ivory-faint border-transparent hover:text-ivory-dim'
        }
      `}
    >
      {children}
    </button>
  )
}
