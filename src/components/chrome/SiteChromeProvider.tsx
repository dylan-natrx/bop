'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { DrawerEdgeTab } from './DrawerEdgeTab'
import { SiteDrawer } from './SiteDrawer'
import { track } from '@/lib/track'

export type DrawerTab = 'glossary' | 'press'

interface DrawerState {
  isOpen: boolean
  activeTab: DrawerTab
  /** Optional glossary entry id to scroll into view after open */
  anchor?: string
}

interface DrawerActions {
  open: (tab?: DrawerTab, anchor?: string) => void
  close: () => void
  toggle: () => void
  setActiveTab: (tab: DrawerTab) => void
}

const DrawerContext = createContext<(DrawerState & DrawerActions) | null>(null)

export function useDrawer() {
  const ctx = useContext(DrawerContext)
  if (!ctx) {
    throw new Error(
      'useDrawer must be called from inside <SiteChromeProvider>. ' +
        'Wrap the page in <SiteChromeProvider> or the chrome will not work.'
    )
  }
  return ctx
}

interface SiteChromeProviderProps {
  children: ReactNode
}

/**
 * Wraps page content with the persistent right-edge drawer chrome.
 * Provides DrawerContext so any descendant (e.g. <GlossaryTerm/>) can open the drawer.
 */
export function SiteChromeProvider({ children }: SiteChromeProviderProps) {
  const [state, setState] = useState<DrawerState>({
    isOpen: false,
    activeTab: 'glossary',
    anchor: undefined,
  })

  const open = useCallback((tab?: DrawerTab, anchor?: string) => {
    setState((prev) => ({
      isOpen: true,
      activeTab: tab ?? prev.activeTab,
      anchor,
    }))
  }, [])

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false, anchor: undefined }))
  }, [])

  const toggle = useCallback(() => {
    setState((prev) =>
      prev.isOpen
        ? { ...prev, isOpen: false, anchor: undefined }
        : { ...prev, isOpen: true }
    )
  }, [])

  const setActiveTab = useCallback((tab: DrawerTab) => {
    setState((prev) => ({ ...prev, activeTab: tab, anchor: undefined }))
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!state.isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.isOpen, close])

  // Analytics: fire when drawer transitions to open
  useEffect(() => {
    if (state.isOpen) track('drawer_opened', {})
  }, [state.isOpen])

  // Prevent background scroll while open (subtle quality-of-life)
  useEffect(() => {
    if (!state.isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [state.isOpen])

  return (
    <DrawerContext.Provider
      value={{ ...state, open, close, toggle, setActiveTab }}
    >
      {children}
      <DrawerEdgeTab />
      <SiteDrawer />
    </DrawerContext.Provider>
  )
}
