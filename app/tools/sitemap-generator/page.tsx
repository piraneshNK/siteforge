import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SitemapGeneratorClient } from "./sitemap-generator-client"

export const metadata = {
  title: "XML Sitemap Generator - SiteForge",
  description: "Generate an XML sitemap to help search engines discover your content.",
}

export default function SitemapGeneratorPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">XML Sitemap Generator</h1>
            <p className="mt-4 text-xl text-gray-500">
              Generate an XML sitemap to help search engines discover your content.
            </p>
          </div>

          <SitemapGeneratorClient />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
