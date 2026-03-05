import { useState } from "react";
import { motion } from "motion/react";

function Art() {
  const images = import.meta.glob<{ default: string }>(
    "../assets/portfolio/*.{png,jpg,jpeg}",
    {
      eager: true,
    },
  );

  const [viewImg, setViewImg] = useState<number | null>(null);
  const imageArray = Object.values(images);

  return (
    <div className=" relative m-4">
      <h1 className="relative font-bold text-space tracking-widest  text-shadow-lg/30">
        ART OVER THE YEARS
      </h1>
      <div className="grid grid-cols-4 shadow-xl shadow-white ring-2 ">
        {Object.values(imageArray).map((img, i) => (
          <motion.div
            key={i}
            layout
            className={` bg-black/80 ${viewImg === i ? "col-span-3 row-span-2" : "col-span-1 row-span-1"}`}
          >
            <motion.img
              layout
              whileHover={
                viewImg !== i
                  ? {
                      scale: 1.05,

                      transition: {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },
                      zIndex: 99,
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
                    }
                  : {}
              }
              onClick={() => {
                viewImg !== i ? setViewImg(i) : setViewImg(null);
              }}
              className={`${viewImg !== i ? "object-cover" : "object-contain"} w-full cursor-pointer transition-all h-full`}
              key={i}
              src={(img as { default: string }).default}
            />
          </motion.div>
        ))}
      </div>
      {/* <AnimatePresence>
        {viewImg !== null && (
          <motion.img
            layout
            className="absolute top-0 left-0 z-50 h-full object-contain"
            onClick={() => setViewImg(null)}
            src={imageArray[viewImg].default}
          />
        )}
      </AnimatePresence> */}

      <h1 className="font-bold text-space tracking-widest my-8  text-shadow-lg/30">
        PHOTOGRAPHY
      </h1>
      <p className="my-16">-----</p>
    </div>
  );
}

export default Art;
