import { SectionShell } from './SectionShell'
import { PlaceholderBlock } from './PlaceholderBlock'

export function WhatThisEnables() {
  return (
    <SectionShell id="what-this-enables" eyebrow="What this enables">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[22ch]
          ">
          [Section 5 headline: one-line statement of portability. The
          methodology travels. Other complex urban estuaries face the
          same prioritization decision.]
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-4 space-y-6
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            [Section 5 portability paragraph, around 100 words. The
            class of decision BOP faced is becoming the central
            decision of restoration at scale. Coastal districts, port
            authorities, state agencies, foundations, NGOs. The
            framework as a third path between site-by-site
            instrumentation and habitat-suitability models that
            require continuous data. San Francisco Bay and the
            Chesapeake as named examples. The methodology is the
            deliverable, not the New York Harbor result alone.]
          </p>
          <p>
            [Section 5 closing paragraph, around 50 words. The
            ongoing partnership. BOP can rerun the framework next
            year as new data lands. Natrx Assess and the broader
            Natrx capability set (Assess plus the Address fabrication
            platform plus the field track record) as the answer to
            the full question, from where to act through what to
            deploy. No CTA, no &quot;talk to us,&quot; no button.]
          </p>
        </div>
      </div>

      <div className="mt-20 lg:mt-28">
        <PlaceholderBlock
          componentName="Glossary"
          description="Collapsed-by-default glossary at the bottom of the page. Around 18 plain-language definitions. Eastern oyster, salinity / PSU, chlorophyll-a, dissolved oxygen / hypoxia, Habitat Suitability Index, composite score and DO-modifier, confidence interval, fetch-limited wave modeling, shoreline change analysis (MEIP), NAIP imagery, CSO, MS4, subtidal vs intertidal, Allee effect, spat, keystone species, estuary, bathymetry. Definitions drawn from the Master Document and the Project Overview."
          minHeight={240}
        />
      </div>
    </SectionShell>
  )
}
