"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Linkedin } from "lucide-react"

export function SiteHeader() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <SiteLogo />
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => scrollToSection("features")}>
            Features
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                Tools <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/tools/keyword-research">Keyword Research</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/backlink-checker">Backlink Checker</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/content-analyzer">Content Analyzer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/rank-tracker">Rank Tracker</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/site-crawler">Site Crawler</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/schema-generator">Schema Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/broken-link-checker">Broken Link Checker</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/meta-tag-generator">Meta Tag Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/robots-txt-generator">Robots.txt Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/sitemap-generator">XML Sitemap Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/page-speed-analyzer">Page Speed Analyzer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/image-optimizer">Image Optimizer</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" onClick={() => scrollToSection("about")}>
            About Us
          </Button>

          <Link
            href="https://www.linkedin.com/company/siteforge-diy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#0A66C2] transition-colors"
            aria-label="Follow us on LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Button variant="default" size="sm" onClick={() => scrollToSection("hero")}>
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  )
}
