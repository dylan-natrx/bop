import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance'

export function Topbar() {
  return (
    <AnimatedEntrance delay={0} duration={0.8}>
      <header className="flex justify-between items-baseline border-b border-rule pb-4 font-sans text-label uppercase text-ivory-dim">
        <div className="text-ivory">
          Billion Oyster Project
          <span className="text-teal-bright mx-1.5 font-medium">×</span>
          Natrx
        </div>
        <div className="flex gap-7">
          <span className="text-ivory-faint">New York Harbor</span>
          <span className="text-ivory-faint">Feb 2026</span>
          <span className="text-ivory-faint">26 Weeks</span>
        </div>
      </header>
    </AnimatedEntrance>
  )
}
