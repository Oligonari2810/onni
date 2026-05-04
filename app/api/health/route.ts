import { NextResponse } from 'next/server'

const REQUIRED_ENV = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
] as const

export async function GET() {
  const env = Object.fromEntries(
    REQUIRED_ENV.map((key) => [key, Boolean(process.env[key])]),
  )
  const missing = REQUIRED_ENV.filter((key) => !process.env[key])

  return NextResponse.json({
    ok: missing.length === 0,
    service: 'onni',
    checkedAt: new Date().toISOString(),
    env,
    missing,
  }, {
    status: missing.length === 0 ? 200 : 503,
  })
}
