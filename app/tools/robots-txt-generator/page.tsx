import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata = {
  title: "Robots.txt Generator - SiteForge",
  description: "Create a robots.txt file to control search engine crawling of your site.",
}

export default function RobotsTxtGeneratorPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Robots.txt Generator</h1>
            <p className="mt-4 text-xl text-gray-500">
              Create a robots.txt file to control search engine crawling of your site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Configure Robots.txt</CardTitle>
                  <CardDescription>Set up rules for search engine crawlers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sitemap URL</label>
                      <Input placeholder="e.g., https://example.com/sitemap.xml" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">User-agent Rules</label>
                        <Button variant="outline" size="sm" className="h-8">
                          <Plus className="h-4 w-4 mr-1" /> Add Rule
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-md p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Rule 1</h4>
                            <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">User-agent</label>
                            <Input placeholder="e.g., Googlebot or * for all bots" defaultValue="*" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Disallow Paths (one per line)</label>
                            <Textarea
                              placeholder="/admin/&#10;/private/&#10;/tmp/"
                              className="min-h-[100px] font-mono"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Allow Paths (one per line)</label>
                            <Textarea placeholder="/blog/&#10;/products/" className="min-h-[100px] font-mono" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Crawl-delay</label>
                      <Input type="number" min="1" placeholder="e.g., 10" />
                      <p className="text-xs text-gray-500">
                        Number of seconds between requests (supported by some crawlers)
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="noindex" />
                      <label
                        htmlFor="noindex"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Add noindex directive (not standard but used by some crawlers)
                      </label>
                    </div>

                    <div className="pt-2">
                      <Button>Generate Robots.txt</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generated Robots.txt</CardTitle>
                  <CardDescription>Copy and save this as robots.txt in your root directory.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {`# robots.txt generated by SiteForge
# https://siteforge.diy

User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /blog/
Allow: /products/

Sitemap: https://example.com/sitemap.xml`}
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
                  <CardDescription>Follow these steps to implement your robots.txt file.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Copy the generated robots.txt content.</li>
                    <li>Create a new file named "robots.txt".</li>
                    <li>Paste the content into the file.</li>
                    <li>Upload the file to your website's root directory.</li>
                    <li>
                      Verify it's accessible at <code>https://yourdomain.com/robots.txt</code>.
                    </li>
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
