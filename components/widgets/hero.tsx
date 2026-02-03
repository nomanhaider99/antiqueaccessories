import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/images/Hero.webp"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />
    </div>
  )
}

export default Hero
