import { motion } from "motion/react";

const tallTree = "/scavenger/assets/map-icons/tall-tree.png";
const shortTree = "/scavenger/assets/map-icons/short-tree.png";
function Trees() {
  return (
    <div
      id="trees"
      className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden "
    >
      {[
        // Left cluster
        { src: tallTree, h: "h-36", top: "10%", left: "22%" },
        { src: shortTree, h: "h-24", top: "18%", left: "28%" },
        { src: tallTree, h: "h-32", top: "8%", left: "30%" },
        { src: shortTree, h: "h-20", top: "25%", left: "24%" },
        { src: tallTree, h: "h-28", top: "30%", left: "32%" },
        { src: shortTree, h: "h-24", top: "38%", left: "26%" },
        { src: tallTree, h: "h-36", top: "45%", left: "21%" },
        { src: shortTree, h: "h-20", top: "52%", left: "29%" },
        { src: tallTree, h: "h-30", top: "58%", left: "23%" },
        { src: shortTree, h: "h-24", top: "65%", left: "31%" },
        { src: tallTree, h: "h-34", top: "72%", left: "25%" },
        { src: shortTree, h: "h-20", top: "78%", left: "28%" },
        { src: tallTree, h: "h-30", top: "50%", left: "13%" },
        { src: shortTree, h: "h-24", top: "55%", left: "9%" },
        { src: tallTree, h: "h-34", top: "42%", left: "15%" },
        { src: shortTree, h: "h-20", top: "48%", left: "8%" },
        { src: shortTree, h: "h-22", top: "38%", left: "12%" },

        // Right cluster
        { src: tallTree, h: "h-36", top: "10%", left: "70%" },
        { src: shortTree, h: "h-24", top: "18%", left: "68%" },
        { src: tallTree, h: "h-32", top: "20%", left: "80%" },
        { src: shortTree, h: "h-20", top: "25%", left: "74%" },
        { src: tallTree, h: "h-28", top: "30%", left: "68%" },
        { src: shortTree, h: "h-24", top: "38%", left: "76%" },
        { src: tallTree, h: "h-36", top: "45%", left: "72%" },
        { src: shortTree, h: "h-20", top: "72%", left: "49%" },
        { src: tallTree, h: "h-30", top: "58%", left: "63%" },
        { src: shortTree, h: "h-24", top: "65%", left: "61%" },
        { src: tallTree, h: "h-34", top: "72%", left: "65%" },
        { src: shortTree, h: "h-20", top: "78%", left: "78%" },

        { src: shortTree, h: "h-20", top: "52%", right: "19%" },
        { src: tallTree, h: "h-30", top: "43%", right: "13%" },
        { src: shortTree, h: "h-24", top: "65%", right: "11%" },
        { src: tallTree, h: "h-34", top: "34%", right: "15%" },
        { src: shortTree, h: "h-22", top: "58%", right: "18%" },
        { src: shortTree, h: "h-24", top: "35%", right: "4%" },
        { src: tallTree, h: "h-34", top: "43%", right: "9%" },
        { src: shortTree, h: "h-24", top: "31%", right: "18%" },

        // Top cluster
        { src: tallTree, h: "h-32", top: "2%", left: "35%" },
        { src: shortTree, h: "h-22", top: "6%", left: "40%" },
        { src: tallTree, h: "h-36", top: "1%", left: "45%" },
        { src: shortTree, h: "h-20", top: "7%", left: "50%" },
        { src: tallTree, h: "h-30", top: "3%", left: "55%" },
        { src: shortTree, h: "h-24", top: "8%", left: "42%" },
        { src: tallTree, h: "h-34", top: "2%", left: "60%" },
        { src: shortTree, h: "h-20", top: "6%", left: "48%" },

        // Bottom cluster
        { src: tallTree, h: "h-32", top: "75%", left: "35%" },
        { src: shortTree, h: "h-22", top: "78%", left: "40%" },
        { src: tallTree, h: "h-36", top: "74%", left: "45%" },
        { src: shortTree, h: "h-20", top: "79%", left: "50%" },
        { src: tallTree, h: "h-30", top: "76%", left: "55%" },
        { src: shortTree, h: "h-24", top: "70%", left: "42%" },
        { src: tallTree, h: "h-34", top: "75%", left: "60%" },
        { src: shortTree, h: "h-20", top: "79%", left: "48%" },

        // Corners
        { src: tallTree, h: "h-30", top: "5%", left: "5%" },
        { src: shortTree, h: "h-24", top: "70%", left: "6%" },
        { src: tallTree, h: "h-34", top: "70%", left: "90%" },
        { src: shortTree, h: "h-20", top: "2%", left: "89%" },
        { src: shortTree, h: "h-18", top: "6%", left: "92%" },
      ].map((tree, i) => (
        <div
          key={i}
          className={`absolute ${tree.h} mask-b-from-2% mask-b-to-98% `} // same height as the image
          style={{
            top: tree.top,
            left: tree.left ?? undefined,
            overflow: "hidden", // clips only this tree
          }}
        >
          <motion.img
            key={i}
            src={tree.src}
            //   initial={{ clipPath: "inset(100% 0% 0% 0%)" }} // fully hidden (clipped from top)
            //   animate={{ clipPath: "inset(0% 0% 0% 0%)" }} // fully revealed
            initial={{ y: "100%" }} // starts below its position
            animate={{ y: "0%" }} // slides up into place
            //   animate={{
            //     rotate: [0, 1.5, -1.5, 0],
            //     // y: [0, -2, 0],
            //   }}
            transition={{
              duration: 2 + (i % 3),
              delay: i * 0.08,
            }}
            alt=""
            className={` ${tree.h} `}
            style={{
              top: tree.top,
              left: tree.left ?? undefined,
              right: tree.right ?? undefined,
              transform: `scaleX(${i % 3 === 0 ? -1 : 1})`,
              opacity: (() => {
                const dx = tree.left
                  ? parseFloat(tree.left) - 50
                  : parseFloat(tree.right ?? "50") - 50;
                const dy = parseFloat(tree.top) - 50;
                const distance = Math.sqrt(dx * dx + dy * dy); // 0 = center, ~50 = corner
                const maxDist = 50;
                return 1 - 0.3 * (distance / maxDist); // further = more opaque, closer = more transparent
              })(),
              filter:
                "invert(20%) sepia(27%) saturate(200%) hue-rotate(98deg) brightness(40%) contrast(95%)",
              // filter:
              //   "invert(100%) sepia(59%) saturate(885%) hue-rotate(280deg) brightness(105%) contrast(98%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Trees;
