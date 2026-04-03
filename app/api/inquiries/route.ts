import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2),
  establishment: z.string().min(2),
  type: z.string().min(1),
  city: z.string().min(1),
  whatsapp: z.string().min(5),
  email: z.string().email(),
  message: z.string().optional().default(''),
})

const NOTIFY_EMAILS = [
  'olivergonzalezarias@gmail.com',
  'amperez@ariasgroupcaribe.com',
]

async function sendNotification(parsed: z.infer<typeof inquirySchema>) {
  const subject = `Nueva solicitud B2B — ONNI · ${parsed.name}`
  const body = [
    `Nombre: ${parsed.name}`,
    `Negocio: ${parsed.establishment}`,
    `Tipo: ${parsed.type}`,
    `Ciudad / zona: ${parsed.city}`,
    `WhatsApp: ${parsed.whatsapp}`,
    `Email: ${parsed.email}`,
    `Mensaje: ${parsed.message || '(sin mensaje)'}`,
  ].join('\n')

  // Try Resend if API key is available
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'ONNI <noreply@onnicosmetics.com>',
          to: NOTIFY_EMAILS,
          subject,
          text: body,
        }),
      })
      if (!res.ok) {
        console.error('Resend error:', await res.text())
      }
      return
    } catch (err) {
      console.error('Resend send failed:', err)
    }
  }

  // TODO: Wire alternative email service (SMTP, SendGrid, etc.) if Resend is not configured
  console.log('--- EMAIL NOTIFICATION (no service configured) ---')
  console.log('To:', NOTIFY_EMAILS.join(', '))
  console.log('Subject:', subject)
  console.log(body)
  console.log('--- END ---')
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json()

    const parsed = inquirySchema.parse(rawBody)

    // Insert to Supabase
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: parsed.name,
          establishment: parsed.establishment,
          type: parsed.type,
          city: parsed.city,
          whatsapp: parsed.whatsapp,
          email: parsed.email,
          message: parsed.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    // Send email notification (non-blocking)
    sendNotification(parsed).catch((err) =>
      console.error('Notification error:', err)
    )

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
