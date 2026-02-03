"use client";

import { useState } from "react";
import Image from "next/image";
import { Truck, Info, Ruler, X } from "lucide-react";
import { products } from "@/db/schema";
import { addToCart } from "@/lib/cart"
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/store/currency-store";
import { currencies } from "@/lib/currencies";

type Product = typeof products.$inferSelect;

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetailsFrontend({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const router = useRouter();
  const { currency, rates } = useCurrencyStore();

  const rate = rates[currency] ?? 1;

  const displayDiscountedPrice =
    currency === "PKR"
      ? product.discountedPrice
      : Math.round(product.discountedPrice * rate * 100) / 100;

  const displayOriginalPrice =
    currency === "PKR"
      ? product.price
      : Math.round(product.price * rate * 100) / 100;


  const sizes = product.size.split(",").map((s) => s.trim());

  const SIZE_CHART_IMAGE_URL = "/images/sizechart.jpeg";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT: Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 md:overflow-y-auto w-[20%]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-28 flex-shrink-0 border-2 transition-all ${selectedImage === img ? "border-black" : "border-transparent"
                  }`}
              >
                <Image src={img} alt={product.article} fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.article}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              {product.collection} | {product.category}
            </p>
            <h1 className="text-3xl font-light tracking-tight text-gray-900 uppercase">
              {product.article}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-medium">Rs. {product.discountedPrice.toLocaleString()}</p>
            {product.discount > 0 && (
              <p className="text-lg text-gray-400 line-through">
                Rs. {product.price.toLocaleString()}
              </p>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Size Selection & Size Chart Trigger */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium uppercase tracking-wider">Size</span>

              {/* Size Chart Button (As seen in image) */}
              <button
                onClick={() => setIsSizeChartOpen(true)}
                className="flex items-center gap-2 text-xs font-semibold text-green-700 hover:text-green-800 transition-colors uppercase tracking-tighter"
              >
                <Ruler className="w-4 h-4" />
                Size Chart
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border text-sm transition-all ${selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-900 border-gray-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              disabled={!selectedSize || product.availability === "sold-out"}
              onClick={() =>
                addToCart({
                  id: product.id,
                  article: product.article,
                  category: product.category,
                  price: product.discountedPrice,
                  quantity: 1,
                  size: selectedSize,
                  images: product.images,
                })
              }
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest disabled:bg-gray-300 cursor-pointer"
            >
              Add to Cart
            </button>

            <button
              disabled={!selectedSize || product.availability === "sold-out"}
              onClick={() => {
                // Optional: clear cart first if you want single-item checkout
                // clearCart();

                addToCart({
                  id: product.id,
                  article: product.article,
                  category: product.category,
                  price: product.discountedPrice,
                  quantity: 1,
                  size: selectedSize,
                  images: product.images,
                });

                router.push("/checkout");
              }}
              className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Buy it Now
            </button>

          </div>

          {/* Utility Info */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Delivery Time</p>
                <p className="text-xs text-gray-500">
                  {product.deliveryTime?.join(", ") || "3-5 Working Days"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Disclaimer</p>
                <p className="text-xs text-gray-500 italic">{product.disclaimer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIZE CHART MODAL --- */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-light uppercase tracking-widest">Size Guide</h3>
              <button onClick={() => setIsSizeChartOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6 flex justify-center relative z-0">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/2] z-0">
                <Image
                  src={SIZE_CHART_IMAGE_URL}
                  alt="Size Chart"
                  fill
                  className="object-contain z-0"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}