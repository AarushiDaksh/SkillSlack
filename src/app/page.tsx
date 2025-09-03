import { Hero } from "@/components/HeroSection/Hero";
import { HeaderH } from "@/components/Header";
import ShootingStars from "@/components/Background/ShootingStars";
import { GitHubPRFeed } from "@/components/GitHub/GitHubPRFeed";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-trasparent text-white relative">
      

      <HeaderH />

      <main className="flex-1 relative z-10">
        <Hero
          title="GitHub PR Sync"
          headline="Track. Review. Merge."
          subheading="Stay on top of your GitHub Pull Requests in one place — fast, focused, and real-time."
          ctaText="View PRs"
          ctaHref="/pull"
        />

    
      </main>

      <footer className="bg-[#f5f5f5] dark:bg-black dark:border-white/10 relative z-10">
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
    </div>
  );
}
