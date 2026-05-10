import FuzzyText from "../components/FuzzyText";
import Noise from "../components/Noise";
import FadeContent from "../components/FadeContent";
import Map from "./Map";

import { AnimatePresence, motion } from "motion/react";
import { use, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const openMap = location.pathname.includes("map");

  const constraintRef = useRef(null);

  const logoPattern = "/scavenger/assets/logo-pattern.svg";

  //BACKGROUND -- bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,1)_100%),url('/scavenger/assets/forestColor.jpg')]
  return (
    <div className="bg-black snap-mandatory snap-y overflow-hidden h-[100vh] flex flex-col no-scrollbar">
      <Noise
        patternSize={900}
        patternScaleX={4}
        patternScaleY={4}
        patternRefreshInterval={2}
        patternAlpha={12}
      />
      <FadeContent
        blur={true}
        duration={300}
        easing="ease-out"
        initialOpacity={0}
      >
        <section
          className="relative flex h-screen bg-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(20,20,20,0.85)), url(${logoPattern})`,
          }}
        >
          <div
            ref={constraintRef}
            className="w-full mt-8 mx-auto flex flex-col items-center text-center text-white [text-shadow:0_0_20px_black]"
          >
            <div className="absolute z-40  ">
              {/* <motion.div
                className="absolute  h-96 w-96"
                style={{ zIndex: 9999 }}
                // drag
                dragConstraints={constraintRef}
              >
                <ThreeModel modelSource={backpackGLB} scale={1.5} />
                <ThreeModel modelSource={coordGLB} scale={2.0} />
              </motion.div> */}
              <Map />
            </div>
            <motion.div
              className={`flex flex-col justify-center items-center z-60 pt-8
               ${openMap ? "pointer-events-none" : "pointer-events-auto"}`}
              animate={openMap ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 4, type: "spring" }}
            >
              <FuzzyText
                baseIntensity={0.1}
                hoverIntensity={0.01}
                enableHover={true}
                fontSize={64}
                fontWeight={500}
                fontFamily="revolution"
              >
                It's rough out there.
              </FuzzyText>

              <div className="font-[revolution] font-bold text-[24px] max-w-[550px] my-[15px] tracking-[4px] [text-shadow:0_0_5px_black] ">
                <h1 className="pb-8">
                  Find top of the line gear for hiking, biking, camping and
                  more...
                </h1>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeContent>
    </div>
  );
}

export default Home;
