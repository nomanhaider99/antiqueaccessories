import { notFound } from "next/navigation";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import Products from "@/components/widgets/products";
import CollectionProducts from "@/components/widgets/collections-products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ collection: string }>
}) {
  const { collection } = await params;

  const data = await db
        .select()
        .from(products)
        .where(eq(products.collection, collection))

  if (!data.length) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <Header />
      <div>
        <CollectionProducts products={data} loading={false} collection={collection} />
      </div>
      <Footer />
    </div>
  );
}