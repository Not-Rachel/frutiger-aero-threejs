import { useState } from "react";
import NotateText from "../components/NotateText";
import { useNavigate } from "react-router-dom";
const [hovered, setHovered] = useState(false);

{
  /*
  TODO: Add path
   <svg
  xmlns="http://www.w3.org/2000/svg"
  width="451"
  height="437"
  className="pointer-events-none"
>
  <motion.path
    d={path}
    fill="transparent"
    strokeWidth="2"
    stroke="#001017ff"
    strokeLinecap={"round"}
    strokeDasharray={"10,10"}
    initial={{ pathLength: 0 }}
    animate={hovered ? { pathLength: 1 } : { pathLength: 0 }}
    transition={{ duration: 2, ease: "easeInOut" }}
  />
</svg>; */
}
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/cart`)}
        className="z-50 flex justify-center items-center w-full h-full font-[Kashare] flex-col lg:text-4xl  md:text-3xl text-2xl"
      >
        <NotateText>Go to Cart</NotateText>
      </div>
      <div className="z-50 font-[Kashare] lg:text-5xl  md:text-4xl text-3xl flex-1 justify-center items-center h-full w-full pointer-events-auto">
        {/* <p>HOME</p> */}

        <div
          className="absolute top-1/8 left-1/8 "
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
        >
          <NotateText type="crossed-off">Camping</NotateText>
        </div>
        <div className="absolute bottom-1/8 left-1/8">
          <NotateText type="circle">Hiking</NotateText>
        </div>
        <div className="absolute top-1/8 right-1/8">
          <NotateText type="circle">Climbing</NotateText>
        </div>
        <div className="absolute bottom-1/8 right-1/8">
          <NotateText type="circle">Fishing</NotateText>
        </div>
      </div>
    </>
  );
}

export default Home;
