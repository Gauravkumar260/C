import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani" 
});

export const metadata: Metadata = {
  title: "Velocity - Automotive Configuration",
  description: "Configure your dream car.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rajdhani.variable} bg-slate-950 text-zinc-100 antialiased font-sans`}>
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold font-rajdhani tracking-wider text-white">
              VELOCITY
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-medium hover:text-cyan-400 transition-colors">
                Log In
              </Link>
              <Link href="/register" className="text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-sm transition-colors">
                Get Started
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
