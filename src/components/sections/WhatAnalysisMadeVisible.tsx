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
          Two patterns the ranking surfaced.
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-2
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            The ranking told BOP which sites are most suitable for
            restoration. Two patterns within the ranking shape what BOP does
            next.
          </p>
        </div>
      </div>

      <div className="mt-16 lg:mt-20 space-y-12 lg:space-y-16">
        <FindingBeat
          subhead="Oysters and shorelines, one intervention."
          body={
            <p>
              Many of the highest-ranked sites sit adjacent to actively eroding
              shorelines.{' '}
              <em className="font-serif italic text-white">Natrx Assess</em> measured
              shoreline change at every candidate location, using satellite
              imagery going back to 2010. Eight sites are losing more than a
              foot of shoreline a year. Fifteen more are retreating at slower
              rates. Several sit in the top tier of the suitability ranking.
              Oyster reefs function as natural breakwaters: they dampen wave
              energy and slow the loss of marsh edge. Where strong water
              quality meets active erosion, the same project restores habitat
              and stabilizes coast.
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
                  Shoreline change at Living Breakwaters, 2010 to 2025. Red
                  indicates active retreat. Source: Natrx Assess, using NAIP
                  satellite imagery and the Marsh Edge from Image Processing
                  methodology.
                </>
              }
            />
          }
        />

        <FindingBeat
          subhead="A map of where to invest in more data next."
          body={
            <p>
              Strong site rankings depend on strong underlying data, and
              observational coverage across the harbor is uneven. The
              framework names that unevenness directly, classifying each
              site&apos;s confidence level based on how well the available
              data supports its score. Sites already advanced into BOP&apos;s
              design pipeline carry high-confidence inputs because they have
              been studied. Several top-ranked candidates from the new
              analysis carry less observational support, simply because they
              have not yet been studied at the same depth. Knowing exactly
              where confidence is lower tells BOP exactly where to send the
              next round of monitoring effort: water quality loggers, field
              validation, additional sampling. The framework doesn&apos;t
              just rank sites. It surfaces the highest-value targets for the
              next investment in observation.
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
