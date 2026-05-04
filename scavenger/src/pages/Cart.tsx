import { useEffect, useState } from "react";
import Page from "../components/Page";

interface itemProps {
  key: number;
  image: any;
  name: string;
  text: string;
  model: string;
}

function Cart() {
  const [cart, setCart] = useState<itemProps[]>([]);
  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items) setCart(JSON.parse(items));
  }, []);
  return (
    <div>
      <div className="flex flex-col -space-y-210 p-8 font-[Kashare] text-[7vh] tracking-widest">
        <p>CART</p>

        {cart.map((item) => {
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
        })}
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
    </div>
  );
}

export default Cart;
