export interface AnalysisResult {
  url: string
  timestamp: string
  scores: {
    overall: number
    performance: number
    seo: number
    accessibility: number
    bestPractices: number
  }
  issues: {
    critical: Array<{
      id: string
      title: string
      description: string
      impact?: string
      recommendation?: string
    }>
    warnings: Array<{
      id: string
      title: string
      description: string
      impact?: string
      recommendation?: string
    }>
    improvements: Array<{
      id: string
      title: string
      description: string
      impact?: string
      recommendation?: string
    }>
    passed: Array<{
      id: string
      title: string
      description: string
    }>
  }
  recommendations: Array<{
    priority: string
    title: string
    description: string
  }>
  keywords: Array<{
    keyword: string
    relevance: number
    competition: number
    volume: number
  }>
  performance: {
    loadTime: string
    firstContentfulPaint: string
    largestContentfulPaint: string
    timeToInteractive: string
    cumulativeLayoutShift: string
  }
  pageSpeedData?: any
  apiRateLimited?: boolean
  apiRateLimitedMessage?: string
}
