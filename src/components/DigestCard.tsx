import Link from 'next/link'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { BookOpen, Clock, FileText, BarChart2, Layout } from 'lucide-react'
import type { DigestIssue, DigestType } from '@/lib/types'

const typeConfig: Record<DigestType, { label: string; icon: React.ElementType; color: string }> = {
  daily: { label: 'สรุปประจำวัน', icon: FileText, color: 'text-blue-400' },
  weekly: { label: 'สรุปประจำสัปดาห์', icon: BarChart2, color: 'text-purple-400' },
  'deep-dive': { label: 'วิเคราะห์เชิงลึก', icon: BookOpen, color: 'text-green-400' },
  executive: { label: 'สรุปผู้บริหาร', icon: Layout, color: 'text-orange-400' },
}

interface DigestCardProps {
  digest: DigestIssue
}

export const DigestCard = ({ digest }: DigestCardProps) => {
  const config = typeConfig[digest.type]
  const Icon = config.icon
  const issueDate = format(new Date(digest.issue_date), 'd MMMM yyyy', { locale: th })

  return (
    <Link href={`/digest/${digest.id}`}>
      <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 transition-colors group h-full">
        <div className="flex items-center gap-2 mb-3">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
          <span className="ml-auto text-xs text-slate-500">{issueDate}</span>
        </div>

        <h3 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
          {digest.title_th || digest.title}
        </h3>

        {digest.summary_th && (
          <p className="text-sm text-slate-400 line-clamp-3 mb-4">{digest.summary_th}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {digest.reading_time_minutes} นาที
          </span>
          {digest.article_ids.length > 0 && (
            <span>{digest.article_ids.length} บทความ</span>
          )}
          {!digest.is_published && (
            <span className="ml-auto rounded-full bg-yellow-900/50 px-2 py-0.5 text-yellow-400 border border-yellow-700">
              Draft
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
