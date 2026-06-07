import { NextRequest, NextResponse } from 'next/server'
import { createServiceSupabaseClient, createServerSupabaseClient } from '@/lib/supabase-server'
import type { NewsCategory, ImpactLevel } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as NewsCategory | null
  const impact = searchParams.get('impact') as ImpactLevel | null
  const limit = Math.min(parseInt(searchParams.get('limit') || '12', 10), 50)
  const offset = parseInt(searchParams.get('offset') || '0', 10)
  const featured = searchParams.get('featured') === 'true'

  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) query = query.eq('category', category)
  if (impact) query = query.eq('impact', impact)
  if (featured) query = query.eq('is_featured', true)

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count, limit, offset })
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const supabase = createServiceSupabaseClient()

  const { data, error } = await supabase
    .from('news_articles')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
