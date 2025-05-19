"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, TrendingUp, ArrowDown, ArrowUp, Download, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

interface KeywordResult {
  keyword: string
  volume: number
  difficulty: number
  cpc: number
  trend: "up" | "down" | "stable"
}

interface KeywordResearchClientProps {
  initialKeyword: string
}

export function KeywordResearchClient({ initialKeyword }: KeywordResearchClientProps) {
  const [keyword, setKeyword] = useState(initialKeyword)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<KeywordResult[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (initialKeyword) {
      handleResearch(initialKeyword)
    }
  }, [initialKeyword])

  const handleResearch = async (searchKeyword?: string) => {
    const keywordToSearch = searchKeyword || keyword
    if (!keywordToSearch) return

    setIsLoading(true)

    // Update URL with the keyword
    if (keywordToSearch !== initialKeyword) {
      router.push(`/tools/keyword-research?keyword=${encodeURIComponent(keywordToSearch)}`)
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock data based on the keyword
    const mockResults = generateMockKeywordData(keywordToSearch)
    setResults(mockResults)
    setIsLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleResearch()
  }

  const generateMockKeywordData = (baseKeyword: string): KeywordResult[] => {
    const variations = [
      "",
      " tool",
      " software",
      " service",
      " best",
      " free",
      " online",
      " how to",
      " tips",
      " guide",
      " vs",
      " alternative",
    ]

    return variations
      .map((variation) => {
        const fullKeyword = variation ? `${baseKeyword}${variation}` : baseKeyword
        // Generate deterministic but seemingly random values based on the keyword
        const hash = hashString(fullKeyword)
        const volume = 100 + (hash % 9900) // 100-10000
        const difficulty = 10 + (hash % 90) // 10-99
        const cpc = (0.5 + (hash % 100) / 20).toFixed(2) // 0.5-5.5
        const trendValue = hash % 3
        const trend = trendValue === 0 ? "up" : trendValue === 1 ? "down" : "stable"

        return {
          keyword: fullKeyword,
          volume,
          difficulty,
          cpc: Number.parseFloat(cpc),
          trend,
        }
      })
      .sort((a, b) => b.volume - a.volume) // Sort by volume descending
  }

  // Simple string hash function for deterministic "random" values
  const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "bg-green-500"
    if (difficulty < 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return "Easy"
    if (difficulty < 60) return "Medium"
    return "Hard"
  }

  const handleExport = () => {
    if (!results) return

    // Create CSV content
    const headers = ["Keyword", "Search Volume", "Difficulty", "CPC ($)", "Trend"]
    const csvContent =
      headers.join(",") +
      "\n" +
      results
        .map((row) => {
          return `"${row.keyword}",${row.volume},${row.difficulty},${row.cpc},${row.trend}`
        })
        .join("\n")

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `keyword-research-${keyword.replace(/\s+/g, "-")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Keywords</CardTitle>
          <CardDescription>Enter a seed keyword to find related keywords and search volume data.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  placeholder="Enter a keyword (e.g., SEO tools)"
                  className="pl-10 flex-1"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Researching...
                  </>
                ) : (
                  "Research"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center p-12 border rounded-lg bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-500">Researching keywords. This may take a moment...</p>
        </div>
      )}

      {!isLoading && !results && (
        <div className="text-center p-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">Enter a keyword above to see research results.</p>
        </div>
      )}

      {!isLoading && results && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Results for "{keyword}"</h2>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Opportunities</CardTitle>
              <CardDescription>
                We found {results.length} keyword opportunities related to "{keyword}".
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead className="text-right">Search Volume</TableHead>
                    <TableHead className="text-right">Difficulty</TableHead>
                    <TableHead className="text-right">CPC ($)</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.keyword}</TableCell>
                      <TableCell className="text-right">{result.volume.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-24">
                            <Progress
                              value={result.difficulty}
                              className={`h-2 ${getDifficultyColor(result.difficulty)}`}
                            />
                          </div>
                          <span>{result.difficulty}</span>
                          <Badge
                            variant={
                              result.difficulty < 30 ? "outline" : result.difficulty < 60 ? "secondary" : "destructive"
                            }
                            className="ml-2"
                          >
                            {getDifficultyLabel(result.difficulty)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${result.cpc}</TableCell>
                      <TableCell className="text-right">
                        {result.trend === "up" ? (
                          <div className="flex items-center justify-end">
                            <span className="text-green-500 flex items-center">
                              <ArrowUp className="h-4 w-4 mr-1" />
                              Rising
                            </span>
                          </div>
                        ) : result.trend === "down" ? (
                          <div className="flex items-center justify-end">
                            <span className="text-red-500 flex items-center">
                              <ArrowDown className="h-4 w-4 mr-1" />
                              Falling
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end">
                            <span className="text-gray-500 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              Stable
                            </span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Insights</CardTitle>
              <CardDescription>Analysis and recommendations for your keyword strategy.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Competition Analysis</h3>
                  <p className="text-sm text-gray-600">
                    The average difficulty for keywords related to "{keyword}" is{" "}
                    {Math.round(results.reduce((sum, item) => sum + item.difficulty, 0) / results.length)}. Consider
                    targeting keywords with lower difficulty scores for quicker results.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Volume Opportunities</h3>
                  <p className="text-sm text-gray-600">
                    The highest volume keywords are "{results[0].keyword}" ({results[0].volume.toLocaleString()}) and "
                    {results[1].keyword}" ({results[1].volume.toLocaleString()}). These represent your biggest traffic
                    opportunities.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Cost Efficiency</h3>
                  <p className="text-sm text-gray-600">
                    For paid campaigns, consider keywords with high volume but lower CPC, such as "
                    {results.sort((a, b) => b.volume / b.cpc - a.volume / a.cpc)[0].keyword}" for the best ROI.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
