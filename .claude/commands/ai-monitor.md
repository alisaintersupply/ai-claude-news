Set up or run monitoring for specific AI topics using the ai-news-monitor agent.

Usage:
- /ai-monitor [topic/company] — Check latest news for a specific topic
- /ai-monitor setup [name] — Create a new monitoring config saved to Supabase
- /ai-monitor list — Show active monitors from Supabase `monitors` table
- /ai-monitor run [id] — Run a saved monitor by ID

When running a monitor:
1. Retrieve the monitor config from Supabase (if saved)
2. Search for news matching the topics/companies
3. Filter by alert_threshold (all/significant/breakthrough)
4. Present results in the Monitor Report format
5. Update `last_checked_at` in the monitors table

Alert levels:
- 🔴 CRITICAL — Breakthrough announcement or major incident
- 🟡 HIGH — Significant product/research news
- 🟢 MEDIUM — Regular updates, minor news
- ⚪ INFORMATIONAL — Background updates

Output in Bangkok timezone. Thai notification messages for alerts.
