import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NewsCard } from '@/components/NewsCard'
import { Bot } from 'lucide-react'
import type { NewsCategory, NewsArticle } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ข่าว AI ทั้งหมด',
  description: 'รวมข่าว AI ล่าสุดจากทุกแหล่ง — โมเดล วิจัย อุตสาหกรรม นโยบาย และเครื่องมือ',
}

const categories: { value: NewsCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'models', label: 'โมเดล' },
  { value: 'research', label: 'วิจัย' },
  { value: 'industry', label: 'อุตสาหกรรม' },
  { value: 'policy', label: 'นโยบาย' },
  { value: 'tools', label: 'เครื่องมือ' },
  { value: 'open-source', label: 'Open Source' },
]

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const category = (params.category as NewsCategory | 'all') || 'all'
  const page = parseInt(params.page || '1', 10)
  const pageSize = 12

  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (category !== 'all') {
    query = query.eq('category', category)
  }

  const { data: rawArticles, count } = await query
  const articles = (rawArticles ?? []) as NewsArticle[]
  const totalPages = Math.ceil((count ?? 0) / pageSize)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">ข่าว AI ทั้งหมด</h1>
        <p className="text-slate-400 text-sm">
          {count ?? 0} บทความ — อัพเดทอัตโนมัติโดย AI News Researcher
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(({ value, label }) => (
          <a
            key={value}
            href={`/news${value !== 'all' ? `?category=${value}` : ''}`}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              (category === value) || (value === 'all' && !params.category)
                ? 'bg-pink-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Articles grid */}
      {!articles || articles.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-16 text-center text-slate-500">
          <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>ยังไม่มีข่าวในหมวดนี้</p>
          <p className="text-sm mt-1">ใช้ <code className="text-pink-400">/ai-news</code> เพื่อดึงข่าวล่าสุด</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/news?${category !== 'all' ? `category=${category}&` : ''}page=${p}`}
              className={`rounded-md px-3 py-1.5 text-sm ${
                p === page
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
