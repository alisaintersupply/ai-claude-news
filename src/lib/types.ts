export type NewsCategory = 'models' | 'research' | 'industry' | 'policy' | 'tools' | 'open-source'
export type ImpactLevel = 'high' | 'medium' | 'low'
export type DigestType = 'daily' | 'weekly' | 'deep-dive' | 'executive'
export type PaperField = 'nlp' | 'vision' | 'rl' | 'multimodal' | 'systems' | 'safety' | 'other'
export type AlertThreshold = 'all' | 'significant' | 'breakthrough'
export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface NewsArticle {
  id: string
  title: string
  title_th: string | null
  summary: string | null
  summary_th: string | null
  source_url: string
  source_name: string | null
  category: NewsCategory | null
  impact: ImpactLevel
  tags: string[]
  image_url: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  is_featured: boolean
  view_count: number
}

export interface DigestIssue {
  id: string
  title: string
  title_th: string | null
  type: DigestType
  content_md: string
  content_html: string | null
  summary_th: string | null
  issue_date: string
  article_ids: string[]
  reading_time_minutes: number
  tags: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface TrendAnalysis {
  id: string
  title: string
  period_start: string
  period_end: string
  accelerating: TrendItem[]
  decelerating: TrendItem[]
  emerging: EmergingSignal[]
  synthesis: string | null
  contrarian_view: string | null
  confidence: ConfidenceLevel
  tags: string[]
  created_at: string
}

export interface TrendItem {
  trend: string
  evidence: string
  confidence: ConfidenceLevel
}

export interface EmergingSignal {
  signal: string
  source: string
}

export interface ResearchPaper {
  id: string
  arxiv_id: string | null
  title: string
  authors: string[]
  institution: string | null
  published_date: string | null
  field: PaperField | null
  tldr_en: string | null
  tldr_th: string | null
  key_contribution: string | null
  method_overview: string | null
  why_it_matters: string | null
  limitations: string | null
  source_url: string | null
  tags: string[]
  created_at: string
}

export interface Monitor {
  id: string
  name: string
  topics: string[]
  companies: string[]
  alert_threshold: AlertThreshold
  time_window_hours: number
  is_active: boolean
  last_checked_at: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      news_articles: {
        Row: NewsArticle
        Insert: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at' | 'view_count'>
        Update: Partial<Omit<NewsArticle, 'id' | 'created_at'>>
      }
      digest_issues: {
        Row: DigestIssue
        Insert: Omit<DigestIssue, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<DigestIssue, 'id' | 'created_at'>>
      }
      trend_analyses: {
        Row: TrendAnalysis
        Insert: Omit<TrendAnalysis, 'id' | 'created_at'>
        Update: Partial<Omit<TrendAnalysis, 'id' | 'created_at'>>
      }
      research_papers: {
        Row: ResearchPaper
        Insert: Omit<ResearchPaper, 'id' | 'created_at'>
        Update: Partial<Omit<ResearchPaper, 'id' | 'created_at'>>
      }
      monitors: {
        Row: Monitor
        Insert: Omit<Monitor, 'id' | 'created_at'>
        Update: Partial<Omit<Monitor, 'id' | 'created_at'>>
      }
    }
  }
}
