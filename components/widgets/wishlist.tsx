"use client"

import Image from "next/image"
import { Trash, ShoppingBag } from "lucide-react"
import { getWishlist, removeFromWishlist } from "@/lib/wishlist"
import { addToCart } from "@/lib/cart"
import { useEffect, useState } from "react"

export default function Wishlist() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setItems(getWishlist())
  }, [])

  const handleRemove = (id: string) => {
    removeFromWishlist(id)
    setItems(getWishlist())
  }

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.discountedPrice,
      quantity: 1,
      images: item.images,
    })
  }

  if (!items.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        Your wishlist is empty.
      </div>
    )
  }

  return (
    <div className="w-3/4 mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-light uppercase tracking-wide">
        Wishlist
      </h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 border-b pb-6"
        >
          {/* Image */}
          <div className="relative w-28 h-36 bg-gray-100">
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                {item.category}
              </p>
              <h2 className="text-lg font-light uppercase">
                {item.title}
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                PKR {item.discountedPrice}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-1 text-sm border px-3 py-1 hover:bg-gray-50"
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:opacity-70"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
