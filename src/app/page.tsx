import { HeroSection } from '@/components/hero/HeroSection'
import { StakesAndProblem } from '@/components/sections/StakesAndProblem'
import { MethodologyMadeVisible } from '@/components/sections/MethodologyMadeVisible'
import { WhatAnalysisMadeVisible } from '@/components/sections/WhatAnalysisMadeVisible'
import { WhatThisEnables } from '@/components/sections/WhatThisEnables'

// Five-section structure, locked:
//   § 1 Hero (Map 1)
//   § 2 The stakes and the problem
//   § 3 The methodology, made visible (Map 2 + spectra + top-ranked callouts)
//   § 4 What the analysis made visible (two beats + closing thread)
//   § 5 What this enables (portability + glossary)

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StakesAndProblem />
      <MethodologyMadeVisible />
      <WhatAnalysisMadeVisible />
      <WhatThisEnables />
    </main>
  )
}
