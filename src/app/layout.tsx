import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"

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
  title: "SkillSwap",
  description: "Buy and sell unused software licenses at competitive prices. Save up to 70% compared to retail prices with our secure marketplace platform.",
  keywords: ["software licenses", "buy software", "sell software licenses", "software marketplace", "IT procurement", "license resale"],
  authors: [{ name: "SoftSell Team" }],
  creator: "SoftSell",
  publisher: "SoftSell",
  metadataBase: new URL("https://softsell-marketplace.com"),
  openGraph: {
    type: "website",
    title: "SoftSell | Transform Unused Software into Revenue",
    description: "Buy and sell unused software licenses at competitive prices. Our platform helps businesses optimize IT spending.",
    siteName: "SoftSell",
    images: [
      {
        url: "/images/softsell-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoftSell Software License Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftSell | Software License Marketplace",
    description: "Buy and sell unused software licenses at competitive prices.",
    images: ["/images/softsell-twitter-image.jpg"],
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
