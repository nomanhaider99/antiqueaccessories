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
      {/* Title */}
      <h1 className="md:text-[2.5rem] text-[1.5rem] font-light text-center py-3">Watch and Buy</h1>

      {/* Left Arrow */}
      <Button
        size="icon"
        variant="secondary"
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow"
      >
        <ChevronLeft />
      </Button>

      {/* Right Arrow */}
      <Button
        size="icon"
        variant="secondary"
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow"
      >
        <ChevronRight />
      </Button>

      {/* Reels */}
      <div
        ref={scrollRef}
        className="w-full flex gap-4 overflow-x-auto px-10 no-scrollbar scroll-smooth"
      >
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative min-w-[300px] h-[460px] rounded-xl overflow-hidden bg-black"
          >
            {/* Video */}
            <video
              src={reel.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />

            {/* Views */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              <Eye className="h-3 w-3" />
              {reel.views}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
