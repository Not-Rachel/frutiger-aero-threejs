import { motion } from "motion/react";
import Page from "./Page";

import FadeIn from "./FadeIn";
import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";

// import { round } from "three/src/nodes/TSL.js";
import NotateText from "./NotateText";
interface MapProps {
  openMap: boolean;
  clickOpenMap: () => void;
}

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

  const [firstClick, setFirstClick] = useState<boolean>(false);
  const [animatePath, setAnimatePath] = useState(false);
  const pageRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const campingRef = useRef(null);
  const homeRef = useRef(null);
  const [path, setPath] = useState<string | undefined>(undefined);
  const [cart, setCart] = useState<itemProps[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items) setCart(JSON.parse(items));
  }, []);

  function handleMap() {
    clickOpenMap();
    setFirstClick(true);
  }

  function handleCampingClick() {
    console.log("Click for animation");
    setAnimatePath(true);
    setTimeout(() => setAnimatePath(false), 3000); // Reset after animation
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const openMap =
    searchParams.get("view") === "map" || searchParams.get("view") === "cart";
  function clickOpenMap() {
    const newParams = new URLSearchParams(location.search);
    newParams.set("view", openMap ? "" : "map");
    navigate(`/scavenger?${newParams.toString()}`);
  }
  function clickOpenCart() {
    const newParams = new URLSearchParams(location.search);
    newParams.set("view", "cart");
    navigate(`/scavenger?${newParams.toString()}`);
  }

  // Source - https://stackoverflow.com/a
  // Posted by Akshay Kumar, modified by community. See post 'Timeline' for change history
  // Retrieved 2025-11-11, License - CC BY-SA 4.0

  //TODO add Map elements such as Trees, Mountains, and "trails" to Product types

  return (
    <motion.div
      className="saturate-75  relative  "
      transition={{ duration: 8, type: "spring" }}
      initial={openMap ? {} : { rotate: "-90deg" }}
      animate={openMap ? { rotate: "0deg" } : {}}
      //   style={{ transformOrigin: "right center" }}
    >
      <FadeIn>
        {(onLoad) => (
          <div className="relative w-[100%] h-screen flex items-center ">
            <div
              className={`absolute w-full top-0 z-60 flex flex-row justify-end items-center ${
                openMap ? "pointer-events-none" : ""
              }`}
            >
              <motion.div
                onLoad={onLoad}
                initial={!openMap ? {} : { x: "-90%" }}
                animate={!openMap ? { x: 0 } : {}}
                transition={{ duration: 4, type: "spring" }}
                onClick={clickOpenMap}
                className="h-[95vh] w-1/2 z-50 flex justify-end brightness-90 pointer-events-auto  "
              >
                <img
                  src={oldParchmentLeft}
                  alt={"Old Parchment Left"}
                  onLoad={onLoad}
                  className=" h-full brightness-70  "
                />
              </motion.div>
              <motion.div
                onLoad={onLoad}
                initial={!openMap ? {} : { x: "90%" }}
                animate={!openMap ? { x: 0 } : {}}
                transition={{ duration: 4, type: "spring" }}
                onClick={clickOpenMap}
                className=" h-[95vh] w-1/2 z-50 flex justify-start brightness-90 pointer-events-auto  "
              >
                <div className="relative h-full justify-center  flex items-center ">
                  <h2 className="text-[7vh] absolute z-70 rotate-90 font-[Kashare] text-nowrap">
                    {openMap ? "Close map" : "Open Map"}
                  </h2>
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
              className="relative pointer-events-auto z-50 "
            >
              <img
                src={oldParchment}
                alt={"Old Parchment "}
                onLoad={onLoad}
                className="w-full h-[90vh] brightness-70 "
              />
              <div className="absolute flex flex-row justify-center items-center inset-0 pointer-events-auto  ">
                <div className="w-[90%]  z-50 flex-col m-8  text-orange-950 pointer-events-auto h-[90%]">
                  <div className="absolute pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="451"
                      height="437"
                      className="pointer-events-none"
                    >
                      <motion.path
                        d={path}
                        fill="transparent"
                        strokeWidth="2"
                        stroke="#001017ff"
                        strokeLinecap={"round"}
                        strokeDasharray={"10,10"}
                        initial={{ pathLength: 0 }}
                        animate={
                          hovered ? { pathLength: 1 } : { pathLength: 0 }
                        }
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>
                  {searchParams.get("view") !== "cart" ? (
                    <>
                      <div
                        onClick={clickOpenCart}
                        className="z-50 flex justify-center items-center w-full h-full font-[Kashare] flex-col lg:text-4xl  md:text-3xl text-2xl"
                      >
                        <NotateText>Go to Cart</NotateText>

                        <img
                          ref={homeRef}
                          src={House}
                          alt="Home"
                          className="w-1/20 "
                        />
                      </div>
                      <div className="z-50 font-[Kashare] lg:text-5xl  md:text-4xl text-3xl flex-1 justify-center items-center h-full w-full pointer-events-auto">
                        {/* <p>HOME</p> */}

                        <div
                          className="absolute top-1/8 left-1/8 "
                          onMouseEnter={() => {
                            setHovered(true);
                          }}
                          onMouseLeave={() => {
                            setHovered(false);
                          }}
                          ref={campingRef}
                        >
                          <NotateText type="crossed-off">Camping</NotateText>
                        </div>
                        <div className="absolute bottom-1/8 left-1/8">
                          <NotateText type="circle">Hiking</NotateText>
                        </div>
                        <div className="absolute top-1/8 right-1/8">
                          <NotateText type="circle">Climbing</NotateText>
                        </div>
                        <div className="absolute bottom-1/8 right-1/8">
                          <NotateText type="circle">Fishing</NotateText>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col -space-y-210">
                      {cart.map((item) => {
                        const rotate = item.key % 2 === 0 ? 2 : -2;
                        return (
                          <div
                            key={item.key}
                            style={{ rotate: `${rotate}deg` }}
                            className="w-2/3"
                          >
                            <Page item={item} />
                          </div>
                        );
                      })}
                      <button
                        className=" absolute bg-amber-200 rounded-xl right-16 p-4"
                        onClick={() => {
                          localStorage.clear();
                          setCart([]);
                        }}
                      >
                        Clear cart
                      </button>
                    </div>
                  )}
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
