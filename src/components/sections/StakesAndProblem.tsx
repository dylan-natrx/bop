import { SectionShell } from './SectionShell'

export function StakesAndProblem() {
  return (
    <SectionShell id="stakes-and-problem" eyebrow="The stakes and the problem">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[18ch]
          ">
          [Section 2 headline: one-line statement that frames the stakes
          (New York Harbor as a once-rich estuary, oysters as keystone
          infrastructure) and lands the prioritization problem (78
          candidate sites, a per-site assessment method that does not
          scale, the 30 percent design bottleneck).]
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-4 space-y-6
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            [Section 2 copy, paragraph 1, around 80 words. The harbor
            as one of the richest estuaries on Earth, oyster reefs as
            ecological infrastructure, the Allee effect, BOP&apos;s
            mission to deploy one billion oyster spat by 2035. Lay
            language, no jargon yet. Glossary terms can land in
            Section 5.]
          </p>
          <p>
            [Section 2 copy, paragraph 2, around 80 words. The
            structural problem. BOP&apos;s established assessment
            method as rigorous and expensive, vessels and
            instrumentation per site at tens of thousands of dollars,
            the 78-site pipeline, the absence of a comparative
            analytical layer, the 30 percent design bottleneck that
            forces every candidate forward before any go or no-go
            decision can be made.]
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
