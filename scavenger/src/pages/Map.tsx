import { AnimatePresence, motion } from "motion/react";
import Page from "../components/Page";
import FadeIn from "../components/FadeIn";
import { useEffect, useRef, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

// import { round } from "three/src/nodes/TSL.js";
import NotateText from "../components/NotateText";
import Home from "./Home";
import Cart from "./Cart";
import { pre } from "framer-motion/client";
import Shop from "./Shop";
import Trees from "../components/Trees";
import { useSearchParams } from "react-router-dom";

interface itemProps {
  key: number;
  image: any;
  name: string;
  text: string;
  model: string;
}

const oldParchment = "/scavenger/assets/old-parchment-center-l.png";
const House = "/scavenger/assets/home.png";
const oldParchmentRight = "/scavenger/assets/old-parchment-edge-right.png";
const oldParchmentLeft = "/scavenger/assets/old-parchment-edge-left.png";

function Map() {
  const navigate = useNavigate();

  const pageRef = useRef(null);

  const location = useLocation();
  const rotateMap = location.pathname.includes("map");
  console.log(location.pathname);

  const [openMap, setOpenMap] = useState(rotateMap);

  // const [searchParams] = useSearchParams();

  return (
    <motion.div
      className="saturate-75  relative  "
      transition={{ duration: 8, type: "spring" }}
      initial={rotateMap ? {} : { rotate: "-90deg" }}
      animate={rotateMap ? { rotate: "0deg" } : {}}
      //   style={{ transformOrigin: "right center" }}
    >
      <FadeIn>
        {(onLoad) => (
          <div className="relative w-[100%] h-screen flex items-center ">
            <div
              className={`absolute w-full top-0 z-20 flex flex-row justify-end items-center ${
                openMap ? "pointer-events-none" : ""
              }`}
            >
              <motion.div
                onLoad={onLoad}
                initial={!openMap ? {} : { x: "-90%" }}
                animate={!openMap ? { x: 0 } : {}}
                transition={{ duration: 4, type: "spring" }}
                onClick={() => {
                  console.log(location.pathname);

                  navigate("scavenger/map");
                  setOpenMap(true);
                }}
                // onClick={() => navigate("map")}
                className="h-[95vh] w-1/2 z-50 flex justify-end brightness-90 pointer-events-auto  "
              >
                <div className="relative h-full justify-center  flex items-center ">
                  <button className="text-[7vh] text-red-100 absolute z-50 rotate-90 font-[Kashare] text-nowrap">
                    {location.pathname !== "map" ? "Back Home" : ""}
                  </button>
                  <img
                    src={oldParchmentLeft}
                    alt={"Old Parchment Left"}
                    onLoad={onLoad}
                    className=" h-full brightness-70  "
                  />
                </div>
              </motion.div>
              <motion.div
                onLoad={onLoad}
                initial={!openMap ? {} : { x: "90%" }}
                animate={!openMap ? { x: 0 } : {}}
                transition={{ duration: 4, type: "spring" }}
                onClick={() => {
                  openMap ? navigate("scavenger") : navigate("scavenger/map");
                  setOpenMap((prev) => !prev);
                }}
                className=" h-[95vh] w-1/2 z-50 flex justify-start brightness-90 pointer-events-auto  "
              >
                <div className="relative h-full justify-center  flex items-center ">
                  <button className="text-[7vh] absolute z-70 rotate-90 font-[Kashare] text-nowrap">
                    {openMap ? "Close map" : "Open Map"}
                  </button>
                  <img
                    src={oldParchmentRight}
                    alt={"Old Parchment Right"}
                    onLoad={onLoad}
                    className="h-full brightness-70 "
                  />
                </div>
              </motion.div>
            </div>
            <motion.div
              ref={pageRef}
              initial={openMap ? {} : { clipPath: "inset(0 45% 0 45%)" }}
              animate={openMap ? { clipPath: "inset(0 0% 0 0%)" } : {}}
              transition={{ duration: 4, type: "spring" }}
              onLoad={onLoad}
              className="relative pointer-events-auto z-10 "
            >
              <img
                src={oldParchment}
                alt={"Old Parchment "}
                onLoad={onLoad}
                className="w-full h-[90vh] brightness-70 "
              />

              <div className="absolute flex flex-row justify-center items-center inset-0 pointer-events-auto  ">
                <div className="w-[90%]  z-50 flex-col   text-black pointer-events-auto h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={location.pathname}
                      initial={{ opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{
                        opacity: 0,
                        x: "50%",
                      }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="w-full h-full absolute inset-0"
                    >
                      <Routes location={location} key={location.pathname}>
                        <Route path="scavenger/map" element={<Home />} />
                        <Route path="scavenger/map/cart" element={<Cart />} />
                        <Route path="scavenger/map/shop" element={<Shop />} />
                      </Routes>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </FadeIn>
    </motion.div>
  );
}
export default Map;
