"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2, Search, Link2, ChevronDown } from "lucide-react"

export function ToolSelector() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("seo-analyzer")

  const handleSEOAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would trigger the analysis
      alert("This would trigger the SEO analysis in a real app")
    }, 1500)
  }

  const handleKeywordResearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would trigger the keyword research
      alert("This would trigger the keyword research in a real app")
    }, 1500)
  }

  const handleBacklinkCheck = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would trigger the backlink check
      alert("This would trigger the backlink check in a real app")
    }, 1500)
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
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="seo-analyzer">SEO Analyzer</TabsTrigger>
          <TabsTrigger value="keyword-research">Keyword Research</TabsTrigger>
          <TabsTrigger value="backlink-checker">Backlink Checker</TabsTrigger>
          <TabsTrigger value="other" onClick={handleOtherClick}>
            Other <ChevronDown className="ml-1 h-3 w-3" />
          </TabsTrigger>
        </TabsList>

        <Card className="mt-4 border-2">
          <CardContent className="pt-6">
            <TabsContent value="seo-analyzer" className="mt-0">
              <form onSubmit={handleSEOAnalyze} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input className="pl-10 h-12" placeholder="Enter your website URL" disabled={isLoading} required />
                  </div>
                  <Button type="submit" className="h-12 px-8" disabled={isLoading}>
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
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 px-8" disabled={isLoading}>
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
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 px-8" disabled={isLoading}>
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
