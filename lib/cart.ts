export type CartItem = {
  id: string
  article: string
  price: number
  quantity: number
  size: string
  images: string[]
}

const CART_KEY = "cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]")
}

export function setCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(item: CartItem) {
  const cart = getCart()
  const existing = cart.find(
    (i) => i.id === item.id && i.size === item.size
  )

  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.push(item)
  }

  setCart(cart)
}

export function updateQuantity(id: string, size: string, qty: number) {
  const cart = getCart().map((i) =>
    i.id === id && i.size === size
      ? { ...i, quantity: Math.max(1, qty) }
      : i
  )
  setCart(cart)
}

export function removeFromCart(id: string, size: string) {
  setCart(getCart().filter((i) => !(i.id === id && i.size === size)))
}
