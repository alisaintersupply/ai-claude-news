import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "ข่าว AI Claudecode",
    template: "%s | ข่าว AI Claudecode",
  },
  description:
    "แพลตฟอร์มข่าว AI สำหรับนักพัฒนาและผู้สนใจ — ข่าวสาร วิเคราะห์ และงานวิจัย AI ล่าสุด | AI news platform for Thai and international audiences",
  keywords: ["AI", "artificial intelligence", "ข่าว AI", "machine learning", "LLM", "Claude", "ChatGPT"],
  openGraph: {
    siteName: "ข่าว AI Claudecode",
    type: "website",
    locale: "th_TH",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
          <p>ข่าว AI Claudecode — Powered by Claude Code &amp; Supabase</p>
        </footer>
      </body>
    </html>
  )
}
