export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  category: string
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}
