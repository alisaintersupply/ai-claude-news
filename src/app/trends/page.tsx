import { createServerSupabaseClient } from '@/lib/supabase-server'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { TrendingUp, TrendingDown, Sparkles, Bot } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { TrendItem, EmergingSignal, TrendAnalysis } from '@/lib/types'

export const metadata: Metadata = {
  title: 'เทรนด์ AI',
  description: 'วิเคราะห์แนวโน้มและทิศทางของ AI — รายงานเทรนด์รายสัปดาห์',
}

export default async function TrendsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: rawAnalyses } = await supabase
    .from('trend_analyses')
    .select('*')
    .order('period_end', { ascending: false })
    .limit(10)
  const analyses = (rawAnalyses ?? []) as TrendAnalysis[]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          เทรนด์ AI
        </h1>
        <p className="text-slate-400 text-sm">วิเคราะห์แนวโน้มและทิศทาง AI โดย AI Trend Analyzer</p>
      </div>

      {!analyses || analyses.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-16 text-center text-slate-500">
          <Bot className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>ยังไม่มีการวิเคราะห์เทรนด์</p>
          <p className="text-sm mt-1">ใช้ <code className="text-blue-400">/ai-trends</code> เพื่อสร้างรายงานเทรนด์</p>
        </div>
      ) : (
        <div className="space-y-6">
          {analyses.map((analysis) => (
            <article key={analysis.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-100">{analysis.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {format(new Date(analysis.period_start), 'd MMM', { locale: th })} —{' '}
                    {format(new Date(analysis.period_end), 'd MMM yyyy', { locale: th })}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                  analysis.confidence === 'high'
                    ? 'bg-green-900/50 text-green-300 border-green-700'
                    : analysis.confidence === 'medium'
                    ? 'bg-yellow-900/50 text-yellow-300 border-yellow-700'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  ความมั่นใจ: {analysis.confidence === 'high' ? 'สูง' : analysis.confidence === 'medium' ? 'กลาง' : 'ต่ำ'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {Array.isArray(analysis.accelerating) && analysis.accelerating.length > 0 && (
                  <div className="rounded-lg bg-green-900/20 border border-green-800/50 p-3">
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-green-400 mb-2">
                      <TrendingUp className="h-3.5 w-3.5" />
                      กำลังเร่งตัว
                    </h3>
                    <ul className="space-y-1">
                      {(analysis.accelerating as TrendItem[]).slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-slate-300">{item.trend}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(analysis.decelerating) && analysis.decelerating.length > 0 && (
                  <div className="rounded-lg bg-red-900/20 border border-red-800/50 p-3">
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-2">
                      <TrendingDown className="h-3.5 w-3.5" />
                      กำลังชะลอตัว
                    </h3>
                    <ul className="space-y-1">
                      {(analysis.decelerating as TrendItem[]).slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-slate-300">{item.trend}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(analysis.emerging) && analysis.emerging.length > 0 && (
                  <div className="rounded-lg bg-purple-900/20 border border-purple-800/50 p-3">
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-2">
                      <Sparkles className="h-3.5 w-3.5" />
                      กำลังเกิดขึ้น
                    </h3>
                    <ul className="space-y-1">
                      {(analysis.emerging as EmergingSignal[]).slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-slate-300">{item.signal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {analysis.synthesis && (
                <p className="text-sm text-slate-400 border-t border-slate-800 pt-4">{analysis.synthesis}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
