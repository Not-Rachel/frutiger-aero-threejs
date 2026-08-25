import { AnimatePresence, motion, useDragControls } from "motion/react";
import { Resizable } from "re-resizable";
import {
  useEffect,
  useRef,
  useState,
  // Activity,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

import ui_1 from "/assets/audio/ui1.mp3";
import TVOff from "/assets/audio/TVOff2.mp3";
import { IoInformationCircle } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { RiFullscreenFill } from "react-icons/ri";
import { RiFullscreenExitLine } from "react-icons/ri";
import { VscChromeMinimize } from "react-icons/vsc";

type ProjectProps = {
  title: string;
  href: string;
  information: string;
  component?: React.ComponentType;
  position: { x: number; y: number };
};

type WindowProps = {
  project: ProjectProps;
  fullScreen: boolean;
  zIndex: number;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
  setNavToClose: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

function Window({
  project,
  fullScreen,
  zIndex,
  setFullScreen,
  setNavToClose,
  onClose,
  onFocus,
  isFocused,
  constraintsRef,
}: WindowProps) {
  const dragControls = useDragControls();
  const dragScreenRef = useRef<HTMLDivElement>(null!);
  const [showScreen, setShowScreen] = useState(true);
  const [lastScreenPosition, setLastScreenPosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight / 2,
  });
  const buttonSound1 = useRef(new Audio(ui_1));
  // const TVoffSound = new Audio(TVOff);
  const TVoffSound = useRef(new Audio(TVOff));
  // const firstDrag = useRef(false);
  const [firstDrag, setFirstDrag] = useState(false); // TODO: use better hook?
  const [showInfo, setShowInfo] = useState(false);
  const [minimized, setMinimized] = useState(false);

  console.log(constraintsRef);
  // const info = "This is information pertaining to the Project";

  useEffect(() => {
    if (isFocused) setShowScreen(true);
    // else minimizeScreen();
  }, [isFocused]);

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
    setMinimized(false);
    setNavToClose(false);
    setShowScreen(false);
  }
  function minimizeScreen() {
    setMinimized(true);
    TVoffSound.current.currentTime = 0; // rewind in case it was played before
    TVoffSound.current.play();
    setFullScreen(false);
    setNavToClose(false);
    setShowScreen(false);
  }

  // function changeScreen(param: string) {
  //   setShowScreen(true);
  //   window.open(`/${param}`, "_blank");
  // }

  const ProjectComponent = project.component;

  return (
    // <Activity>
    <motion.div
      ref={dragScreenRef}
      layout
      drag={!fullScreen && showScreen}
      // dragConstraints={constraintsRef}
      whileDrag={{
        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      }}
      onDrag={() => {
        if (!firstDrag) setFirstDrag(true);
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
          ? { width: screenSize.width, height: screenSize.height / 2 } // no animation when dragging
          : { x: 0, y: 0, width: "100vw", height: "100vh" }
      }
      style={{
        x: lastScreenPosition.x,
        y: lastScreenPosition.y,
        zIndex: zIndex,
      }}
      className={firstDrag || fullScreen ? "absolute" : ""}
      // className="absolute"
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
            opacity: showScreen ? "100%" : 0,
            transition: {
              duration: 0.3,
            },
          }}
          onAnimationComplete={() => {
            if (!showScreen && !minimized) {
              onClose();
            }
            if (minimized) {
            }
          }}
          className=" w-full h-full "
        >
          <motion.div
            key={"projects"}
            className="   text-white relative text-2xl flex flex-col  w-full h-full items-center rounded-md bg-cyan-900/90 border-2 border-cyan-100 overflow-hidden  inset-shadow-sm inset-shadow-indigo-100 "
          >
            <motion.div
              layout
              data-drag-handle
              className={`flex items-center  overflow-hidden left-0 justify-between ${!fullScreen ? "bg-cyan-50/40 w-full" : "bg-cyan-950 w-full"} `}
              // style={
              //   fullScreen ? { position: "absolute", top: 0, zIndex: 99 } : {}
              // }
              onPointerDown={(e) => dragControls.start(e)}
              // onPointerDown={() => setDragScreen(true)}
            >
              <h1 className=" px-2 font-light">{project.title}</h1>

              <div className="flex h-full justify-end">
                <button
                  onClick={minimizeScreen}
                  className={`text-center text-xl px-2`}
                >
                  <VscChromeMinimize />
                </button>
                <button
                  onClick={() => {
                    buttonSound1.current.play();
                    setFullScreen((prev) => !prev);
                    setNavToClose(false);
                  }}
                  className={`text-center text-xl px-2`}
                >
                  {fullScreen ? <RiFullscreenExitLine /> : <RiFullscreenFill />}
                </button>
                <button
                  onClick={closeScreen}
                  className={`text-center text-xl px-2`}
                >
                  <IoMdClose></IoMdClose>
                </button>
                {/* {!fullScreen && (
                  <button
                    onClick={() => {
                      changeScreen(project.href);
                    }}
                    className={`${!fullScreen ? "aero" : ""} text-center text-lg px-2`}
                    style={
                      { "--hue": 200, "--saturation": 0.1 } as CSSProperties
                    }
                  >
                    OPEN IN NEW TAB
                  </button>
                )} */}
              </div>
            </motion.div>

            <div
              className="overflow-hidden w-full h-full relative"
              onPointerDown={() => dragControls.cancel()}
            >
              <motion.div
                initial={{ y: showInfo ? "85%" : 0 }}
                animate={{ y: showInfo ? 0 : "85%" }}
                transition={{ ease: "easeInOut" }}
                className={`absolute z-40 left-0 bottom-0 h-1/3 w-full p-4  ${showInfo && " bg-blue-400/50 font-extrabold rounded-sm"}`}
              >
                <motion.button
                  className="absolute right-0 top-0 z-50 p-2 text-white text-lg  "
                  whileHover={{ scale: 1.4 }}
                  onClick={() => setShowInfo((prev) => !prev)}
                >
                  <IoInformationCircle />
                </motion.button>
                <AnimatePresence>
                  {showInfo && (
                    <motion.p
                      exit={{ opacity: 0 }}
                      className="text-white text-lg "
                    >
                      {project.information}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              {ProjectComponent ? (
                <ProjectComponent />
              ) : (
                <p className="text-white p-4">Not found: {project.href}</p>
              )}
            </div>
          </motion.div>
        </motion.main>
      </Resizable>
    </motion.div>
    // </Activity>
  );
}

export default Window;
