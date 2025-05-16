import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Rank Tracker - SiteForge",
  description: "Monitor your website's search engine rankings over time.",
}

export default function RankTrackerPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rank Tracker</h1>
            <p className="mt-4 text-xl text-gray-500">Monitor your website's search engine rankings over time.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Track Rankings</CardTitle>
              <CardDescription>Enter your domain and keywords to track your search engine rankings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Enter your domain (e.g., example.com)" />
                <Input placeholder="Enter keywords to track (comma separated)" />
                <div className="flex justify-end">
                  <Button>Start Tracking</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Enter your domain and keywords above to start tracking rankings.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
