import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { KeywordResearchClient } from "./keyword-research-client"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "Keyword Research Tool - SiteForge",
  description: "Find the best keywords to target for your content and SEO strategy.",
}

export default function KeywordResearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string }
}) {
  const initialKeyword = searchParams.keyword || ""

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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Keyword Research Tool</h1>
            <p className="mt-4 text-xl text-gray-500">
              Find the best keywords to target for your content and SEO strategy.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="text-center p-12 border rounded-lg bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-gray-500">Loading keyword research tool...</p>
              </div>
            }
          >
            <KeywordResearchClient initialKeyword={initialKeyword} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
