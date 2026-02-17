"use client"

import { Menu, X, Heart, ChevronDown } from "lucide-react"
import { useState } from "react"
import Logo from "../ui/logo"
import Cart from "../ui/cart"
import Link from "next/link"

const categories = [
  { label: "New Arrivals", href: "/category/new-arrivals" },
  { label: "Sale", href: "/category/sale" },
  { label: "Clothing", href: "/category/clothing" },
  { label: "Sets", href: "/category/sets" },
  { label: "Necklaces", href: "/category/necklaces" },
  { label: "Earings", href: "/category/earings" },
  { label: "Rings", href: "/category/rings" },
  { label: "Anklets", href: "/category/anklets" },
  { label: "Bangles – Bracelets", href: "/category/bangles-bracelets" },
  { label: "Nosecuffs", href: "/category/nosecuffs" },
  { label: "Matha Patti", href: "/category/matha-patti" },
  { label: "Hair Accessories", href: "/category/hair-accessories" },
  { label: "Clutches – Bags", href: "/category/clutches-bags" },
  { label: "Gift Items", href: "/category/gift-items" },
  { label: "Meena Bazar", href: "/category/meena-bazar" },
  { label: "Jhumkaaz", href: "/category/jhumkaaz" },
  { label: "Gems & Stones", href: "/category/gems-stones" },
  { label: "Jewellery Boxes", href: "/category/jewellery-boxes" },
  { label: "Toe Rings", href: "/category/toe-rings" },
]


const Header = () => {
  const [open, setOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14 py-4">
        <div className="w-[120px] flex items-center">
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="hidden lg:block w-full" />
        </div>

        <Logo />

        <div className="flex items-center gap-4 sm:gap-6 w-[120px] justify-end">
          <Link href={'/wishlist'}><Heart className="h-5 w-5 cursor-pointer hidden sm:block" /></Link>
          <Cart />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex justify-center gap-10 pb-4 text-[12px] tracking-[0.25em] uppercase relative">
        <a href="/" className="hover:opacity-70">Home</a>

        {/* Categories Dropdown */}
        <div
          className="relative group cursor-pointer"
        >
          <div className="flex items-center gap-1 hover:opacity-70">
            Categories <ChevronDown className="h-3 w-3" />
          </div>

          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white border shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {categories.map(cat => (
              <a
                key={cat.href}
                href={cat.href}
                className="block px-4 py-[4px] text-2xs tracking-widest hover:bg-gray-50"
              >
                {cat.label}
              </a>
            ))}
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
              <div className="ml-4 flex flex-col gap-3 overflow-y-scroll h-[250px] overflow-y-scroll">
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
