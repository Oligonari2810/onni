import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Extract customer and order information
        const customerEmail = session.customer_details?.email
        const customerId = session.customer as string
        const amountTotal = session.amount_total
        const currency = session.currency
        const paymentIntent = session.payment_intent
        const metadata = session.metadata

        // Create order in Supabase
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([
            {
              stripe_session_id: session.id,
              customer_email: customerEmail,
              customer_id: customerId,
              total_usd: amountTotal ? amountTotal / 100 : 0,
              currency: currency,
              payment_intent: paymentIntent,
              status: 'paid',
              payment_method: 'stripe',
              shipping_cost: metadata?.shipping_cost ? parseFloat(metadata.shipping_cost) : 0,
              items: metadata?.items ? JSON.parse(metadata.items) : [],
              metadata: metadata,
              created_at: new Date().toISOString(),
            },
          ])

        if (orderError) {
          console.error('Error creating order:', orderError)
          throw orderError
        }

        // Send confirmation email via Resend
        if (customerEmail) {
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: process.env.RESEND_FROM || 'ONNI <noreply@onnicosmetics.com>',
                to: customerEmail,
                subject: '¡Gracias por tu compra en ONNI! 🎉',
                html: `
                  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">¡Gracias por tu compra!</h1>
                    <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                      Hola,
                    </p>
                    <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                      Tu pedido ha sido confirmado y estamos preparándolo para envío.
                    </p>
                    <div style="background-color: #f9fafb; padding: 24px; border-radius: 8px; margin: 24px 0;">
                      <h2 style="color: #111827; font-size: 18px; margin-bottom: 12px;">Detalles del pedido</h2>
                      <p style="color: #6b7280; font-size: 14px; margin: 8px 0;">
                        <strong>ID del pedido:</strong> ${session.id}
                      </p>
                      <p style="color: #6b7280; font-size: 14px; margin: 8px 0;">
                        <strong>Total:</strong> ${currency?.toUpperCase()} ${(amountTotal || 0) / 100}
                      </p>
                    </div>
                    <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                      Te enviaremos otro email cuando tu pedido sea despachado.
                    </p>
                    <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                      Gracias por confiar en ONNI.
                    </p>
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 32px;">
                      ONNI Caribe · K-Beauty para el Caribe
                    </p>
                  </div>
                `,
              }),
            })
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError)
          }
        }

        // Send notification to admin
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: process.env.RESEND_FROM || 'ONNI <noreply@onnicosmetics.com>',
              to: ['amperez@ariasgroupcaribe.com', 'olivergonzalezarias@gmail.com'],
              subject: `🛍️ Nuevo pedido - ${currency?.toUpperCase()} ${(amountTotal || 0) / 100}`,
              text: `
Nuevo pedido completado:
- ID: ${session.id}
- Email: ${customerEmail}
- Total: ${currency?.toUpperCase()} ${(amountTotal || 0) / 100}
- Payment Intent: ${paymentIntent}
              `,
            }),
          })
        } catch (adminEmailError) {
          console.error('Error sending admin notification:', adminEmailError)
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        console.error('Payment failed:', paymentIntent.id)
        
        // Update order status in database
        await supabase
          .from('orders')
          .update({ status: 'failed' })
          .eq('payment_intent', paymentIntent.id)

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
