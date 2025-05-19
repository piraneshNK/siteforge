"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, ExternalLink, Download, Loader2, BarChart2, Shield, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

interface Backlink {
  url: string
  title: string
  domain: string
  authority: number
  anchor: string
  type: "dofollow" | "nofollow" | "ugc" | "sponsored"
  firstSeen: string
  lastSeen: string
}

interface BacklinkData {
  domain: string
  totalBacklinks: number
  uniqueDomains: number
  dofollowLinks: number
  nofollowLinks: number
  domainAuthority: number
  topAnchors: { text: string; count: number }[]
  topLinkingDomains: { domain: string; links: number; authority: number }[]
  backlinks: Backlink[]
}

interface BacklinkCheckerClientProps {
  initialDomain?: string
}

export function BacklinkCheckerClient({ initialDomain = "" }: BacklinkCheckerClientProps) {
  const [domain, setDomain] = useState(initialDomain)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<BacklinkData | null>(null)
  const router = useRouter()

  // Use the initialDomain prop instead of useSearchParams
  useEffect(() => {
    if (initialDomain) {
      handleAnalyze(initialDomain)
    }
  }, [initialDomain])

  const handleAnalyze = async (analyzeDomain?: string) => {
    const domainToAnalyze = analyzeDomain || domain
    if (!domainToAnalyze) return

    setIsLoading(true)

    // Update the URL with the domain parameter
    if (analyzeDomain !== initialDomain) {
      router.push(`/tools/backlink-checker?domain=${encodeURIComponent(domainToAnalyze)}`)
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock data based on the domain
    const mockResults = generateMockBacklinkData(domainToAnalyze)
    setResults(mockResults)
    setIsLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAnalyze()
  }

  const generateMockBacklinkData = (domain: string): BacklinkData => {
    // Generate deterministic but seemingly random values based on the domain
    const hash = hashString(domain)
    const totalBacklinks = 50 + (hash % 950) // 50-1000
    const uniqueDomains = 10 + (hash % Math.floor(totalBacklinks / 2)) // 10-500
    const dofollowLinks = Math.floor(totalBacklinks * (0.6 + (hash % 30) / 100)) // 60-90% of total
    const nofollowLinks = totalBacklinks - dofollowLinks
    const domainAuthority = 20 + (hash % 60) // 20-80

    // Generate backlinks
    const backlinks: Backlink[] = []
    const domains = [
      "example.com",
      "blog.com",
      "news.org",
      "reference.net",
      "directory.io",
      "review.co",
      "forum.org",
      "social.net",
      "partner.com",
      "industry.org",
    ]

    const anchorTexts = [
      domain,
      `${domain} review`,
      `best ${domain}`,
      `${domain} alternative`,
      "click here",
      "read more",
      "website",
      "learn more",
      "official site",
      "visit now",
    ]

    for (let i = 0; i < Math.min(totalBacklinks, 50); i++) {
      const linkDomain = domains[hash % domains.length]
      const path = ["blog", "article", "news", "review", "post", "page"][hash % 6]
      const id = ((hash + i) % 1000) + 1
      const anchor = anchorTexts[(hash + i) % anchorTexts.length]
      const type = ["dofollow", "nofollow", "ugc", "sponsored"][
        hash % 10 < 7 ? 0 : hash % 10 < 9 ? 1 : hash % 10 < 10 ? 2 : 3
      ] as "dofollow" | "nofollow" | "ugc" | "sponsored"

      // Generate dates within the last year
      const now = new Date()
      const firstSeenDate = new Date(now.getTime() - (hash % 365) * 24 * 60 * 60 * 1000)
      const lastSeenDate = new Date(firstSeenDate.getTime() + ((hash + i) % (now.getTime() - firstSeenDate.getTime())))

      backlinks.push({
        url: `https://${linkDomain}/${path}/${id}`,
        title: `${
          ["The Complete Guide to", "Why You Should Use", "How to Get Started with", "Review of", "Top Tips for"][
            (hash + i) % 5
          ]
        } ${domain}`,
        domain: linkDomain,
        authority: 10 + ((hash + i) % 80),
        anchor,
        type,
        firstSeen: firstSeenDate.toISOString().split("T")[0],
        lastSeen: lastSeenDate.toISOString().split("T")[0],
      })
    }

    // Count anchor text occurrences
    const anchorCounts: Record<string, number> = {}
    backlinks.forEach((link) => {
      anchorCounts[link.anchor] = (anchorCounts[link.anchor] || 0) + 1
    })

    // Count domain occurrences
    const domainCounts: Record<string, { count: number; authority: number }> = {}
    backlinks.forEach((link) => {
      if (!domainCounts[link.domain]) {
        domainCounts[link.domain] = { count: 0, authority: link.authority }
      }
      domainCounts[link.domain].count += 1
    })

    return {
      domain,
      totalBacklinks,
      uniqueDomains,
      dofollowLinks,
      nofollowLinks,
      domainAuthority,
      topAnchors: Object.entries(anchorCounts)
        .map(([text, count]) => ({ text, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      topLinkingDomains: Object.entries(domainCounts)
        .map(([domain, { count, authority }]) => ({ domain, links: count, authority }))
        .sort((a, b) => b.links - a.links)
        .slice(0, 5),
      backlinks,
    }
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

  const getAuthorityColor = (authority: number) => {
    if (authority < 30) return "bg-red-500"
    if (authority < 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getAuthorityLabel = (authority: number) => {
    if (authority < 30) return "Low"
    if (authority < 60) return "Medium"
    return "High"
  }

  const handleExport = () => {
    if (!results) return

    // Create CSV content
    const headers = ["URL", "Title", "Domain", "Authority", "Anchor Text", "Link Type", "First Seen", "Last Seen"]
    const csvContent =
      headers.join(",") +
      "\n" +
      results.backlinks
        .map((link) => {
          return `"${link.url}","${link.title}","${link.domain}",${link.authority},"${link.anchor}","${link.type}","${link.firstSeen}","${link.lastSeen}"`
        })
        .join("\n")

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `backlinks-${domain.replace(/\./g, "-")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Check Backlinks</CardTitle>
          <CardDescription>Enter a domain to analyze its backlink profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  placeholder="Enter a domain (e.g., example.com)"
                  className="pl-10 flex-1"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center p-12 border rounded-lg bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-500">Analyzing backlinks. This may take a moment...</p>
        </div>
      )}

      {!isLoading && !results && (
        <div className="text-center p-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500">Enter a domain above to see backlink analysis.</p>
        </div>
      )}

      {!isLoading && results && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Results for {results.domain}</h2>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <BarChart2 className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">Total Backlinks</h3>
                  <p className="text-3xl font-bold">{results.totalBacklinks.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Link2 className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">Referring Domains</h3>
                  <p className="text-3xl font-bold">{results.uniqueDomains.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">Domain Authority</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold">{results.domainAuthority}</p>
                    <Badge
                      variant={
                        results.domainAuthority < 30
                          ? "destructive"
                          : results.domainAuthority < 60
                            ? "secondary"
                            : "default"
                      }
                    >
                      {getAuthorityLabel(results.domainAuthority)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Link Types</CardTitle>
              <CardDescription>Distribution of dofollow vs. nofollow links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Dofollow Links</span>
                    <span>
                      {results.dofollowLinks.toLocaleString()} (
                      {Math.round((results.dofollowLinks / results.totalBacklinks) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(results.dofollowLinks / results.totalBacklinks) * 100}
                    className="h-2 bg-green-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Nofollow Links</span>
                    <span>
                      {results.nofollowLinks.toLocaleString()} (
                      {Math.round((results.nofollowLinks / results.totalBacklinks) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(results.nofollowLinks / results.totalBacklinks) * 100}
                    className="h-2 bg-yellow-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Anchor Texts</CardTitle>
                <CardDescription>Most common link texts pointing to your site</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Anchor Text</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.topAnchors.map((anchor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{anchor.text}</TableCell>
                        <TableCell className="text-right">{anchor.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Linking Domains</CardTitle>
                <CardDescription>Domains with the most links to your site</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead className="text-right">Links</TableHead>
                      <TableHead className="text-right">Authority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.topLinkingDomains.map((domain, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{domain.domain}</TableCell>
                        <TableCell className="text-right">{domain.links}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span>{domain.authority}</span>
                            <Badge
                              variant={
                                domain.authority < 30 ? "destructive" : domain.authority < 60 ? "secondary" : "default"
                              }
                            >
                              {getAuthorityLabel(domain.authority)}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Backlink Details</CardTitle>
              <CardDescription>Individual backlinks pointing to your domain</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Links</TabsTrigger>
                  <TabsTrigger value="dofollow">Dofollow</TabsTrigger>
                  <TabsTrigger value="nofollow">Nofollow</TabsTrigger>
                </TabsList>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Anchor Text</TableHead>
                      <TableHead>Authority</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>First Seen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.backlinks
                      .filter((link) => {
                        if (TabsList.defaultValue === "dofollow") return link.type === "dofollow"
                        if (TabsList.defaultValue === "nofollow") return link.type !== "dofollow"
                        return true
                      })
                      .slice(0, 10)
                      .map((link, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline truncate max-w-[200px]"
                              >
                                {link.url}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{link.anchor}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-12">
                                <Progress
                                  value={link.authority}
                                  className={`h-2 ${getAuthorityColor(link.authority)}`}
                                />
                              </div>
                              <span>{link.authority}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                link.type === "dofollow"
                                  ? "default"
                                  : link.type === "nofollow"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {link.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{link.firstSeen}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {results.backlinks.length > 10 && (
                  <div className="text-center mt-4 text-sm text-gray-500">
                    Showing 10 of {results.backlinks.length} backlinks. Export to CSV for the full list.
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backlink Analysis</CardTitle>
              <CardDescription>Insights and recommendations for your backlink profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                    Link Diversity
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your site has {results.uniqueDomains} referring domains with {results.totalBacklinks} total
                    backlinks, giving you a link-to-domain ratio of{" "}
                    {(results.totalBacklinks / results.uniqueDomains).toFixed(1)}. A diverse backlink profile from many
                    domains is better than many links from few domains.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-500" />
                    Link Quality
                  </h3>
                  <p className="text-sm text-gray-600">
                    {Math.round((results.dofollowLinks / results.totalBacklinks) * 100)}% of your backlinks are
                    dofollow, which is{" "}
                    {Math.round((results.dofollowLinks / results.totalBacklinks) * 100) > 70
                      ? "excellent"
                      : Math.round((results.dofollowLinks / results.totalBacklinks) * 100) > 50
                        ? "good"
                        : "below average"}
                    . Dofollow links pass more SEO value than nofollow links.
                  </p>
                </div>

                {results.domainAuthority < 40 && (
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                      Authority Improvement
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your domain authority of {results.domainAuthority} is relatively low. Focus on acquiring more
                      high-quality backlinks from authoritative domains to improve this score.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
