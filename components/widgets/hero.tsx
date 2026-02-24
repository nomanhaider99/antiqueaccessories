import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full">
      {/* Desktop */}
      <Image
        src="/images/HeroDesktop.jpeg"
        alt="Hero"
        width={1900}
        height={800}
        priority
        className="hidden md:block w-full h-auto object-contain"
      />

      {/* Mobile */}
      <Image
        src="/images/HeroMobile.png"
        alt="Hero"
        width={800}
        height={1200}
        priority
        className="block md:hidden w-full h-auto object-contain"
      />
    </div>
  );
};

export default Hero;