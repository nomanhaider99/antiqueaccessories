import localFont from "next/font/local";

export const customfont = localFont({
  src: [
    {
      path: "../public/fonts/font1.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/font2.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter", 
  display: "swap",
});
