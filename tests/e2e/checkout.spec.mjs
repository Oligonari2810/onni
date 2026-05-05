import { expect, test } from '@playwright/test'

const cartItem = {
  id: '1886011',
  slug: 'tocobo-cotton-soft-sun-stick',
  name: 'Cotton Soft Sun Stick SPF50+ PA++++ 19g',
  price: 15,
  quantity: 1,
  image: '/images/products/tocobo-cotton-soft-sun-stick-spf50-pa-19g/main.svg',
  category: 'Protección Solar',
}

async function seedCart(page) {
  await page.addInitScript((item) => {
    window.localStorage.setItem('onni-cart', JSON.stringify([item]))
  }, cartItem)
}

test('checkout shows card payment path by default', async ({ page }) => {
  await seedCart(page)
  await page.goto('/checkout')

  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()
  await expect(page.getByText('Método de pago')).toBeVisible()
  await expect(page.getByText('Visa, Mastercard, AmEx')).toBeVisible()
  await expect(page.getByRole('button', { name: /Ir a Stripe Checkout/i })).toBeVisible()
  await expect(page.locator('button').filter({ hasText: /^Pagar con tarjeta$/i })).toBeVisible()
})

test('cart sidebar exposes a visible checkout CTA', async ({ page }) => {
  await seedCart(page)
  await page.goto('/')
  await page.getByRole('button', { name: /Abrir carrito de compras/i }).click()

  await expect(page.getByText(cartItem.name)).toBeVisible()
  await expect(page.getByRole('button', { name: /Finalizar compra segura/i })).toBeVisible()
})

test('key shopping pages do not return broken image responses', async ({ page }) => {
  const brokenImages = []
  page.on('response', (response) => {
    const request = response.request()
    if (request.resourceType() === 'image' && response.status() >= 400) {
      brokenImages.push(`${response.status()} ${response.url()}`)
    }
  })

  await seedCart(page)
  await page.goto('/')
  await page.goto('/products')
  await page.goto('/checkout')

  expect(brokenImages).toEqual([])
})
