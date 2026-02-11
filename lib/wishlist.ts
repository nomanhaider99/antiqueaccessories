import { products } from "@/db/schema"

export type WishlistItem = typeof products.$inferSelect

const WISHLIST_KEY = "wishlist"

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")
}

export function setWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
}

export function isInWishlist(id: string) {
  return getWishlist().some((i) => i.id === id)
}

export function toggleWishlist(product: WishlistItem) {
  const wishlist = getWishlist()
  const exists = wishlist.find((i) => i.id === product.id)

  if (exists) {
    setWishlist(wishlist.filter((i) => i.id !== product.id))
  } else {
    setWishlist([...wishlist, product])
  }
}

export function removeFromWishlist(id: string) {
  const wishlist = getWishlist()
  setWishlist(wishlist.filter((i) => i.id !== id))
}
