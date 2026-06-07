import { createServerSupabaseClient } from '@/lib/supabase-server'
import { DigestCard } from '@/components/DigestCard'
import { BookOpen, Bot } from 'lucide-react'
import type { Metadata } from 'next'
import type { DigestIssue } from '@/lib/types'

export const metadata: Metadata = {
  title: 'AI Digest',
  description: 'รวม digest ข่าว AI ประจำวันและประจำสัปดาห์',
}

export default async function DigestPage() {
  const supabase = await createServerSupabaseClient()

  const { data: rawDigests } = await supabase
    .from('digest_issues')
    .select('*')
    .eq('is_published', true)
    .order('issue_date', { ascending: false })
    .limit(20)
  const digests = (rawDigests ?? []) as DigestIssue[]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-pink-400" />
          AI Digest
        </h1>
        <p className="text-slate-400 text-sm">
          สรุปข่าว AI ประจำวันและประจำสัปดาห์ — เขียนโดย AI Digest Writer
        </p>
      </div>

      {!digests || digests.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-16 text-center text-slate-500">
          <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>ยังไม่มี digest</p>
          <p className="text-sm mt-1">ใช้ <code className="text-pink-400">/ai-digest daily</code> เพื่อสร้าง digest แรก</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {digests.map((digest) => (
            <DigestCard key={digest.id} digest={digest} />
          ))}
        </div>
      )}
    </div>
  )
}
