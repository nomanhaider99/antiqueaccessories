import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import RenderProduct from "@/components/widgets/render-product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full">
        <RenderProduct category={category} />
      </div>
      <Footer />
    </div>
  );
}