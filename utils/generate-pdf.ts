import type { AnalysisResult } from "@/types/analysis"

// This function would use a PDF library in a real implementation
// For this demo, we'll create a simple HTML-based report that can be printed to PDF
export function generatePDFReport(results: AnalysisResult): string {
  const scoreColor = (score: number) => {
    if (score >= 90) return "green"
    if (score >= 70) return "orange"
    return "red"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Create HTML content for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>SEO Analysis Report - ${results.url}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }
        .url {
          color: #666;
          margin-bottom: 20px;
        }
        .timestamp {
          font-size: 14px;
          color: #888;
        }
        .score-overview {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .score-card {
          width: 30%;
          min-width: 200px;
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          text-align: center;
        }
        .score-value {
          font-size: 36px;
          font-weight: bold;
          margin: 10px 0;
        }
        .score-label {
          font-size: 16px;
          color: #666;
        }
        .section {
          margin-bottom: 30px;
        }
        h2 {
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-top: 30px;
        }
        .issue {
          margin-bottom: 15px;
          padding: 15px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .issue-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .issue-description {
          margin-bottom: 10px;
        }
        .recommendation {
          font-style: italic;
          color: #555;
        }
        .high-priority {
          border-left: 4px solid #e74c3c;
        }
        .medium-priority {
          border-left: 4px solid #f39c12;
        }
        .low-priority {
          border-left: 4px solid #3498db;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 14px;
          color: #888;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">SiteForge</div>
        <h1>SEO Analysis Report</h1>
        <div class="url">${results.url}</div>
        <div class="timestamp">Generated on ${formatDate(results.timestamp)}</div>
      </div>
      
      <div class="score-overview">
        <div class="score-card">
          <div class="score-label">Overall Score</div>
          <div class="score-value" style="color: ${scoreColor(results.scores.overall)}">${results.scores.overall}</div>
        </div>
        <div class="score-card">
          <div class="score-label">SEO Score</div>
          <div class="score-value" style="color: ${scoreColor(results.scores.seo)}">${results.scores.seo}</div>
        </div>
        <div class="score-card">
          <div class="score-label">Performance</div>
          <div class="score-value" style="color: ${scoreColor(results.scores.performance)}">${
            results.scores.performance
          }</div>
        </div>
      </div>
      
      <div class="section">
        <h2>Critical Issues (${results.issues.critical.length})</h2>
        ${
          results.issues.critical.length > 0
            ? results.issues.critical
                .map(
                  (issue) => `
          <div class="issue high-priority">
            <div class="issue-title">${issue.title}</div>
            <div class="issue-description">${issue.description}</div>
            ${
              issue.recommendation
                ? `<div class="recommendation"><strong>Recommendation:</strong> ${issue.recommendation}</div>`
                : ""
            }
          </div>
        `,
                )
                .join("")
            : "<p>No critical issues found.</p>"
        }
      </div>
      
      <div class="section">
        <h2>Warnings (${results.issues.warnings.length})</h2>
        ${
          results.issues.warnings.length > 0
            ? results.issues.warnings
                .map(
                  (issue) => `
          <div class="issue medium-priority">
            <div class="issue-title">${issue.title}</div>
            <div class="issue-description">${issue.description}</div>
            ${
              issue.recommendation
                ? `<div class="recommendation"><strong>Recommendation:</strong> ${issue.recommendation}</div>`
                : ""
            }
          </div>
        `,
                )
                .join("")
            : "<p>No warnings found.</p>"
        }
      </div>
      
      <div class="section">
        <h2>Improvements (${results.issues.improvements.length})</h2>
        ${
          results.issues.improvements.length > 0
            ? results.issues.improvements
                .map(
                  (issue) => `
          <div class="issue low-priority">
            <div class="issue-title">${issue.title}</div>
            <div class="issue-description">${issue.description}</div>
            ${
              issue.recommendation
                ? `<div class="recommendation"><strong>Recommendation:</strong> ${issue.recommendation}</div>`
                : ""
            }
          </div>
        `,
                )
                .join("")
            : "<p>No improvements suggested.</p>"
        }
      </div>
      
      <div class="section">
        <h2>Top Recommendations</h2>
        <ol>
          ${results.recommendations
            .slice(0, 5)
            .map(
              (rec) => `
            <li>
              <div class="issue-title">${rec.title}</div>
              <div class="issue-description">${rec.description}</div>
            </li>
          `,
            )
            .join("")}
        </ol>
      </div>
      
      <div class="section">
        <h2>Performance Metrics</h2>
        <ul>
          <li><strong>Page Load Time:</strong> ${results.performance.loadTime}s</li>
          <li><strong>First Contentful Paint:</strong> ${results.performance.firstContentfulPaint}s</li>
          <li><strong>Largest Contentful Paint:</strong> ${results.performance.largestContentfulPaint}s</li>
          <li><strong>Time to Interactive:</strong> ${results.performance.timeToInteractive}s</li>
        </ul>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} SiteForge. All rights reserved.</p>
        <p>This report is provided for informational purposes only.</p>
      </div>
      
      <div class="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #000; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Print/Save as PDF
        </button>
      </div>
    </body>
    </html>
  `

  return htmlContent
}
