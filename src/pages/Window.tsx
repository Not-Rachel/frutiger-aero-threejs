import { motion, useDragControls } from "motion/react";
import { Resizable } from "re-resizable";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

import ui_1 from "/assets/audio/ui1.mp3";
import TVOff from "/assets/audio/TVOff2.mp3";

type WindowProps = {
  href: string;
  fullScreen: boolean;
  component: any;
  zIndex: number;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
  setNavToClose: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onFocus: () => void;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

function Window({
  href,
  component,
  fullScreen,
  zIndex,
  setFullScreen,
  setNavToClose,
  onClose,
  onFocus,
  constraintsRef,
}: WindowProps) {
  const dragControls = useDragControls();
  const dragScreenRef = useRef<HTMLDivElement>(null!);
  const [showScreen, setShowScreen] = useState(true);
  const [lastScreenPosition, setLastScreenPosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight * 0.9,
  });
  const buttonSound1 = useRef(new Audio(ui_1));
  // const TVoffSound = new Audio(TVOff);
  const TVoffSound = useRef(new Audio(TVOff));

  console.log(constraintsRef);

  useEffect(() => {
    if (dragScreenRef.current) {
      setScreenSize({
        width: dragScreenRef.current.clientWidth,
        height: dragScreenRef.current.clientHeight,
      });
    }
  }, [dragScreenRef]);

  function closeScreen() {
    TVoffSound.current.currentTime = 0; // rewind in case it was played before
    TVoffSound.current.play();
    setFullScreen(false);
    setNavToClose(false);
    setShowScreen(false);
    // onClose();
  }

  function changeScreen(param: string) {
    setShowScreen(true);
    window.open(`/${param}`, "_blank");
  }

  const ProjectComponent = component;

  return (
    <motion.div
      ref={dragScreenRef}
      layout
      drag={!fullScreen && showScreen}
      // dragConstraints={constraintsRef}
      whileDrag={{
        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      }}
      dragControls={dragControls}
      dragMomentum={false}
      onPointerDown={onFocus}
      layoutDependency={!fullScreen}
      transition={{
        duration: 0.5,
      }}
      onDragEnd={(_e, info) => {
        setLastScreenPosition((prev) => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y,
        }));
      }}
      animate={
        !fullScreen
          ? { width: screenSize.width, height: screenSize.height } // no animation when dragging
          : { x: 0, y: 0, width: "100vw", height: "100vh" }
      }
      style={{
        x: lastScreenPosition.x,
        y: lastScreenPosition.y,
        zIndex: zIndex,
      }}
      className="absolute"
    >
      <Resizable
        size={fullScreen ? { width: "100vw", height: "100vh" } : screenSize}
        onResizeStop={(_e, _dir, _ref, d) => {
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
          className=" w-full h-full "
        >
          <motion.div
            key={"projects"}
            className="  text-white relative text-2xl flex flex-col  w-full h-full items-center rounded-md bg-cyan-900/90 border-2 border-cyan-100 overflow-hidden  inset-shadow-sm inset-shadow-indigo-100 "
          >
            <motion.div
              layout
              data-drag-handle
              className={`  flex  overflow-hidden left-0 justify-between items-start  ${!fullScreen ? "bg-cyan-50/40 w-full" : "rounded-r-md w-auto"}`}
              style={
                fullScreen ? { position: "absolute", top: 0, zIndex: 99 } : {}
              }
              onPointerDown={(e) => dragControls.start(e)}
              // onPointerDown={() => setDragScreen(true)}
            >
              <div className="flex">
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
                    buttonSound1.current.play();
                    setFullScreen((prev) => !prev);
                    setNavToClose(false);
                  }}
                  className="aero text-center  text-xl px-2 "
                  style={{ "--hue": 200, "--saturation": 0.1 } as CSSProperties}
                >
                  []
                </button>
              </div>

              {!fullScreen && (
                <button
                  onClick={() => {
                    changeScreen(href);
                  }}
                  className="aero text-center  text-lg px-2 "
                  style={{ "--hue": 200, "--saturation": 0.1 } as CSSProperties}
                >
                  Open link to new tab
                </button>
              )}
            </motion.div>

            <div
              className="overflow-y-scroll w-full h-full"
              onPointerDown={() => dragControls.cancel()}
            >
              <div className=" w-full h-full">
                {ProjectComponent ? (
                  <ProjectComponent />
                ) : (
                  <p className="text-white p-4">Not found: {href}</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.main>
      </Resizable>
    </motion.div>
  );
}

export default Window;
