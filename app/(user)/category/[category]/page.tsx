import { notFound } from "next/navigation";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import CollectionProducts from "@/components/widgets/collections-products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;

  const data = await db
    .select()
    .from(products)
    .where(eq(products.category, category))

  if (!data.length) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
        <Header />
        <div className="h-[60vh] w-full flex justify-center items-center">
          Products Not Found!
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <Header />
      <div>
        <CollectionProducts products={data as any} loading={false} category={category} />
      </div>
      <Footer />
    </div>
  );
}