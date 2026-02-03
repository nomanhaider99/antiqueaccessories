"use client"

import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import Logo from "../ui/logo"
import Cart from "../ui/cart"

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14 py-4">
        {/* Left (Desktop spacer / Mobile menu) */}
        <div className="w-[120px] flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop spacer */}
          <div className="hidden lg:block w-full" />
        </div>

        {/* Logo (always centered) */}
        <Logo />

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-6 w-[120px] justify-end">
          <Search className="h-5 w-5 cursor-pointer hidden sm:block" />
          <Cart />
        </div>
      </div>

      {/* Desktop Navigation (UNCHANGED) */}
      <nav className="hidden lg:flex justify-center gap-10 pb-4 text-[12px] tracking-[0.25em] uppercase">
        <a href="/" className="hover:opacity-70">Home</a>
        <a href="/products" className="hover:opacity-70">New Arrivals</a>
        <a href="#" className="hover:opacity-70">Trending ’26</a>
        <a href="#" className="hover:opacity-70">All Collections</a>
        <a href="#" className="hover:opacity-70">FAQs</a>
        <a href="#" className="hover:opacity-70">Contact Us</a>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm uppercase tracking-widest">
            <a href="/" className="hover:opacity-70">Home</a>
            <a href="/products" className="hover:opacity-70">New Arrivals</a>
            <a href="#" className="hover:opacity-70">Trending ’26</a>
            <a href="#" className="hover:opacity-70">All Collections</a>
            <a href="#" className="hover:opacity-70">FAQs</a>
            <a href="#" className="hover:opacity-70">Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
