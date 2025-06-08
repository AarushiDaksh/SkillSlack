import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Hero } from "@/components/HeroSection/Hero";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import ContactUs from "@/components/ContactUs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SectionSpacer from "@/components/SectionSpacer";
import { ChatbotWidget } from "@/components/Chatbot/ChatbotWidget";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
              <main className="flex-1 ">
       <Hero
  title="Collaborative Skill Exchange Platform"
  headline="Get Help, Give Help, and Grow Together"
  subheading="SkillSwap connects developers and creators to share their skills, solve each other's problems, and earn community tokens through collaborative learning."
  ctaText="Find Help"
  ctaSecondaryText="Offer Help"
  ctaHref="#find-help"
  secondaryCtaHref="#offer-help"

/>


        <SectionSpacer>
          <MaxWidthWrapper>
            <div id="how-it-works">
              <HowItWorks />
            </div>
          </MaxWidthWrapper>
        </SectionSpacer>

        <SectionSpacer size="none">
          <MaxWidthWrapper>
            <div id="community">
              <WhyChooseUs />
            </div>
          </MaxWidthWrapper>
        </SectionSpacer>

        {/* <SectionSpacer>
          <MaxWidthWrapper>
            <Testimonials />
          </MaxWidthWrapper>
        </SectionSpacer> */}

        <SectionSpacer only="bottom">
          <MaxWidthWrapper>
            <div id="contact">
              <ContactUs />
            </div>
          </MaxWidthWrapper>
        </SectionSpacer>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 font-bold mb-4 md:mb-0">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>SkillSwap</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 SkillSwap By Aarushi. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
