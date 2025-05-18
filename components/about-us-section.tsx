import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function AboutUsSection() {
  const teamMembers = [
    {
      name: "Piranesh N K",
      role: "Founder & CEO",
      bio: "Technical founder with a passion for creating tools that simplify SEO for businesses of all sizes.",
      avatar: "PK",
    },
    {
      name: "Mithran",
      role: "Co-Founder",
      bio: "Experienced in managing multiple product launches and optimizing digital marketing strategies.",
      avatar: "M",
    },
    {
      name: "Chandru",
      role: "Frontend Developer",
      bio: "Skilled developer focused on creating intuitive and responsive user interfaces.",
      avatar: "CH",
    },
    {
      name: "Lalith",
      role: "Marketing Director",
      bio: "Digital marketing expert with a focus on growth strategies and user acquisition.",
      avatar: "L",
    },
  ]

  return (
    <section id="about" className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Us</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Meet the team behind SiteForge, dedicated to making SEO accessible for everyone.
            </p>
          </div>

          <div className="mx-auto max-w-3xl mt-8 mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              SiteForge was founded with a simple mission: to make professional SEO tools accessible to everyone,
              regardless of technical expertise or budget. Our free tools provide instant insights that help businesses
              improve their online visibility and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-left">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
