import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "SiteForge - Free AI SEO Analyzer Tool",
  description:
    "Instantly analyze your website's SEO with our free AI-powered tool. Get actionable recommendations to improve your search engine rankings.",
  keywords: "SEO analyzer, website audit, SEO tool, free SEO checker, SEO score, website optimization",
  authors: [{ name: "SiteForge Team" }],
  creator: "SiteForge",
  publisher: "SiteForge",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://siteforge.diy"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siteforge.diy",
    title: "SiteForge - Free AI SEO Analyzer Tool",
    description:
      "Instantly analyze your website's SEO with our free AI-powered tool. Get actionable recommendations to improve your search engine rankings.",
    siteName: "SiteForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteForge - Free AI SEO Analyzer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteForge - Free AI SEO Analyzer Tool",
    description:
      "Instantly analyze your website's SEO with our free AI-powered tool. Get actionable recommendations to improve your search engine rankings.",
    images: ["/og-image.png"],
    creator: "@siteforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
