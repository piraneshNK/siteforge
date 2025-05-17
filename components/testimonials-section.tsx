import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Piranesh N K",
      role: "Startup Founder & CEO",
      content:
        "As a technical and non-technical founder, SiteForge gave me actionable SEO insights without the technical jargon. Highly recommended!",
      avatar: "PK",
    },
    {
      name: "Mithran",
      role: "CO-Startup Founder",
      content:
        "As a co-founder managing multiple launches, SiteForge’s instant audits gave us clarity without the complexity. It's now essential for our workflow!",
      avatar: "M",
    },
    {
      name: "Chandru",
      role: "Frontend Developer",
      content:
        "SiteForge helped me identify critical SEO issues I had no idea existed. My site's traffic increased by 40% after implementing the recommendations.",
      avatar: "CH",
    },
    {
      name: "Lalith",
      role: "Marketing Director",
      content:
        "The instant analysis saved our team countless hours. We now run all our client websites through SiteForge before launch.",
      avatar: "L",
    },
    {
      name: "Viswas Sundar Raghavan",
      role: "SEO Specialist",
      content:
        "I've tried many SEO tools, but SiteForge offers the best balance of simplicity and depth. Perfect for quick audits and client presentations.",
      avatar: "V",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Loved by Devs</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              See what developers and marketers are saying about SiteForge.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 mt-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
