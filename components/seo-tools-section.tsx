import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  Link2,
  FileText,
  BarChart2,
  Globe,
  Cpu,
  AlertCircle,
  Code,
  FileCode,
  Zap,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

export function SEOToolsSection() {
  const tools = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Keyword Research",
      description: "Find the best keywords to target for your content and SEO strategy.",
      href: "/tools/keyword-research",
    },
    {
      icon: <Link2 className="h-8 w-8" />,
      title: "Backlink Checker",
      description: "Analyze your backlink profile and find opportunities for improvement.",
      href: "/tools/backlink-checker",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Content Analyzer",
      description: "Optimize your content for better search engine rankings and readability.",
      href: "/tools/content-analyzer",
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Rank Tracker",
      description: "Monitor your website's search engine rankings over time.",
      href: "/tools/rank-tracker",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Site Crawler",
      description: "Crawl your website to find technical SEO issues and opportunities.",
      href: "/tools/site-crawler",
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Schema Generator",
      description: "Create structured data markup to enhance your search results.",
      href: "/tools/schema-generator",
    },
    {
      icon: <AlertCircle className="h-8 w-8" />,
      title: "Broken Link Checker",
      description: "Find and fix broken links on your website to improve user experience and SEO.",
      href: "/tools/broken-link-checker",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Meta Tag Generator",
      description: "Create optimized meta tags for better search engine visibility.",
      href: "/tools/meta-tag-generator",
    },
    {
      icon: <FileCode className="h-8 w-8" />,
      title: "Robots.txt Generator",
      description: "Create a robots.txt file to control search engine crawling of your site.",
      href: "/tools/robots-txt-generator",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "XML Sitemap Generator",
      description: "Generate an XML sitemap to help search engines discover your content.",
      href: "/tools/sitemap-generator",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Page Speed Analyzer",
      description: "Analyze your website's loading speed and get recommendations for improvement.",
      href: "/tools/page-speed-analyzer",
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: "Image Optimizer",
      description: "Compress and optimize images for faster loading and better user experience.",
      href: "/tools/image-optimizer",
    },
  ]

  return (
    <section id="seo-tools" className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Advanced SEO Tools</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Comprehensive tools to take your SEO strategy to the next level.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {tools.map((tool, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">{tool.icon}</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{tool.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{tool.description}</p>
                    </div>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href={tool.href}>Try Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
