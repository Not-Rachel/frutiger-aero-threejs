import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import ViewProduct from "./ViewProduct";
import { useState, useEffect } from "react";
// import { useEffect, useState } from "react";
import { products } from "../constants/products";

interface itemProps {
  key: number;
  image: any;
  name: string;
  category: string[];
  text: string;
  model: string | null;
}
function ProductList({ items }: { items: itemProps[] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const productId = searchParams.get("product");
  const [cart, setCart] = useState<itemProps[]>([]);

  useEffect(() => {
    // localStorage.clear();
    const prevCart = localStorage.getItem("cart");
    if (prevCart) {
      setCart(JSON.parse(prevCart));
    }
  }, []);

  const productId = searchParams.get("product");

  // useEffect(() => {
  //   if (productId) {
  //     setItemInCart(
  //       cart.some((cartItem) => cartItem.key === parseInt(productId)),
  //     );
  //   }
  // }, [cart, productId]);

  function handleCart(productId: number): void {
    if (productId === null) return;

    const item = products[productId];
    if (!item) return;

    let newCart;

    //Check if item is in cart
    if (cart.some((cartItem) => cartItem.key === productId)) {
      newCart = cart.filter((cartItem) => cartItem.key !== item.key);
    } else {
      newCart = [...cart, item];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Close the product modal
    const params = new URLSearchParams(searchParams);
    params.delete("product");
    navigate(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 w-[90%] overflow-y-auto backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)] ">
      {items.map((item) => {
        return (
          <div key={item.key} className="flex flex-row gap-4 w-full">
            {item && (
              <motion.img
                whileHover={{ scale: 1.1, rotateZ: 10 }}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("product", item.key.toString());
                  navigate(`?${params.toString()}`);
                }}
                src={item.image}
                className="w-64 h-full z-30"
                style={{
                  filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))",
                }}
                alt=""
              />
            )}
            <div className="flex flex-col w-full">
              <p className="text-3xl font-semibold text-left">{item.name}</p>
              <p className="text-xl text-left">{item.text}</p>
              <button
                onClick={() => {
                  handleCart(item.key);
                }}
                className="text-red-900 pt-4 text-2xl"
              >
                {cart.some((cartItem) => cartItem.key === item.key)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        );
      })}

      {productId && (
        <ViewProduct
          handleCart={handleCart}
          itemInCart={cart.some(
            (cartItem) => cartItem.key === parseInt(productId),
          )}
          productId={parseInt(productId)}
        />
      )}
    </div>
  );
}

export default ProductList;
