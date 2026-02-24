"use client"

import { Menu, X, Heart, ChevronDown } from "lucide-react"
import { useState } from "react"
import Logo from "../ui/logo"
import Cart from "../ui/cart"

const categories = [
  { label: "New Arrivals", href: "/category/new-arrivals" },
  { label: "Sale", href: "/category/sale" },
  { label: "Earrings", href: "/category/earrings" },
  { label: "Chokr", href: "/category/chokr" },
  { label: "Rings", href: "/category/rings" },
  { label: "Mala", href: "/category/mala" },
  { label: "Pazaib", href: "/category/pazaib" },
  { label: "Jummka", href: "/category/jummka" },
  { label: "Bangles", href: "/category/bangles" },
  { label: "Kara", href: "/category/kara" },
  { label: "Metal bags", href: "/category/metal-bags" },
  { label: "Kundangas", href: "/category/kundangas" },
  { label: "Brass metal bags", href: "/category/brass-metal-bags" },
  { label: "Oxidise mala", href: "/category/oxidise-mala" },
  { label: "Oxidise earrings", href: "/category/oxidise-earrings" },
  { label: "Afghani vantage chokr set", href: "/category/afghani-vantage-chokr-set" },
  { label: "Rikshaw truck", href: "/category/rikshaw-truck" },
  { label: "Truck art", href: "/category/truck-art" },
  { label: "Brass", href: "/category/brass" },
  { label: "Wooden", href: "/category/wooden" },
  { label: "Coaster", href: "/category/coaster" },
  { label: "Bluepottery", href: "/category/bluepottery" },
  { label: "Onyx", href: "/category/onyx" },
];

const Header = () => {
  const [open, setOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14 py-2">
        <div className="w-[120px] flex items-center">
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="hidden lg:block w-full" />
        </div>

        <Logo />

        <div className="flex items-center gap-4 sm:gap-6 w-[120px] justify-end">
          <Cart />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex justify-center gap-10 pb-4 text-[12px] tracking-[0.25em] uppercase relative">
        <a href="/" className="hover:opacity-70">Home</a>

        {/* Categories Dropdown */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-1 hover:opacity-70">
            Categories <ChevronDown className="h-3 w-3" />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 
                  w-[700px] bg-white border shadow-xl 
                  opacity-0 invisible group-hover:opacity-100 
                  group-hover:visible transition-all duration-200">

            <div className="grid grid-cols-4 gap-6 p-8 max-h-[400px] overflow-y-auto">
              {categories.map((cat) => (
                <a
                  key={cat.href}
                  href={cat.href}
                  className="text-xs tracking-widest uppercase 
                     text-gray-700 hover:text-black 
                     transition-colors"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <a href="/category/new-arrivals" className="hover:opacity-70">New Arrivals</a>
        <a href="/category/sale" className="hover:opacity-70">Sale</a>
        <a href="/products" className="hover:opacity-70">All Products</a>
        <a href="/about-us" className="hover:opacity-70">About Us</a>
        <a href="/faqs" className="hover:opacity-70">FAQs</a>
        <a href="/contactus" className="hover:opacity-70">Contact Us</a>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm uppercase tracking-widest">
            <a href="/">Home</a>

            {/* Mobile Categories */}
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center justify-between"
            >
              CATEGORIES <ChevronDown className={`h-4 w-4 transition ${catOpen ? "rotate-180" : ""}`} />
            </button>

            {catOpen && (
              <div className="ml-4 flex flex-col gap-3  overflow-y-scroll">
                {categories.map(cat => (
                  <a key={cat.href} href={cat.href}>
                    {cat.label}
                  </a>
                ))}
              </div>
            )}

            <a href="/category/new-arrivals">New Arrivals</a>
            <a href="/category/sale">Sale</a>
            <a href="/products">All Products</a>
            <a href="/about-us">About Us</a>
            <a href="/faqs">FAQs</a>
            <a href="/contactus">Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
