import { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";

function Art() {
  const images = import.meta.glob("../assets/portfolio/*.{png,jpg,jpeg}", {
    eager: true,
  });

  const [viewImg, setViewImg] = useState<number | null>(null);
  const imageArray = Object.values(images);

  return (
    <div className="m-4">
      <h1 className="font-bold text-space tracking-widest  text-shadow-lg/30">
        ART OVER THE YEARS
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-3 rounded-lg overflow-hidden shadow-xl shadow-white ring-2">
        {Object.values(imageArray).map((img, i) => (
          <motion.img
            layout
            whileHover={{
              scale: 1.05,

              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
              zIndex: 99,
            }}
            onClick={() => setViewImg(i)}
            className="object-cover w-full h-56 shadow-xl shadow-black/50"
            key={i}
            src={img.default}
          />
        ))}
      </div>
      <h1 className="font-bold text-space tracking-widest my-8  text-shadow-lg/30">
        PHOTOGRAPHY
      </h1>
      <p className="my-16">-----</p>
    </div>
  );
}

export default Art;
