import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: (process.env.STRIPE_API_VERSION as any) || '2025-02-24.acacia',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export interface CheckoutItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  category: string
}

export async function createCheckoutSession(items: CheckoutItem[], shippingCost: number = 0) {
  const lineItems = [
    ...items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          metadata: {
            productId: item.productId,
            category: item.category,
          },
        },
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.quantity,
    })),
    // Shipping line item
    ...(shippingCost > 0 ? [{
      price_data: {
        currency: 'usd' as const,
        product_data: {
          name: 'Envío',
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    }] : []),
  ]

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/checkout?canceled=true`,
    metadata: {
      items: JSON.stringify(
        items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        }))
      ),
      shipping_cost: shippingCost.toString(),
    },
  })

  return { url: session.url, sessionId: session.id }
}
