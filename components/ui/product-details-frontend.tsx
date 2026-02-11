"use client";

import { useState } from "react";
import Image from "next/image";
import { Truck } from "lucide-react";
import { products } from "@/db/schema";
import { addToCart } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/store/currency-store";
import { Heart } from "lucide-react"
import { toggleWishlist, isInWishlist } from "@/lib/wishlist"


type Product = typeof products.$inferSelect;

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetailsFrontend({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [liked, setLiked] = useState(isInWishlist(product.id))

  const router = useRouter();
  const { refresh } = useCart();
  const { rate, currency } = useCurrency();


  const displayPrice = (price: number) =>
    `${currency} ${(price * rate).toFixed(2)}`;


  const handleAddToCart = () => {

    addToCart({
      id: product.id,
      title: product.title,
      price: product.discountedPrice,
      quantity: 1,
      images: product.images,
    });

    refresh();
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.discountedPrice,
      quantity: 1,
      images: product.images,
    });

    refresh();
    router.push("/checkout");
  };

  return (
    <div className="w-full mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="w-full flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 md:overflow-y-auto w-[20%]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-32 h-28 border-2 ${selectedImage === img ? "border-black" : "border-transparent"
                  }`}
              >
                <Image src={img} alt={product.title} fill className="object-cover" />
              </button>
            ))}
          </div>

          <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
            <button
              onClick={() => {
                toggleWishlist(product)
                setLiked(!liked)
              }}
              className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow"
            >
              <Heart
                className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-black"
                  }`}
              />
            </button>

            <Image
              src={selectedImage}
              alt={product.title}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full flex flex-col space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-light tracking-tight uppercase">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-medium">
              {displayPrice(product.discountedPrice)}
            </p>
            {product.discount > 0 && (
              <p className="text-lg text-gray-400 line-through">
                {displayPrice(product.price)}
              </p>
            )}
          </div>

          <hr />

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              disabled={product.availability === "sold-out"}
              onClick={handleAddToCart}
              className={`w-full bg-black  py-4 uppercase disabled:bg-gray-300 ${product.availability == 'sold-out' ? 'text-white' : 'text-[#E8C985]'}`}
            >
              Add to Cart
            </button>

            <button
              disabled={product.availability === "sold-out"}
              onClick={handleBuyNow}
              className="w-full border border-black py-4 uppercase hover:bg-gray-50 disabled:opacity-50"
            >
              Buy it Now
            </button>
          </div>

          {/* INFO */}
          <div className="space-y-4 pt-6 border-t">
            {product.description && (
              <div>{product.description}</div>
            )}

            <div className="flex gap-3">
              <Truck className="w-5 h-5" />
              <p className="text-sm">
                {product.deliveryTime?.join(", ") || "3–5 Working Days"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
