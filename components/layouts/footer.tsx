import {
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-[#6e232a] text-white px-14 pt-20 pb-10" id="footer">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Newsletter */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6">
            ABOUT US
          </h4>
          <p className="text-sm mb-8 text-white/80 max-w-sm">
            We only carry designs we believe in ethically and aesthetically – original, authentic pieces that are made to last.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6">
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
              <Link href="/collections/new-arrrivals">New Arrivals</Link>
            </li>
            <li>
              <Link href="/collections/casuals">Casuals</Link>
            </li>
            <li>
              <Link href="/collections/luxe-pret26">Luxe Pret 26’</Link>
            </li>
            <li>
              <Link href="/collections/lune">Lune</Link>
            </li>
            <li>
              <Link href="/collections/sale">Sale</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
            </li>

          </ul>
        </div>

        {/* Get in touch */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6">
            Get in Touch
          </h4>

          <div className="space-y-6 text-sm">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:saadbinshahzadpk@gmail.com"
                className="underline underline-offset-4"
              >
                qusoorpk@gmail.com
              </a>
            </p>

            <p>
              <span className="font-medium">Phone:</span>{" "}
              <a
                href="tel:+923304765054"
                className="underline underline-offset-4"
              >
                +92 330 4765054
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="flex gap-6 mt-20">
        <a target="_blank" href="https://www.facebook.com/profile.php?id=61566377709002&mibextid=wwXIfr&rdid=rGxzzptzPji7607v&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1883NZ5E7q%2F%3Fmibextid%3DwwXIfr#"><Facebook className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
        <a target="_blank" href="https://www.instagram.com/qusoorpk"><Instagram className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
        <Mail className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
        <a target="_blank" href="https://api.whatsapp.com/send/?phone=923304765054&text&type=phone_number&app_absent=0"><Phone className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/20 pt-6 text-xs tracking-[0.25em] uppercase text-white/70">
        © 2026 — QUSOORPK · Developed by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/nomanhaider99/" className="underline underline-offset-4 cursor-pointer">
          Noman
        </a>{" "}
        &{" "}
        <a href="https://www.linkedin.com/in/zain-ul-abideen369/" target="_blank" className="underline underline-offset-4 cursor-pointer">
          Zain
        </a>
      </div>
    </footer>
  )
}

export default Footer
