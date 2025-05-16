import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Link2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Broken Link Checker - SiteForge",
  description: "Find and fix broken links on your website to improve user experience and SEO.",
}

export default function BrokenLinkCheckerPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Broken Link Checker</h1>
            <p className="mt-4 text-xl text-gray-500">
              Find and fix broken links on your website to improve user experience and SEO.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Check for Broken Links</CardTitle>
              <CardDescription>Enter your website URL to scan for broken links.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Link2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input className="pl-10" placeholder="Enter your website URL (e.g., https://example.com)" />
                </div>
                <Button>Check Links</Button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>This tool will crawl your website and check for broken internal and external links.</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Enter your website URL above to check for broken links.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
