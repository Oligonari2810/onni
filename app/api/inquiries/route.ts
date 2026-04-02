import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2),
  establishment: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const parsed = inquirySchema.parse(body)

    // Insert to Supabase inquiries table
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: parsed.name,
          establishment: parsed.establishment,
          email: parsed.email,
          country: parsed.country,
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

    // TODO: Send email notification via Resend
    // const emailRes = await resend.emails.send({
    //   from: 'noreply@onni.com',
    //   to: parsed.email,
    //   subject: 'Thank you for your inquiry - Onni',
    //   html: `<p>Hi ${parsed.name},</p><p>We received your inquiry and will contact you soon.</p>`,
    // })

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
