import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Meta Tag Generator - SiteForge",
  description: "Create optimized meta tags for better search engine visibility.",
}

export default function MetaTagGeneratorPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meta Tag Generator</h1>
            <p className="mt-4 text-xl text-gray-500">
              Create optimized meta tags for better search engine visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create Meta Tags</CardTitle>
                  <CardDescription>Fill in the details to generate optimized meta tags.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Page Title
                      </label>
                      <Input id="title" placeholder="Enter page title (50-60 characters)" />
                      <p className="text-xs text-gray-500">
                        Recommended length: 50-60 characters. Current: 0 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Meta Description
                      </label>
                      <Textarea id="description" placeholder="Enter meta description (150-160 characters)" />
                      <p className="text-xs text-gray-500">
                        Recommended length: 150-160 characters. Current: 0 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="keywords" className="text-sm font-medium">
                        Keywords (comma separated)
                      </label>
                      <Input id="keywords" placeholder="e.g., seo, meta tags, search engine" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="canonical" className="text-sm font-medium">
                        Canonical URL (optional)
                      </label>
                      <Input id="canonical" placeholder="e.g., https://example.com/page" />
                    </div>

                    <div className="pt-2">
                      <Button>Generate Meta Tags</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generated Meta Tags</CardTitle>
                  <CardDescription>Copy and paste these tags into your HTML head section.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{`<!-- Meta tags will appear here after generation -->`}</pre>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline">Copy to Clipboard</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your page might appear in search results.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border p-4 rounded-md">
                    <div className="text-blue-600 text-lg font-medium">Page Title</div>
                    <div className="text-green-700 text-sm">https://example.com/page</div>
                    <div className="text-gray-600 text-sm mt-1">
                      Your meta description will appear here. Make it compelling to increase click-through rates.
                    </div>
                  </div>
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
