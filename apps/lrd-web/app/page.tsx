import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ValueProps } from '@/components/sections/ValueProps'
import { FeaturedExperts } from '@/components/sections/FeaturedExperts'
import { TrustSection } from '@/components/sections/TrustSection'
import { EventsSection } from '@/components/sections/EventsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ValueProps />
        <FeaturedExperts />
        <TrustSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
