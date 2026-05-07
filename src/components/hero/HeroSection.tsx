import { Topbar } from '@/components/layout/Topbar'
import { Footer } from '@/components/layout/Footer'
import { Headline } from './Headline'
import { StatStack } from './StatStack'
import { HeroFigure } from './HeroFigure'

export function HeroSection() {
  return (
    <section className="max-w-scaffold mx-auto px-scaffold-x pt-scaffold-top pb-scaffold-bottom min-h-screen flex flex-col">
      <Topbar />

      {/* Headline area: two columns */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <Headline />
        <StatStack />
      </div>

      {/* Map figure */}
      <HeroFigure />

      <Footer />
    </section>
  )
}
