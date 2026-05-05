'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  slug?: string
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function normalizeImagePath(image?: string) {
  if (!image) return image
  return image
    .replace('/images/products/tocobo-cotton-soft-sun-stick-spf50-pa-19g/main.webp', '/images/products/tocobo-cotton-soft-sun-stick-spf50-pa-19g/main.svg')
    .replace('/images/products/numbuzin-no5-vitamin-glutathione-dark-spot-laser-cream-50ml/main.webp', '/images/products/numbuzin-no5-vitamin-glutathione-dark-spot-lase-cream-50ml/main.svg')
    .replace('/images/products/rutina-glow.webp', '/images/products/goodal-green-tangerine-vita-c-dark-spot-serum-40ml/main.svg')
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('onni-cart')
    if (savedCart) {
      try {
        setItems((JSON.parse(savedCart) as CartItem[]).map((item) => ({ ...item, image: normalizeImagePath(item.image) })))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('onni-cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, image: normalizeImagePath(item.image), quantity: 1 }]
    })
    setIsOpen(true)
  }

  function removeFromCart(itemId: string) {
    setItems(prev => prev.filter(i => i.id !== itemId))
  }

  function updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
    localStorage.removeItem('onni-cart')
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
