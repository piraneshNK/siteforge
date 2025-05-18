"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Download,
  Share2,
  Clock,
  Zap,
  BarChart2,
  Smartphone,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generatePDFReport } from "@/utils/generate-pdf"
import type { AnalysisResult } from "@/types/analysis"

export function SEOResults({ results }: { results: AnalysisResult }) {
  const [activeTab, setActiveTab] = useState("overview")

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

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Good"
    if (score >= 70) return "Average"
    if (score >= 50) return "Poor"
    return "Critical"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Medium Priority
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  const totalIssues =
    results.issues.critical.length + results.issues.warnings.length + results.issues.improvements.length

  const handleExport = () => {
    // Generate the HTML report
    const htmlContent = generatePDFReport(results)

    // Create a Blob with the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Open the report in a new window
    const reportWindow = window.open(url, "_blank")

    if (reportWindow) {
      // Add a title to the new window
      reportWindow.document.title = `SEO Report - ${results.url}`

      // Write the HTML content to the new window
      reportWindow.document.write(htmlContent)
      reportWindow.document.close()
    } else {
      // If popup is blocked, offer direct download
      const a = document.createElement("a")
      a.href = url
      a.download = `seo-report-${results.url.replace(/[^a-z0-9]/gi, "-")}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  const handleShare = () => {
    // In a real app, this would share the results
    if (navigator.share) {
      navigator
        .share({
          title: `SEO Analysis for ${results.url}`,
          text: `Check out this SEO analysis for ${results.url}. Overall score: ${results.scores.overall}/100`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing", error)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Share functionality would be implemented here")
    }
  }

  return (
    <div className="w-full max-w-5xl mt-12 animate-in fade-in-50 duration-500">
      <Card className="border shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">SEO Analysis Results</CardTitle>
              <CardDescription>
                Analysis for <span className="font-medium">{results.url}</span>
                <br />
                <span className="text-xs">Completed on {new Date(results.timestamp).toLocaleString()}</span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issues">Issues ({totalIssues})</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-0">
            <TabsContent value="overview" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200 stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        ></circle>
                        <circle
                          className={`${getScoreBackgroundColor(results.scores.overall)} stroke-current`}
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray={`${results.scores.overall * 2.51} 251.2`}
                          strokeDashoffset="0"
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold ${getScoreColor(results.scores.overall)}`}>
                          {results.scores.overall}
                        </span>
                        <span className="text-sm">{getScoreLabel(results.scores.overall)}</span>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">{results.issues.critical.length} critical issues found</p>
                      <p className="text-sm text-gray-500">
                        {results.issues.warnings.length + results.issues.improvements.length} improvements suggested
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">Score Breakdown</h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Search className="h-4 w-4 mr-2" />
                          <span>SEO</span>
                        </div>
                        <div className="flex items-center">
                          <span className={getScoreColor(results.scores.seo)}>{results.scores.seo}</span>
                          <span className="text-xs text-gray-500 ml-1">/100</span>
                        </div>
                      </div>
                      <Progress value={results.scores.seo} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          <span>Performance</span>
                        </div>
                        <div className="flex items-center">
                          <span className={getScoreColor(results.scores.performance)}>
                            {results.scores.performance}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">/100</span>
                        </div>
                      </div>
                      <Progress value={results.scores.performance} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2" />
                          <span>Best Practices</span>
                        </div>
                        <div className="flex items-center">
                          <span className={getScoreColor(results.scores.bestPractices)}>
                            {results.scores.bestPractices}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">/100</span>
                        </div>
                      </div>
                      <Progress value={results.scores.bestPractices} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-2" />
                          <span>Accessibility</span>
                        </div>
                        <div className="flex items-center">
                          <span className={getScoreColor(results.scores.accessibility)}>
                            {results.scores.accessibility}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">/100</span>
                        </div>
                      </div>
                      <Progress value={results.scores.accessibility} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-2">Top Recommendations</h3>
                    <ul className="space-y-1">
                      {results.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className={`mt-1 ${getPriorityColor(rec.priority)}`}>
                            {rec.priority === "high" ? (
                              <XCircle className="h-4 w-4" />
                            ) : rec.priority === "medium" ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Info className="h-4 w-4" />
                            )}
                          </div>
                          <span className="text-sm">{rec.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="p-6 m-0">
              <div className="space-y-6">
                {results.issues.critical.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      Critical Issues ({results.issues.critical.length})
                    </h3>
                    <Accordion type="multiple" className="space-y-2">
                      {results.issues.critical.map((issue, index) => (
                        <AccordionItem key={issue.id} value={issue.id} className="border rounded-md px-4">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <div className="flex items-center text-left">
                              <span className="font-medium">{issue.title}</span>
                              <Badge variant="destructive" className="ml-2">
                                High Impact
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-3">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">{issue.description}</p>
                              {issue.recommendation && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium">Recommendation:</p>
                                  <p className="text-sm text-gray-600">{issue.recommendation}</p>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {results.issues.warnings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      Warnings ({results.issues.warnings.length})
                    </h3>
                    <Accordion type="multiple" className="space-y-2">
                      {results.issues.warnings.map((issue) => (
                        <AccordionItem key={issue.id} value={issue.id} className="border rounded-md px-4">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <div className="flex items-center text-left">
                              <span className="font-medium">{issue.title}</span>
                              <Badge variant="default" className="ml-2 bg-yellow-500">
                                Medium Impact
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-3">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">{issue.description}</p>
                              {issue.recommendation && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium">Recommendation:</p>
                                  <p className="text-sm text-gray-600">{issue.recommendation}</p>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {results.issues.improvements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <Info className="h-5 w-5 text-blue-500 mr-2" />
                      Improvements ({results.issues.improvements.length})
                    </h3>
                    <Accordion type="multiple" className="space-y-2">
                      {results.issues.improvements.map((issue) => (
                        <AccordionItem key={issue.id} value={issue.id} className="border rounded-md px-4">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <div className="flex items-center text-left">
                              <span className="font-medium">{issue.title}</span>
                              <Badge variant="outline" className="ml-2">
                                Low Impact
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-3">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">{issue.description}</p>
                              {issue.recommendation && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium">Recommendation:</p>
                                  <p className="text-sm text-gray-600">{issue.recommendation}</p>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {results.issues.passed.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Passed Checks ({results.issues.passed.length})
                    </h3>
                    <Accordion type="multiple" className="space-y-2">
                      {results.issues.passed.map((issue) => (
                        <AccordionItem key={issue.id} value={issue.id} className="border rounded-md px-4">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <div className="flex items-center text-left">
                              <span className="font-medium">{issue.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-3">
                            <p className="text-sm text-gray-600">{issue.description}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Page Load Time</p>
                              <p className="text-xs text-gray-500">Total time to load the page</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.performance.loadTime}s</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                            <div>
                              <p className="text-sm font-medium">First Contentful Paint</p>
                              <p className="text-xs text-gray-500">Time until first content appears</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.performance.firstContentfulPaint}s</p>
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
                              <p className="text-xs text-gray-500">Time until largest content appears</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.performance.largestContentfulPaint}s</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-purple-500" />
                            <div>
                              <p className="text-sm font-medium">Time to Interactive</p>
                              <p className="text-xs text-gray-500">Time until page becomes interactive</p>
                            </div>
                          </div>
                          <p className="text-xl font-bold">{results.performance.timeToInteractive}s</p>
                        </div>
                      </CardContent>
                    </Card>

                    {results.performance.totalBlockingTime && (
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
                            <p className="text-xl font-bold">{results.performance.totalBlockingTime}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {results.performance.cumulativeLayoutShift && (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Zap className="h-5 w-5 mr-2 text-orange-500" />
                              <div>
                                <p className="text-sm font-medium">Cumulative Layout Shift</p>
                                <p className="text-xs text-gray-500">Visual stability measure</p>
                              </div>
                            </div>
                            <p className="text-xl font-bold">{results.performance.cumulativeLayoutShift}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {results.pageSpeedData && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Mobile vs Desktop Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Mobile Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Performance</span>
                              <span className="font-medium">{results.pageSpeedData.mobile.scores.performance}/100</span>
                            </div>
                            <Progress value={results.pageSpeedData.mobile.scores.performance} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">SEO</span>
                              <span className="font-medium">{results.pageSpeedData.mobile.scores.seo}/100</span>
                            </div>
                            <Progress value={results.pageSpeedData.mobile.scores.seo} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Accessibility</span>
                              <span className="font-medium">
                                {results.pageSpeedData.mobile.scores.accessibility}/100
                              </span>
                            </div>
                            <Progress value={results.pageSpeedData.mobile.scores.accessibility} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Desktop Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Performance</span>
                              <span className="font-medium">
                                {results.pageSpeedData.desktop.scores.performance}/100
                              </span>
                            </div>
                            <Progress value={results.pageSpeedData.desktop.scores.performance} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">SEO</span>
                              <span className="font-medium">{results.pageSpeedData.desktop.scores.seo}/100</span>
                            </div>
                            <Progress value={results.pageSpeedData.desktop.scores.seo} className="h-2" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm">Accessibility</span>
                              <span className="font-medium">
                                {results.pageSpeedData.desktop.scores.accessibility}/100
                              </span>
                            </div>
                            <Progress value={results.pageSpeedData.desktop.scores.accessibility} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-3">Performance Recommendations</h3>
                  <ul className="space-y-2">
                    {results.recommendations
                      .filter(
                        (rec) =>
                          rec.title.toLowerCase().includes("speed") ||
                          rec.title.toLowerCase().includes("load") ||
                          rec.title.toLowerCase().includes("performance") ||
                          rec.title.toLowerCase().includes("optimize"),
                      )
                      .slice(0, 5)
                      .map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 p-3 border rounded-md">
                          <div className={`mt-1 ${getPriorityColor(rec.priority)}`}>
                            {rec.priority === "high" ? (
                              <XCircle className="h-4 w-4" />
                            ) : rec.priority === "medium" ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Info className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{rec.title}</p>
                            <p className="text-sm text-gray-600">{rec.description}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Prioritized Recommendations</h3>
                  <div className="space-y-4">
                    {results.recommendations.map((rec, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 ${getPriorityColor(rec.priority)}`}>
                              {rec.priority === "high" ? (
                                <XCircle className="h-5 w-5" />
                              ) : rec.priority === "medium" ? (
                                <AlertCircle className="h-5 w-5" />
                              ) : (
                                <Info className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{rec.title}</h4>
                                {getPriorityBadge(rec.priority)}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Keyword Analysis</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead className="text-right">Relevance</TableHead>
                        <TableHead className="text-right">Competition</TableHead>
                        <TableHead className="text-right">Search Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.keywords.map((keyword, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{keyword.keyword}</TableCell>
                          <TableCell className="text-right">{keyword.relevance}%</TableCell>
                          <TableCell className="text-right">{keyword.competition}%</TableCell>
                          <TableCell className="text-right">{keyword.volume.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Keyword Recommendations</h3>
                  <ul className="space-y-2">
                    <li className="p-3 border rounded-md">
                      <p className="font-medium">Optimize for primary keywords</p>
                      <p className="text-sm text-gray-600">
                        Focus on keywords with high relevance and search volume but lower competition.
                      </p>
                    </li>
                    <li className="p-3 border rounded-md">
                      <p className="font-medium">Include keywords in important HTML elements</p>
                      <p className="text-sm text-gray-600">
                        Use keywords in title tags, meta descriptions, headings, and URL structures.
                      </p>
                    </li>
                    <li className="p-3 border rounded-md">
                      <p className="font-medium">Create content around related keywords</p>
                      <p className="text-sm text-gray-600">
                        Develop comprehensive content that naturally incorporates related keywords.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
