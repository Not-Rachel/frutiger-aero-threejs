import { useState, useEffect } from "react";
import NotateText from "../components/NotateText";
import { useNavigate } from "react-router-dom";
import Xarrow from "react-xarrows";
import { AnimatePresence, hover, motion } from "framer-motion";
import Trees from "../components/Trees";
// import fishImg from "/assets/map-icons/fish-hook.png";
const fishImg = "/scavenger/assets/map-icons/fish-hook.png";
const fireImg = "/scavenger/assets/map-icons/Fire.gif";
const hikerImg = "/scavenger/assets/map-icons/hiker.png";
const mountImg = "/scavenger/assets/map-icons/mount3.png";
const cabinImg = "/scavenger/assets/map-icons/cabin.png";

function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const [redrawTrigger, setRedrawTrigger] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedrawTrigger((prev) => prev + 1);
    }, 4000); // Match Map.tsx animation duration

    return () => clearTimeout(timer);
  }, [hovered]);

  return (
    <>
      <Trees />

      <div className="flex z-50 font-[Kashare] lg:text-5xl  md:text-4xl text-3xl flex-1 justify-center items-center h-full w-full pointer-events-auto">
        <div
          id="camping"
          className="absolute top-1/8 left-1/8 "
          onClick={() => navigate(`./shop?category=camping`)}
          onMouseEnter={() => {
            setHovered("camping");
          }}
          onMouseLeave={() => {
            setHovered(null);
          }}
        >
          <NotateText type="circle">Camping</NotateText>
        </div>
        <div
          id="hiking"
          className="absolute bottom-1/8 left-1/8 "
          onClick={() => navigate(`./shop?category=hiking`)}
          onMouseEnter={() => {
            setHovered("hiking");
          }}
          onMouseLeave={() => {
            setHovered(null);
          }}
        >
          <NotateText type="circle">Hiking</NotateText>
        </div>

        <div
          id="climbing"
          className="absolute top-1/8 right-1/8 "
          onClick={() => navigate(`./shop/?category=climbing`)}
          onMouseEnter={() => {
            setHovered("climbing");
          }}
          onMouseLeave={() => {
            setHovered(null);
          }}
        >
          {/* <img src={mountImg} className="h-32 w-32" alt="" /> */}
          <NotateText type="circle">Climbing</NotateText>
        </div>
        <div
          id="survival"
          className="absolute bottom-1/8 right-1/8 "
          onClick={() => navigate(`./shop?category=survival`)}
          onMouseEnter={() => {
            setHovered("survival");
          }}
          onMouseLeave={() => {
            setHovered(null);
          }}
        >
          {/* <img src={fishImg} alt="" className="h-32 w-32" /> */}
          <NotateText type="circle">Survival</NotateText>
        </div>
        <div id="cart-link" onClick={() => navigate(`./cart`)}>
          <motion.img
            // animate={{
            //   rotate: [0, 1.5, -1.5, 0],
            //   y: [0, -2, 0],
            // }}
            // transition={{
            //   duration: 3, // slightly different speed per tree
            //   repeat: Infinity,
            //   repeatType: "mirror",
            //   ease: "easeInOut",
            //   delay: 0.2, // offset so they don't all sway in sync
            // }}
            whileHover={{
              scale: 1.1,
            }}
            src={cabinImg}
            className="h-32 w-32"
            alt=""
          />
          <NotateText type="underline">Go to cart</NotateText>
        </div>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Xarrow
              key={redrawTrigger}
              dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: -2 }}
              curveness={2}
              showHead={false}
              strokeWidth={2}
              color="#33281f"
              start="cart-link" //can be react ref
              end={hovered} //or an id
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
