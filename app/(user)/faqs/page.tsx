import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import { FAQs } from "@/components/widgets/faqs"

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-between gap-2 w-full">
        <FAQs />
      </div>
      <Footer />
    </div>
  )
}

export default page
