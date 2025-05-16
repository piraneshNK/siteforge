import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Content Analyzer - SiteForge",
  description: "Optimize your content for better search engine rankings and readability.",
}

export default function ContentAnalyzerPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Content Analyzer</h1>
            <p className="mt-4 text-xl text-gray-500">
              Optimize your content for better search engine rankings and readability.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analyze Content</CardTitle>
              <CardDescription>Paste your content to analyze its SEO potential and readability.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea placeholder="Paste your content here..." className="min-h-[200px]" />
                <div className="flex justify-end">
                  <Button>Analyze Content</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Paste your content above to see analysis results.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
