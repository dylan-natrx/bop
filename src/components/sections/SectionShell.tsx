import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  eyebrow: string
  children: ReactNode
}

export function SectionShell({ id, eyebrow, children }: SectionShellProps) {
  return (
    <section
      id={id}
      className="max-w-scaffold mx-auto px-scaffold-x pt-28 lg:pt-40 pb-20 lg:pb-32 border-t border-rule"
    >
      <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-10">
        {eyebrow}
      </div>
      {children}
    </section>
  )
}
