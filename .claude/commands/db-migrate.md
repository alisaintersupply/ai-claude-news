Apply database migrations to Supabase using the supabase-architect agent and Supabase MCP tools.

Usage:
- /db-migrate — Apply all pending migrations
- /db-migrate [migration-name] — Apply a specific migration
- /db-migrate status — Check current migration state
- /db-migrate reset — Show current schema (does NOT reset — reads only)

Steps:
1. Use `list_tables` to check current schema state
2. Read the migration file from `supabase/migrations/`
3. Use `apply_migration` via Supabase MCP to apply changes
4. Verify with `list_tables` after applying

Migration files location: `supabase/migrations/`
Naming convention: `NNN_description.sql` (e.g., `001_initial_schema.sql`)

IMPORTANT: Always use `confirm_cost` before applying migrations that modify large tables.

After migration:
- Update `supabase/migrations/` if creating new migrations
- Run `generate_typescript_types` to refresh TypeScript types

Safety: Never apply a migration without first reviewing it. The pre-tool-guard hook will warn on DROP statements.
