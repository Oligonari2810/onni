import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }

  return new Stripe(secretKey, {
    apiVersion: '2026-04-22.dahlia',
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripeClient()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 },
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerEmail = session.customer_details?.email
        const customerId = session.customer as string
        const amountTotal = session.amount_total
        const currency = session.currency
        const paymentIntent = session.payment_intent
        const metadata = session.metadata

        const { error: orderError } = await supabase.from('orders').insert([
          {
            stripe_session_id: session.id,
            customer_email: customerEmail,
            customer_id: customerId,
            total_usd: amountTotal ? amountTotal / 100 : 0,
            currency,
            payment_intent: paymentIntent,
            status: 'paid',
            payment_method: 'stripe',
            shipping_cost: metadata?.shipping_cost ? parseFloat(metadata.shipping_cost) : 0,
            items: metadata?.items ? JSON.parse(metadata.items) : [],
            metadata,
            created_at: new Date().toISOString(),
          },
        ])

        if (orderError) throw orderError

        if (customerEmail) {
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: process.env.RESEND_FROM || 'ONNI <noreply@onnicosmetics.com>',
                to: customerEmail,
                subject: '¡Gracias por tu compra en ONNI! 🎉',
                html: `<div><h1>¡Gracias por tu compra!</h1><p>ID: ${session.id}</p></div>`,
              }),
            })
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError)
          }
        }

        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await supabase.from('orders').update({ status: 'failed' }).eq('payment_intent', paymentIntent.id)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
