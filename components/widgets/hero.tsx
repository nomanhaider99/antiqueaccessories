import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/Hero.png"
        alt="Hero"
        fill
        priority
        className="object-cover sm:block hidden"
      />
      <Image
        src="/images/HeroMobile.png"
        alt="Hero"
        fill
        priority
        className="object-cover block sm:hidden"
      />
    </div>
  )
}

export default Hero
