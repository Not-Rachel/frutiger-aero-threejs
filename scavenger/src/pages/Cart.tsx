import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const productId = searchParams.get("product");

  useEffect(() => {
    const items = localStorage.getItem("cart");
    console.log("CART:", items);
    if (items) setCart(JSON.parse(items));
  }, [productId]);
  return (
    <div className=" h-full flex  items-center  flex-col p-8 font-[Daubmark] text-3xl  overflow-y-auto overflow-visible">
      <p className="font-[Kashare] tracking-wide text-[3vw] ">CART</p>
      <ProductList items={cart} />
    </div>
  );
}

export default Cart;
