"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

type Reel = {
  id: number;
  video: string;
  views: string;
};

const reels: Reel[] = [
  { id: 1, video: "/videos/reel1.mp4", views: "19K" },
  { id: 2, video: "/videos/reel2.mp4", views: "21K" },
  { id: 3, video: "/videos/reel3.mp4", views: "33K" },
  { id: 4, video: "/videos/reel4.mp4", views: "6K" },
  { id: 5, video: "/videos/reel5.mp4", views: "7K" },
];

export default function WatchAndBuyReels() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      <h1 className="md:text-[2.5rem] text-[1.5rem] font-light text-center py-3">Watch and Buy</h1>

      <Button
        size="icon"
        variant="secondary"
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow"
      >
        <ChevronLeft />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow"
      >
        <ChevronRight />
      </Button>

      <div
        ref={scrollRef}
        className="w-full flex justify-center gap-4 overflow-x-auto px-10 no-scrollbar scroll-smooth"
      >
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative min-w-[300px] h-[460px] rounded-xl overflow-hidden bg-black"
          >
            <video
              src={reel.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
