import { BarChart2, Zap, Smartphone, UserX, Search, Clock, Globe, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <BarChart2 className="h-10 w-10" />,
      title: "Instant SEO Score",
      description: "Get a comprehensive SEO score for your website in seconds with detailed metrics.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Fix Recommendations",
      description: "Receive prioritized, actionable tips to improve your website's SEO ranking.",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile + Speed Checks",
      description: "Ensure your site is mobile-friendly and loads quickly on all devices.",
    },
    {
      icon: <UserX className="h-10 w-10" />,
      title: "No Login Needed",
      description: "Start analyzing immediately without creating an account or providing personal information.",
    },
    {
      icon: <Search className="h-10 w-10" />,
      title: "Keyword Analysis",
      description: "Discover the most effective keywords for your content and SEO strategy.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Performance Metrics",
      description: "Measure critical performance metrics that impact user experience and SEO.",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Accessibility Checks",
      description: "Ensure your website is accessible to all users, improving reach and compliance.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Best Practices",
      description: "Follow web development best practices that improve security and performance.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful SEO Tools</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Everything you need to optimize your website's search engine performance.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-md"
              >
                <div className="p-2 bg-primary/10 rounded-full text-primary">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
