import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { products } from "@/db/schema";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import RenderProduct from "@/components/widgets/render-product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;


  const data = category
    ? await db
      .select()
      .from(products)
      .where(
        sql`${products.category} @> ${JSON.stringify([category])}::jsonb`
      )
    : await db.select().from(products);


  if (!data.length) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center">
        <Header />
        <div className="h-[60vh] w-full flex justify-center items-center">
          Products Not Found!
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div>
        <RenderProduct category={category} />
      </div>
      <Footer />
    </div>
  );
}