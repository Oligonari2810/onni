import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'
import { products } from '@/lib/products'

const checkoutItemSchema = z.object({
  id: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
})

const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  email: z.string().email().optional(),
  shipping: z.union([
    z.number().min(0).max(100),
    z.object({ country: z.string().min(2).max(2).optional() }),
  ]).optional(),
})

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }

  return new Stripe(secretKey, {
    apiVersion: '2026-05-27.dahlia',
  })
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

function getShippingCost(shipping: z.infer<typeof checkoutSchema>['shipping']) {
  if (typeof shipping === 'number') return shipping

  const country = shipping?.country
  if (country === 'DO') return 5.99
  if (country === 'PR') return 6.99
  if (country === 'PA' || country === 'CR') return 8.99
  if (country === 'CO') return 12.99
  return 14.99
}

function getAbsoluteImageUrl(image?: string) {
  if (!image) return undefined
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return `${getSiteUrl()}${image}`
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient()
    const body = await request.json()
    const parsed = checkoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid checkout payload', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const requestedQuantities = new Map<string, number>()
    for (const item of parsed.data.items) {
      requestedQuantities.set(item.id, (requestedQuantities.get(item.id) || 0) + item.quantity)
    }

    const checkoutItems = [...requestedQuantities.entries()].map(([id, quantity]) => {
      const product = products.find((p) => p.id === id)
      return product ? { product, quantity } : null
    })

    const unavailableItems = checkoutItems.filter((item) => {
      if (!item) return true
      return item.product.stock <= 0 || item.quantity > item.product.stock
    })

    if (unavailableItems.length > 0) {
      return NextResponse.json(
        { error: 'Some cart items are unavailable or exceed current stock' },
        { status: 400 },
      )
    }

    const shippingCost = getShippingCost(parsed.data.shipping)
    const lineItems = checkoutItems.map((item) => {
      const { product, quantity } = item!
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.category,
            images: product.image ? [getAbsoluteImageUrl(product.image)!] : undefined,
            metadata: {
              productId: product.id,
              slug: product.slug,
              category: product.category,
            },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['DO', 'PR', 'PA', 'CR', 'CO', 'MX', 'CL', 'PE', 'AR', 'BR'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shippingCost * 100),
              currency: 'usd',
            },
            display_name: 'Standard Shipping (5-10 days)',
            delivery_estimate: {
              minimum: { unit: 'day', value: 5 },
              maximum: { unit: 'day', value: 10 },
            },
          },
        },
      ],
      mode: 'payment',
      success_url: `${getSiteUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getSiteUrl()}/checkout?canceled=true`,
      customer_email: parsed.data.email,
      metadata: {
        shipping_cost: shippingCost.toString(),
        items: JSON.stringify(
          checkoutItems.map((item) => {
            const { product, quantity } = item!
            return {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              quantity,
            }
          }),
        ),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Checkout error:', error)
    } else {
      console.error('Checkout error')
    }

    if (error instanceof Error && error.message === 'Missing STRIPE_SECRET_KEY') {
      return NextResponse.json({ error: 'Checkout is not configured' }, { status: 500 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
