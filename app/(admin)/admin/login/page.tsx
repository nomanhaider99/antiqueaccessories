import AdminLogin from "@/components/ui/admin-login"
import {  DM_Sans } from "next/font/google"

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"] })

const page = () => {
  return (
    <div className={`w-full h-screen flex justify-center items-center ${dm_sans.className}`}>
      <AdminLogin />
    </div>
  )
}

export default page