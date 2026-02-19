import type { Metadata } from "next";
import "./globals.css";
import { customfont } from './font'
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";
import CurrencySwitcher from "@/components/ui/currency-switcher";


export const metadata: Metadata = {
  title: "Antique Accessories",
  description: "Welcome to Antique Accessories by Shahzad Hassan! We are THE one stop shop for Antique, Afghan, Vintage Tribal, Boho Jewellery and a wide selection of accessories to fit any taste and style. Afghan Accessories is now at a stage where we want to provide extraordinary and handmade Jewellery to different parts of the world. Our product quality and customer service are the pride of our identity, we seek to give you a pleasant and easy online shopping experience. our tribal items are loved and statement pieces for everything from party functions to traditional weddings.our product use artificial stones, Gemstones, brass , Gilit, mirrors, and who can forget German silver!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${customfont.className}`}
      >
        <CartProvider>
          {children}
          <CurrencySwitcher />
          <Toaster richColors position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
