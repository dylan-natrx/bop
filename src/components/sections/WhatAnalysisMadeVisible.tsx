import { SectionShell } from './SectionShell'
import { FindingBeat } from './FindingBeat'
import { EditorialImage } from './EditorialImage'
import { ConfidenceDistributionChart } from './ConfidenceDistributionChart'

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
          The framework answered three questions, not one.
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-2
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            The brief was to identify the sites most suitable for building new
            oyster reef infrastructure in New York Harbor. The work delivered
            that. It also delivered two additional findings the engagement was
            designed to produce, both of which BOP can carry forward into the
            next phase of work.
          </p>
        </div>
      </div>

      <div className="mt-16 lg:mt-20 space-y-12 lg:space-y-16">
        <FindingBeat
          number={1}
          subhead="Oysters and shorelines, one intervention."
          body={
            <p>
              Many of the highest-ranked sites sit adjacent to actively eroding
              shorelines. The{' '}
              <em className="font-serif italic">Natrx Assess</em> shoreline
              change analysis, using the Marsh Edge from Image Processing
              methodology applied to NAIP satellite imagery from 2010 to
              present, identified erosion rates of one foot per year or greater
              at eight candidate locations and active retreat at fifteen more.
              Several of those sit in the top tier of the suitability ranking.
              Oyster reefs function as natural breakwaters, dampening wave
              energy and slowing the loss of marsh edges. Where strong water
              quality and active erosion overlap, the same project restores
              habitat and stabilizes coast.
            </p>
          }
          visual={
            <EditorialImage
              src="/site-imagery/shoreline-change.png"
              alt="Shoreline change analysis at Living Breakwaters, 2010 to 2025"
              width={2244}
              height={1574}
              aspect="4 / 3"
              caption={
                <>
                  Fig. — Shoreline change rates at Living Breakwaters, 2010 to
                  2025. Source: Natrx Assess shoreline change analysis.
                </>
              }
            />
          }
        />

        <FindingBeat
          number={2}
          subhead="Where the data is strong, and where it is not."
          body={
            <p>
              The analysis surfaced where its own inputs are strong and where
              they are thin. Sites that BOP has already advanced into design
              carry robust observational data because they have been studied
              directly. Several of the top-ranked candidates from the new
              analysis carry less observational support, classified as
              moderate or low confidence, because they have not been studied
              at the same depth. The framework names this rather than hiding
              it. The result tells BOP not only which sites rank highest, but
              exactly where the next round of monitoring investment would
              compound the value of the analysis already produced.
            </p>
          }
          visual={<ConfidenceDistributionChart />}
        />
      </div>

      <div className="
          mt-16 lg:mt-24
          max-w-[60ch] mx-auto
          font-serif italic font-light text-ivory text-2xl lg:text-3xl
          leading-[1.35]
          text-center
        ">
        The goal was to identify the sites most suitable for building new
        oyster reef infrastructure in New York Harbor. The framework delivered
        that ranking. It also delivered a method BOP can rerun next year, and
        the year after, as new data lands and the pipeline evolves.
      </div>
    </SectionShell>
  )
}
