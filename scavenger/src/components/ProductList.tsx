import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import ViewProduct from "./ViewProduct";
// import { useEffect, useState } from "react";

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

  //   const productId = searchParams.get("product");
  //   const [cart, setCart] = useState<itemProps[]>([]);

  //   useEffect(() => {
  //     const prevCart = localStorage.getItem("cart");
  //     if (prevCart) {
  //       setCart(JSON.parse(prevCart));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (productId) {
  //       setItemInCart(
  //         cart.some((cartItem) => cartItem.key === parseInt(productId)),
  //       );
  //     }
  //   }, [cart, productId]);

  //   function handleCart(): void {
  //     if (!productId) return;

  //     const item = items[parseInt(productId)];
  //     let newCart;
  //     if (itemInCart) {
  //       newCart = cart.filter((cartItem) => cartItem.key !== item.key);
  //     } else {
  //       newCart = [...cart, item];
  //     }

  //     setCart(newCart);
  //     localStorage.setItem("cart", JSON.stringify(newCart));

  //     // Close the product modal
  //     const params = new URLSearchParams(searchParams);
  //     params.delete("product");
  //     navigate(`?${params.toString()}`);
  //   }

  return (
    <div className="flex flex-col gap-4 w-[90%] overflow-scroll backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent,black_3%,black_97%,transparent)] ">
      {items.map((item) => {
        return (
          <div key={item.key} className="flex flex-row gap-4">
            <motion.img
              whileHover={{ scale: 1.1, rotateZ: 10 }}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("product", item.key.toString());
                navigate(`?${params.toString()}`);
              }}
              src={item.image}
              className="w-64 h-auto z-30"
              style={{
                filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))",
              }}
              alt=""
            />
            <div>
              <p className="text-4xl font-black text-left">{item.name}</p>
              <p className="text-2xl text-left">{item.text}</p>
              {/* <button className="text-red-900">Update item - please add</button> */}
            </div>
          </div>
        );
      })}

      <ViewProduct />
    </div>
  );
}

export default ProductList;
