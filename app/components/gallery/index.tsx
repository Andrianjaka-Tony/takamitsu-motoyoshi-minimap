"use client";

import { useRef } from "react";

import { GalleryCategory } from "./category";
import { GalleryMiniMap } from "./mini-map";
import { useScroll } from "motion/react";
import { GalleryMainImage } from "./main-image";

export function Gallery() {
  const galleryRef = useRef(null);

  const { scrollYProgress: progress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={galleryRef} className="w-screen relative h-[400vh]">
      <GalleryCategory />
      <GalleryMainImage progress={progress} />
      <GalleryMiniMap progress={progress} />
    </div>
  );
}
