import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex justify-center">
      <Image
        src="/images/HeroDesktop.jpeg"
        alt="Hero"
        fill
        priority
        className="object-cover sm:block hidden w-full"
      />
      <Image
        src="/images/HeroMobile.png"
        alt="Hero"
        fill
        priority
        className="object-cover block md:hidden"
      />
    </div>
  )
}

export default Hero
