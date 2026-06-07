Search for and compile the latest AI news from the past 24 hours using the ai-news-researcher agent.

Focus on:
1. Model releases and capability announcements
2. Research paper breakthroughs
3. Business and funding news
4. Policy and safety developments

Present the top 5 stories in the standard news format with Thai summaries.

If a specific topic is provided after the command (e.g., /ai-news openai), focus the research on that topic/company.

After compiling, ask if the user wants to save the articles to the Supabase `news_articles` table using execute_sql via Supabase MCP.

End with "🔮 What to Watch" for tomorrow.
