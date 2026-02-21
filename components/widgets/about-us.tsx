import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-0" id="aboutus">
      <div className="mx-auto px-6 pb-4 w-full">
        {/* Changed to grid-cols-1 for mobile, md:grid-cols-2 for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* LEFT — IMAGE */}
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Craftsmanship"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT — TEXT */}
          <div className="space-y-6 w-full">
            <p className="text-xs tracking-[0.35em] uppercase text-zinc-500">
              About Antique Accessories
            </p>

            {/* Adjusted heading size slightly for mobile responsiveness */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-tight">
              Crafting Tradition. <br className="hidden md:block" />
              Defining Style
            </h2>

            <p className="text-sm leading-7 text-zinc-600">
              Welcome to <strong>Antique Accessories</strong> by <b>Shahzad Hassan</b>! We are THE one stop shop for Antique, Afghan, Vintage Tribal, Boho Jewellery and a wide selection of accessories to fit any taste and style. Afghan Accessories is now at a stage where we want to provide extraordinary and handmade Jewellery to different parts of the world. Our product quality and customer service are the pride of our identity, we seek to give you a pleasant and easy online shopping experience. our tribal items are loved and statement pieces for everything from party functions to traditional weddings.our product use artificial stones, Gemstones, brass , Gilit, mirrors, and who can forget German silver!
            </p>

            <p className="text-sm leading-7 text-zinc-600">
              Additionally, we can give on customer request, custom designs creation of our valuable clients.These custom pieces are high quality handmade pieces that we are sure will meet your level of quality and necessity.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}