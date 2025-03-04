import { MotionValue, useTransform, motion } from "motion/react";

import { images } from "@/app/data/images";

type Props = {
  progress: MotionValue<number>;
};

export function GalleryMiniMap({ progress }: Props) {
  const y = useTransform(progress, [0, 1], ["0%", "-100%"]);
  const marginTop = useTransform(progress, [0, 1], [0, 49]);

  return (
    <div className="fixed top-1/2 right-20 w-fit">
      <motion.div className="h-fit relative flex flex-col gap-2" style={{ y, marginTop }}>
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            className="w-20 aspect-[16/10] object-cover cursor-pointer"
          />
        ))}
      </motion.div>
    </div>
  );
}
