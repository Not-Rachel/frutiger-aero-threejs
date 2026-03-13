import FadeIn from "./FadeIn";
import NotateText from "./NotateText";
import { motion } from "motion/react";

import { useEffect, useState } from "react";
import ThreeModel from "./ThreeModel";
interface NoteBookProps {
  items: itemProps[];
}

interface itemProps {
  key: number;
  image: string;
  name: string;
  text: string;
  model: string | null;
}
const oldBook = "/scavenger/assets/old-book2.png";

// TODO: Add page flipping animation

function NoteBook({ items }: NoteBookProps) {
  const [cart, setCart] = useState<itemProps[]>([]);
  const [viewItem, setViewItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<number>(0);

  useEffect(() => {
    const prevCart = localStorage.getItem("cart");
    if (prevCart) {
      setCart(JSON.parse(prevCart));
    }
  }, []);

  function setItem() {
    console.log((currentItem + 1) % items.length);
    setCurrentItem((currentItem + 1) % items.length);
  }

  function handleCart(): void {
    const itemExists = cart.some(
      (cartItem) => cartItem.key === items[currentItem].key,
    );

    if (itemExists) {
      console.log(`Item already in cart`);
      return;
    }

    const newCart = [...cart, items[currentItem]];
    setCart(newCart);
    console.log(`Add item to cart: ${JSON.stringify(newCart)}`);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.key == "ArrowRight") {
      setCurrentItem((currentItem + 1) % items.length);
    } else if (e.key == "ArrowLeft") {
      setCurrentItem((currentItem - 1 + items.length) % items.length);
    }
  }

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="overflow-y-scroll">
      {items[currentItem].model && viewItem && (
        <motion.div
          onDoubleClick={() => setViewItem(false)}
          className="opacity-10 absolute w-full h-screen flex flex-col items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          style={{
            zIndex: viewItem ? 99 : 1,
            pointerEvents: viewItem ? "auto" : "none",
          }}
          animate={viewItem ? { opacity: 1.0 } : {}}
        >
          <ThreeModel modelSource={items[currentItem].model} scale={1.8} />
          <div
            onClick={() => setViewItem(false)}
            className="font-[Daubmark] text-3xl mb-8 border-3 border-white border-dotted rounded-sm text-yellow-100 p-4"
          >
            <NotateText>RETURN</NotateText>
          </div>
        </motion.div>
      )}
      <div>
        <motion.div
          className=" m-8 flex flex-row justify-end"
          animate={{
            filter: viewItem ? "blur(3px)" : "blur(0px)",
            opacity: viewItem ? 0.6 : 1.0,
          }}
          initial={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <FadeIn>
            {(onLoad) => (
              <div className="relative h-auto w-[600px]  lg:w-[750px] m-8 flex z-20 lg:rotate-8 md:rotate-3   ">
                <img
                  src={oldBook}
                  alt="Old book"
                  className="w-full h-full object-contain bg-none  "
                  onLoad={onLoad}
                />

                <div className="absolute flex flex-row h-full ">
                  <div className="w-[45%] opacity-85  inset-0 flex flex-col m-8 px-2  text-orange-950  pointer-events-auto ">
                    <h1 className="font-[Kashare] text-4xl font-bold pb-8">
                      {items[currentItem].name}
                    </h1>
                    <div className="text-2xl font-[revolution] font-bold">
                      <p>{items[currentItem].text}</p>
                      {/* <p className="my-4">Text</p> */}
                    </div>
                  </div>
                  <div className="font-[bleguk] relative w-[50%] m-4 inset-0 flex flex-col items-center text-orange-950 ">
                    <p>Click to view product</p>
                    <motion.img
                      src={items[currentItem].image}
                      alt=""
                      className="w-[75%] h-auto object-contain bg-none hover:border-white z-60 border-3 border-stone-300 rotate-3 rounded-xl "
                      onClick={() =>
                        setViewItem(items[currentItem].model != null)
                      }
                    ></motion.img>

                    <div className="my-8 text-2xl font-bold hover:font-black z-80 brightness-90 pointer-events-auto flex-1 flex-col ">
                      <button onClick={handleCart}>
                        <NotateText>ADD TO CART</NotateText>
                      </button>
                      <button
                        name="Next item"
                        className="my-16"
                        onClick={setItem}
                      >
                        Turn page
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </motion.div>
      </div>
    </div>
  );
}

export default NoteBook;
