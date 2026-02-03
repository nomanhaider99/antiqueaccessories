import AdminDashboard from "@/components/widgets/admin-dashboard"
import { DM_Sans } from "next/font/google"

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"] })

const page = () => {
  return (
    <div className={dm_sans.className}>
      <AdminDashboard />
    </div>
  )
}

export default page