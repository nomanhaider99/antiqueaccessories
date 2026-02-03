import { notFound } from "next/navigation";
import ProductDetails from "@/components/ui/product-details-frontend";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const product = await db
        .select()
        .from(products)
        .where(eq(products.id, id))
        .limit(1);

  if (!product.length) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <Header />
      <div>
        <ProductDetails product={product[0]} />
      </div>
      <Footer />
    </div>
  );
}