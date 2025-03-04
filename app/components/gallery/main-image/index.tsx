import { images } from "@/app/data/images";
import { MotionValue, useMotionValueEvent } from "motion/react";
import { useState } from "react";

type Props = {
  progress: MotionValue<number>;
};

export function GalleryMainImage({ progress }: Props) {
  const [activeImage, setActiveImage] = useState<string>(images[0]);

  useMotionValueEvent(progress, "change", (value) => {
    const index = Math.floor(value * images.length);
    setActiveImage(images[index]);
  });

  return (
    <div className="fixed top-0 h-screen left-1/2 -translate-x-1/2 w-[60vw] py-20 flex items-center justify-center">
      <img src={activeImage} className="object-cover mx-w-full max-h-full" />
    </div>
  );
}
