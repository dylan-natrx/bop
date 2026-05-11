import { SectionShell } from './SectionShell'
import { PlaceholderBlock } from './PlaceholderBlock'

export function MethodologyMadeVisible() {
  return (
    <SectionShell id="methodology" eyebrow="The methodology, made visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[20ch]
          ">
          [Section 3 headline: one-line statement of the methodology
          made visible, the reader watches site suitability emerge
          from layered data.]
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-4
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            [Section 3 intro, around 80 words. Frame the six-step
            walkthrough. Salinity, chlorophyll-a, dissolved oxygen as
            the rank-driving water quality variables. Wave exposure
            and shoreline erosion as the Natrx Assess contributions.
            The practical filters (parkland, CSO, MS4) as the last
            layer. The reader controls progression, click to advance.]
          </p>
        </div>
      </div>

      {/* Map 2 + spectra panel — the six-step guided sequence */}
      <div className="mt-20 lg:mt-28">
        <PlaceholderBlock
          componentName="MethodologyWalkthrough"
          description="Map 2 plus the spectra panel. Six-step guided sequence teaching the methodology: salinity, then chlorophyll-a, then dissolved oxygen, then wave exposure (Natrx Assess), then shoreline erosion (Natrx Assess), then the practical filters. The map recolors at each step; the spectra panel stacks one suitability curve at a time. Reader-controlled progression with Previous and Next."
          minHeight={520}
        />
      </div>

      {/* Top-ranked sites callouts — three editorial cards nested inside the section */}
      <div className="mt-20 lg:mt-28">
        <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-6">
          Top-ranked sites
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PlaceholderBlock
            componentName="TopRankedCallout"
            description="Arthur Kill, rank 1, score 0.87. The redemption arc. Staten Island's historically industrial west shore now leads the harbor on combined salinity, chlorophyll-a, and dissolved oxygen for oyster restoration."
            minHeight={280}
          />
          <PlaceholderBlock
            componentName="TopRankedCallout"
            description="Living Breakwaters cluster, ranks 2 through 7, scores 0.74 to 0.79. Independent validation of an iconic resilience installation. Six sites within the SCAPE-designed system rank in the top seven."
            minHeight={280}
          />
          <PlaceholderBlock
            componentName="TopRankedCallout"
            description="Wolfe's Pond, rank 8, score 0.65. Staten Island park site, publicly accessible, strong across every variable. The most fully-rounded candidate at this tier."
            minHeight={280}
          />
        </div>
      </div>
    </SectionShell>
  )
}
