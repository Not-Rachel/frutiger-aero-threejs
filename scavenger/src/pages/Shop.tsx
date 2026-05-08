import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ThreeModel from "../components/ThreeModel";
import { AnimatePresence, motion } from "motion/react";
import { image } from "framer-motion/client";
import { createPortal } from "react-dom";

interface itemProps {
  key: number;
  image: any;
  name: string;
  category: string[];
  text: string;
  model: string;
}

function Shop() {
  const bagImg = "/scavenger/assets/product-images/bagDetail.png";
  const strawImg = "/scavenger/assets/product-images/filterstrawTorn.png";
  const balmImg = "/scavenger/assets/product-images/balmTorn.png";
  const coordImg = "/scavenger/assets/product-images/coordTorn.png";
  const toteImg = "/scavenger/assets/product-images/toteTorn.png";
  const fireImg = "/scavenger/assets/product-images/firestarter.png";
  const multitoolImg = "/scavenger/assets/product-images/multitool.jpg";

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  const productId = searchParams.get("product");
  const [model, setModel] = useState<null | string>(null);

  const items = [
    {
      key: 0,
      image: bagImg,
      name: "Elite Hiking Bag",
      category: ["hiking", "camping"],
      text: "High-performance Backpack for hiking, camping, 2 liters of storage",
      model: "/scavenger/glb/betterbag.glb",
    },
    {
      key: 1,
      image: strawImg,
      name: "Sand Filteration Straw",
      category: ["hiking", "camping", "survival"],
      text: "Take any dirty stream or puddle and slurp away with out amazing filtration technology.",
      model: null,
    },
    {
      key: 2,
      image: balmImg,
      name: "Climber's Hand Balm",
      category: ["climbing"],
      text: "Cracked and sore hands are no more! With this spectacular formula you can recover your aching hands in no time",
      model: null,
    },
    {
      key: 3,
      image: coordImg,
      name: "Nylon Utility Coord with Carabiner",
      category: ["camping"],
      text: "You will pracically fly up those cliff faces with our extra sturdy rope created in-house with our own patented material",
      model: "/scavenger/glb/coordFinal.glb",
    },
    {
      key: 4,
      image: toteImg,
      name: "Recycled tote bag made with ethically sourced leather",
      category: ["hiking"],
      text: "Made with incredible carrying capacity of 3 liters, take this on any hike and have you space needs met",
      model: "/scavenger/glb/toteFinal.glb",
    },
    {
      key: 5,
      image: fireImg,
      name: "Water-proof Firestarting Tinder",
      category: ["survival", "camping"],
      text: "Start fires anywhere at anytime, rain or shine.",
      model: null,
    },
    {
      key: 6,
      image: multitoolImg,
      name: "Water-proof Firestarting Tinder",
      category: ["hiking"],
      text: "Start fires anywhere at anytime, rain or shine.",
      model: "scavenger/glb/Multitool_fixed.glb",
    },
  ];

  useEffect(() => {
    if (productId) {
      const item = items.find((i) => i.key === parseInt(productId));
      if (item) {
        setModel(item.model);
      }
    } else {
      setModel(null);
    }
  }, [productId, items]);

  return (
    <div className=" w-full h-full p-8 px-16 font-[Daubmark] text-[4vw] ">
      <h1 className="font-[Kashare] tracking-wide">
        SHOP {category?.toUpperCase()}
      </h1>
      {/* {category && <p>Viewing: {category}</p>} */}
      {category && (
        <div className="flex flex-col gap-4">
          {items
            .filter((item) => item.category.includes(category))
            .map((item) => {
              return (
                <div className=" flex flex-row gap-4">
                  <motion.img
                    whileHover={{ scale: 1.1, rotateZ: 10 }}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("product", item.key.toString());
                      navigate(`?${params.toString()}`);
                    }}
                    src={item.image}
                    className="w-64  z-30 "
                    style={{
                      filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))",
                    }}
                    alt=""
                  />
                  <div>
                    <p className="text-4xl font-black text-left ">
                      {item.name}
                    </p>
                    <p className="text-2xl text-left ">{item.text}</p>
                  </div>
                </div>
              );
            })}
          {model &&
            createPortal(
              <motion.div
                className="fixed inset-0  h-full w-1/2 "
                style={{ zIndex: 9999 }}
              >
                <ThreeModel modelSource={model} scale={1} />
              </motion.div>,
              document.body,
            )}
        </div>
      )}
    </div>
  );
}

export default Shop;
