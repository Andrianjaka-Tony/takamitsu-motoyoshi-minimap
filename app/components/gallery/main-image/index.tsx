"use client";

import { MouseEvent, useEffect, useState } from "react";
import { MotionValue, useMotionValueEvent, motion, Variants, AnimatePresence } from "motion/react";

import { images } from "@/app/data/images";

type Props = {
  progress: MotionValue<number>;
};

type Size = {
  width: number;
  height: number;
};

type LightboxProps = {
  image: string;
  size: Size;
  toggleLightbox: () => void;
};

function GalleryLightbox({ image, size, toggleLightbox }: LightboxProps) {
  const parentVariants: Variants = {
    initial: {
      background: "#2220",
    },
    animate: {
      background: "#222",
      transition: {
        duratioon: 0.4,
        ease: "easeInOut",
        delayChildren: 0.1,
      },
    },
    exit: {
      background: "#2220",
      transition: {
        duratioon: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants: Variants = {
    initial: {
      scale: size.height / window.innerHeight,
      clipPath: "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)",
    },
    animate: {
      scale: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: {
        duration: 0.6,
        ease: [0.48, 0.02, 0.16, 1.01],
      },
    },
    exit: {
      scale: size.height / window.innerHeight,
      clipPath: "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)",
      transition: {
        duration: 0.6,
        ease: [0.48, 0.02, 0.16, 1.01],
      },
    },
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed z-50 top-0 left-0 w-screen h-screen bg-[#222]"
    >
      <motion.img
        variants={imageVariants}
        onClick={toggleLightbox}
        src={image}
        className="fixed h-screen top-0 left-1/2 -translate-x-1/2 object-cover cursor-zoom-out"
      />
    </motion.div>
  );
}

export function GalleryMainImage({ progress }: Props) {
  const [activeImage, setActiveImage] = useState<string>(images[0]);

  const [isLightbox, setIsLightbox] = useState<boolean>(false);
  const [lightboxInitialSize, setLightboxInitialSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = document.querySelector("#fixed-image");
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      setLightboxInitialSize({ width, height });
    }
  }, [activeImage]);

  const toggleLightbox = () => {
    setIsLightbox(!isLightbox);
  };

  const openLightbox = (event: MouseEvent<HTMLImageElement>) => {
    toggleLightbox();
  };

  useMotionValueEvent(progress, "change", (value) => {
    let index = Math.floor(value * images.length);
    if (index == images.length) {
      index--;
    }
    setActiveImage(images[index]);
  });

  return (
    <>
      <div className="fixed top-0 h-screen left-1/2 -translate-x-1/2 w-[60vw] py-20 flex items-center justify-center">
        <img
          onClick={openLightbox}
          src={activeImage}
          className="object-cover mx-w-full max-h-full cursor-zoom-in"
          style={{ clipPath: "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)" }}
          id="fixed-image"
        />
      </div>
      <AnimatePresence mode="wait">
        {isLightbox && (
          <GalleryLightbox
            image={activeImage}
            size={lightboxInitialSize}
            toggleLightbox={toggleLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
