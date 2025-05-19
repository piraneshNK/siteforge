"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Clipboard, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SitemapUrl {
  id: string
  path: string
  priority: string
  changeFreq: string
  lastMod: string
}

export function SitemapGeneratorClient() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [urls, setUrls] = useState<SitemapUrl[]>([
    {
      id: "url-1",
      path: "/",
      priority: "0.8",
      changeFreq: "weekly",
      lastMod: new Date().toISOString().split("T")[0],
    },
  ])
  const [generatedSitemap, setGeneratedSitemap] = useState("")
  const [copied, setCopied] = useState(false)

  const addUrl = () => {
    const newUrl: SitemapUrl = {
      id: `url-${urls.length + 1}`,
      path: "",
      priority: "0.5",
      changeFreq: "monthly",
      lastMod: new Date().toISOString().split("T")[0],
    }
    setUrls([...urls, newUrl])
  }

  const removeUrl = (id: string) => {
    setUrls(urls.filter((url) => url.id !== id))
  }

  const updateUrl = (id: string, field: keyof SitemapUrl, value: string) => {
    setUrls(
      urls.map((url) => {
        if (url.id === id) {
          return { ...url, [field]: value }
        }
        return url
      }),
    )
  }

  const generateSitemap = () => {
    if (!websiteUrl) return

    let baseUrl = websiteUrl
    if (!baseUrl.startsWith("http")) {
      baseUrl = `https://${baseUrl}`
    }
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1)
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

    urls.forEach((url) => {
      sitemap += `  <url>\n`
      sitemap += `    <loc>${baseUrl}${url.path}</loc>\n`
      if (url.lastMod) {
        sitemap += `    <lastmod>${url.lastMod}</lastmod>\n`
      }
      if (url.changeFreq) {
        sitemap += `    <changefreq>${url.changeFreq}</changefreq>\n`
      }
      if (url.priority) {
        sitemap += `    <priority>${url.priority}</priority>\n`
      }
      sitemap += `  </url>\n`
    })

    sitemap += `</urlset>`

    setGeneratedSitemap(sitemap)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSitemap)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Configure Sitemap</CardTitle>
            <CardDescription>Add URLs and set properties for your sitemap.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input
                  placeholder="e.g., https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500">This is the base URL of your website.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">URLs to Include</label>
                  <Button variant="outline" size="sm" className="h-8" onClick={addUrl}>
                    <Plus className="h-4 w-4 mr-1" /> Add URL
                  </Button>
                </div>

                <div className="space-y-4">
                  {urls.map((url) => (
                    <div key={url.id} className="border rounded-md p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">URL {url.id.split("-")[1]}</h4>
                        {urls.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-500 hover:text-red-700"
                            onClick={() => removeUrl(url.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Path</label>
                        <Input
                          placeholder="e.g., /about or /blog/post-1"
                          value={url.path}
                          onChange={(e) => updateUrl(url.id, "path", e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                          The path relative to your website URL (should start with /).
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Priority</label>
                          <Select value={url.priority} onValueChange={(value) => updateUrl(url.id, "priority", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                              <SelectItem value="0.8">0.8 (High)</SelectItem>
                              <SelectItem value="0.6">0.6 (Medium)</SelectItem>
                              <SelectItem value="0.4">0.4 (Low)</SelectItem>
                              <SelectItem value="0.2">0.2 (Lowest)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Change Frequency</label>
                          <Select
                            value={url.changeFreq}
                            onValueChange={(value) => updateUrl(url.id, "changeFreq", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="always">Always</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Modified</label>
                        <Input
                          type="date"
                          value={url.lastMod}
                          onChange={(e) => updateUrl(url.id, "lastMod", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={generateSitemap} disabled={!websiteUrl}>
                  Generate Sitemap
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Generated Sitemap</CardTitle>
            <CardDescription>Copy and save this as sitemap.xml in your root directory.</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedSitemap ? (
              <>
                <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{generatedSitemap}</pre>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Clipboard className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <p>Configure your sitemap settings on the left and click "Generate Sitemap" to see the result here.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
            <CardDescription>Follow these steps to implement your sitemap.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Copy the generated XML sitemap content.</li>
              <li>Create a new file named "sitemap.xml".</li>
              <li>Paste the content into the file.</li>
              <li>Upload the file to your website's root directory.</li>
              <li>
                Verify it's accessible at <code>https://yourdomain.com/sitemap.xml</code>.
              </li>
              <li>
                Add the sitemap URL to your robots.txt file:
                <pre className="mt-1 p-2 bg-gray-100 rounded">Sitemap: https://yourdomain.com/sitemap.xml</pre>
              </li>
              <li>Submit your sitemap to Google Search Console and Bing Webmaster Tools.</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
