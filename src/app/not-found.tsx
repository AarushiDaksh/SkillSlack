import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Viewport } from "next";

export const dynamic = "force-static";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-3">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>

          {/* Interactive back action lives in a client component */}
          <BackButton />
        </div>
      </div>
    </div>
  );
}


import BackButton from "../components/not-found/BackButton";
