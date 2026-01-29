import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { customfont } from "./font";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"]
});

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
        className={`${customfont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
