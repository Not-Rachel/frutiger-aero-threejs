import TopNav from "../components/ScavNav";
// import { useState } from "react";
// import Typewriter from "typewriter-effect";
import FuzzyText from "../components/FuzzyText";
import Noise from "../components/Noise";
import FadeContent from "../components/FadeContent";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import Map from "./Map";

import { motion } from "motion/react";
import { use, useEffect, useRef, useState } from "react";
import NotateText from "../components/NotateText";
import NoteBook from "../components/Notebook";
import { useLocation } from "react-router-dom";
import ThreeModel from "../components/ThreeModel";
// import Book3D from "../components/Book3D";

function Home() {
  const balmImg = "/scavenger/assets/product-images/balm.jpeg";
  const allProductsImg = "/scavenger/assets/product-images/all_together.png";
  const strawImg = "/scavenger/assets/product-images/filter_straw.jpeg";
  const bagImg = "/scavenger/assets/product-images/bag.jpeg";
  const cordImg = "/scavenger/assets/product-images/cord.jpeg";
  const toteImg = "/scavenger/assets/product-images/tote.jpeg";
  const fireImg = "/scavenger/assets/product-images/fire_starter.jpeg";
  const multitoolImg = "/scavenger/assets/product-images/multitool.jpg";
  const bookCover = "/scavenger/assets/product-images/oldbookcover.png";

  const backpackGLB = "/scavenger/betterbag.glb";
  const multitoolGLB = "/scavenger/Multitool_fixed.glb";
  const boxGLB = "/scavenger/box.glb";

  const items = [
    {
      key: 0,
      image: multitoolImg,
      name: "Multitool",
      text: "A compact, all-in-one toolset designed for hikers—includes knife, pliers, screwdriver, and more for quick fixes and outdoor tasks.",
      model: "/scavenger/Multitool_fixed.glb",
    },
    {
      key: 1,
      image: bagImg,
      name: "Backpack",
      text: "Durable hiking backpack with reinforced straps, multiple compartments, and weather-resistant fabric—perfect for long treks and gear organization.",
      model: "/scavenger/betterbag.glb",
    },
    {
      key: 2,
      image: balmImg,
      name: "Climbing Balm",
      text: "Protective balm that soothes and strengthens skin for climbers—ideal for preventing tears and improving grip during rugged ascents.",
      model: null,
    },
    {
      key: 3,
      image: cordImg,
      name: "Coord",
      text: "Heavy-duty camping cord for securing tents, hanging gear, or building shelters—lightweight, strong, and essential for outdoor setups.",
      model: null,
    },
    {
      key: 4,
      image: strawImg,
      name: "Filtered Straw",
      text: "Portable water filtration straw that removes bacteria and debris—drink safely from rivers and streams while camping or hiking.",
      model: null,
    },
    {
      key: 5,
      image: toteImg,
      name: "Hiking Tote",
      text: "Spacious and rugged tote bag for carrying survival essentials, snacks, and trail gear—easy to pack and grab on the go.",
      model: null,
    },
    {
      key: 6,
      image: toteImg,
      name: "Item #7",
      text: "Add more items",
      model: null,
    },
    {
      key: 7,
      image: toteImg,
      name: "Item #8",
      text: "Add more items",
      model: null,
    },
  ];

  const location = useLocation();
  const openMap = location.pathname.includes("map");
  // const navigate = useNavigate();

  const constraintRef = useRef(null);

  // const [openMap, setOpenMap] = useState(false);

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
        <section className="relative flex h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,1)_100%),url('/scavenger/assets/woof.jpg')] shadow-[inset_0_0_8px_8px_black]  bg-cover bg-no-repeat">
          <div
            ref={constraintRef}
            className="w-full mt-8 mx-auto flex flex-col items-center text-center text-white [text-shadow:0_0_20px_black]"
          >
            <div className="absolute z-40  ">
              <motion.div
                className="absolute  h-96 w-96"
                style={{ zIndex: 9999 }}
                drag
                dragConstraints={constraintRef}
              >
                <ThreeModel modelSource={backpackGLB} scale={1.5} />
              </motion.div>
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
                {/* <div onClick={clickOpenMap}>
                  <NotateText>begin your journey</NotateText>
                </div> */}
                <button onClick={() => console.log("cart")}>
                  <NotateText>Open Cart</NotateText>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeContent>
    </div>
  );
}

export default Home;
