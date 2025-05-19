"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, Search, Link2, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export function ToolSelector() {
  const [url, setUrl] = useState("")
  const [keyword, setKeyword] = useState("")
  const [domain, setDomain] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("seo-analyzer")
  const router = useRouter()

  const handleSEOAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) return

    setIsLoading(true)

    try {
      // Call our actual API endpoint
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze URL")
      }

      // Scroll to results section
      const resultsSection = document.getElementById("seo-results")
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" })
      }

      // In a real implementation, we would update state with the results
      // For now, we'll just simulate a delay
      setTimeout(() => {
        setIsLoading(false)

        // Store the URL in sessionStorage instead of using the hash with query parameters
        sessionStorage.setItem("analyzedUrl", url)

        // Navigate to the results section without query parameters in the hash
        window.location.hash = "seo-results"

        // Scroll to results section
        const resultsSection = document.getElementById("seo-results")
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 1500)
    } catch (error) {
      console.error("Error analyzing URL:", error)
      setIsLoading(false)
      alert("Failed to analyze URL. Please try again.")
    }
  }

  const handleKeywordResearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword) return

    setIsLoading(true)

    // Navigate to the keyword research tool with the keyword as a parameter
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/tools/keyword-research?keyword=${encodeURIComponent(keyword)}`)
    }, 500)
  }

  const handleBacklinkCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain) return

    setIsLoading(true)

    // Navigate to the backlink checker tool with the domain as a parameter
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/tools/backlink-checker?domain=${encodeURIComponent(domain)}`)
    }, 500)
  }

  const handleOtherClick = () => {
    // Scroll to the SEO tools section
    const seoToolsSection = document.getElementById("seo-tools")
    if (seoToolsSection) {
      seoToolsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <Tabs defaultValue="seo-analyzer" value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-full sm:w-auto">
            <TabsTrigger value="seo-analyzer" className="whitespace-nowrap">
              SEO Analyzer
            </TabsTrigger>
            <TabsTrigger value="keyword-research" className="whitespace-nowrap">
              Keyword Research
            </TabsTrigger>
            <TabsTrigger value="backlink-checker" className="whitespace-nowrap">
              Backlink Checker
            </TabsTrigger>
            <TabsTrigger value="other" onClick={handleOtherClick} className="whitespace-nowrap">
              Other <ChevronDown className="ml-1 h-3 w-3" />
            </TabsTrigger>
          </TabsList>
        </div>

        <Card className="mt-4 border-2">
          <CardContent className="pt-6">
            <TabsContent value="seo-analyzer" className="mt-0">
              <form onSubmit={handleSEOAnalyze} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      className="pl-10 h-12"
                      placeholder="Enter your website URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">No login required. Get instant results.</p>
              </form>
            </TabsContent>

            <TabsContent value="keyword-research" className="mt-0">
              <form onSubmit={handleKeywordResearch} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      className="pl-10 h-12"
                      placeholder="Enter a keyword (e.g., SEO tools)"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Researching...
                      </>
                    ) : (
                      <>
                        Research
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Find the best keywords for your content.</p>
              </form>
            </TabsContent>

            <TabsContent value="backlink-checker" className="mt-0">
              <form onSubmit={handleBacklinkCheck} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Link2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      className="pl-10 h-12"
                      placeholder="Enter a domain (e.g., example.com)"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        Check Backlinks
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Analyze your backlink profile.</p>
              </form>
            </TabsContent>

            <TabsContent value="other" className="mt-0">
              <div className="text-center py-8">
                <p className="text-gray-500">Scroll down to see all available tools.</p>
                <Button variant="outline" className="mt-4" onClick={handleOtherClick}>
                  View All Tools <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
