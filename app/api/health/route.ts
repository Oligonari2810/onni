import { NextRequest, NextResponse } from 'next/server'

const REQUIRED_ENV = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
] as const

const OPTIONAL_ENV = [
  'RESEND_API_KEY',
  'RESEND_FROM',
  'NEXT_PUBLIC_WHATSAPP_NUMBER',
  'NEXT_PUBLIC_NEQUI_NUMBER',
  'NEXT_PUBLIC_BANK_NAME',
  'NEXT_PUBLIC_BANK_ACCOUNT',
  'NEXT_PUBLIC_BUSINESS_NAME',
  'NEXT_PUBLIC_RNC',
] as const

function envPresence(keys: readonly string[]) {
  return Object.fromEntries(keys.map((key) => [key, Boolean(process.env[key])]))
}

export async function GET(request: NextRequest) {
  const missingRequired = REQUIRED_ENV.filter((key) => !process.env[key])
  const missingOptional = OPTIONAL_ENV.filter((key) => !process.env[key])
  const strict = request.nextUrl.searchParams.get('strict') === '1'
  const ready = missingRequired.length === 0

  return NextResponse.json(
    {
      ok: strict ? ready : true,
      ready,
      service: 'onni',
      checkedAt: new Date().toISOString(),
      requiredEnv: envPresence(REQUIRED_ENV),
      optionalEnv: envPresence(OPTIONAL_ENV),
      missingRequired,
      missingOptional,
    },
    {
      status: strict && !ready ? 503 : 200,
    },
  )
}
