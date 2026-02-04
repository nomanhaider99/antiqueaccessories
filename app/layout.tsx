import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { customfont } from "./font";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"] })

export const metadata: Metadata = {
  title: "Qusoorpk",
  description: "Description comes here",
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
