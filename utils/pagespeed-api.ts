/**
 * Utility for interacting with Google PageSpeed Insights API
 * This API is free to use with some rate limits
 * https://developers.google.com/speed/docs/insights/v5/get-started
 */

export interface PageSpeedResult {
  loadingExperience?: {
    overall_category: string
    metrics: Record<string, { category: string }>
  }
  lighthouseResult?: {
    categories: {
      performance: { score: number }
      accessibility: { score: number }
      "best-practices": { score: number }
      seo: { score: number }
    }
    audits: Record<
      string,
      {
        id: string
        title: string
        description: string
        score: number | null
        displayValue?: string
      }
    >
  }
  error?: {
    message: string
  }
}

export async function analyzePageSpeed(
  url: string,
  strategy: "mobile" | "desktop" = "mobile",
): Promise<PageSpeedResult> {
  try {
    // Ensure URL is properly formatted
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`

    // Build the API URL with parameters
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed")
    apiUrl.searchParams.append("url", formattedUrl)
    apiUrl.searchParams.append("strategy", strategy)
    apiUrl.searchParams.append("category", "performance")
    apiUrl.searchParams.append("category", "accessibility")
    apiUrl.searchParams.append("category", "best-practices")
    apiUrl.searchParams.append("category", "seo")

    // Make the API request
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data as PageSpeedResult
  } catch (error) {
    console.error("Error analyzing page speed:", error)
    return {
      error: {
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
    }
  }
}

/**
 * Extract key performance metrics from PageSpeed results
 */
export function extractPerformanceMetrics(result: PageSpeedResult) {
  if (!result.lighthouseResult) {
    return null
  }

  const { audits, categories } = result.lighthouseResult

  return {
    scores: {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    },
    metrics: {
      firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || "N/A",
      largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || "N/A",
      timeToInteractive: audits["interactive"]?.displayValue || "N/A",
      totalBlockingTime: audits["total-blocking-time"]?.displayValue || "N/A",
      cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || "N/A",
      speedIndex: audits["speed-index"]?.displayValue || "N/A",
    },
    opportunities: Object.values(audits)
      .filter((audit) => audit.score !== null && audit.score < 0.9 && audit.id !== "total-blocking-time")
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .slice(0, 5)
      .map((audit) => ({
        title: audit.title,
        description: audit.description,
        score: audit.score,
      })),
  }
}
