"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCurrency } from "@/store/currency-store";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency, rate } = useCurrency();

  const displayPrice = (price: number) =>
    `${currency} ${(price * rate).toLocaleString()}`;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Loading products…
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-4xl font-light mb-10">
        Our Collections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {products.map((product) => {
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
                    {product.category[0].toUpperCase() + product.category.slice(1)}
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
