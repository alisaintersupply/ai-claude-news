# CLAUDE.md — ข่าว AI Claudecode

> Claude Code project configuration for the **ข่าว AI Claudecode** Next.js application.
> AI news platform for Thai and international audiences — powered by Supabase and deployed on Vercel.

---

## Project Overview

**ข่าว AI Claudecode** is a Next.js 15 web application that aggregates, summarizes, and presents AI industry news with full Thai language support. Content is stored in Supabase and served via React Server Components.

**Database**: Supabase (use MCP tools for all DB operations)
**Deployment**: Vercel (connect after GitHub push)

---

## Quick Start

```bash
# Start dev server
/dev-run

# Find latest AI news and save to DB
/ai-news

# Create daily digest
/ai-digest daily

# Analyze trends
/ai-trends

# Apply DB migrations
/db-migrate

# Monitor specific topic
/ai-monitor anthropic

# Research a paper
/ai-research "https://arxiv.org/..."

# Compare models
/ai-compare "Claude 4 vs GPT-5"
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| DB Client | @supabase/ssr + @supabase/supabase-js |
| Icons | lucide-react |
| Deployment | Vercel |

---

## Agents (`.claude/agents/`)

| Agent | File | Use When |
|-------|------|----------|
| **AI News Researcher** | `ai-news-researcher.md` | หาข่าว AI + save to `news_articles` |
| **AI Trend Analyzer** | `ai-trend-analyzer.md` | วิเคราะห์เทรนด์ + save to `trend_analyses` |
| **AI Paper Summarizer** | `ai-paper-summarizer.md` | สรุป paper + save to `research_papers` |
| **AI News Monitor** | `ai-news-monitor.md` | ติดตามข่าว + manage `monitors` table |
| **AI Digest Writer** | `ai-digest-writer.md` | เขียน digest + save to `digest_issues` |
| **Next.js Developer** | `nextjs-developer.md` | Frontend/fullstack dev tasks |
| **Supabase Architect** | `supabase-architect.md` | DB schema, migrations, RLS, queries |

---

## Slash Commands (`.claude/commands/`)

| Command | Description | Example |
|---------|-------------|---------|
| `/ai-news [topic]` | ข่าว AI ล่าสุด 24h | `/ai-news openai` |
| `/ai-trends [topic]` | วิเคราะห์เทรนด์ | `/ai-trends language-models` |
| `/ai-digest [type]` | สร้าง digest | `/ai-digest weekly` |
| `/ai-research [URL/topic]` | วิจัยเชิงลึก | `/ai-research arxiv.org/...` |
| `/ai-monitor [topic]` | ติดตามข่าว | `/ai-monitor "gpt-5"` |
| `/ai-compare A vs B` | เปรียบเทียบ | `/ai-compare RAG vs fine-tuning` |
| `/db-migrate` | Apply DB migrations | `/db-migrate` |
| `/dev-run` | Start dev server | `/dev-run` |

---

## Database (Supabase via MCP)

**Always use Supabase MCP tools** — never hardcode connection strings.

| Table | Purpose |
|-------|---------|
| `news_articles` | AI news articles |
| `digest_issues` | News digest editions |
| `trend_analyses` | Trend analysis reports |
| `research_papers` | Research paper summaries |
| `monitors` | Monitoring configurations |

Key MCP tools:
- `execute_sql` — run queries and inserts
- `list_tables` — inspect schema
- `apply_migration` — apply DDL changes
- `get_project_url` / `get_publishable_keys` — get connection config

---

## Hooks (`.claude/hooks/`)

| Hook | Event | Purpose |
|------|-------|---------|
| `token-warning.ps1` | `Stop` | แจ้งเตือน token ≥ 60% |
| `log-research.ps1` | `PostToolUse(WebSearch/WebFetch)` | บันทึก research log |
| `session-notify.ps1` | `Notification` | Windows toast notification |
| `pre-tool-guard.ps1` | `PreToolUse(Bash)` | Guard คำสั่งอันตราย |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
```bash
NEXT_PUBLIC_SUPABASE_URL=      # From Supabase dashboard
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Public anon key
SUPABASE_SERVICE_ROLE_KEY=     # Server-side only (never expose to browser)
```

---

## Development Flow

1. **Add news**: `/ai-news` → finds news → saves to Supabase `news_articles`
2. **Create digest**: `/ai-digest` → reads from DB → saves to `digest_issues`
3. **Analyze trends**: `/ai-trends` → saves to `trend_analyses`
4. **Modify UI**: Use `nextjs-developer` agent, run `/dev-run` to verify
5. **DB changes**: Use `supabase-architect` agent + `/db-migrate`

---

## Style Guide

**Language:**
- News/summaries: Thai first, English after
- Headlines: English (as published)
- Technical terms: English + Thai explanation on first use

**Sources:**
- Research: arXiv, Papers With Code
- News: TechCrunch, The Verge, VentureBeat, Wired
- Official: AI company blogs
- Thai: Blognone, Techsauce

**Standards:**
- Every claim must have a source
- Unverified info: tag with `[ยังไม่ยืนยัน]`
- Always include dates

---

## Directory Structure

```
ai-claude-news/
├── .claude/
│   ├── agents/           # 7 specialized agents
│   ├── commands/         # 8 slash commands
│   ├── hooks/            # 4 automation hooks
│   ├── logs/             # Auto-generated research logs
│   └── settings.json     # Permissions + hooks config
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── news/         # News listing + detail
│   │   ├── trends/       # Trend analyses
│   │   ├── digest/       # Digest listing + detail
│   │   └── api/          # REST API routes
│   ├── components/       # Reusable UI components
│   └── lib/              # Supabase clients + types
├── supabase/
│   └── migrations/       # SQL migration files
├── CLAUDE.md             # ← This file
├── project.md            # Project documentation
├── task.md               # Development task tracker
├── .env.example          # Environment template
└── vercel.json           # Vercel deployment config
```
