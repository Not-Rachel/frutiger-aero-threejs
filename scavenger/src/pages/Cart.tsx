import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

interface itemProps {
  key: number;
  image: any;
  name: string;
  category: string[];
  text: string;
  model: string | null;
}

function Cart() {
  const [cart, setCart] = useState<itemProps[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("cart");
    console.log("CART:", items);
    if (items) setCart(JSON.parse(items));
  }, []);
  return (
    <div className=" h-full flex justify-center items-center  flex-col p-8 font-[Daubmark] text-3xl  overflow-y-scroll overflow-visible">
      <p className="font-[Kashare] tracking-wide text-[3vw] ">CART</p>
      <ProductList items={cart} />
    </div>
  );
}

export default Cart;
