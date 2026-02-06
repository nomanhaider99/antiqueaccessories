import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-white" id="aboutus">
      <div className="mx-auto px-6 py-16 md:py-24 w-full">
        {/* Changed to grid-cols-1 for mobile, md:grid-cols-2 for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* LEFT — IMAGE */}
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100">
            <Image
              src="/images/about.webp" // replace
              alt="Craftsmanship"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT — TEXT */}
          <div className="space-y-6 w-full">
            <p className="text-xs tracking-[0.35em] uppercase text-zinc-500">
              About QusoorPk
            </p>

            {/* Adjusted heading size slightly for mobile responsiveness */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-tight">
              Crafting Tradition. <br className="hidden md:block" />
              Defining Style
            </h2>

            <p className="text-sm leading-7 text-zinc-600">
              The journey of Qusoor is that of an Eclectic Wanderer —
              a soul navigating through a world of elegance and opulence.
              His work draws inspiration from ancient crafts, timeless
              artifacts, and majestic architecture, brought to life through
              meticulous handcrafting on rare and vintage textiles.
            </p>

            <p className="text-sm leading-7 text-zinc-600">
              Each creation is a tribute to heritage, reimagined with artistic
              flair and soulful expression — celebrating craftsmanship that
              transcends time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}