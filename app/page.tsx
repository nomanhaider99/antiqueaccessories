import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import { FAQs } from "@/components/widgets/faqs"
import AboutUs from "@/components/widgets/about-us"
import StoreFeatures from "@/components/ui/store-features"
import Hero from "@/components/widgets/hero"
import Reels from "@/components/widgets/reels"
import RenderProduct from "@/components/widgets/render-product"


const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-between gap-2 w-full">
        <Hero />
        <RenderProduct category="new-arrivals" />
        <Reels />
        <RenderProduct category="sale" />
        <AboutUs />
        <FAQs />
        <StoreFeatures />
      </div>
      <Footer />
    </div>
  )
}

export default page
