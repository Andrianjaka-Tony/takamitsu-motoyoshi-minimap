"use client";

import { useRef } from "react";

import { GalleryCategory } from "./category";
import { GalleryMiniMap } from "./mini-map";
import { useScroll } from "motion/react";

export function Gallery() {
  const galleryRef = useRef(null);

  const { scrollYProgress: progress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={galleryRef} className="w-screen relative h-[300vh]">
      <GalleryCategory />
      <GalleryMiniMap progress={progress} />
    </div>
  );
}
