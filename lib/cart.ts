export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  images: string[]
}

const CART_KEY = "cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    return raw.filter((item: any) =>
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      Array.isArray(item.images)
    );
  } catch {
    return [];
  }
}

export function setCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(item: CartItem) {
  const cart = getCart()
  const existing = cart.find(
    (i) => i.id === item.id
  )

  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.push(item)
  }

  setCart(cart)
}

export function updateQuantity(id: string, qty: number) {
  const cart = getCart().map((i) =>
    i.id === id
      ? { ...i, quantity: Math.max(1, qty) }
      : i
  )
  setCart(cart)
}

export function removeFromCart(id: string) {
  setCart(getCart().filter((i) => !(i.id === id)))
}
