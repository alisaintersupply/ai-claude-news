'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, Newspaper, TrendingUp, BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/news', label: 'ข่าว AI', labelEn: 'News', icon: Newspaper },
  { href: '/trends', label: 'เทรนด์', labelEn: 'Trends', icon: TrendingUp },
  { href: '/digest', label: 'Digest', labelEn: 'Digest', icon: BookOpen },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-900/40 bg-[#110008]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-100 hover:text-pink-400 transition-colors">
            <Bot className="h-5 w-5 text-pink-400" />
            <span className="hidden sm:inline">ข่าว AI Claudecode</span>
            <span className="sm:hidden">ข่าว AI</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname?.startsWith(href)
                    ? 'bg-pink-950/60 text-pink-400'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-pink-950/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          <button
            className="sm:hidden p-2 text-slate-400 hover:text-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="sm:hidden border-t border-pink-900/40 py-2 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                  pathname?.startsWith(href)
                    ? 'bg-pink-950/60 text-pink-400'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
