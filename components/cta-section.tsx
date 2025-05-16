import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Improve Your SEO?</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Start analyzing your website today and get actionable recommendations to improve your search engine
              rankings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="#hero">Analyze Your Site</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#seo-tools">Explore SEO Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
