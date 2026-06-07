import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NewsCard } from '@/components/NewsCard'
import { DigestCard } from '@/components/DigestCard'
import { Bot, ArrowRight, Zap } from 'lucide-react'
import type { NewsArticle, DigestIssue } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const [newsResult, digestResult] = await Promise.all([
    supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6),
    supabase
      .from('digest_issues')
      .select('*')
      .eq('is_published', true)
      .order('issue_date', { ascending: false })
      .limit(3),
  ])

  const articles = (newsResult.data ?? []) as NewsArticle[]
  const digests = (digestResult.data ?? []) as DigestIssue[]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero */}
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400 mb-4">
          <Zap className="h-3.5 w-3.5" />
          อัพเดทล่าสุดทุกวัน
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-3">
          ข่าว AI <span className="text-blue-400">Claudecode</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          ข่าวสาร วิเคราะห์ และงานวิจัย AI ล่าสุด — คัดสรรและสรุปเป็นภาษาไทยโดย Claude Code agents
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/news"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            ดูข่าวทั้งหมด
          </Link>
          <Link
            href="/digest"
            className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            อ่าน Digest
          </Link>
        </div>
      </section>

      {/* Latest News */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-400" />
            ข่าวล่าสุด
          </h2>
          <Link href="/news" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
            ดูทั้งหมด <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-12 text-center text-slate-500">
            <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>ยังไม่มีข่าว — ใช้ <code className="text-blue-400">/ai-news</code> เพื่อเริ่มดึงข่าวล่าสุด</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Digests */}
      {digests.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-slate-100">Digest ล่าสุด</h2>
            <Link href="/digest" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
              ดูทั้งหมด <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {digests.map((digest) => (
              <DigestCard key={digest.id} digest={digest} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
