// import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { products } from "../constants/products";
import ProductList from "../components/ProductList";
import { AnimatePresence, motion } from "motion/react";

function Shop() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  // const productId = searchParams.get("product");

  const categories = ["hiking", "camping", "survival", "climbing"];

  return (
    <div className="overflow-hidden  w-full h-[90%] pt-8 px-16  text-3xl  flex flex-col  ">
      <nav className="flex flex-row gap-4 justify-center items-center ">
        {categories.map((cat) => {
          return (
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("category", cat);
                navigate(`?${params.toString()}`);
              }}
              className={cat === category ? "text-red-950" : ""}
            >
              {cat}
            </button>
          );
        })}
      </nav>
      <button onClick={() => navigate("/scavenger/map/cart")}>
        Go to cart
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-y-auto scrollbar-transparent  flex-1 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)] "
        >
          {category && (
            <ProductList
              items={products.filter((item) =>
                item.category.includes(category),
              )}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Shop;
