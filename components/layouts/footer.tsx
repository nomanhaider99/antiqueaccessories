import React from "react"
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#6e232a] text-white px-14 pt-20 pb-10" id="footer">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Newsletter */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6">
            Newsletter
          </h4>
          <p className="text-sm mb-8 text-white/80 max-w-sm">
            Sign up to our newsletter to receive exclusive offers.
          </p>

          <input
            type="email"
            placeholder="E-mail"
            className="w-full bg-transparent border border-white/40 px-4 py-3 text-sm placeholder:text-white/60 focus:outline-none mb-6"
          />

          <button className="bg-black text-white px-10 py-3 text-xs tracking-[0.3em] uppercase hover:opacity-80 transition">
            Subscribe
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm text-white/85">
            <li>Return & Exchange</li>
            <li>Delivery Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>FAQs</li>
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
                href="tel:+923306666038"
                className="underline underline-offset-4"
              >
                +92-300-1234567
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="flex gap-6 mt-20">
        <Facebook className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
        <a href="https://www.instagram.com/qusoorpk"><Instagram className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" /></a>
        <Mail className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
        <Phone className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
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
