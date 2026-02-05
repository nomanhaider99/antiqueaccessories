import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { customfont } from "./font";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"] })

export const metadata: Metadata = {
  title: "Qusoor",
  description: "The journey of QusoorPK is that of an Eclectic Wanderer — a soul navigating through a world of elegance and opulence. His work draws inspiration from ancient crafts, timeless artifacts, and majestic architecture, brought to life through meticulous handcrafting on rare and vintage textiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className}`}
      >
        <CartProvider>
          {children}
          <Toaster richColors position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
