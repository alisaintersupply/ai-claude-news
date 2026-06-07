Start the Next.js development server and verify the application is running correctly.

Steps:
1. Check that `.env.local` exists with required variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (server-side only)
   
2. Run `npm run dev` in the `ai-claude-news` directory

3. Verify the app loads at http://localhost:3000

4. Check these pages are working:
   - / (home page — news feed)
   - /news (all news listing)
   - /trends (trend analyses)
   - /digest (digest listing)
   - /api/news (API endpoint)

5. Report any TypeScript or ESLint errors

If .env.local is missing, remind the user to copy .env.example and fill in their Supabase credentials from the Supabase dashboard (use get_project_url and get_publishable_keys via Supabase MCP if available).
