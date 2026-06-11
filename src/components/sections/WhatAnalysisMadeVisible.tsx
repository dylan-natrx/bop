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
            The ranking did its main job. It told BOP which places give
            oysters the best shot. Two more things stand out inside it, and
            they shape what comes next.
          </p>
        </div>
      </div>

      <div className="mt-16 lg:mt-20 space-y-12 lg:space-y-16">
        <FindingBeat
          subhead="Oysters and shorelines, one intervention."
          body={
            <p>
              Some of the higher-ranked sites sit next to a shoreline that is
              washing away. Using satellite pictures going back to 2010,{' '}
              <em className="font-serif italic text-white">Natrx Assess</em> measured
              how every site&apos;s shoreline has moved. Eight sites are losing
              more than a foot of land a year. Fifteen more are slipping back
              more slowly. A few of them rank high for oysters too. And an
              oyster reef is a natural breakwater: it takes the force out of
              the waves and slows the land&apos;s retreat. So where good water
              meets a fraying shore, one reef does two jobs at once, a home for
              oysters and a guard for the coast.
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
                  marks where the shore is pulling back. Source: Natrx Assess,
                  using NAIP satellite imagery and the Marsh Edge from Image
                  Processing method.
                </>
              }
            />
          }
        />

        <FindingBeat
          subhead="A map of where to invest in more data next."
          body={
            <p>
              A ranking is only as strong as the data under it, and the harbor
              is watched unevenly. Some places have years of close monitoring;
              others have very little. The framework says so out loud. For each
              site, it marks how much data stands behind the score. The sites
              already in design tend to rest on solid data, because they have
              been studied for years. Some of the strongest new candidates rest
              on thinner data, simply because no one has looked as closely yet.
              Knowing exactly where the data is thin tells BOP exactly where to
              spend its next round of fieldwork: more sensors in the water,
              more sampling, more time on site. The framework doesn&apos;t only
              rank the harbor. It shows where the next bit of effort will pay
              off most.
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
        The job was to find the best places to rebuild oyster reefs in New York
        Harbor. The framework did that. It also left behind a way of working BOP
        can run again next year, and the year after, as the harbor keeps
        changing.
      </div>
    </SectionShell>
  )
}
