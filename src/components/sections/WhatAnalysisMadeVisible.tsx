import { SectionShell } from './SectionShell'
import { FindingBeat } from './FindingBeat'
import { ImagePlaceholder } from './ImagePlaceholder'
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
            The brief was to rank the candidate sites. The work delivered more
            than that. By the end of the engagement, the framework was
            answering which sites, with what confidence in the data behind
            each answer, and where additional monitoring would compound the
            value of the analysis. The two beats below are the parts of that
            answer worth pulling out. They are what{' '}
            <em className="font-serif italic">Natrx Assess</em> is built to
            produce, and they are why BOP returned for a second engagement
            before the first had finished.
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
              shorelines. The Natrx Assess shoreline change analysis, using the
              Marsh Edge from Image Processing methodology applied to NAIP
              satellite imagery from 2010 to present, identified erosion rates
              of one foot per year or greater at eight candidate locations and
              active retreat at fifteen more. Several of those sit in the top
              tier of the suitability ranking. Oyster reefs function as natural
              breakwaters, dampening wave energy and slowing the loss of marsh
              edges. The overlap is the kind of pattern that reshapes a
              restoration program. The same intervention restores habitat and
              stabilizes coast. One project, two outcomes. Quantifying that
              overlap across the full pipeline, at site-level resolution, is
              the kind of multi-variable insight Natrx Assess is built to
              produce.
            </p>
          }
          visual={
            <ImagePlaceholder
              kicker="Fig. — Shoreline change"
              caption={
                <>
                  Shoreline change rates at Living Breakwaters, 2010 to 2025.
                  Red indicates active retreat. Source: Natrx Assess shoreline
                  change analysis. Final image extracted from the Wave Analysis
                  Report.
                </>
              }
              aspect="4 / 3"
            />
          }
        />

        <FindingBeat
          number={2}
          subhead="Where the framework tells the truth about itself."
          body={
            <p>
              The analysis surfaced where its own inputs are strong and where
              they are thin. Sites that BOP has already advanced into design
              carry robust observational data because they have been studied
              directly. Several of the top-ranked candidates from the new
              analysis carry less observational support, classified as
              moderate or low confidence, because they have not been the
              subject of prior fieldwork at the same depth. The methodology
              names this rather than hiding it. The result is a deliverable
              that tells BOP not only which sites rank highest, but exactly
              where the next round of monitoring investment would compound the
              value of the analysis already produced. Honesty about uncertainty,
              made operational. The framework knows what it knows and where it
              does not.
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
        The brief was to rank the sites. The framework now answers which sites,
        with what confidence behind each answer, and where the next investment
        in observation should land. The engagement was scoped to twenty-six
        weeks. The capability it leaves behind is durable.
      </div>
    </SectionShell>
  )
}
