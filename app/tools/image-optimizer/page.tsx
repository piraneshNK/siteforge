import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ImageIcon, Upload, Download, Settings } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata = {
  title: "Image Optimizer - SiteForge",
  description: "Compress and optimize images for faster loading and better user experience.",
}

export default function ImageOptimizerPage() {
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
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Image Optimizer</h1>
            <p className="mt-4 text-xl text-gray-500">
              Compress and optimize images for faster loading and better user experience.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
              <CardDescription>Select images to optimize. Supports JPG, PNG, WebP, and GIF.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-10 border-2 border-dashed rounded-lg text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium">Drag and drop images here</p>
                  <p className="text-sm text-gray-500">or</p>
                  <Button>Select Files</Button>
                  <p className="text-xs text-gray-500">Maximum file size: 5MB per image. Up to 10 images.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Settings</CardTitle>
              <CardDescription>Configure how your images will be optimized.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quality">Quality</Label>
                        <span className="text-sm">80%</span>
                      </div>
                      <Slider defaultValue={[80]} max={100} step={1} />
                      <p className="text-xs text-gray-500">
                        Lower quality = smaller file size. Higher quality = better image.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Output Format</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto (recommended)</SelectItem>
                          <SelectItem value="jpg">JPG</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="webp">WebP</SelectItem>
                          <SelectItem value="avif">AVIF</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        WebP and AVIF provide the best compression but may not be supported by all browsers.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="resize" />
                      <Label htmlFor="resize">Resize images</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="metadata" defaultChecked />
                      <Label htmlFor="metadata">Remove metadata</Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-width">Maximum Width</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="number" id="max-width" placeholder="e.g., 1200" className="w-24" />
                        <span className="text-sm text-gray-500">pixels</span>
                      </div>
                      <p className="text-xs text-gray-500">Leave empty to maintain original width.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-height">Maximum Height</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="number" id="max-height" placeholder="e.g., 800" className="w-24" />
                        <span className="text-sm text-gray-500">pixels</span>
                      </div>
                      <p className="text-xs text-gray-500">Leave empty to maintain original height.</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="progressive" defaultChecked />
                      <Label htmlFor="progressive">Progressive loading (JPG)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="interlaced" />
                      <Label htmlFor="interlaced">Interlaced (PNG)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="optimize" defaultChecked />
                      <Label htmlFor="optimize">Apply additional optimization</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Apply Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* This section would be shown after uploading images */}
          <div className="hidden mt-8">
            <h2 className="text-2xl font-bold mb-4">Optimized Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">image-1.jpg</p>
                        <p className="text-sm text-gray-500">Original: 1.2MB • Optimized: 320KB • Saved: 73%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">image-2.png</p>
                        <p className="text-sm text-gray-500">Original: 2.4MB • Optimized: 580KB • Saved: 76%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 flex justify-center">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download All Images
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
