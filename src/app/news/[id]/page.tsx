import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NewsCard } from '@/components/NewsCard'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { ExternalLink, ArrowLeft, Zap, TrendingUp, Minus } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ImpactLevel } from '@/lib/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('news_articles').select('title, title_th, summary_th').eq('id', id).single()

  if (!data) return { title: 'ไม่พบบทความ' }

  return {
    title: data.title_th || data.title,
    description: data.summary_th || undefined,
  }
}

const impactConfig: Record<ImpactLevel, { label: string; icon: React.ElementType; color: string }> = {
  high: { label: 'สำคัญมาก', icon: Zap, color: 'text-red-400' },
  medium: { label: 'สำคัญ', icon: TrendingUp, color: 'text-yellow-400' },
  low: { label: 'ทั่วไป', icon: Minus, color: 'text-slate-500' },
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: article } = await supabase
    .from('news_articles')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) notFound()

  const { data: related } = await supabase
    .from('news_articles')
    .select('*')
    .eq('category', article.category ?? '')
    .neq('id', id)
    .order('published_at', { ascending: false })
    .limit(3)

  const impact = impactConfig[article.impact]
  const ImpactIcon = impact.icon

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับไปข่าวทั้งหมด
      </Link>

      <article>
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {article.category && (
              <span className="rounded-full bg-blue-900/50 border border-blue-700 px-2.5 py-0.5 text-xs font-medium text-blue-300">
                {article.category}
              </span>
            )}
            <span className={`flex items-center gap-1 text-xs font-medium ${impact.color}`}>
              <ImpactIcon className="h-3.5 w-3.5" />
              {impact.label}
            </span>
            {article.published_at && (
              <span className="ml-auto text-xs text-slate-500">
                {format(new Date(article.published_at), 'd MMMM yyyy', { locale: th })}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            {article.title_th || article.title}
          </h1>
          {article.title_th && (
            <p className="text-sm text-slate-500">{article.title}</p>
          )}
        </header>

        {article.summary_th && (
          <div className="rounded-lg border-l-4 border-blue-500 bg-slate-900/50 p-4 mb-6">
            <p className="text-slate-300 leading-relaxed">{article.summary_th}</p>
            {article.summary && (
              <p className="mt-2 text-sm text-slate-500 italic">{article.summary}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between py-4 border-y border-slate-800 mb-6">
          {article.source_name && (
            <span className="text-sm text-slate-400">แหล่งข้อมูล: {article.source_name}</span>
          )}
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-blue-700 bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-900/50 transition-colors ml-auto"
          >
            อ่านบทความต้นฉบับ <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {related && related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">ข่าวที่เกี่ยวข้อง</h2>
          <div className="space-y-2">
            {related.map((a) => (
              <NewsCard key={a.id} article={a} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
