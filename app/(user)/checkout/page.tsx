import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import Checkout from "@/components/ui/checkout"

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col gap-2 w-full">
        <Checkout />
      </div>
      <Footer />
    </div>
  )
}

export default page
