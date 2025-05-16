import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Schema Generator - SiteForge",
  description: "Create structured data markup to enhance your search results.",
}

export default function SchemaGeneratorPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Schema Generator</h1>
            <p className="mt-4 text-xl text-gray-500">Create structured data markup to enhance your search results.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generate Schema</CardTitle>
              <CardDescription>
                Select a schema type and fill in the details to generate structured data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schema type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="local-business">Local Business</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="how-to">How-To</SelectItem>
                  </SelectContent>
                </Select>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-gray-500">Select a schema type to see the form fields.</p>
                </div>

                <div className="flex justify-end">
                  <Button>Generate Schema</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Schema</CardTitle>
              <CardDescription>Copy and paste this code into your website's HTML.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px] font-mono text-sm"
                placeholder="Generated schema will appear here..."
                readOnly
              />
              <div className="flex justify-end mt-4">
                <Button variant="outline">Copy to Clipboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
