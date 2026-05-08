import { useEffect, useState } from "react";
import Page from "../components/Page";
import { motion } from "motion/react";

interface itemProps {
  key: number;
  image: any;
  name: string;
  text: string;
  model: string;
}

function Cart() {
  const balmImg = "/scavenger/assets/product-images/balm.jpeg";
  const strawImg = "/scavenger/assets/product-images/filterstrawTORN.png";
  const bagImg = "/scavenger/assets/product-images/bagDetail.png";
  const cordImg = "/scavenger/assets/product-images/cord.jpeg";
  const toteImg = "/scavenger/assets/product-images/toteTorn.png";
  const fireImg = "/scavenger/assets/product-images/firestarter.png";
  const multitoolImg = "/scavenger/assets/product-images/multitool.jpg";

  const [cart, setCart] = useState<itemProps[]>([]);
  useEffect(() => {
    const items = localStorage.getItem("cart");
    console.log("CART:", items);
    if (items) setCart(JSON.parse(items));
  }, []);
  return (
    <div className="border-white h-full flex justify-center items-center  flex-col p-8 font-[Kashare] text-[7vh] tracking-widest overflow-y-scroll overflow-visible">
      <p>CART</p>
      <div className="  w-[90%] border overflow-scroll">
        <div className=" flex flex-row">
          <motion.img
            whileHover={{ scale: 1.1, rotateZ: 10 }}
            src={bagImg}
            className="w-1/4  z-30 "
            style={{ filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))" }}
            alt=""
          />
          <p className="text-[4vh] text-left ">
            High-performance Backpack for hiking, camping, 2 liters of storage
          </p>
        </div>
        <div className=" flex flex-row">
          <img
            src={toteImg}
            className="w-1/4  z-30 "
            style={{ filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))" }}
            alt=""
          />
          <p className="text-[4vh] text-left ">
            Advanced storage system, carries what you can't.
          </p>
        </div>
        <div className=" flex flex-row">
          <img
            src={fireImg}
            className="w-1/4  z-30 "
            style={{ filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))" }}
            alt=""
          />
          <div>
            <p className="text-[4vh] text-left ">
              Excellence fire starter, works just as well rain or shine
            </p>
            <button>Remove</button>
          </div>
        </div>
        <div className=" flex flex-row">
          <img
            src={fireImg}
            className="w-1/4  z-30 "
            style={{ filter: "drop-shadow(2px 10px 2px rgba(0, 0, 0, 0.6))" }}
            alt=""
          />
          <p className="text-[4vh] text-left ">
            High-performance Backpack for hiking, camping, 2 liters of storage
          </p>
        </div>
      </div>

      {/* {cart.map((item) => {
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
        })} */}
      {/* <button
          className=" absolute bg-amber-200 rounded-xl right-16 p-4"
          onClick={() => {
            localStorage.clear();
            setCart([]);
          }}
        >
          Clear cart
        </button> */}
    </div>
  );
}

export default Cart;
