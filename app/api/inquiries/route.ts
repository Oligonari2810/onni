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
