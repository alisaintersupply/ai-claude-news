Research a specific AI topic in depth or summarize a research paper using the ai-paper-summarizer agent.

Usage:
- /ai-research [topic] — Deep research on a topic
- /ai-research [arxiv URL] — Summarize a specific paper
- /ai-research [paper title + year] — Find and summarize a paper

For paper summaries, produce:
1. TL;DR (Thai and English)
2. Key contribution
3. Method overview
4. Key results with comparison table
5. Why it matters
6. Limitations and caveats
7. What's next

For topic research, produce:
1. Overview of the topic
2. Key players and papers
3. Current state of the art
4. Open problems
5. Practical applications

After completing, ask if the user wants to save the paper summary to the Supabase `research_papers` table.

Always cite sources. Flag unverified claims with [ยังไม่ยืนยัน].
