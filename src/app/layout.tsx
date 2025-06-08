import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: "SkillSwap | Resell Software Licenses Effortlessly",
  description:
    "SkillSwap empowers individuals and businesses to securely resell unused software licenses. Join our marketplace and unlock hidden value with ease.",
  keywords: [
    "SkillSwap"
  ],
  authors: [{ name: "SkillSwap Team" }],
  creator: "SkillSwap",
  publisher: "SkillSwap",
  metadataBase: new URL("https://skillswap.io"),
  openGraph: {
    type: "website",
    title: "SkillSwap | MarketPlace",
    description:
      "Join SkillSwap.",
    siteName: "SkillSwap",
    images: [
      {
        url: "/images/skillswap-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkillSwap Software Resell Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillSwap | Marketplace",
    description: "Fast, secure, and smart.",
    images: ["/images/skillswap-twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
