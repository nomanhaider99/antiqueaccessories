import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/Hero.png"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />
    </div>
  )
}

export default Hero
