import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import { FAQs } from "@/components/widgets/faqs"
import AboutUs from "@/components/widgets/about-us"
import StoreFeatures from "@/components/ui/store-features"
import Hero from "@/components/widgets/hero"
import Reels from "@/components/widgets/reels"
import NewArrivals from "@/components/widgets/new-arrivals"
import Sale from "@/components/widgets/sale"

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-between gap-2 w-full">
        <Hero />
        <NewArrivals />
        <Reels />
        <Sale />
        <AboutUs />
        <FAQs />
        <StoreFeatures />
      </div>
      <Footer />
    </div>
  )
}

export default page
