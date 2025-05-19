import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentAnalyzerClient } from "./content-analyzer-client"

export const metadata = {
  title: "Content Analyzer - SiteForge",
  description: "Optimize your content for better search engine rankings and readability.",
}

export default function ContentAnalyzerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Content Analyzer</h1>
            <p className="mt-4 text-xl text-gray-500">
              Optimize your content for better search engine rankings and readability.
            </p>
          </div>

          <ContentAnalyzerClient />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
