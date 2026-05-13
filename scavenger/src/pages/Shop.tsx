// import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { products } from "../constants/products";
import ProductList from "../components/ProductList";

function Shop() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  // const productId = searchParams.get("product");

  const categories = ["hiking", "camping", "survival", "climbing"];

  return (
    <div className=" w-full h-[90%] pt-8 px-16 font-[Daubmark] text-3xl  flex flex-col  ">
      <nav className="flex flex-row gap-4 justify-center items-center ">
        {categories.map((cat) => {
          return (
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("category", cat);
                navigate(`?${params.toString()}`);
              }}
              className={
                cat === category
                  ? "font-[Kashare] tracking-wide text-[3vw]"
                  : ""
              }
            >
              {cat}
            </button>
          );
        })}
      </nav>
      <button onClick={() => navigate("/scavenger/map/cart")}>
        Go to cart
      </button>
      <div className="overflow-y-scroll  flex-1 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)] ">
        {category && (
          <ProductList
            items={products.filter((item) => item.category.includes(category))}
          />
        )}
      </div>
    </div>
  );
}

export default Shop;
