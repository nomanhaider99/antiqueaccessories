import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import ContactUs from "@/components/widgets/contact-us"

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col items-center justify-between gap-2 w-full">
        <ContactUs />
      </div>
      <Footer />
    </div>
  )
}

export default page
