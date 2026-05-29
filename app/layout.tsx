import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AIStack — Discover & Compare AI Tools",
  description: "The largest curated directory of AI tools. Find, compare, and save the best AI tools for developers, creators, and teams.",
  keywords: ["AI tools", "artificial intelligence", "machine learning", "ChatGPT alternatives", "AI directory"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-zinc-950 text-white antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-zinc-800/50 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">AI</div>
                <span className="font-semibold text-white">AIStack</span>
              </div>
              <p className="text-zinc-500 text-sm">© 2026 AIStack. The AI tools directory.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
