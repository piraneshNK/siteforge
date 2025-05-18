import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SEOToolsSection } from "@/components/seo-tools-section"
import { AboutUsSection } from "@/components/about-us-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { StructuredData } from "@/components/structured-data"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData />
      <SiteHeader />
      <main className="flex-1">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="seo-tools">
          <SEOToolsSection />
        </section>
        <section id="about">
          <AboutUsSection />
        </section>
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
