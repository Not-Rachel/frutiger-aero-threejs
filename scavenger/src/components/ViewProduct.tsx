import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import ThreeModel from "./ThreeModel";
import { useEffect, useState } from "react";
import { products } from "../constants/products";

// interface itemProps {
//   key: number;
//   image: any;
//   name: string;
//   category: string[];
//   text: string;
//   model: string | null;
// }
function ViewProduct({
  handleCart,
  itemInCart,
  productId,
}: {
  handleCart: (productId: number) => void;
  itemInCart: boolean;
  productId: number;
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const productId = searchParams.get("product");
  const [model, setModel] = useState<null | string>(null);
  // // const [itemInCart, setItemInCart] = useState<boolean>(false);

  useEffect(() => {
    const item = products.find((i) => i.key === productId);
    if (item) setModel(item.model);
    else setModel(null);
  }, [productId]);

  // const [cart, setCart] = useState<itemProps[]>([]);

  // useEffect(() => {
  //   const prevCart = localStorage.getItem("cart");
  //   if (prevCart) {
  //     setCart(JSON.parse(prevCart));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (productId) {
  //     setItemInCart(
  //       cart.some((cartItem) => cartItem.key === parseInt(productId)),
  //     );
  //   }
  // }, [cart, productId]);

  // function handleCart(): void {
  //   if (!productId) return;

  //   const item = items[parseInt(productId)];
  //   let newCart;
  //   if (itemInCart) {
  //     newCart = cart.filter((cartItem) => cartItem.key !== item.key);
  //   } else {
  //     newCart = [...cart, item];
  //   }

  //   setCart(newCart);
  //   localStorage.setItem("cart", JSON.stringify(newCart));

  //   // Close the product modal
  //   const params = new URLSearchParams(searchParams);
  //   params.delete("product");
  //   navigate(`?${params.toString()}`);
  // }
  return (
    model &&
    createPortal(
      <motion.div
        className="fixed inset-0  h-full w-1/2 "
        style={{ zIndex: 9999 }}
      >
        <div className="absolute text-white bottom-1/16 z-50 font-[bleguk] text-5xl flex flex-row w-full justify-center gap-16">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("product");
              navigate(`?${params.toString()}`);
              // navigate(0);
            }}
            className=""
          >
            GO BACK
          </button>
          <button
            onClick={() => {
              console.log("Clicked", { productId });
              handleCart(productId);
            }}
            className=""
          >
            {itemInCart ? "REMOVE FROM CART" : "ADD TO CART"}
          </button>
        </div>

        <div className="w-full h-full [mask-image:linear-gradient(to_left,transparent,black_5%,black_95%,transparent)]">
          <div className="w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
            <ThreeModel modelSource={model} scale={1} />
          </div>
        </div>
      </motion.div>,
      document.body,
    )
  );
}

export default ViewProduct;
