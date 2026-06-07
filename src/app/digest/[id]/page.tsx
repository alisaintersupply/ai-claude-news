import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { Clock, ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { DigestIssue } from '@/lib/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('digest_issues').select('*').eq('id', id).single()
  const row = data as DigestIssue | null

  if (!row) return { title: 'ไม่พบ Digest' }
  return {
    title: row.title_th || row.title,
    description: row.summary_th || undefined,
  }
}

const typeLabels: Record<string, string> = {
  daily: 'สรุปประจำวัน',
  weekly: 'สรุปประจำสัปดาห์',
  'deep-dive': 'วิเคราะห์เชิงลึก',
  executive: 'สรุปผู้บริหาร',
}

export default async function DigestDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('digest_issues')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  const digest = data as DigestIssue | null
  if (!digest) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/digest"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับไป Digest ทั้งหมด
      </Link>

      <article>
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400">{typeLabels[digest.type] || digest.type}</span>
            <span className="text-slate-600">·</span>
            <span className="text-sm text-slate-500">
              {format(new Date(digest.issue_date), 'd MMMM yyyy', { locale: th })}
            </span>
            <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {digest.reading_time_minutes} นาที
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            {digest.title_th || digest.title}
          </h1>

          {digest.summary_th && (
            <p className="text-slate-400 border-l-4 border-blue-500 pl-4">{digest.summary_th}</p>
          )}
        </header>

        <div className="prose-ai">
          {digest.content_md.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-slate-100 mt-8 mb-4">{line.slice(2)}</h1>
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-slate-100 mt-6 mb-3">{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-slate-200 mt-4 mb-2">{line.slice(4)}</h3>
            if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-3">{line.slice(2)}</blockquote>
            if (line.startsWith('- ')) return <li key={i} className="ml-4 text-slate-300 my-1">{line.slice(2)}</li>
            if (line === '---') return <hr key={i} className="border-slate-700 my-6" />
            if (line === '') return <div key={i} className="my-2" />
            return <p key={i} className="text-slate-300 my-2 leading-relaxed">{line}</p>
          })}
        </div>

        {digest.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
            {digest.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}
