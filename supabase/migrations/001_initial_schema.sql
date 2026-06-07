-- ============================================================
-- ข่าว AI Claudecode — Initial Schema
-- Migration: 001_initial_schema.sql
-- ============================================================

-- news_articles: AI news articles
CREATE TABLE IF NOT EXISTS news_articles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  title_th      TEXT,
  summary       TEXT,
  summary_th    TEXT,
  source_url    TEXT UNIQUE NOT NULL,
  source_name   TEXT,
  category      TEXT CHECK (category IN ('models','research','industry','policy','tools','open-source')),
  impact        TEXT CHECK (impact IN ('high','medium','low')) DEFAULT 'medium',
  tags          TEXT[] DEFAULT '{}',
  image_url     TEXT,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  is_featured   BOOLEAN DEFAULT FALSE,
  view_count    INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_news_published_at  ON news_articles (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_category      ON news_articles (category);
CREATE INDEX IF NOT EXISTS idx_news_impact        ON news_articles (impact);
CREATE INDEX IF NOT EXISTS idx_news_is_featured   ON news_articles (is_featured) WHERE is_featured = TRUE;

-- digest_issues: curated news digests
CREATE TABLE IF NOT EXISTS digest_issues (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 TEXT NOT NULL,
  title_th              TEXT,
  type                  TEXT CHECK (type IN ('daily','weekly','deep-dive','executive')) DEFAULT 'daily',
  content_md            TEXT NOT NULL,
  content_html          TEXT,
  summary_th            TEXT,
  issue_date            DATE NOT NULL,
  article_ids           UUID[] DEFAULT '{}',
  reading_time_minutes  INTEGER DEFAULT 5,
  tags                  TEXT[] DEFAULT '{}',
  is_published          BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_digest_issue_date    ON digest_issues (issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_digest_type          ON digest_issues (type);
CREATE INDEX IF NOT EXISTS idx_digest_is_published  ON digest_issues (is_published) WHERE is_published = TRUE;

-- trend_analyses: AI trend analysis reports
CREATE TABLE IF NOT EXISTS trend_analyses (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  period_start      DATE NOT NULL,
  period_end        DATE NOT NULL,
  accelerating      JSONB DEFAULT '[]',
  decelerating      JSONB DEFAULT '[]',
  emerging          JSONB DEFAULT '[]',
  synthesis         TEXT,
  contrarian_view   TEXT,
  confidence        TEXT CHECK (confidence IN ('high','medium','low')) DEFAULT 'medium',
  tags              TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trends_period_end  ON trend_analyses (period_end DESC);

-- research_papers: AI research paper summaries
CREATE TABLE IF NOT EXISTS research_papers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  arxiv_id          TEXT UNIQUE,
  title             TEXT NOT NULL,
  authors           TEXT[] DEFAULT '{}',
  institution       TEXT,
  published_date    DATE,
  field             TEXT CHECK (field IN ('nlp','vision','rl','multimodal','systems','safety','other')),
  tldr_en           TEXT,
  tldr_th           TEXT,
  key_contribution  TEXT,
  method_overview   TEXT,
  why_it_matters    TEXT,
  limitations       TEXT,
  source_url        TEXT,
  tags              TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_papers_published_date  ON research_papers (published_date DESC);
CREATE INDEX IF NOT EXISTS idx_papers_field           ON research_papers (field);

-- monitors: topic monitoring configurations
CREATE TABLE IF NOT EXISTS monitors (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  topics              TEXT[] DEFAULT '{}',
  companies           TEXT[] DEFAULT '{}',
  alert_threshold     TEXT CHECK (alert_threshold IN ('all','significant','breakthrough')) DEFAULT 'significant',
  time_window_hours   INTEGER DEFAULT 24,
  is_active           BOOLEAN DEFAULT TRUE,
  last_checked_at     TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE news_articles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE digest_issues    ENABLE ROW LEVEL SECURITY;
ALTER TABLE trend_analyses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_papers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitors         ENABLE ROW LEVEL SECURITY;

-- Public read for news content
CREATE POLICY "public_read_news"
  ON news_articles FOR SELECT TO anon, authenticated USING (TRUE);

CREATE POLICY "public_read_published_digests"
  ON digest_issues FOR SELECT TO anon, authenticated USING (is_published = TRUE);

CREATE POLICY "public_read_trends"
  ON trend_analyses FOR SELECT TO anon, authenticated USING (TRUE);

CREATE POLICY "public_read_papers"
  ON research_papers FOR SELECT TO anon, authenticated USING (TRUE);

-- updated_at auto-trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_news_updated_at
  BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_digest_updated_at
  BEFORE UPDATE ON digest_issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
