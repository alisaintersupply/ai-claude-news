Create a polished AI news digest using the ai-digest-writer agent.

Default format: daily brief (300-500 words, 5 stories max)

Supported formats:
- /ai-digest daily — Daily brief (default)
- /ai-digest weekly — Weekly digest (800-1200 words)
- /ai-digest deep-dive [topic] — Deep dive analysis (1500-2500 words)
- /ai-digest executive — Executive briefing (200-300 words, bullets only)

Steps:
1. Retrieve recent news from the Supabase `news_articles` table (last 24h for daily, last 7d for weekly)
2. Select the most impactful stories based on impact score and category
3. Write the digest following the appropriate template
4. Ask if the user wants to save the digest to the `digest_issues` table

Quality checklist before publishing:
- Every claim has a source
- Technical terms explained on first use
- Reading time estimate included
- Thai summary included
- All article IDs linked in the database record
