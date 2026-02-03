import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '500', '600', '800', '900'],
  variable: '--font-playfair-display',
})

const Logo = () => {
  return (
    <div className={`${playfair.className} text-[#6e232a] font-bold text-[1.5rem] md:text-[2rem] tracking-tighter`}>QusoorPK</div>
  )
}

export default Logo