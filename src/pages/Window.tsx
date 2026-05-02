import { motion, AnimatePresence, useDragControls } from "motion/react";
import { Resizable } from "re-resizable";
import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react";
import { Route, Routes } from "react-router-dom";
import { screenSize } from "three/src/nodes/TSL.js";
import Background from "../components/Background";
import About from "./About";
import Art from "./Art";
import BlockStacking from "./BlockStacking";
import DitherDemo from "./DitherDemo";
import Offline from "./Offline";
import ui_1 from "/assets/audio/ui1.mp3";
import PlaceHolder from "./PlaceHolder";
import TVOff from "/assets/audio/TVOff2.mp3";

const routeMap: Record<string, JSX.Element> = {
  offline: <Offline />,
  dither: <DitherDemo />,
  stacking: <BlockStacking />,
  fish: <Background />,
  about: <About />,
};

type WindowProps = {
  href: string;
  showNav: boolean;
  //   showScreen: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
  setNavToClose: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

function Window({
  href,
  showNav,
  //   showScreen,
  setShowNav,
  setNavToClose,
  onClose,
}: WindowProps) {
  const dragControls = useDragControls();
  const dragScreenRef = useRef<HTMLDivElement>(null!);
  const [showScreen, setShowScreen] = useState(true);
  const [lastScreenPosition, setLastScreenPosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight * 0.9,
  });
  const buttonSound1 = new Audio(ui_1);
  const TVoffSound = new Audio(TVOff);

  useEffect(() => {
    if (dragScreenRef.current) {
      setScreenSize({
        width: dragScreenRef.current.clientWidth,
        height: dragScreenRef.current.clientHeight,
      });
    }
  }, [dragScreenRef]);

  function closeScreen() {
    TVoffSound.play();
    setShowNav(true);
    setNavToClose(false);
    setShowScreen(false);
  }

  return (
    <motion.div
      ref={dragScreenRef}
      layout
      drag={showNav && showScreen}
      dragControls={dragControls}
      dragMomentum={false}
      layoutDependency={showNav}
      transition={{
        duration: 0.5,
      }}
      onDragEnd={(e, info) => {
        setLastScreenPosition((prev) => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y,
        }));
      }}
      animate={
        showNav
          ? { width: screenSize.width, height: screenSize.height } // no animation when dragging
          : { x: 0, y: 0, width: "100vw", height: "100vh" }
      }
      style={{ x: lastScreenPosition.x, y: lastScreenPosition.y }}
      className="border-2"
    >
      <Resizable
        size={!showNav ? { width: "100vw", height: "100vh" } : screenSize}
        onResizeStop={(e, dir, ref, d) => {
          console.log(d.width, d.height);
          setScreenSize({
            width: screenSize.width + d.width,
            height: screenSize.height + d.height,
          });
        }}
        onResize={() => dragControls.cancel()}
      >
        <motion.main
          key={"screen"}
          initial={{ scaleY: showScreen ? 0 : "100%" }}
          animate={{
            scaleY: showScreen ? "100%" : 0,
            transition: {
              duration: 0.3,
            },
          }}
          onAnimationComplete={() => {
            if (!showScreen) {
              onClose();
            }
          }}
          className=" w-full h-full sm:perspective-[800px]"
        >
          <motion.div
            key={"projects"}
            // initial={{ rotateY: 0, rotateX: -1 }}
            // animate={{
            //   rotateY: showNav ? -1 : 0,
            //   rotateX: showNav ? 1 : 0,

            //   transition: {
            //     duration: showNav ? 5 : 0.5,

            //     repeat: showNav ? Infinity : 0,
            //     repeatType: "mirror",
            //     ease: "easeInOut",
            //   },
            // }}
            className="  text-white relative preserve-3d text-2xl flex flex-col  w-full h-full items-center rounded-md bg-cyan-500/20 border-2 border-cyan-100 overflow-hidden  inset-shadow-sm inset-shadow-indigo-100 "
          >
            <motion.div
              layout
              data-drag-handle
              className={`  flex  overflow-hidden left-0  ${showNav ? "bg-cyan-50/40 w-full" : "rounded-r-md w-auto"}`}
              style={
                !showNav ? { position: "absolute", top: 0, zIndex: 99 } : {}
              }
              onPointerDown={(e) => dragControls.start(e)}
              // onPointerDown={() => setDragScreen(true)}
            >
              <button
                onClick={closeScreen}
                className="aero text-center  text-xl px-2  "
                style={{ "--hue": 200, "--saturation": 0.1 } as CSSProperties}
              >
                x
              </button>
              <button
                onClick={closeScreen}
                className="aero text-center   text-xl px-2  "
                style={{ "--hue": 200, "--saturation": 0.1 } as CSSProperties}
              >
                -
              </button>
              <button
                onClick={() => {
                  buttonSound1.play();
                  setShowNav((prev) => !prev);
                  setNavToClose(false);
                }}
                className="aero text-center  text-xl px-2 "
                style={{ "--hue": 200, "--saturation": 0.1 } as CSSProperties}
              >
                []
              </button>
            </motion.div>

            <div
              className="overflow-y-scroll w-full h-full"
              onPointerDown={() => dragControls.cancel()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className=" w-full h-full"
                >
                  {/* <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/dither" element={<DitherDemo />} />
                    <Route path="/stacking" element={<BlockStacking />} />
                    <Route path="/offline" element={<Offline />} />
                    <Route path="/fish" element={<Background />} />
                    <Route path="/placeholder" element={<PlaceHolder />} />
                  </Routes> */}
                  {routeMap[href] ?? (
                    <p className="text-white p-4">Not found: {href}</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.main>
      </Resizable>
    </motion.div>
  );
}

export default Window;
