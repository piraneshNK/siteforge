import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Zap, Clock, Smartphone, Monitor } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export const metadata = {
  title: "Page Speed Analyzer - SiteForge",
  description: "Analyze your website's loading speed and get recommendations for improvement.",
}

export default function PageSpeedAnalyzerPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Page Speed Analyzer</h1>
            <p className="mt-4 text-xl text-gray-500">
              Analyze your website's loading speed and get recommendations for improvement.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analyze Page Speed</CardTitle>
              <CardDescription>Enter your website URL to analyze its loading performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Zap className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input className="pl-10" placeholder="Enter your website URL (e.g., https://example.com)" />
                </div>
                <Button>Analyze Speed</Button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>This tool will analyze your website's loading speed on both mobile and desktop devices.</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-12 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Enter your website URL above to analyze page speed.</p>
          </div>

          {/* This section would be shown after analysis */}
          <div className="hidden">
            <Tabs defaultValue="mobile">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Speed Analysis Results</h2>
                <TabsList>
                  <TabsTrigger value="mobile">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </TabsTrigger>
                  <TabsTrigger value="desktop">
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="mobile">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-yellow-500">68</div>
                        <div className="text-sm text-gray-500">Performance Score</div>
                        <Progress value={68} className="h-2 mt-2 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">First Contentful Paint</p>
                            <p className="text-xs text-gray-500">When content first appears</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold">2.3s</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Time to Interactive</p>
                            <p className="text-xs text-gray-500">When page becomes interactive</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold">4.2s</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="desktop">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-green-500">89</div>
                        <div className="text-sm text-gray-500">Performance Score</div>
                        <Progress value={89} className="h-2 mt-2 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">First Contentful Paint</p>
                            <p className="text-xs text-gray-500">When content first appears</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold">1.2s</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Time to Interactive</p>
                            <p className="text-xs text-gray-500">When page becomes interactive</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold">2.8s</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
