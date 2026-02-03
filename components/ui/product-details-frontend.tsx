"use client";

import { useState } from "react";
import Image from "next/image";
import { Truck, Info, Ruler, X } from "lucide-react";
import { products } from "@/db/schema";
import { addToCart } from "@/lib/cart";
import { useCart } from "@/lib/cart-context"; // ✅ IMPORTANT
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/store/currency-store";

type Product = typeof products.$inferSelect;

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetailsFrontend({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const router = useRouter();
  const { refresh } = useCart(); // ✅ IMPORTANT
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

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addToCart({
      id: product.id,
      article: product.article,
      category: product.category,
      price: product.discountedPrice,
      quantity: 1,
      size: selectedSize,
      images: product.images,
    });

    refresh(); // ✅ THIS IS THE FIX
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;

    addToCart({
      id: product.id,
      article: product.article,
      category: product.category,
      price: product.discountedPrice,
      quantity: 1,
      size: selectedSize,
      images: product.images,
    });

    refresh(); // ✅ THIS IS THE FIX
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 md:overflow-y-auto w-[20%]">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-28 flex-shrink-0 border-2 ${
                  selectedImage === img ? "border-black" : "border-transparent"
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

        {/* RIGHT */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              {product.collection} | {product.category}
            </p>
            <h1 className="text-3xl font-light tracking-tight uppercase">
              {product.article}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-medium">
              Rs. {displayDiscountedPrice.toLocaleString()}
            </p>
            {product.discount > 0 && (
              <p className="text-lg text-gray-400 line-through">
                Rs. {displayOriginalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <hr />

          {/* SIZE */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium uppercase">Size</span>

              <button
                onClick={() => setIsSizeChartOpen(true)}
                className="flex items-center gap-2 text-xs font-semibold text-green-700 uppercase"
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
                  className={`px-6 py-2 border text-sm ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              disabled={!selectedSize || product.availability === "sold-out"}
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 uppercase disabled:bg-gray-300"
            >
              Add to Cart
            </button>

            <button
              disabled={!selectedSize || product.availability === "sold-out"}
              onClick={handleBuyNow}
              className="w-full border border-black py-4 uppercase hover:bg-gray-50 disabled:opacity-50"
            >
              Buy it Now
            </button>
          </div>

          {/* INFO */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex gap-3">
              <Truck className="w-5 h-5" />
              <p className="text-sm">
                {product.deliveryTime?.join(", ") || "3–5 Working Days"}
              </p>
            </div>

            <div className="flex gap-3">
              <Info className="w-5 h-5" />
              <p className="text-sm italic">{product.disclaimer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white max-w-2xl w-full relative">
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <Image
              src={SIZE_CHART_IMAGE_URL}
              alt="Size Chart"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
