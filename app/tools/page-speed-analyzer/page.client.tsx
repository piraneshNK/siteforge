"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Zap, Clock, Smartphone, Monitor, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Export the component as default directly
export default function PageSpeedAnalyzerPageClient() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mobile")

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setError("Please enter a URL to analyze")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`

      // Call the PageSpeed API directly from the client for this specific tool
      const mobileResult = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`,
      )
      const desktopResult = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo`,
      )

      if (!mobileResult.ok || !desktopResult.ok) {
        throw new Error("Failed to analyze page speed")
      }

      const mobileData = await mobileResult.json()
      const desktopData = await desktopResult.json()

      setResults({
        url: formattedUrl,
        mobile: processPageSpeedData(mobileData, "mobile"),
        desktop: processPageSpeedData(desktopData, "desktop"),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const processPageSpeedData = (data: any, strategy: string) => {
    if (!data.lighthouseResult) {
      return null
    }

    const { categories, audits } = data.lighthouseResult

    return {
      scores: {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
      },
      metrics: {
        firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || "N/A",
        largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || "N/A",
        timeToInteractive: audits["interactive"]?.displayValue || "N/A",
        totalBlockingTime: audits["total-blocking-time"]?.displayValue || "N/A",
        cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || "N/A",
        speedIndex: audits["speed-index"]?.displayValue || "N/A",
      },
      opportunities: Object.values(audits)
        .filter((audit: any) => audit.score !== null && audit.score < 0.9 && audit.details?.type === "opportunity")
        .sort((a: any, b: any) => (a.score || 0) - (b.score || 0))
        .slice(0, 5)
        .map((audit: any) => ({
          title: audit.title,
          description: audit.description,
          score: audit.score,
          displayValue: audit.displayValue,
        })),
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Page Speed Analyzer</h1>
            <p className="mt-4 text-xl text-gray-500">
              Analyze your website's loading speed and get recommendations for improvement.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analyze Page Speed</CardTitle>
              <CardDescription>Enter your website URL to analyze its loading performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Zap className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      className="pl-10"
                      placeholder="Enter your website URL (e.g., https://example.com)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isAnalyzing}
                    />
                  </div>
                  <Button type="submit" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Speed"
                    )}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  This tool uses Google PageSpeed Insights API to analyze your website's loading speed on both mobile
                  and desktop devices.
                </p>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isAnalyzing && (
            <div className="text-center p-12 border rounded-lg bg-gray-50">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-500">Analyzing page speed. This may take a moment...</p>
            </div>
          )}

          {!isAnalyzing && !results && !error && (
            <div className="text-center p-12 border rounded-lg bg-gray-50">
              <p className="text-gray-500">Enter your website URL above to analyze page speed.</p>
            </div>
          )}

          {results && (
            <div className="space-y-8 animate-in fade-in-50 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Results for {results.url}</h2>
                <TabsList>
                  <TabsTrigger value="mobile" onClick={() => setActiveTab("mobile")}>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </TabsTrigger>
                  <TabsTrigger value="desktop" onClick={() => setActiveTab("desktop")}>
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </TabsTrigger>
                </TabsList>
              </div>

              {activeTab === "mobile" && results.mobile && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.mobile.scores.performance)}`}>
                            {results.mobile.scores.performance}
                          </div>
                          <div className="text-sm text-gray-500">Performance</div>
                          <Progress
                            value={results.mobile.scores.performance}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.mobile.scores.performance)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.mobile.scores.accessibility)}`}>
                            {results.mobile.scores.accessibility}
                          </div>
                          <div className="text-sm text-gray-500">Accessibility</div>
                          <Progress
                            value={results.mobile.scores.accessibility}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.mobile.scores.accessibility)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.mobile.scores.bestPractices)}`}>
                            {results.mobile.scores.bestPractices}
                          </div>
                          <div className="text-sm text-gray-500">Best Practices</div>
                          <Progress
                            value={results.mobile.scores.bestPractices}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.mobile.scores.bestPractices)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.mobile.scores.seo)}`}>
                            {results.mobile.scores.seo}
                          </div>
                          <div className="text-sm text-gray-500">SEO</div>
                          <Progress
                            value={results.mobile.scores.seo}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.mobile.scores.seo)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold">Core Web Vitals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">First Contentful Paint</p>
                              <p className="text-xs text-gray-500">When content first appears</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.mobile.metrics.firstContentfulPaint}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-green-500" />
                            <div>
                              <p className="text-sm font-medium">Largest Contentful Paint</p>
                              <p className="text-xs text-gray-500">When largest content appears</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.mobile.metrics.largestContentfulPaint}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-purple-500" />
                            <div>
                              <p className="text-sm font-medium">Cumulative Layout Shift</p>
                              <p className="text-xs text-gray-500">Visual stability measure</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.mobile.metrics.cumulativeLayoutShift}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold">Additional Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-orange-500" />
                            <div>
                              <p className="text-sm font-medium">Speed Index</p>
                              <p className="text-xs text-gray-500">How quickly content is visually displayed</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.mobile.metrics.speedIndex}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-red-500" />
                            <div>
                              <p className="text-sm font-medium">Total Blocking Time</p>
                              <p className="text-xs text-gray-500">Sum of all blocking periods</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.mobile.metrics.totalBlockingTime}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">Time to Interactive</p>
                              <p className="text-xs text-gray-500">When page becomes interactive</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.mobile.metrics.timeToInteractive}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold">Opportunities for Improvement</h3>
                  <div className="space-y-4">
                    {results.mobile.opportunities.length > 0 ? (
                      results.mobile.opportunities.map((opp: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 text-yellow-500">
                                <AlertCircle className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{opp.title}</h4>
                                  {opp.displayValue && (
                                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                      {opp.displayValue}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{opp.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No significant opportunities found. Great job!</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "desktop" && results.desktop && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.desktop.scores.performance)}`}>
                            {results.desktop.scores.performance}
                          </div>
                          <div className="text-sm text-gray-500">Performance</div>
                          <Progress
                            value={results.desktop.scores.performance}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.desktop.scores.performance)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.desktop.scores.accessibility)}`}>
                            {results.desktop.scores.accessibility}
                          </div>
                          <div className="text-sm text-gray-500">Accessibility</div>
                          <Progress
                            value={results.desktop.scores.accessibility}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.desktop.scores.accessibility)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.desktop.scores.bestPractices)}`}>
                            {results.desktop.scores.bestPractices}
                          </div>
                          <div className="text-sm text-gray-500">Best Practices</div>
                          <Progress
                            value={results.desktop.scores.bestPractices}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.desktop.scores.bestPractices)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl font-bold ${getScoreColor(results.desktop.scores.seo)}`}>
                            {results.desktop.scores.seo}
                          </div>
                          <div className="text-sm text-gray-500">SEO</div>
                          <Progress
                            value={results.desktop.scores.seo}
                            className={`h-2 mt-2 w-full ${getScoreBackgroundColor(results.desktop.scores.seo)}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold">Core Web Vitals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">First Contentful Paint</p>
                              <p className="text-xs text-gray-500">When content first appears</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.desktop.metrics.firstContentfulPaint}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-green-500" />
                            <div>
                              <p className="text-sm font-medium">Largest Contentful Paint</p>
                              <p className="text-xs text-gray-500">When largest content appears</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.desktop.metrics.largestContentfulPaint}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-purple-500" />
                            <div>
                              <p className="text-sm font-medium">Cumulative Layout Shift</p>
                              <p className="text-xs text-gray-500">Visual stability measure</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.desktop.metrics.cumulativeLayoutShift}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold">Additional Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-orange-500" />
                            <div>
                              <p className="text-sm font-medium">Speed Index</p>
                              <p className="text-xs text-gray-500">How quickly content is visually displayed</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.desktop.metrics.speedIndex}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-red-500" />
                            <div>
                              <p className="text-sm font-medium">Total Blocking Time</p>
                              <p className="text-xs text-gray-500">Sum of all blocking periods</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.desktop.metrics.totalBlockingTime}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">Time to Interactive</p>
                              <p className="text-xs text-gray-500">When page becomes interactive</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.desktop.metrics.timeToInteractive}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-bold">Opportunities for Improvement</h3>
                  <div className="space-y-4">
                    {results.desktop.opportunities.length > 0 ? (
                      results.desktop.opportunities.map((opp: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div className="mt-1 text-yellow-500">
                                <AlertCircle className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{opp.title}</h4>
                                  {opp.displayValue && (
                                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                      {opp.displayValue}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{opp.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No significant opportunities found. Great job!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
