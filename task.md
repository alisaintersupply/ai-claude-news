# Task Tracker — ข่าว AI Claudecode

> ติดตามงานพัฒนา — อัพเดตทุกครั้งที่เริ่ม/จบงาน

---

## Current Sprint: Foundation Setup

**Sprint Goal**: ระบบพื้นฐานพร้อมใช้งาน — DB + UI + Deploy

---

## In Progress

- [ ] Connect Supabase project (รอ project ID จากผู้ใช้)
- [ ] Set environment variables in .env.local

---

## Backlog — Infrastructure

- [ ] **[DB]** Create Supabase project at supabase.com
- [ ] **[DB]** Apply `001_initial_schema.sql` migration via `/db-migrate`
- [ ] **[DB]** Set up RLS policies (public read, service-role write)
- [ ] **[DB]** Generate TypeScript types with `generate_typescript_types`
- [ ] **[ENV]** Fill `.env.local` with Supabase keys
- [ ] **[DEPLOY]** Create GitHub repository `ai-claude-news`
- [ ] **[DEPLOY]** Push initial commit to GitHub
- [ ] **[DEPLOY]** Connect Vercel to GitHub repo
- [ ] **[DEPLOY]** Set Vercel environment variables (Supabase keys)

---

## Backlog — Frontend

- [ ] **[UI]** Update `src/app/layout.tsx` — set Thai/EN metadata, dark mode
- [ ] **[UI]** Build `src/components/Navbar.tsx` — nav with links + search
- [ ] **[UI]** Build `src/components/NewsCard.tsx` — article card with category badge
- [ ] **[UI]** Build `src/components/DigestCard.tsx` — digest edition card
- [ ] **[UI]** Build `src/components/TrendBadge.tsx` — category/impact badge
- [ ] **[UI]** Build `src/components/SearchBar.tsx` — search input
- [ ] **[PAGE]** `/` — Hero section + latest news grid (6 articles)
- [ ] **[PAGE]** `/news` — News listing with category filter + pagination
- [ ] **[PAGE]** `/news/[id]` — News detail with related articles
- [ ] **[PAGE]** `/trends` — Trend analysis listing
- [ ] **[PAGE]** `/digest` — Digest archive
- [ ] **[PAGE]** `/digest/[id]` — Full digest reader

---

## Backlog — Content

- [ ] **[CONTENT]** Run `/ai-news` to fetch first batch of news articles
- [ ] **[CONTENT]** Save first 5 articles to Supabase `news_articles`
- [ ] **[CONTENT]** Run `/ai-digest daily` to create first digest
- [ ] **[CONTENT]** Run `/ai-trends` to create first trend analysis
- [ ] **[CONTENT]** Set up `/ai-monitor` for: Anthropic, OpenAI, Google DeepMind

---

## Completed

- [x] **[SETUP]** Scaffold Next.js 15 project with TypeScript + Tailwind
- [x] **[SETUP]** Install dependencies (@supabase/ssr, @supabase/supabase-js, lucide-react, date-fns)
- [x] **[CLAUDE]** Create `.claude/agents/` — 7 agents (5 news + nextjs-developer + supabase-architect)
- [x] **[CLAUDE]** Create `.claude/commands/` — 8 commands (6 news + db-migrate + dev-run)
- [x] **[CLAUDE]** Create `.claude/hooks/` — 4 hooks (token-warning, log-research, session-notify, pre-tool-guard)
- [x] **[CLAUDE]** Create `.claude/settings.json` with permissions + hooks config
- [x] **[DOCS]** Create `CLAUDE.md` — project config for Claude Code
- [x] **[DOCS]** Create `project.md` — architecture + decisions
- [x] **[DOCS]** Create `task.md` — this file
- [x] **[DB]** Write `supabase/migrations/001_initial_schema.sql`
- [x] **[LIB]** Create `src/lib/supabase.ts` — browser client
- [x] **[LIB]** Create `src/lib/supabase-server.ts` — server client
- [x] **[LIB]** Create `src/lib/types.ts` — shared TypeScript types
- [x] **[API]** Create `/api/news/route.ts`
- [x] **[API]** Create `/api/digest/route.ts`
- [x] **[API]** Create `/api/trends/route.ts`
- [x] **[DEPLOY]** Create `vercel.json`
- [x] **[DEPLOY]** Update `.gitignore`
- [x] **[ENV]** Create `.env.example`

---

## Notes

- ใช้ Supabase MCP tools ทุกครั้งที่ทำงานกับ DB
- `SUPABASE_SERVICE_ROLE_KEY` ต้องไม่ถูก expose ไปยัง browser — ใช้ใน API routes / RSC เท่านั้น
- รัน `npm run build` ก่อน push ทุกครั้ง เพื่อตรวจ TypeScript errors
- Vercel auto-deploys ทุกครั้งที่ push ไป `main` branch
