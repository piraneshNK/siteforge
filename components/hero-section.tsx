"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SEOResults } from "@/components/seo-results"
import { ToolSelector } from "@/components/tool-selector"
import type { AnalysisResult } from "@/types/analysis"

export function HeroSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<AnalysisResult | null>(null)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Free AI SEO Analyzer
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Paste your website URL. Instantly get your SEO score and optimization tips.
            </p>
          </div>

          <ToolSelector />

          {error && (
            <Alert variant="destructive" className="mt-4 max-w-md">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {isAnalyzing && (
        <div className="w-full max-w-md mx-auto mt-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-500">Analyzing your website...</p>
        </div>
      )}

      <div id="seo-results">{results && <SEOResults results={results} />}</div>
    </section>
  )
}
