# Project: ข่าว AI Claudecode

> AI News Intelligence Platform — Next.js 15 + Supabase + Vercel

---

## Vision

แพลตฟอร์มข่าว AI ที่รวบรวม วิเคราะห์ และนำเสนอข่าวสาร AI สำหรับผู้อ่านชาวไทยและต่างประเทศ โดยใช้ Claude Code เป็นเครื่องมือหลักในการค้นคว้า วิเคราะห์ และสร้างเนื้อหา

**An AI news platform that aggregates, analyzes, and presents AI industry news for Thai and international audiences, powered by Claude Code agents.**

---

## Goals

1. **Content Quality** — ข่าว AI ที่แม่นยำ มีการอ้างอิง และแปลภาษาไทยได้ถูกต้อง
2. **Speed** — News cycle 24 ชั่วโมง ทุกวัน ด้วย agent automation
3. **Depth** — มีทั้ง breaking news, trend analysis, และ research paper summaries
4. **Accessibility** — ทั้ง Thai และ English, อธิบาย technical terms สำหรับ general audience

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ข่าว AI Claudecode                        │
├─────────────────────────────────────────────────────────────┤
│  Content Pipeline (Claude Code Agents)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Research │  │  Trend   │  │  Paper   │  │  Digest  │    │
│  │  Agent   │→ │ Analyzer │→ │ Summariz │→ │  Writer  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│       ↓              ↓              ↓              ↓         │
├─────────────────────────────────────────────────────────────┤
│  Supabase (PostgreSQL)                                       │
│  news_articles | digest_issues | trend_analyses              │
│  research_papers | monitors                                  │
├─────────────────────────────────────────────────────────────┤
│  Next.js 15 (App Router + RSC)                              │
│  / | /news | /trends | /digest | /api/*                     │
├─────────────────────────────────────────────────────────────┤
│  Vercel (Production Deployment)                             │
│  Edge Network + Serverless Functions                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Pages

| Route | Description | Data Source |
|-------|-------------|-------------|
| `/` | Home — hero + latest 6 news | `news_articles` (recent) |
| `/news` | All news with filter/search | `news_articles` |
| `/news/[id]` | News detail + related | `news_articles` |
| `/trends` | Trend analysis listing | `trend_analyses` |
| `/digest` | Digest archive | `digest_issues` |
| `/digest/[id]` | Full digest view | `digest_issues` |

---

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/news` | GET | List news (with pagination, filter) |
| `/api/news` | POST | Create news article (service role) |
| `/api/digest` | GET | List digests |
| `/api/digest` | POST | Create digest (service role) |
| `/api/trends` | GET | List trend analyses |

---

## Database Schema

See `supabase/migrations/001_initial_schema.sql` for full DDL.

**Tables:**
- `news_articles` — AI news with category, impact, tags, Thai/EN content
- `digest_issues` — Curated digests (daily/weekly/deep-dive/executive)
- `trend_analyses` — STEEP-AI framework trend reports
- `research_papers` — arXiv paper summaries with Thai TL;DR
- `monitors` — Saved topic monitoring configurations

---

## Content Workflow

```
Daily Workflow:
1. /ai-news           → Research latest 24h AI news
2. Review + approve   → Editor reviews agent output
3. Save to DB         → Agent inserts to news_articles
4. /ai-digest daily   → Digest writer compiles top stories
5. Publish            → Mark digest as published
6. Monitor            → /ai-monitor checks ongoing topics

Weekly Workflow:
1. /ai-trends         → Trend analysis of the week
2. /ai-digest weekly  → Full weekly roundup
3. /ai-research       → Deep dive on significant papers
```

---

## Team / Agents

| Agent | Role | Triggered By |
|-------|------|--------------|
| ai-news-researcher | Content sourcing | `/ai-news` |
| ai-trend-analyzer | Trend intelligence | `/ai-trends` |
| ai-paper-summarizer | Research coverage | `/ai-research` |
| ai-news-monitor | Topic tracking | `/ai-monitor` |
| ai-digest-writer | Content production | `/ai-digest` |
| nextjs-developer | Frontend dev | Code tasks |
| supabase-architect | DB management | DB tasks |

---

## Deployment

| Environment | URL | Notes |
|-------------|-----|-------|
| Development | `http://localhost:3000` | `npm run dev` |
| Production | Vercel (TBD after GitHub connect) | Auto-deploy on push to `main` |

### Vercel Setup
1. Push to GitHub repository
2. Import project in Vercel dashboard
3. Set environment variables (Supabase keys)
4. Deploy

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## Tech Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 15 App Router | RSC for fast page loads, built-in API routes |
| Database | Supabase | Managed Postgres + real-time + storage + auth |
| DB Access | Supabase MCP (dev) + @supabase/ssr (runtime) | MCP for agent tasks, SSR client for Next.js |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Hosting | Vercel | Native Next.js hosting, edge functions |
| Language | TypeScript | Type safety for DB schema types |

---

## Milestones

- [x] Project scaffolded (Next.js 15 + Tailwind + TypeScript)
- [x] .claude configuration (7 agents, 8 commands, 4 hooks)
- [x] CLAUDE.md, project.md, task.md
- [ ] Supabase project created and linked
- [ ] Initial schema migrated
- [ ] Core UI pages built
- [ ] API routes implemented
- [ ] GitHub repository created
- [ ] Vercel deployment connected
- [ ] First AI news article saved to DB
- [ ] First daily digest published
