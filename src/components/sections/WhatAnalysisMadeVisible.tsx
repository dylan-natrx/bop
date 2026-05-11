import { SectionShell } from './SectionShell'
import { PlaceholderBlock } from './PlaceholderBlock'

export function WhatAnalysisMadeVisible() {
  return (
    <SectionShell id="analysis-made-visible" eyebrow="What the analysis made visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[22ch]
          ">
          [Section 4 headline: one-line statement framing the two
          beats. The framework answered which sites and, beyond
          that, with what confidence and where additional investment
          should go next.]
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-4
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            [Section 4 intro, around 60 words. No &quot;unexpected,&quot;
            no &quot;surprise.&quot; This is what Natrx Assess is built
            to produce. Frame the two beats below as the deliverables
            the engagement was designed to surface, not happy
            accidents.]
          </p>
        </div>
      </div>

      <div className="mt-16 lg:mt-24 space-y-12 lg:space-y-16">
        <PlaceholderBlock
          componentName="FindingBeat"
          description="Beat 1, the co-benefit. Many top-ranked sites sit adjacent to actively eroding shorelines. Oyster reefs function as natural breakwaters. The Natrx Assess shoreline change analysis (MEIP methodology, NAIP imagery 2010 to present) identifies which sites deliver biodiversity restoration and shoreline protection from a single intervention. Cite Natrx Assess on first reference using the editorial italic treatment, not a CTA."
          minHeight={380}
        />

        <PlaceholderBlock
          componentName="FindingBeat"
          description="Beat 2, data confidence and where to invest next. The framework also surfaced where observational data is robust and where it is thin. Sites already in design carry strong data because they have been studied. Some top-ranked candidates carry less observational support because they have not been studied as deeply. BOP can target additional monitoring exactly where it would compound the value of the analysis. The methodology is honest about its own uncertainty, and that honesty is itself a deliverable."
          minHeight={380}
        />
      </div>

      <div className="
          mt-16 lg:mt-24
          max-w-[60ch] mx-auto
          font-serif italic font-light text-ivory text-2xl lg:text-3xl
          leading-[1.35]
        ">
        [Section 4 closing thread, single italic paragraph, around 35
        words. Natrx Assess and the team&apos;s expertise didn&apos;t
        just answer which sites. They answered which sites, with what
        confidence, and where additional investment should go next.]
      </div>
    </SectionShell>
  )
}
