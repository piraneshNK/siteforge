"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clipboard, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MetaTagsForm {
  title: string
  description: string
  keywords: string
  author: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  robots: string
}

export function MetaTagGeneratorClient() {
  const [form, setForm] = useState<MetaTagsForm>({
    title: "",
    description: "",
    keywords: "",
    author: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    robots: "index, follow",
  })

  const [generatedTags, setGeneratedTags] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update OG and Twitter titles when main title changes
  useEffect(() => {
    if (form.title && !form.ogTitle) {
      setForm((prev) => ({ ...prev, ogTitle: prev.title }))
    }
    if (form.title && !form.twitterTitle) {
      setForm((prev) => ({ ...prev, twitterTitle: prev.title }))
    }
  }, [form.title])

  // Update OG and Twitter descriptions when main description changes
  useEffect(() => {
    if (form.description && !form.ogDescription) {
      setForm((prev) => ({ ...prev, ogDescription: prev.description }))
    }
    if (form.description && !form.twitterDescription) {
      setForm((prev) => ({ ...prev, twitterDescription: prev.description }))
    }
  }, [form.description])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.title) {
      newErrors.title = "Title is required"
    } else if (form.title.length > 60) {
      newErrors.title = "Title should be 60 characters or less"
    }

    if (!form.description) {
      newErrors.description = "Description is required"
    } else if (form.description.length > 160) {
      newErrors.description = "Description should be 160 characters or less"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateMetaTags = () => {
    if (!validateForm()) return

    let tags = ""

    // Basic meta tags
    tags += `<title>${form.title}</title>\n`
    tags += `<meta name="description" content="${form.description}" />\n`

    if (form.keywords) {
      tags += `<meta name="keywords" content="${form.keywords}" />\n`
    }

    if (form.author) {
      tags += `<meta name="author" content="${form.author}" />\n`
    }

    if (form.canonical) {
      tags += `<link rel="canonical" href="${form.canonical}" />\n`
    }

    // Robots
    tags += `<meta name="robots" content="${form.robots}" />\n`

    // Open Graph tags
    tags += `<meta property="og:type" content="website" />\n`
    tags += `<meta property="og:title" content="${form.ogTitle || form.title}" />\n`
    tags += `<meta property="og:description" content="${form.ogDescription || form.description}" />\n`

    if (form.canonical) {
      tags += `<meta property="og:url" content="${form.canonical}" />\n`
    }

    if (form.ogImage) {
      tags += `<meta property="og:image" content="${form.ogImage}" />\n`
    }

    // Twitter Card tags
    tags += `<meta name="twitter:card" content="summary_large_image" />\n`
    tags += `<meta name="twitter:title" content="${form.twitterTitle || form.title}" />\n`
    tags += `<meta name="twitter:description" content="${form.twitterDescription || form.description}" />\n`

    if (form.twitterImage) {
      tags += `<meta name="twitter:image" content="${form.twitterImage}" />\n`
    }

    setGeneratedTags(tags)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Create Meta Tags</CardTitle>
            <CardDescription>Fill in the details to generate optimized meta tags.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Page Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter page title (50-60 characters)"
                    value={form.title}
                    onChange={handleInputChange}
                  />
                  <div className="flex justify-between">
                    <p className={`text-xs ${form.title.length > 60 ? "text-red-500" : "text-gray-500"}`}>
                      Recommended length: 50-60 characters. Current: {form.title.length} characters
                    </p>
                    {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Meta Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter meta description (150-160 characters)"
                    value={form.description}
                    onChange={handleInputChange}
                  />
                  <div className="flex justify-between">
                    <p className={`text-xs ${form.description.length > 160 ? "text-red-500" : "text-gray-500"}`}>
                      Recommended length: 150-160 characters. Current: {form.description.length} characters
                    </p>
                    {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="keywords" className="text-sm font-medium">
                    Keywords (comma separated)
                  </label>
                  <Input
                    id="keywords"
                    name="keywords"
                    placeholder="e.g., seo, meta tags, search engine"
                    value={form.keywords}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Note: Keywords meta tag has minimal SEO impact but can still be useful for internal site search.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="canonical" className="text-sm font-medium">
                    Canonical URL (optional)
                  </label>
                  <Input
                    id="canonical"
                    name="canonical"
                    placeholder="e.g., https://example.com/page"
                    value={form.canonical}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Use this to specify the preferred version of a page to prevent duplicate content issues.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="ogTitle" className="text-sm font-medium">
                    Open Graph Title
                  </label>
                  <Input
                    id="ogTitle"
                    name="ogTitle"
                    placeholder="Title for social media sharing (defaults to page title)"
                    value={form.ogTitle}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="ogDescription" className="text-sm font-medium">
                    Open Graph Description
                  </label>
                  <Textarea
                    id="ogDescription"
                    name="ogDescription"
                    placeholder="Description for social media sharing (defaults to meta description)"
                    value={form.ogDescription}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="ogImage" className="text-sm font-medium">
                    Open Graph Image URL
                  </label>
                  <Input
                    id="ogImage"
                    name="ogImage"
                    placeholder="e.g., https://example.com/image.jpg"
                    value={form.ogImage}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Recommended size: 1200x630 pixels. This image will be displayed when sharing on Facebook, LinkedIn,
                    etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="twitterTitle" className="text-sm font-medium">
                    Twitter Title
                  </label>
                  <Input
                    id="twitterTitle"
                    name="twitterTitle"
                    placeholder="Title for Twitter sharing (defaults to page title)"
                    value={form.twitterTitle}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="twitterDescription" className="text-sm font-medium">
                    Twitter Description
                  </label>
                  <Textarea
                    id="twitterDescription"
                    name="twitterDescription"
                    placeholder="Description for Twitter sharing (defaults to meta description)"
                    value={form.twitterDescription}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="twitterImage" className="text-sm font-medium">
                    Twitter Image URL
                  </label>
                  <Input
                    id="twitterImage"
                    name="twitterImage"
                    placeholder="e.g., https://example.com/image.jpg"
                    value={form.twitterImage}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Recommended size: 1200x675 pixels. This image will be displayed when sharing on Twitter.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">
                    Author
                  </label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="e.g., John Doe"
                    value={form.author}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="robots" className="text-sm font-medium">
                    Robots
                  </label>
                  <Input
                    id="robots"
                    name="robots"
                    placeholder="e.g., index, follow"
                    value={form.robots}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Common values: "index, follow" (default), "noindex, follow", "index, nofollow", "noindex, nofollow"
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4 mt-4 border-t">
              <Button onClick={generateMetaTags}>Generate Meta Tags</Button>
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
            {generatedTags ? (
              <>
                <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{generatedTags}</pre>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Clipboard className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <p>Generated meta tags will appear here after you fill in the form and click "Generate Meta Tags".</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your page might appear in search results.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border p-4 rounded-md">
              <div className="text-blue-600 text-lg font-medium truncate">{form.title || "Page Title"}</div>
              <div className="text-green-700 text-sm truncate">{form.canonical || "https://example.com/page"}</div>
              <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                {form.description ||
                  "Your meta description will appear here. Make it compelling to increase click-through rates."}
              </div>
            </div>

            {(form.title.length > 60 || form.description.length > 160) && (
              <Alert variant="warning" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.title.length > 60 && (
                    <p>
                      Your title is {form.title.length} characters, which exceeds the recommended 60 character limit. It
                      may be truncated in search results.
                    </p>
                  )}
                  {form.description.length > 160 && (
                    <p>
                      Your description is {form.description.length} characters, which exceeds the recommended 160
                      character limit. It may be truncated in search results.
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
