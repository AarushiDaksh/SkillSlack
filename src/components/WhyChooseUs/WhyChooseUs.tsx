"use client";

import { LinesPatternCard, LinesPatternCardBody } from "../ui/card-with-lines-patter";
import { ShieldCheck,Users,BadgeDollarSign,Rocket,Lightbulb, DollarSign, Globe, MessageCircle } from 'lucide-react'

function WhyChooseUs() {
  const features = [
     {
    icon: Users,
    title: "Peer-to-Peer Collaboration",
    description: "SkillSwap isn't about hiring—it's about exchanging skills. Connect with others to solve problems together in real time."
  },
  {
    icon: BadgeDollarSign,
    title: "Earn via Skill Tokens",
    description: "Contributions earn you SkillTokens, which represent your credibility and can be used to request help from others."
  },
  {
    icon: Rocket,
    title: "Accelerated Learning",
    description: "Learn faster by doing, helping, and receiving feedback—no course can match real-world peer learning."
  },
  {
    icon: Lightbulb,
    title: "Built for Devs & Creators",
    description: "From debugging to design help, SkillSwap matches people with niche technical skills for collaborative growth."
  }
]

  return (
    <section className="">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Why Our Community Stands Out</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          SkillSwap isn't just a platform—it's a collaborative community. We empower users with tools, transparency, and support that go beyond typical resale solutions.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <LinesPatternCard 
            key={index}
            className="h-full transition-all hover:scale-105 w-full md:w-[calc(50%-12px)]"
          >
            <LinesPatternCardBody className="flex flex-col items-center text-center h-full ">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </LinesPatternCardBody>
          </LinesPatternCard>
        ))}
      </div>
    </section>
  );
}

export { WhyChooseUs };