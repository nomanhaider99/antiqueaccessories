import {
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white md:px-14 px-6 pt-20 pb-10 w-full" id="footer">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Newsletter */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-[#E8C985]">
            ABOUT US
          </h4>
          <p className="text-sm mb-8 text-white/80 max-w-sm">
            We are wholesaler of authentic Afghani and tribal antique jewelry with unique designs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-[#E8C985]">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm text-white/85">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href="/#aboutus">About Us</Link>
            </li>
            <li>
              <Link href="/category/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link href="/category/sale">Sale</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
            </li>

          </ul>
        </div>

        {/* Get in touch */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-[#E8C985]">
            Get in Touch
          </h4>

          <div className="space-y-6 text-sm">

            <p>
              <span className="font-medium">Phone:</span>{" "}
              <a
                href="tel:+923304765054"
                className="underline underline-offset-4"
              >
                +92 312 2745789
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="flex gap-6 mt-20">
        <a target="_blank" href="https://www.facebook.com/profile.php?id=100078955689437"><Facebook className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
        <a target="_blank" href="https://www.instagram.com/antique_accesssories/"><Instagram className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
        <a target="_blank" href="https://api.whatsapp.com/send/?phone=923304765054&text&type=phone_number&app_absent=0"><Phone className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/20 pt-6 text-xs tracking-[0.25em] uppercase text-white/70">
        © 2026 — <span className="text-[#E8C985]">ANTIQUE ACCESSORIES</span> · Developed by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/nomanhaider99/" className="underline underline-offset-4 cursor-pointer text-[#E8C985]">
          Noman Haider
        </a>{" "}
      </div>
    </footer>
  )
}

export default Footer
