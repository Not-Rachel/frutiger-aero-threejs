import { AnimatePresence, motion } from "motion/react";
import FadeIn from "../components/FadeIn";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// import { round } from "three/src/nodes/TSL.js";
import Home from "./Home";
import Cart from "./Cart";
import Shop from "./Shop";
import { useSearchParams } from "react-router-dom";

const oldParchment = "/scavenger/assets/old-parchment-center-l.png";
const oldParchmentRight = "/scavenger/assets/old-parchment-edge-right.png";
const oldParchmentLeft = "/scavenger/assets/old-parchment-edge-left.png";

type MapState = "closed" | "open" | "halfOpen";

const PANEL_ANIMATIONS: Record<
  MapState,
  {
    left: Record<string, any>;
    right: Record<string, any>;
    middle: Record<string, any>;
    content: Record<string, any>;
  }
> = {
  closed: {
    left: { x: "0%" },
    right: { x: "0%" },
    middle: { clipPath: "inset(0 45% 0 45%)" },
    content: {},
  },
  open: {
    left: { x: "-90%" },
    right: { x: "90%" },
    middle: { clipPath: "inset(0 0% 0 0%)" },
    content: {},
  },
  halfOpen: {
    left: { x: "0%" },
    right: { x: "90%" },
    middle: { x: "45%", clipPath: "inset(0 45% 0 0%)" },
    content: { width: "55%" },
  },
};

function Map() {
  const navigate = useNavigate();

  const location = useLocation();
  const isMapRoute = location.pathname.includes("map");

  const [searchParams] = useSearchParams();
  const viewingProduct = searchParams.get("product");
  console.log("VIEWING PRODUCT", viewingProduct);

  const mapState: MapState = viewingProduct
    ? "halfOpen"
    : isMapRoute
      ? "open"
      : "closed";

  const panels = PANEL_ANIMATIONS[mapState];

  return (
    <motion.div
      animate={viewingProduct ? { x: "10%" } : {}}
      transition={{ duration: 2, type: "spring" }}
    >
      <motion.div
        className="saturate-75  relative  "
        transition={{ duration: 8, type: "spring" }}
        initial={isMapRoute ? {} : { rotate: "-90deg" }}
        animate={isMapRoute ? { rotate: "0deg" } : {}}
      >
        <FadeIn>
          {(onLoad) => (
            <div className="relative w-[100%] h-screen flex items-center ">
              <div
                className={`absolute w-full top-0 z-20 flex flex-row justify-end items-center ${
                  isMapRoute ? "pointer-events-none" : ""
                }`}
              >
                {/* LEFT PARCHMENT */}
                <motion.div
                  onLoad={onLoad}
                  animate={panels.left}
                  transition={{ duration: 4, type: "spring" }}
                  onClick={() => {
                    console.log(location.pathname);
                    navigate("scavenger/map");
                  }}
                  className="h-[95vh] w-1/2 z-50 flex justify-end brightness-90 pointer-events-auto  "
                >
                  <div className="relative h-full justify-center  flex items-center ">
                    <img
                      src={oldParchmentLeft}
                      alt={"Old Parchment Left"}
                      onLoad={onLoad}
                      className=" h-full brightness-70  "
                    />
                  </div>
                </motion.div>
                {/* RIGHT PARCHMENT */}
                <motion.div
                  onLoad={onLoad}
                  animate={panels.right}
                  transition={{ duration: 4, type: "spring" }}
                  onClick={() => {
                    isMapRoute
                      ? navigate("scavenger")
                      : navigate("scavenger/map");
                  }}
                  className=" h-[95vh] w-1/2 z-50 flex justify-start brightness-90 pointer-events-auto  "
                >
                  <div className="relative h-full justify-center  flex items-center ">
                    <button className="text-[7vh] absolute z-70 rotate-90 font-[Kashare] text-nowrap">
                      {isMapRoute ? "Close map" : "Open Map"}
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
              {/* MIDDLE PAGE */}
              <motion.div
                layout
                initial={
                  viewingProduct
                    ? { clipPath: "inset(0 0% 0 0%)" }
                    : { clipPath: "inset(0 45% 0 45%)" }
                }
                animate={panels.middle}
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
                        animate={{ x: 0, opacity: 1, ...panels.content }}
                        exit={{
                          opacity: 0,
                          x: "50%",
                        }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="w-full h-full absolute inset-0 overflow-y-scroll "
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
    </motion.div>
  );
}
export default Map;
