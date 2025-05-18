import { NextResponse } from "next/server"
import { analyzePageSpeed, extractPerformanceMetrics } from "@/utils/pagespeed-api"

// Enhanced SEO analysis function with more detailed checks and real PageSpeed data
async function analyzeSEO(url: string) {
  // In a real app, this would actually crawl the website and analyze it
  // For demo purposes, we'll generate more comprehensive mock data

  // Generate more realistic scores with weighted randomization
  const generateScore = (min: number, max: number, bias: "high" | "low" | "neutral" = "neutral") => {
    let random = Math.random()

    // Apply bias to make scores more realistic
    if (bias === "high") {
      random = Math.pow(random, 0.7) // Bias towards higher scores
    } else if (bias === "low") {
      random = Math.pow(random, 1.3) // Bias towards lower scores
    }

    return Math.floor(random * (max - min + 1) + min)
  }

  // Get real performance data from PageSpeed Insights API
  let performanceData = null
  try {
    // First try mobile analysis
    const mobileResult = await analyzePageSpeed(url, "mobile")
    const mobileMetrics = extractPerformanceMetrics(mobileResult)

    // Then try desktop analysis
    const desktopResult = await analyzePageSpeed(url, "desktop")
    const desktopMetrics = extractPerformanceMetrics(desktopResult)

    if (mobileMetrics && desktopMetrics) {
      performanceData = {
        mobile: mobileMetrics,
        desktop: desktopMetrics,
        // Use the average of mobile and desktop for overall scores
        scores: {
          performance: Math.round((mobileMetrics.scores.performance + desktopMetrics.scores.performance) / 2),
          accessibility: Math.round((mobileMetrics.scores.accessibility + desktopMetrics.scores.accessibility) / 2),
          bestPractices: Math.round((mobileMetrics.scores.bestPractices + desktopMetrics.scores.bestPractices) / 2),
          seo: Math.round((mobileMetrics.scores.seo + desktopMetrics.scores.seo) / 2),
        },
      }
    }
  } catch (error) {
    console.error("Error fetching PageSpeed data:", error)
    // Continue with mock data if API fails
  }

  // Use real scores if available, otherwise generate mock scores
  const scores = performanceData
    ? performanceData.scores
    : {
        overall: generateScore(60, 100, "neutral"),
        performance: generateScore(50, 100, "low"),
        seo: generateScore(60, 100, "neutral"),
        accessibility: generateScore(55, 100, "low"),
        bestPractices: generateScore(65, 100, "high"),
      }

  // Calculate overall score as weighted average of individual scores if not provided
  if (!scores.overall) {
    scores.overall = Math.round(
      scores.performance * 0.25 + scores.seo * 0.35 + scores.accessibility * 0.2 + scores.bestPractices * 0.2,
    )
  }

  // More comprehensive issues categorization
  const issues = {
    critical: {
      count: generateScore(0, 3, "low"),
      items: [
        {
          id: "c1",
          title: "Missing meta description",
          description:
            "Meta descriptions help search engines understand your page content and appear in search results.",
          impact: "high",
          recommendation: "Add a unique, descriptive meta description between 120-158 characters.",
        },
        {
          id: "c2",
          title: "Slow page load time",
          description: "Page speed is a ranking factor for search engines and affects user experience.",
          impact: "high",
          recommendation: "Optimize images, minify CSS/JS, and consider a CDN to improve load times.",
        },
        {
          id: "c3",
          title: "No SSL certificate",
          description: "HTTPS is a ranking signal and builds user trust.",
          impact: "high",
          recommendation: "Install an SSL certificate to enable HTTPS.",
        },
        {
          id: "c4",
          title: "Blocked by robots.txt",
          description: "Search engines cannot index your site if blocked by robots.txt.",
          impact: "high",
          recommendation: "Update your robots.txt to allow search engines to crawl your site.",
        },
        {
          id: "c5",
          title: "Duplicate content issues",
          description: "Duplicate content confuses search engines about which page to rank.",
          impact: "high",
          recommendation: "Use canonical tags to indicate the preferred version of duplicate pages.",
        },
      ],
    },
    warnings: {
      count: generateScore(2, 7, "neutral"),
      items: [
        {
          id: "w1",
          title: "Images missing alt text",
          description: "Alt text helps search engines understand image content and improves accessibility.",
          impact: "medium",
          recommendation: "Add descriptive alt text to all images.",
        },
        {
          id: "w2",
          title: "Low text-to-HTML ratio",
          description: "Pages with too little text may be seen as thin content by search engines.",
          impact: "medium",
          recommendation: "Add more relevant, quality content to your pages.",
        },
        {
          id: "w3",
          title: "Missing H1 tag",
          description: "H1 tags help search engines understand your page's main topic.",
          impact: "medium",
          recommendation: "Add a single, descriptive H1 tag to each page.",
        },
        {
          id: "w4",
          title: "Duplicate title tags",
          description: "Unique title tags help search engines differentiate between pages.",
          impact: "medium",
          recommendation: "Create unique, descriptive title tags for each page.",
        },
        {
          id: "w5",
          title: "Poor mobile optimization",
          description: "Mobile-friendliness is a ranking factor for search engines.",
          impact: "medium",
          recommendation: "Ensure your site is responsive and displays correctly on mobile devices.",
        },
        {
          id: "w6",
          title: "Missing structured data",
          description: "Structured data helps search engines understand your content and can enable rich results.",
          impact: "medium",
          recommendation: "Implement relevant schema markup for your content type.",
        },
        {
          id: "w7",
          title: "Slow server response time",
          description: "Server response time affects page load speed and user experience.",
          impact: "medium",
          recommendation: "Optimize server configuration and consider upgrading hosting if necessary.",
        },
      ],
    },
    improvements: {
      count: generateScore(3, 8, "high"),
      items: [
        {
          id: "i1",
          title: "Meta title too long",
          description: "Meta titles should be concise to display properly in search results.",
          impact: "low",
          recommendation: "Keep meta titles under 60 characters.",
        },
        {
          id: "i2",
          title: "URL structure could be improved",
          description: "Clean, descriptive URLs help users and search engines understand page content.",
          impact: "low",
          recommendation: "Use short, descriptive URLs with keywords.",
        },
        {
          id: "i3",
          title: "Low word count",
          description: "Pages with more comprehensive content often rank better for relevant queries.",
          impact: "low",
          recommendation: "Aim for at least 300 words of quality content per page.",
        },
        {
          id: "i4",
          title: "Missing favicon",
          description: "Favicons improve brand recognition and user experience.",
          impact: "low",
          recommendation: "Add a favicon to your site.",
        },
        {
          id: "i5",
          title: "No social meta tags",
          description: "Social meta tags control how your content appears when shared on social media.",
          impact: "low",
          recommendation: "Add Open Graph and Twitter Card meta tags.",
        },
        {
          id: "i6",
          title: "Missing language attribute",
          description: "The HTML lang attribute helps search engines and screen readers.",
          impact: "low",
          recommendation: "Add the lang attribute to your HTML tag.",
        },
        {
          id: "i7",
          title: "No image sitemaps",
          description: "Image sitemaps help search engines discover and index your images.",
          impact: "low",
          recommendation: "Create and submit an image sitemap.",
        },
        {
          id: "i8",
          title: "Missing breadcrumbs",
          description: "Breadcrumbs help users navigate and improve SEO.",
          impact: "low",
          recommendation: "Implement breadcrumb navigation with structured data markup.",
        },
      ],
    },
    passed: {
      count: generateScore(5, 12, "high"),
      items: [
        {
          id: "p1",
          title: "Proper use of heading tags",
          description: "Your page uses heading tags in the correct hierarchical order.",
        },
        {
          id: "p2",
          title: "Good keyword density",
          description: "Your content has a natural keyword distribution without keyword stuffing.",
        },
        {
          id: "p3",
          title: "Optimized images",
          description: "Images are properly compressed and sized for web use.",
        },
        {
          id: "p4",
          title: "Valid robots.txt",
          description: "Your robots.txt file is properly formatted and accessible.",
        },
        {
          id: "p5",
          title: "XML sitemap exists",
          description: "An XML sitemap is available to help search engines crawl your site.",
        },
        {
          id: "p6",
          title: "No broken links",
          description: "All links on your page are working correctly.",
        },
        {
          id: "p7",
          title: "Good internal linking",
          description: "Your page has a good structure of internal links.",
        },
        {
          id: "p8",
          title: "Canonical tags implemented",
          description: "Canonical tags are properly implemented to prevent duplicate content issues.",
        },
        {
          id: "p9",
          title: "Mobile viewport set",
          description: "Your page has a proper viewport meta tag for mobile devices.",
        },
        {
          id: "p10",
          title: "No render-blocking resources",
          description: "Your page doesn't have resources that block rendering.",
        },
        {
          id: "p11",
          title: "HTTPS implemented",
          description: "Your site uses secure HTTPS protocol.",
        },
        {
          id: "p12",
          title: "No intrusive interstitials",
          description: "Your site doesn't use intrusive popups that could harm mobile usability.",
        },
      ],
    },
  }

  // Select a random subset of issues based on the count
  const selectRandomItems = (items: any[], count: number) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const criticalIssues = selectRandomItems(issues.critical.items, issues.critical.count)
  const warningIssues = selectRandomItems(issues.warnings.items, issues.warnings.count)
  const improvementIssues = selectRandomItems(issues.improvements.items, issues.improvements.count)
  const passedChecks = selectRandomItems(issues.passed.items, issues.passed.count)

  // Generate prioritized recommendations based on issues
  const generateRecommendations = () => {
    // Add PageSpeed recommendations if available
    const pageSpeedRecs = performanceData
      ? [
          ...performanceData.mobile.opportunities.map((opp) => ({
            priority: opp.score && opp.score < 0.5 ? "high" : "medium",
            title: opp.title,
            description: opp.description,
          })),
        ]
      : []

    const recommendations = [
      ...pageSpeedRecs,
      ...criticalIssues.map((issue) => ({
        priority: "high",
        title: issue.title,
        description: issue.recommendation || issue.description,
      })),
      ...warningIssues.map((issue) => ({
        priority: "medium",
        title: issue.title,
        description: issue.recommendation || issue.description,
      })),
      ...improvementIssues.map((issue) => ({
        priority: "low",
        title: issue.title,
        description: issue.recommendation || issue.description,
      })),
    ]

    // Sort by priority
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      )
    })
  }

  // Generate keyword data
  const generateKeywordData = () => {
    const keywords = [
      "seo tools",
      "website optimization",
      "digital marketing",
      "search engine ranking",
      "content marketing",
      "web analytics",
      "online presence",
      "meta tags",
    ]

    return keywords.map((keyword) => ({
      keyword,
      relevance: Math.floor(Math.random() * 100) + 1,
      competition: Math.floor(Math.random() * 100) + 1,
      volume: Math.floor(Math.random() * 10000) + 100,
    }))
  }

  // Use real performance metrics if available, otherwise generate mock data
  const performanceMetrics = performanceData
    ? {
        loadTime: performanceData.mobile.metrics.speedIndex,
        firstContentfulPaint: performanceData.mobile.metrics.firstContentfulPaint,
        largestContentfulPaint: performanceData.mobile.metrics.largestContentfulPaint,
        timeToInteractive: performanceData.mobile.metrics.timeToInteractive,
        cumulativeLayoutShift: performanceData.mobile.metrics.cumulativeLayoutShift,
        totalBlockingTime: performanceData.mobile.metrics.totalBlockingTime,
      }
    : {
        loadTime: (Math.random() * 5 + 1).toFixed(2) + "s",
        firstContentfulPaint: (Math.random() * 2 + 0.5).toFixed(2) + "s",
        largestContentfulPaint: (Math.random() * 3 + 1).toFixed(2) + "s",
        timeToInteractive: (Math.random() * 4 + 1.5).toFixed(2) + "s",
        cumulativeLayoutShift: (Math.random() * 0.5).toFixed(2),
      }

  return {
    url,
    timestamp: new Date().toISOString(),
    scores,
    issues: {
      critical: criticalIssues,
      warnings: warningIssues,
      improvements: improvementIssues,
      passed: passedChecks,
    },
    recommendations: generateRecommendations(),
    keywords: generateKeywordData(),
    performance: performanceMetrics,
    pageSpeedData: performanceData, // Include the raw PageSpeed data for advanced users
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
    } catch (e) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Simulate network delay - reduced for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const analysis = await analyzeSEO(url)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing URL:", error)
    return NextResponse.json({ error: "Failed to analyze URL" }, { status: 500 })
  }
}
