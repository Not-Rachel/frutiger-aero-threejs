import { motion, AnimatePresence } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type JSX,
} from "react";
import { Route, useLocation, useNavigate, Routes } from "react-router-dom";
import Projects from "./Projects";
import Art from "./Art";
import About from "./About";
import itunes from "../assets/itunes.png";
import ReactAudioPlayer from "react-audio-player";
import music from "../assets/photo_channel.mp3";

type HomePageProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  setShowTHREE: React.Dispatch<React.SetStateAction<boolean>>;
};
function HomePage({ setShowTHREE }: HomePageProps) {
  const [playMusic, setPlayMusic] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [showScreen, setShowScreen] = useState(location.pathname.length > 1);
  const [navToClose, setNavToClose] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  function changeScreen(param: string) {
    setShowScreen(true);
    navigate(`/${param}`);
  }

  useEffect(() => {
    console.log({ showNav, navToClose, showScreen });
  }, [showNav, navToClose, showScreen]);

  function closeScreen() {
    setShowNav(true);
    setNavToClose(false);
    setShowScreen(false);
  }

  function navDrag(event: any, info: { point: { x: number; y: number } }) {
    console.log(event);
    setNavToClose(info.point.x < 0 || info.point.y < 0);
  }
  function navDragEnd(event: any, info: { point: { x: number; y: number } }) {
    // console.log(info.point.x, info.point.y);
    console.log(event);
    if (info.point.x < 0 || info.point.y < 0) {
      setShowNav(false);
    }
  }

  const [subIndex, setSubIndex] = useState(0);
  const subtitles = [
    "est. 2002",
    "Batteries not incluced",
    "I'd rather be fishing",
    "Fish want me. Women fear me..",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % subtitles.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  function toggleAudio() {
    if (audioRef.current) {
      playMusic ? audioRef.current.pause() : audioRef.current.play();
      setPlayMusic((prev) => !prev);
    }
  }

  return (
    <div className="p-4 sm:p-8 flex flex-col items-center absolute w-full h-full ">
      <div className="flex justify-center flex-col items-center absolute right-0 bottom-0 m-2 mx-8 z-50">
        <audio ref={audioRef} src={music} loop={true}></audio>
        <motion.img
          whileHover={{
            scale: 1.1,
            opacity: 1,
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
          src={itunes}
          alt=""
          onClick={toggleAudio}
          animate={{ opacity: playMusic ? 1 : 0.5 }}
          className=" h-16 w-16"
        />
        <motion.p
          initial={{ opacity: 0, x: "50%" }}
          animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
          // exit={{ opacity: 0, y: "50%" }}
          className="text-white text-sm text-shadow-lg text-shadow-black/40"
        >
          photo_channel.mp3
        </motion.p>
      </div>
      <AnimatePresence>
        {!showScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute justify-center pointer-none"
          >
            <h1 className="text-7xl text-white/90 text-shadow-lg font-bolder   text-shadow-black/50  ">
              Rachel Brinkman
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={subIndex}
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "50%" }}
                className="text-white text-2xl font-semibold text-shadow-lg text-shadow-black/50"
              >
                {subtitles[subIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className="flex sm:flex-row flex-col w-full h-full"
      >
        {/* <AnimatePresence mode="wait"> */}
        {showNav && (
          <motion.nav
            drag
            onDrag={navDrag}
            onDragEnd={navDragEnd}
            dragSnapToOrigin
            initial={{ scaleX: showNav ? 0 : "100%" }}
            animate={{
              scaleX: showNav ? "100%" : 0,
              transition: {
                duration: 0.3,
              },
            }}
            layout
            className="aero h-full p-4 rounded-md  border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col justify-between "
            style={{ backgroundColor: navToClose ? "#f3255151" : "#06B6D451" }}
          >
            <div
              key={"menu"}
              className="flex  sm:flex-col flex-row gap-8 w-full   text-white font-extrabold"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => changeScreen("")}
                className={`p-1 aero rounded-xl`}
                style={
                  showScreen && location.pathname === "/"
                    ? ({ "--saturation": 0.5 } as CSSProperties)
                    : {}
                }
              >
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => changeScreen("projects")}
                className={`p-1 aero rounded-xl`}
                style={
                  showScreen && location.pathname === "/projects"
                    ? ({ "--saturation": 0.5 } as CSSProperties)
                    : {}
                }
              >
                Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => changeScreen("art")}
                className={`p-1 aero rounded-xl`}
                style={
                  showScreen && location.pathname === "/art"
                    ? ({ "--saturation": 0.5 } as CSSProperties)
                    : {}
                }
              >
                Illustrations
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className={`p-1 aero rounded-xl`}
                onClick={() => changeScreen("cv")}
                style={
                  showScreen && location.pathname === "/cv"
                    ? ({ "--saturation": 0.5 } as CSSProperties)
                    : {}
                }
              >
                Resume
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowTHREE((prev) => !prev)}
              className=" h-8 aero px-2 text-amber-50 rounded-xl"
              style={{ "--hue": 100, "--saturation": 0.7 } as CSSProperties}
            >
              Toggle3D
            </motion.button>
          </motion.nav>
        )}
        {/* </AnimatePresence> */}
        <motion.div
          layout
          // layoutDependency={showNav}
          transition={{
            duration: 0.5,
          }}
          className=" w-full h-full "
        >
          <motion.main
            key={"screen"}
            drag="y"
            whileDrag={{ scale: 0.95 }}
            dragConstraints={{ top: 0, bottom: 500 }}
            initial={{ scaleY: showScreen ? 0 : "100%" }}
            animate={{
              scaleY: showScreen ? "100%" : 0,
              transition: {
                duration: 0.3,
              },
            }}
            className=" w-full h-full sm:perspective-[800px]"
          >
            <motion.div
              key={"projects"}
              initial={{ rotateY: 0, rotateX: -1 }}
              animate={{
                rotateY: showNav ? -5 : 0,
                rotateX: 1,

                transition: {
                  duration: showNav ? 5 : 0.5,

                  repeat: showNav ? Infinity : 0,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
              className=" text-white p-4 pt-8 relative preserve-3d text-2xl flex flex-col  w-full h-full items-center rounded-md bg-cyan-500/20 border-2 border-cyan-100 overflow-visible  inset-shadow-sm inset-shadow-indigo-100 "
            >
              <div className="absolute -top-2 -left-1 z-50">
                <button
                  onClick={closeScreen}
                  className="aero   text-xl  rounded-lg rounded-r-sm px-2  "
                  style={{ "--hue": 20, "--saturation": 0.9 } as CSSProperties}
                >
                  x
                </button>
                <button
                  onClick={() => {
                    setShowNav((prev) => !prev);
                    setNavToClose(false);
                  }}
                  className="aero   text-xl  rounded-lg rounded-l-sm px-2 "
                  style={
                    {
                      "--hue": showNav ? 110 : 150,
                      "--saturation": 0.3,
                    } as CSSProperties
                  }
                >
                  []
                </button>
              </div>
              <div className="overflow-y-scroll w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="static"
                  >
                    <Routes>
                      <Route path="/" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/art" element={<Art />} />
                      <Route path="/photos" element={<Art />} />
                      <Route path="/cv" element={<Art />} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.main>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;
