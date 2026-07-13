/**
 * Thin typed wrapper around Vercel Analytics' `track()` so call sites stay
 * one-liners and the set of editorial events stays auditable in one place.
 *
 * Dashboard lives at vercel.com/dylan-natrx/bop/analytics (Custom Events tab).
 */
import { track as vercelTrack } from '@vercel/analytics'

type Events = {
  /** Reader clicked through to a step in the methodology walkthrough */
  walkthrough_step: { step: number; via: 'next' | 'previous' | 'jump' | 'keyboard' }
  /** Reader opened the right-edge drawer (glossary + press contact) */
  drawer_opened: Record<string, never>
  /** Reader clicked an inline glossary term (anchors to a specific definition) */
  glossary_term_clicked: { term_id: string }
  /** A top-ranked site callout scrolled into view (fires once per session per card) */
  top_ranked_viewed: { site: string }
  /** Reader scrolled a section into view (fires once per session per section) */
  section_reached: { section: string }
}

export function track<E extends keyof Events>(event: E, props?: Events[E]) {
  // Vercel Analytics types are slightly stricter than ours; the runtime accepts
  // any JSON-safe object. Coerce so we keep call-site type safety.
  vercelTrack(event, props as Record<string, string | number | boolean | null> | undefined)
}
