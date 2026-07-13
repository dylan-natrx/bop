import { HeroSection } from '@/app/projects/bop/components/hero/HeroSection'
import { StakesAndProblem } from '@/app/projects/bop/components/sections/StakesAndProblem'
import { MethodologyMadeVisible } from '@/app/projects/bop/components/sections/MethodologyMadeVisible'
import { WhatAnalysisMadeVisible } from '@/app/projects/bop/components/sections/WhatAnalysisMadeVisible'
import { WhatThisEnables } from '@/app/projects/bop/components/sections/WhatThisEnables'
import { SiteChromeProvider } from '@/app/projects/bop/components/chrome/SiteChromeProvider'
import { SectionNav } from '@/app/projects/bop/components/layout/SectionNav'
import { Footer } from '@/app/projects/bop/components/layout/Footer'

// Five-section structure, locked:
//   § 1 Hero (Map 1)
//   § 2 The stakes and the problem
//   § 3 The methodology, made visible (Map 2 + spectra + top-ranked callouts)
//   § 4 What the analysis made visible (two beats + closing thread)
//   § 5 What this enables (portability)
//
// Page chrome:
//   <SectionNav>            sticky top nav with scroll-spy
//   <SiteChromeProvider>    persistent right-edge drawer (Glossary + Press)
//   <Footer>                page-end credit line + partnership lockup

export default function Home() {
  return (
    <SiteChromeProvider>
      <SectionNav />
      <main>
        <HeroSection />
        <StakesAndProblem />
        <MethodologyMadeVisible />
        <WhatAnalysisMadeVisible />
        <WhatThisEnables />
      </main>
      <Footer />
    </SiteChromeProvider>
  )
}
