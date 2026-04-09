import React from "react";
import { useSearchParams } from "react-router-dom";
import ThreeModel from "../components/ThreeModel";
import { AnimatePresence, motion } from "motion/react";

function Shop() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="relative w-full h-full">
      <div className="absolute z-10">
        <h1>Shop items</h1>
        {category && <p>Viewing: {category}</p>}
      </div>
    </div>
  );
}

export default Shop;
