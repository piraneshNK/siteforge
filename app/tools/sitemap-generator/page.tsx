import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata = {
  title: "XML Sitemap Generator - SiteForge",
  description: "Generate an XML sitemap to help search engines discover your content.",
}

export default function SitemapGeneratorPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">XML Sitemap Generator</h1>
            <p className="mt-4 text-xl text-gray-500">
              Generate an XML sitemap to help search engines discover your content.
            </p>
          </div>

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
                      <Input placeholder="e.g., https://example.com" />
                      <p className="text-xs text-gray-500">This is the base URL of your website.</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">URLs to Include</label>
                        <Button variant="outline" size="sm" className="h-8">
                          <Plus className="h-4 w-4 mr-1" /> Add URL
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-md p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">URL 1</h4>
                            <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Path</label>
                            <Input placeholder="e.g., /about or /blog/post-1" defaultValue="/" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Priority</label>
                              <Select defaultValue="0.8">
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
                              <Select defaultValue="weekly">
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
                            <Input type="date" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button>Generate Sitemap</Button>
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
                  <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2023-07-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}
                    </pre>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline">Copy to Clipboard</Button>
                  </div>
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
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
