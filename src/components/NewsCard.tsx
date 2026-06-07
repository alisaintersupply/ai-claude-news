import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { th } from 'date-fns/locale'
import { ExternalLink, TrendingUp, Zap, Minus } from 'lucide-react'
import type { NewsArticle, NewsCategory, ImpactLevel } from '@/lib/types'

const categoryLabels: Record<NewsCategory, string> = {
  models: 'โมเดล',
  research: 'วิจัย',
  industry: 'อุตสาหกรรม',
  policy: 'นโยบาย',
  tools: 'เครื่องมือ',
  'open-source': 'Open Source',
}

const categoryColors: Record<NewsCategory, string> = {
  models: 'bg-purple-900/50 text-purple-300 border-purple-700',
  research: 'bg-pink-900/50 text-pink-300 border-pink-700',
  industry: 'bg-green-900/50 text-green-300 border-green-700',
  policy: 'bg-orange-900/50 text-orange-300 border-orange-700',
  tools: 'bg-cyan-900/50 text-cyan-300 border-cyan-700',
  'open-source': 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
}

const ImpactIcon = ({ impact }: { impact: ImpactLevel }) => {
  if (impact === 'high') return <Zap className="h-3.5 w-3.5 text-red-400" />
  if (impact === 'medium') return <TrendingUp className="h-3.5 w-3.5 text-yellow-400" />
  return <Minus className="h-3.5 w-3.5 text-slate-500" />
}

interface NewsCardProps {
  article: NewsArticle
  variant?: 'default' | 'compact'
}

export const NewsCard = ({ article, variant = 'default' }: NewsCardProps) => {
  const timeAgo = article.published_at
    ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true, locale: th })
    : null

  if (variant === 'compact') {
    return (
      <Link
        href={`/news/${article.id}`}
        className="flex items-start gap-3 rounded-lg p-3 hover:bg-slate-800/50 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 group-hover:text-pink-400 transition-colors line-clamp-2">
            {article.title_th || article.title}
          </p>
          {timeAgo && <p className="mt-1 text-xs text-slate-500">{timeAgo}</p>}
        </div>
        <ImpactIcon impact={article.impact} />
      </Link>
    )
  }

  return (
    <article className="rounded-xl border border-pink-900/40 bg-slate-900/50 p-5 hover:border-pink-800/60 transition-colors group">
      <div className="flex items-center gap-2 mb-3">
        {article.category && (
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryColors[article.category]}`}>
            {categoryLabels[article.category]}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <ImpactIcon impact={article.impact} />
          {article.impact === 'high' ? 'สำคัญมาก' : article.impact === 'medium' ? 'สำคัญ' : 'ทั่วไป'}
        </span>
        {timeAgo && <span className="ml-auto text-xs text-slate-500">{timeAgo}</span>}
      </div>

      <Link href={`/news/${article.id}`} className="block">
        <h3 className="font-semibold text-slate-100 group-hover:text-pink-400 transition-colors line-clamp-2 mb-2">
          {article.title_th || article.title}
        </h3>
        {article.title_th && (
          <p className="text-xs text-slate-500 mb-2 line-clamp-1">{article.title}</p>
        )}
      </Link>

      {article.summary_th && (
        <p className="text-sm text-slate-400 line-clamp-3 mb-4">{article.summary_th}</p>
      )}

      <div className="flex items-center justify-between">
        {article.source_name && (
          <span className="text-xs text-slate-500">{article.source_name}</span>
        )}
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors ml-auto"
          onClick={(e) => e.stopPropagation()}
        >
          ต้นฉบับ <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {article.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
