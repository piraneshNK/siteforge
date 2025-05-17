import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"
import { Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <Link href="/" className="flex items-center">
            <SiteLogo />
          </Link>
          <nav className="flex gap-4 md:gap-6 text-sm">
            <Link
              href="/tools/keyword-research"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Keyword Research
            </Link>
            <Link
              href="/tools/backlink-checker"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Backlink Checker
            </Link>
            <Link
              href="/tools/content-analyzer"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Content Analyzer
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/company/siteforge-diy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#0A66C2] transition-colors"
            aria-label="Follow us on LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SiteForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
