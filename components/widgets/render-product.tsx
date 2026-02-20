import Image from "next/image";
import Link from "next/link";
import Price from "../ui/price";
import { db } from "@/db";
import { products } from "@/db/schema";
import { sql } from "drizzle-orm";

export default async function RenderProduct({ category }: { category?: string }) {
  const data = category
    ? await db
      .select()
      .from(products)
      .where(sql`${products.category} @> ${JSON.stringify([category])}::jsonb`)
    : await db.select().from(products);

  if (!data.length) return null;


  const formatCategory = (value?: string) =>
    value
      ?.split("-")
      ?.map(w => w[0]?.toUpperCase() + w?.slice(1))
      ?.join(" ");

  return (
    <section className="w-full mx-auto px-6 md:py-16 py-4 space-y-5">
      <h1 className="md:text-[2.5rem] text-[1.5rem] font-light">
        Our {category ? formatCategory(category) : 'Products'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {data.map((product) => {
          const hasDiscount =
            product.discountedPrice > 0 &&
            product.discountedPrice < product.price;

          const discountPercent = hasDiscount
            ? Math.round(
              ((product.price - product.discountedPrice) / product.price) *
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

                {/* DISCOUNT BADGE */}
                {hasDiscount && (
                  <span className="absolute top-3 left-3 z-10 bg-green-700 text-white text-[11px] font-semibold px-3 py-1 tracking-wider uppercase">
                    {discountPercent}% OFF
                  </span>
                )}

                <Image
                  src={product.images[0]}
                  alt={'productimage'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />


                {/* SOLD OUT OVERLAY */}
                {product.availability === "sold-out" && (
                  <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center text-sm tracking-widest uppercase">
                    Sold Out
                  </div>
                )}
              </div>

              <div className="mt-4 text-center space-y-1">
                <p className="text-[13px] tracking-[0.25em] uppercase">
                  {product.title}
                </p>

                <Price
                  value={product.discountedPrice || product.price}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>

  );
}