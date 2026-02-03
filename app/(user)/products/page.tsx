import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import Products from "@/components/widgets/products"

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <Header />
      <div className="flex flex-col gap-2 w-full">
        <Products />
      </div>
      <Footer />
    </div>
  )
}

export default page
