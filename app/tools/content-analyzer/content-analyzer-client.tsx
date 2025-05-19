"use client"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Loader2, Check, AlertCircle, X, BookOpen, Search, Download } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContentAnalysisResult {
  text: string
  targetKeyword: string
  wordCount: number
  readabilityScore: number
  readabilityLevel: string
  seoScore: number
  keywordDensity: number
  keywordOccurrences: number
  estimatedReadTime: number
  topKeywords: { keyword: string; occurrences: number; density: number }[]
  sentenceCount: number
  avgSentenceLength: number
  paragraphCount: number
  headingCount: number
  issues: {
    critical: { title: string; description: string }[]
    warnings: { title: string; description: string }[]
    improvements: { title: string; description: string }[]
    passed: { title: string; description: string }[]
  }
}

export function ContentAnalyzerClient() {
  const [content, setContent] = useState("")
  const [targetKeyword, setTargetKeyword] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ContentAnalysisResult | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) return

    setIsAnalyzing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Analyze the content
    const analysisResults = analyzeContent(content, targetKeyword)
    setResults(analysisResults)
    setIsAnalyzing(false)
  }

  const analyzeContent = (text: string, keyword: string): ContentAnalysisResult => {
    // Basic text analysis
    const words = text.split(/\s+/).filter((word) => word.length > 0)
    const wordCount = words.length
    const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
    const sentenceCount = sentences.length
    const avgSentenceLength = wordCount / (sentenceCount || 1)
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0)
    const paragraphCount = paragraphs.length
    const headingMatches = text.match(/#{1,6}\s+.+/gm) || []
    const headingCount = headingMatches.length

    // Estimate reading time (average reading speed: 200-250 words per minute)
    const readingSpeed = 225
    const estimatedReadTime = Math.max(1, Math.ceil(wordCount / readingSpeed))

    // Keyword analysis
    const keywordRegex = new RegExp(keyword, "gi")
    const keywordOccurrences = keyword ? (text.match(keywordRegex) || []).length : 0
    const keywordDensity = keyword ? (keywordOccurrences / wordCount) * 100 : 0

    // Find top keywords (excluding common words)
    const commonWords = new Set([
      "the",
      "and",
      "a",
      "an",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "as",
      "is",
      "are",
      "was",
      "were",
      "be",
      "this",
      "that",
      "it",
      "from",
      "or",
      "but",
    ])
    const wordFrequency: Record<string, number> = {}
    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w\s]/g, "")
      if (cleanWord.length > 2 && !commonWords.has(cleanWord)) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1
      }
    })

    const topKeywords = Object.entries(wordFrequency)
      .map(([keyword, occurrences]) => ({
        keyword,
        occurrences,
        density: (occurrences / wordCount) * 100,
      }))
      .sort((a, b) => b.occurrences - a.occurrences)
      .slice(0, 10)

    // Calculate readability score (simplified Flesch-Kincaid)
    const syllableCount = estimateSyllables(text)
    const readabilityScore = Math.min(
      100,
      Math.max(0, 206.835 - 1.015 * (wordCount / (sentenceCount || 1)) - 84.6 * (syllableCount / (wordCount || 1))),
    )

    let readabilityLevel = ""
    if (readabilityScore >= 90) readabilityLevel = "Very Easy"
    else if (readabilityScore >= 80) readabilityLevel = "Easy"
    else if (readabilityScore >= 70) readabilityLevel = "Fairly Easy"
    else if (readabilityScore >= 60) readabilityLevel = "Standard"
    else if (readabilityScore >= 50) readabilityLevel = "Fairly Difficult"
    else if (readabilityScore >= 30) readabilityLevel = "Difficult"
    else readabilityLevel = "Very Difficult"

    // Calculate SEO score
    let seoScore = 70 // Base score

    // Identify issues
    const issues = {
      critical: [] as { title: string; description: string }[],
      warnings: [] as { title: string; description: string }[],
      improvements: [] as { title: string; description: string }[],
      passed: [] as { title: string; description: string }[],
    }

    // Word count checks
    if (wordCount < 300) {
      issues.critical.push({
        title: "Content is too short",
        description: "Content with fewer than 300 words is unlikely to rank well. Aim for at least 600-800 words.",
      })
      seoScore -= 15
    } else if (wordCount < 600) {
      issues.warnings.push({
        title: "Content could be longer",
        description: "Consider expanding your content to at least 600-800 words for better ranking potential.",
      })
      seoScore -= 5
    } else {
      issues.passed.push({
        title: "Good content length",
        description: `Your content has ${wordCount} words, which is a good length for SEO.`,
      })
      seoScore += 5
    }

    // Keyword checks
    if (keyword) {
      if (keywordDensity > 3) {
        issues.warnings.push({
          title: "Keyword density too high",
          description:
            `Your keyword density is ${keywordDensity.toFixed(1)}%, which may be considered keyword stuffing. ` +
            "Aim for 1-2% keyword density.",
        })
        seoScore -= 10
      } else if (keywordDensity < 0.5) {
        issues.warnings.push({
          title: "Keyword density too low",
          description:
            `Your keyword density is ${keywordDensity.toFixed(1)}%, which is quite low. ` +
            "Consider using your target keyword more frequently.",
        })
        seoScore -= 5
      } else {
        issues.passed.push({
          title: "Good keyword density",
          description: `Your keyword density is ${keywordDensity.toFixed(1)}%, which is optimal.`,
        })
        seoScore += 5
      }

      // Check if keyword is in the first paragraph
      const firstParagraph = paragraphs[0] || ""
      if (!firstParagraph.toLowerCase().includes(keyword.toLowerCase())) {
        issues.improvements.push({
          title: "Keyword missing from introduction",
          description: "Include your target keyword in the first paragraph to establish relevance early.",
        })
        seoScore -= 3
      } else {
        issues.passed.push({
          title: "Keyword in introduction",
          description: "Your target keyword appears in the introduction, which is good for SEO.",
        })
        seoScore += 3
      }
    } else {
      issues.warnings.push({
        title: "No target keyword specified",
        description: "Specify a target keyword to get more accurate SEO recommendations.",
      })
      seoScore -= 5
    }

    // Readability checks
    if (readabilityScore < 50) {
      issues.warnings.push({
        title: "Content is difficult to read",
        description:
          "Your content may be too complex for the average reader. Consider simplifying your language and shortening sentences.",
      })
      seoScore -= 5
    } else {
      issues.passed.push({
        title: "Good readability",
        description: `Your content has a readability score of ${Math.round(
          readabilityScore,
        )}, making it accessible to most readers.`,
      })
      seoScore += 5
    }

    // Sentence length checks
    if (avgSentenceLength > 25) {
      issues.improvements.push({
        title: "Sentences are too long",
        description:
          `Your average sentence length is ${avgSentenceLength.toFixed(1)} words. ` +
          "Consider breaking up longer sentences for better readability.",
      })
      seoScore -= 3
    } else {
      issues.passed.push({
        title: "Good sentence length",
        description: `Your average sentence length is ${avgSentenceLength.toFixed(1)} words, which is good for readability.`,
      })
      seoScore += 3
    }

    // Heading checks
    if (headingCount === 0) {
      issues.critical.push({
        title: "No headings found",
        description: "Using headings (H1, H2, H3, etc.) helps structure your content and improves SEO.",
      })
      seoScore -= 10
    } else if (wordCount > 300 && headingCount < 2) {
      issues.warnings.push({
        title: "Not enough headings",
        description: "For content of this length, consider using more headings to break up your text.",
      })
      seoScore -= 5
    } else {
      issues.passed.push({
        title: "Good use of headings",
        description: `Your content has ${headingCount} headings, which helps structure your content.`,
      })
      seoScore += 5
    }

    // Paragraph checks
    if (paragraphCount > 0) {
      const avgParagraphLength = wordCount / paragraphCount
      if (avgParagraphLength > 100) {
        issues.improvements.push({
          title: "Paragraphs are too long",
          description:
            `Your average paragraph is ${avgParagraphLength.toFixed(0)} words. ` +
            "Consider breaking up longer paragraphs for better readability.",
        })
        seoScore -= 3
      } else {
        issues.passed.push({
          title: "Good paragraph length",
          description: `Your average paragraph is ${avgParagraphLength.toFixed(0)} words, which is good for readability.`,
        })
        seoScore += 3
      }
    }

    // Ensure score is within bounds
    seoScore = Math.min(100, Math.max(0, seoScore))

    return {
      text,
      targetKeyword: keyword,
      wordCount,
      readabilityScore,
      readabilityLevel,
      seoScore,
      keywordDensity,
      keywordOccurrences,
      estimatedReadTime,
      topKeywords,
      sentenceCount,
      avgSentenceLength,
      paragraphCount,
      headingCount,
      issues,
    }
  }

  // Helper function to estimate syllables in text
  const estimateSyllables = (text: string): number => {
    const words = text.split(/\s+/).filter((word) => word.length > 0)
    let syllableCount = 0

    words.forEach((word) => {
      word = word.toLowerCase().replace(/[^a-z]/g, "")
      if (!word) return

      // Count vowel groups
      const vowelGroups = word.match(/[aeiouy]+/g) || []
      let count = vowelGroups.length

      // Adjust for common patterns
      if (word.endsWith("e")) count--
      if (word.endsWith("le") && word.length > 2) count++
      if (word.endsWith("es") || word.endsWith("ed")) count--
      if (count <= 0) count = 1

      syllableCount += count
    })

    return syllableCount
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const handleExport = () => {
    if (!results) return

    // Create text content for export
    const content = `
Content Analysis Report
=======================

URL: [Your URL]
Date: ${new Date().toLocaleDateString()}

OVERVIEW
--------
Word Count: ${results.wordCount}
SEO Score: ${results.seoScore}/100
Readability Score: ${results.readabilityScore.toFixed(1)}/100 (${results.readabilityLevel})
Target Keyword: ${results.targetKeyword || "Not specified"}
Keyword Density: ${results.keywordDensity.toFixed(2)}%
Estimated Reading Time: ${results.estimatedReadTime} minute${results.estimatedReadTime !== 1 ? "s" : ""}

CONTENT STATISTICS
-----------------
Sentences: ${results.sentenceCount}
Average Sentence Length: ${results.avgSentenceLength.toFixed(1)} words
Paragraphs: ${results.paragraphCount}
Headings: ${results.headingCount}

TOP KEYWORDS
-----------
${results.topKeywords
  .map((kw) => `${kw.keyword}: ${kw.occurrences} occurrences (${kw.density.toFixed(2)}%)`)
  .join("\n")}

ISSUES
------
Critical Issues:
${
  results.issues.critical.length > 0
    ? results.issues.critical.map((issue) => `- ${issue.title}: ${issue.description}`).join("\n")
    : "None"
}

Warnings:
${
  results.issues.warnings.length > 0
    ? results.issues.warnings.map((issue) => `- ${issue.title}: ${issue.description}`).join("\n")
    : "None"
}

Improvements:
${
  results.issues.improvements.length > 0
    ? results.issues.improvements.map((issue) => `- ${issue.title}: ${issue.description}`).join("\n")
    : "None"
}

Passed Checks:
${
  results.issues.passed.length > 0
    ? results.issues.passed.map((issue) => `- ${issue.title}: ${issue.description}`).join("\n")
    : "None"
}

ANALYZED CONTENT
---------------
${results.text}
`

    // Create a blob and download
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "content-analysis-report.txt")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analyze Content</CardTitle>
          <CardDescription>Paste your content to analyze its SEO potential and readability.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <Input
                placeholder="Target keyword (optional)"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                disabled={isAnalyzing}
                className="mb-4"
              />
              <Textarea
                placeholder="Paste your content here..."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isAnalyzing || !content}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Content"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <div className="text-center p-12 border rounded-lg bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-500">Analyzing your content. This may take a moment...</p>
        </div>
      )}

      {!isAnalyzing && !results && (
        <div className="text-center p-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">Paste your content above to see analysis results.</p>
        </div>
      )}

      {!isAnalyzing && results && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Content Analysis Results</h2>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Search className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">SEO Score</h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-3xl font-bold ${getScoreColor(results.seoScore)}`}>{results.seoScore}</p>
                    <Badge
                      variant={
                        results.seoScore >= 80 ? "default" : results.seoScore >= 60 ? "secondary" : "destructive"
                      }
                    >
                      {results.seoScore >= 80 ? "Good" : results.seoScore >= 60 ? "Average" : "Poor"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">Readability</h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-3xl font-bold ${getScoreColor(results.readabilityScore)}`}>
                      {Math.round(results.readabilityScore)}
                    </p>
                    <Badge
                      variant={
                        results.readabilityScore >= 80
                          ? "default"
                          : results.readabilityScore >= 60
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {results.readabilityLevel}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">Content Stats</h3>
                  <p className="text-3xl font-bold">{results.wordCount}</p>
                  <p className="text-sm text-gray-500">
                    {results.estimatedReadTime} min read • {results.sentenceCount} sentences
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
              <TabsTrigger value="readability">Readability</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Content Overview</CardTitle>
                  <CardDescription>Summary of your content's performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Content Statistics</h3>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-500">Word Count:</span>
                            <span className="font-medium">{results.wordCount}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Sentences:</span>
                            <span className="font-medium">{results.sentenceCount}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Paragraphs:</span>
                            <span className="font-medium">{results.paragraphCount}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Headings:</span>
                            <span className="font-medium">{results.headingCount}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">Reading Time:</span>
                            <span className="font-medium">{results.estimatedReadTime} min</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Keyword Analysis</h3>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-500">Target Keyword:</span>
                            <span className="font-medium">{results.targetKeyword || "Not specified"}</span>
                          </li>
                          {results.targetKeyword && (
                            <>
                              <li className="flex justify-between">
                                <span className="text-gray-500">Keyword Occurrences:</span>
                                <span className="font-medium">{results.keywordOccurrences}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-gray-500">Keyword Density:</span>
                                <span className="font-medium">{results.keywordDensity.toFixed(2)}%</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Issues Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <X className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium">Critical</p>
                            <p className="text-2xl font-bold">{results.issues.critical.length}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="text-sm font-medium">Warnings</p>
                            <p className="text-2xl font-bold">{results.issues.warnings.length}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">Improvements</p>
                            <p className="text-2xl font-bold">{results.issues.improvements.length}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Passed</p>
                            <p className="text-2xl font-bold">{results.issues.passed.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Analysis</CardTitle>
                  <CardDescription>How well your content is optimized for search engines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">SEO Score</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreBackgroundColor(results.seoScore)}`}
                            style={{ width: `${results.seoScore}%` }}
                          ></div>
                        </div>
                        <span className={`font-bold ${getScoreColor(results.seoScore)}`}>{results.seoScore}/100</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {results.issues.critical.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium flex items-center mb-2">
                            <X className="h-4 w-4 text-red-500 mr-2" />
                            Critical Issues
                          </h4>
                          <ul className="space-y-2">
                            {results.issues.critical.map((issue, index) => (
                              <li key={index} className="p-3 border rounded-md">
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-sm text-gray-600">{issue.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {results.issues.warnings.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium flex items-center mb-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                            Warnings
                          </h4>
                          <ul className="space-y-2">
                            {results.issues.warnings.map((issue, index) => (
                              <li key={index} className="p-3 border rounded-md">
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-sm text-gray-600">{issue.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {results.issues.improvements.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium flex items-center mb-2">
                            <FileText className="h-4 w-4 text-blue-500 mr-2" />
                            Improvements
                          </h4>
                          <ul className="space-y-2">
                            {results.issues.improvements.map((issue, index) => (
                              <li key={index} className="p-3 border rounded-md">
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-sm text-gray-600">{issue.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {results.issues.passed.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium flex items-center mb-2">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Passed Checks
                          </h4>
                          <ul className="space-y-2">
                            {results.issues.passed.map((issue, index) => (
                              <li key={index} className="p-3 border rounded-md">
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-sm text-gray-600">{issue.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="readability">
              <Card>
                <CardHeader>
                  <CardTitle>Readability Analysis</CardTitle>
                  <CardDescription>How easy your content is to read and understand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 flex items-center justify-center">
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
                            className={`${getScoreBackgroundColor(results.readabilityScore)} stroke-current`}
                            strokeWidth="10"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray={`${results.readabilityScore * 2.51} 251.2`}
                            strokeDashoffset="0"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-3xl font-bold ${getScoreColor(results.readabilityScore)}`}>
                            {Math.round(results.readabilityScore)}
                          </span>
                          <span className="text-sm">{results.readabilityLevel}</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-500">
                        {results.readabilityScore >= 80
                          ? "Your content is very easy to read and understand."
                          : results.readabilityScore >= 60
                            ? "Your content is reasonably easy to read."
                            : "Your content may be difficult for some readers."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Sentence Analysis</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Sentence Count</span>
                              <span className="text-sm font-medium">{results.sentenceCount}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Average Sentence Length</span>
                              <span className="text-sm font-medium">{results.avgSentenceLength.toFixed(1)} words</span>
                            </div>
                            <Progress
                              value={Math.min(100, (results.avgSentenceLength / 25) * 100)}
                              className={`h-2 ${
                                results.avgSentenceLength > 25
                                  ? "bg-red-500"
                                  : results.avgSentenceLength > 20
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {results.avgSentenceLength > 25
                                ? "Too long. Aim for 15-20 words per sentence on average."
                                : results.avgSentenceLength > 20
                                  ? "Slightly long. Consider shortening some sentences."
                                  : "Good length. Easy to read and understand."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Structure Analysis</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Paragraph Count</span>
                              <span className="text-sm font-medium">{results.paragraphCount}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Heading Count</span>
                              <span className="text-sm font-medium">{results.headingCount}</span>
                            </div>
                            <Progress
                              value={Math.min(100, (results.headingCount / Math.max(1, results.wordCount / 200)) * 100)}
                              className={`h-2 ${
                                results.headingCount < Math.max(1, Math.floor(results.wordCount / 300))
                                  ? "bg-red-500"
                                  : "bg-green-500"
                              }`}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {results.headingCount < Math.max(1, Math.floor(results.wordCount / 300))
                                ? "Not enough headings. Add more to improve structure."
                                : "Good use of headings to structure your content."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Reading Level</h3>
                      <p className="text-sm text-gray-600">
                        Your content is written at a{" "}
                        <span className="font-medium">
                          {results.readabilityLevel === "Very Easy"
                            ? "5th grade"
                            : results.readabilityLevel === "Easy"
                              ? "6th grade"
                              : results.readabilityLevel === "Fairly Easy"
                                ? "7th grade"
                                : results.readabilityLevel === "Standard"
                                  ? "8-9th grade"
                                  : results.readabilityLevel === "Fairly Difficult"
                                    ? "10-12th grade"
                                    : results.readabilityLevel === "Difficult"
                                      ? "college"
                                      : "graduate"}
                        </span>{" "}
                        level.{" "}
                        {results.readabilityScore >= 60
                          ? "This is appropriate for a general audience."
                          : "This may be too complex for a general audience."}
                      </p>
                      <div className="mt-4">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Very Easy</span>
                          <span>Standard</span>
                          <span>Very Difficult</span>
                        </div>
                        <div
                          className="relative h-4 mt-1"
                          style={{
                            left: `${Math.min(98, Math.max(0, 100 - results.readabilityScore))}%`,
                          }}
                        >
                          <div className="absolute transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Readability Tips</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-medium">Use short sentences and paragraphs</span> to improve
                            readability.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-medium">Use simple words</span> instead of complex ones when possible.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-medium">Break up text with headings</span> to create a clear
                            structure.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-medium">Use bullet points and lists</span> to present information
                            clearly.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keywords">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Analysis</CardTitle>
                  <CardDescription>How well your content uses keywords</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.targetKeyword && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Target Keyword Analysis</h3>
                        <div className="p-4 border rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{results.targetKeyword}</span>
                            <Badge
                              variant={
                                results.keywordDensity > 3
                                  ? "destructive"
                                  : results.keywordDensity < 0.5
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {results.keywordDensity > 3
                                ? "Too High"
                                : results.keywordDensity < 0.5
                                  ? "Too Low"
                                  : "Optimal"}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Occurrences</span>
                                <span>{results.keywordOccurrences}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Density</span>
                                <span>{results.keywordDensity.toFixed(2)}%</span>
                              </div>
                              <Progress
                                value={Math.min(100, results.keywordDensity * 33.3)}
                                className={`h-2 ${
                                  results.keywordDensity > 3
                                    ? "bg-red-500"
                                    : results.keywordDensity < 0.5
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                {results.keywordDensity > 3
                                  ? "Keyword density is too high, which may be seen as keyword stuffing."
                                  : results.keywordDensity < 0.5
                                    ? "Keyword density is too low. Consider using your keyword more often."
                                    : "Keyword density is optimal (0.5-3%)."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium mb-2">Top Keywords in Your Content</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Keyword</TableHead>
                            <TableHead className="text-right">Occurrences</TableHead>
                            <TableHead className="text-right">Density</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.topKeywords.map((keyword, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{keyword.keyword}</TableCell>
                              <TableCell className="text-right">{keyword.occurrences}</TableCell>
                              <TableCell className="text-right">{keyword.density.toFixed(2)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Keyword Recommendations</h3>
                      <ul className="space-y-2">
                        <li className="p-3 border rounded-md">
                          <p className="font-medium">Use your target keyword in important places</p>
                          <p className="text-sm text-gray-600">
                            Include your target keyword in the title, headings, first paragraph, and throughout the
                            content naturally.
                          </p>
                        </li>
                        <li className="p-3 border rounded-md">
                          <p className="font-medium">Include related keywords</p>
                          <p className="text-sm text-gray-600">
                            Use synonyms and related terms to enhance topical relevance and avoid keyword stuffing.
                          </p>
                        </li>
                        <li className="p-3 border rounded-md">
                          <p className="font-medium">Maintain natural language</p>
                          <p className="text-sm text-gray-600">
                            Write for humans first, search engines second. Content should read naturally.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  )
}
