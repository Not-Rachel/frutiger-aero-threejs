import TopNav from "../components/ScavNav";
// import { useState } from "react";
// import Typewriter from "typewriter-effect";
import FuzzyText from "../components/FuzzyText";
import Noise from "../components/Noise";
import FadeContent from "../components/FadeContent";
import ThreeModel from "../components/ThreeModel";
import FadeIn from "../components/FadeIn";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import Map from "../components/Map";

import { motion } from "motion/react";
import { use, useEffect, useRef, useState } from "react";
import NotateText from "../components/NotateText";
import { useLocation, useNavigate } from "react-router-dom";
import NoteBook from "../components/Notebook";

function Home() {
  const balmImg = "/scavenger/assets/product-images/balm.jpeg";
  const allProductsImg = "/scavenger/assets/product-images/all_together.png";
  const strawImg = "/scavenger/assets/product-images/filter_straw.jpeg";
  const bagImg = "/scavenger/assets/product-images/bag.jpeg";
  const cordImg = "/scavenger/assets/product-images/cord.jpeg";
  const toteImg = "/scavenger/assets/product-images/tote.jpeg";
  const fireImg = "/scavenger/assets/product-images/fire_starter.jpeg";
  const multitoolImg = "/scavenger/assets/product-images/multitool.jpg";
  const items = [
    {
      key: 0,
      image: multitoolImg,
      name: "Multitool",
      text: "A compact, all-in-one toolset designed for hikers—includes knife, pliers, screwdriver, and more for quick fixes and outdoor tasks.",
      model: "/Multitool_fixed.glb",
    },
    {
      key: 1,
      image: bagImg,
      name: "Backpack",
      text: "Durable hiking backpack with reinforced straps, multiple compartments, and weather-resistant fabric—perfect for long treks and gear organization.",
      model: "/betterbag.glb",
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
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const openMap =
    searchParams.get("view") === "map" || searchParams.get("view") === "cart";
  const navigate = useNavigate();

  // function clickOpenMap() {
  //   const newParams = new URLSearchParams(location.search);
  //   newParams.set("products", openMap ? "false" : "true");
  //   navigate(`/scavenger?${newParams.toString()}`);
  // }

  function clickOpenCart() {
    const newParams = new URLSearchParams(location.search);
    newParams.set("view", openMap ? "" : "cart");
    navigate(`/scavenger?${newParams.toString()}`);
  }

  return (
    <div className="bg-black snap-mandatory snap-y overflow-y-scroll h-[100vh] flex flex-col no-scrollbar">
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
        <section className="relative flex h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,1)_100%),url('assets/woof.jpg')] shadow-[inset_0_0_8px_8px_black]  bg-cover bg-no-repeat snap-start scroll-mt-0">
          <div className="w-full mt-8 mx-auto flex flex-col items-center text-center text-white [text-shadow:0_0_20px_black]">
            <div className="absolute z-40  ">
              <Map></Map>
            </div>
            <motion.div
              className={`flex flex-col justify-center items-center z-60 pt-8
               ${openMap ? "pointer-events-none" : "pointer-events-auto"}`}
              initial={openMap ? { opacity: 1 } : { opacity: 0 }}
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
                <button onClick={clickOpenCart}>
                  <NotateText>Open Cart</NotateText>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-black h-screen snap-start scroll-mt-0 flex items-center justify-center ">
          {/* {viewItem && ( */}
          <>
            {/* {items[currentItem].model && viewItem && (
                <motion.div
                  onDoubleClick={() => setViewItem(false)}
                  className="opacity-10 absolute w-full h-screen flex flex-col items-center justify-center pointer-events-auto"
                  initial={{ opacity: 0 }}
                  style={{
                    zIndex: viewItem ? 99 : 1,
                    pointerEvents: viewItem ? "auto" : "none",
                  }}
                  animate={viewItem ? { opacity: 1.0 } : {}}
                >
                  <ThreeModel
                    modelSource={items[currentItem].model}
                    scale={1.8}
                  />
                  <div
                    onClick={() => setViewItem(false)}
                    className="font-[Daubmark] text-3xl mb-8 border-3 border-white border-dotted rounded-sm text-yellow-100 p-4"
                  >
                    <NotateText>RETURN</NotateText>
                  </div>
                </motion.div>
              )} */}
            <NoteBook
              // viewItem={viewItem}
              // setViewItem={setViewItem}
              // setItem={nextItem}
              // item={items[currentItem]}
              items={items}
            ></NoteBook>
          </>
        </section>
      </FadeContent>
      <p>
        <a href="https://pngtree.com/freepng/old-grunge-open-notebook-damaged_13595593.html">
          png image from pngtree.com/
        </a>
      </p>
    </div>
  );
}

export default Home;
