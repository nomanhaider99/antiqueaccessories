import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Casuals() {
  const collection = "casuals";

  const data = await db
    .select()
    .from(products)
    .where(eq(products.collection, collection));

  if (!data.length) {
    notFound();
  }

  return (
      <section className="max-w-7xl mx-auto px-6 md:py-16 py-6 space-y-5">
        <h1 className="md:text-[2.5rem] text-[1.5rem] font-light text-center">
          {" "}
          {collection
            .split("-")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data.map((product) => {
            const hasDiscount =
              product.discountedPrice > 0 &&
              product.discountedPrice < product.price;

            const discountPercent = hasDiscount
              ? Math.round(
                  ((product.price - product.discountedPrice) /
                    product.price) *
                    100
                )
              : 0;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100">
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 z-10 bg-green-700 text-white text-[11px] font-semibold px-3 py-1 tracking-wider uppercase">
                      {discountPercent}% OFF
                    </span>
                  )}

                  <Image
                    src={product.images[0]}
                    alt={product.article}
                    width={400}
                    height={600}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.availability === "sold-out" && (
                    <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center text-sm tracking-widest uppercase">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="mt-4 text-center space-y-1">
                  <p className="text-[13px] tracking-[0.25em] uppercase">
                    {product.article}
                  </p>
                  <p className="text-sm">
                    Rs.{" "}
                    {(product.discountedPrice || product.price).toLocaleString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
  );
}
