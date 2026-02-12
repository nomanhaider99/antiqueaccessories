'use client'

import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/store/currency-store";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function RenderProduct({ category }: { category?: string }) {
  const { currency, rate } = useCurrency();
  const [data, setData] = useState<Product[]>([]);

  const displayPrice = (value: number) =>
    `${currency} ${(rate * value).toFixed(2)}`;

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then(res => res.json())
      .then(setData);
  }, [])

  if (data.length == 0) {
    return;
  }

  const formatCategory = (value: string) =>
    value
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-4xl font-light mb-10">
        {formatCategory(category as string)}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {data.map((product) => {
          const hasDiscount =
            product.discountedPrice &&
            product.discountedPrice < product.price;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative bg-white">
                {/* SALE BADGE */}
                {hasDiscount && (
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-3 py-1 rounded-full">
                    {formatCategory(product.category)}
                  </span>
                )}

                {/* IMAGE */}
                <div className="relative aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={400}
                    height={600}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.availability === "sold-out" && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm uppercase tracking-widest">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="mt-4 text-center space-y-1">
                  <p className="text-sm font-medium">
                    {product.title}
                  </p>

                  <div className="flex justify-center items-center gap-2 text-sm">
                    {hasDiscount && (
                      <span className="line-through text-muted-foreground">
                        {displayPrice(product.price)}
                      </span>
                    )}
                    <span className="font-semibold">
                      {displayPrice(
                        product.discountedPrice || product.price
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
