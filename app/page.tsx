import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import AboutSection from "@/components/widgets/about-us"
import Casuals from "@/components/widgets/casuals"
import Hero from "@/components/widgets/hero"
import Lune from "@/components/widgets/lune"
import LuxePret26 from "@/components/widgets/luxe-pret"
import NewArrivals from "@/components/widgets/new-arrivals"
import Sale from "@/components/widgets/sale"

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col items-center justify-between gap-2 w-full">
        <Hero />
        <NewArrivals />
        <Casuals />
        <AboutSection />
        <LuxePret26 />
        <Lune />
        <Sale />
      </div>
      <Footer />
    </div>
  )
}

export default page
