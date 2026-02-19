"use client"

import Image from "next/image"
import { Trash, ShoppingBag, Check } from "lucide-react"
import { getWishlist, removeFromWishlist } from "@/lib/wishlist"
import { addToCart } from "@/lib/cart"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Wishlist() {
  const [items, setItems] = useState<any[]>([])
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const router = useRouter();

  useEffect(() => {
    setItems(getWishlist())
  }, [])

  const handleRemove = (id: string) => {
    removeFromWishlist(id)
    // Optimistic UI update: Remove immediately from state
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleAddToCart = (item: any) => {
    setAddedIds(prev => new Set(prev).add(item.id))

    addToCart({
      id: item.id,
      title: item.title,
      price: item.discountedPrice,
      quantity: 1,
      images: item.images,
    })

    window.dispatchEvent(new Event("cart-updated"))
    setTimeout(() => {
      setAddedIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
    }, 1500)
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <ShoppingBag className="mb-4 opacity-20" size={48} />
        <p className="tracking-widest uppercase text-sm">Your wishlist is empty</p>
      </div>
    )
  }

  return (
    <div className="w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-light uppercase tracking-[0.2em] mb-10 border-b pb-4">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex flex-row items-start gap-4 sm:gap-8 pb-8 border-b last:border-0"
          >
            {/* Image Container - Fixed ratio for consistency */}
            <div className="relative aspect-[3/4] w-24 sm:w-32 flex-shrink-0 bg-gray-50 overflow-hidden">
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 min-w-0 h-full justify-between py-1">
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 truncate">
                    {item.category}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash size={16} />
                  </button>
                </div>
                <h2 className="text-sm sm:text-base font-medium uppercase tracking-tight truncate">
                  {item.title}
                </h2>
                <p className="text-sm font-semibold text-gray-900">
                  PKR {item.discountedPrice.toLocaleString()}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={addedIds.has(item.id)}
                  className={`
                    w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest transition-all
                    ${addedIds.has(item.id) 
                      ? "bg-green-600 text-white border-green-600" 
                      : "bg-black text-white hover:bg-gray-800 border-black"}
                  `}
                >
                  {addedIds.has(item.id) ? (
                    <>
                      <Check size={14} /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}