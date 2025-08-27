import { Hero } from "@/components/HeroSection/Hero";
import { HeaderH } from "@/components/Header";
import { ChatbotWidget } from "@/components/Chatbot/ChatbotWidget";
import ShootingStars from "@/components/Background/ShootingStars";
import { GitHubPRFeed } from "@/components/GitHub/GitHubPRFeed";



export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <ShootingStars />
      <HeaderH />

      <main className="flex-1">
        <Hero
          title="Real-Time Dev Collaboration"
          headline="Code. Collaborate. Connect."
          subheading="SkillSlack is a developer-first workspace with real-time coding, terminal sessions, GitHub PR sync, and voice rooms — all in one place."
          ctaText="Launch Workspace"
          ctaSecondaryText="PR"
          ctaHref="/sign-in"
          secondaryCtaHref="/pull"
        />
        
      </main>

      <footer className="bg-[#f5f5f5] dark:bg-black  dark:border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-6 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 font-bold mb-4 md:mb-0 text-black dark:text-white">
            <div className="size-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center text-xs">
              S
            </div>
            <span>SkillSlack</span>
          </div>

          <p className="text-sm text-gray-600 dark:text-white/70">
            © 2025 SkillSlack. All rights reserved.
          </p>
        </div>
      </footer>

      <ChatbotWidget />
    </div>
  );
}
