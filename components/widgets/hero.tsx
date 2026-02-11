import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex justify-center">
      <Image
        src="/images/HeroDesktop.jpg"
        alt="Hero"
        width={1450}
        height={600}
        priority
        className="object-cover sm:block hidden"
      />
      <Image
        src="/images/Hero.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover block md:hidden"
      />
    </div>
  )
}

export default Hero
