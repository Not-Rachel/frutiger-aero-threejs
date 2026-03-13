import { useEffect, useRef, useState } from "react";
import FadeContent from "../components/FadeContent";
import TopNav from "../components/ScavNav";
import { ReactSVG } from "react-svg";
import "./Dino.css";
function Game() {
  const dino = "scavenger/assets/chrome_dino.svg";

  const [isJump, setIsJump] = useState(false);
  const [score, setScore] = useState(0);
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  // const [isAlive, setIsAlive] = useState(true);
  useEffect(() => {
    const jump = (e: KeyboardEvent) => {
      if (e.code == "Space") {
        e.preventDefault();

        if (!isJump) {
          setIsJump(true);
        }

        setTimeout(() => setIsJump(false), 500);
        console.log(isJump);
      }
      //   console.log(e);
    };
    document.addEventListener("keydown", jump);

    return () => {
      document.removeEventListener("keydown", jump);
    };
  }, []);

  useEffect(() => {
    if (dinoRef.current && cactusRef.current) {
      const interval = setInterval(() => {
        console.log("he");
      }, 10);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <FadeContent
        blur={true}
        duration={100}
        easing="ease-out"
        initialOpacity={0}
      >
        <section className="flex h-[200vh] bg-black bg-contain [box-shadow:inset_0_0_1000px_rgba(0,0,0,0.7)]">
          <div className="w-full mt-8 mx-auto flex flex-col items-center text-center text-white [text-shadow:0_0_20px_black]">
            <div className="w-[600px] h-[200px] border-1 border-amber-200">
              <div
                ref={dinoRef}
                className={`${isJump ? "jumping" : ""}`}
                style={{
                  position: "relative",
                  top: "150px",
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#d97706",
                }}
              ></div>
              <div
                ref={cactusRef}
                className="moving"
                style={{
                  top: "100px",
                  width: "20px",
                  height: "50px",
                  left: "580px",
                  position: "relative",
                  backgroundColor: "green",
                }}
              ></div>
            </div>
            {/* <p className="font-bold text-[24px] max-w-[550px] my-[15px] tracking-[4px] [text-shadow:0_0_5px_black]">
              Just two friends with a crazy idea...
            </p> */}
          </div>
        </section>
      </FadeContent>
    </>
  );
}

export default Game;
