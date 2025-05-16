import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Keyword Research Tool - SiteForge",
  description: "Find the best keywords to target for your content and SEO strategy.",
}

export default function KeywordResearchPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Keyword Research Tool</h1>
            <p className="mt-4 text-xl text-gray-500">
              Find the best keywords to target for your content and SEO strategy.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search for Keywords</CardTitle>
              <CardDescription>Enter a seed keyword to find related keywords and search volume data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter a keyword (e.g., SEO tools)" className="flex-1" />
                <Button>Research</Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Enter a keyword above to see research results.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
