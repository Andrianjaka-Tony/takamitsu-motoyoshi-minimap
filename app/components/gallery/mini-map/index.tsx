import { MotionValue, useTransform, motion } from "motion/react";

import { images } from "@/app/data/images";
import { RefObject } from "react";
import { useLenis } from "lenis/react";

type Props = {
  progress: MotionValue<number>;
  container: RefObject<HTMLDivElement | null>;
};

export function GalleryMiniMap({ progress, container }: Props) {
  const lenis = useLenis();

  const y = useTransform(progress, [0, 1], ["0%", "-100%"]);
  const marginTop = useTransform(progress, [0, 1], [0, 49]);

  const transform = (index: number, length: number) => {
    // if (index <= length / 2) {
    //   return 1;
    // }
    return -1;
  };

  const handleClick = (index: number) => {
    if (container.current) {
      const element = container.current;
      const height =
        element.getBoundingClientRect().height -
        window.innerHeight +
        98 +
        index * 8 +
        images.length +
        2 * (images.length / 2 - index) * transform(index, images.length);

      let top = (height * index) / images.length;
      if (index >= images.length / 2) {
        top -= (index - images.length / 2) * 11;
      }
      lenis?.scrollTo(top, {
        duration: 1,
      });
    }
  };

  return (
    <div className="fixed top-1/2 right-20 w-fit">
      <motion.div className="h-fit relative flex flex-col gap-2" style={{ y, marginTop }}>
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            className="w-20 aspect-[16/10] object-cover cursor-pointer"
            onClick={() => handleClick(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}
