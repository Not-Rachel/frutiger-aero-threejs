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
import ui_1 from "../assets/ui1.mp3";
import hover from "../assets/hover.mp3";
import click_low from "../assets/click_low.mp3";
import TVOff from "../assets/TVOff2.mp3";
import { randInt } from "three/src/math/MathUtils.js";
import CV from "./CV";
import { PiCaretDoubleRightFill, PiCaretDoubleLeftFill } from "react-icons/pi";
type HomePageProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  setShowTHREE: React.Dispatch<React.SetStateAction<boolean>>;
};
const musicTracksObj = import.meta.glob<{ default: string }>(
  "../assets/music_tracks/*.mp3",
  {
    eager: true,
  },
);
const musicTracks = Object.values(musicTracksObj).map(
  (module) => module.default,
);

function HomePage({ setShowTHREE }: HomePageProps) {
  const [playMusic, setPlayMusic] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(
    randInt(0, musicTracks.length - 1),
  );
  const [playUI, setPlayUI] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [showScreen, setShowScreen] = useState(location.pathname.length > 1);
  const [navToClose, setNavToClose] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const buttonSound1 = new Audio(ui_1);
  const hoverSound = new Audio(hover);
  const clickLow = new Audio(click_low);
  const TVoffSound = new Audio(TVOff);
  // TVoffSound.volume = 0.9;
  clickLow.volume = 0.7;
  hoverSound.volume = 0.5;

  function changeScreen(param: string) {
    setShowScreen(true);
    navigate(`/${param}`);
  }

  function closeScreen() {
    TVoffSound.play();
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

  function playNextTrack(steps = 1) {
    setCurrentTrack(
      (prev) =>
        (((prev + steps) % musicTracks.length) + musicTracks.length) %
        musicTracks.length,
    );
  }

  // Avoid race conditions with playing next track
  useEffect(() => {
    if (audioRef.current && playMusic) {
      audioRef.current.play().catch((err) => console.log("Play error:", err));
    }
  }, [currentTrack, playMusic]);

  function buttonClick(path: string) {
    changeScreen(path);
    if (playUI) clickLow.play();
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  const [volumeSlider, setVolumeSilder] = useState(false);
  const [volume, setVolume] = useState(0.25);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div className="p-4 sm:p-8 flex flex-col items-center absolute w-full h-full ">
      {/* <div className="absolute right-0 bottom-0 m-2 z-50"> */}
      <audio
        ref={audioRef}
        src={musicTracks[currentTrack]}
        loop={false}
        onEnded={() => playNextTrack()}
      ></audio>
      <motion.div
        onHoverStart={() => setVolumeSilder(true)}
        onHoverEnd={() => setVolumeSilder(false)}
        className="flex w-48 flex-col justify-center items-center gap-1  fixed right-0 z-50 bottom-0 m-4  "
      >
        <div className="flex gap-2 items-center text-white text-2xl font-black">
          <button
            className="aero rounded-4xl h-1/2"
            onClick={() => playNextTrack(-1)}
            style={{ "--hue": 270, "--saturation": 0.2 } as CSSProperties}
          >
            <PiCaretDoubleLeftFill />
          </button>

          <motion.img
            whileHover={{
              scale: 1.1,
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
            onDoubleClick={() => setPlayUI(true)}
            animate={{ opacity: playMusic ? 1 : 0.4 }}
            className=" h-16 w-16 "
          />
          <button
            className="aero rounded-4xl h-1/2 "
            onClick={() => playNextTrack()}
            style={{ "--hue": 270, "--saturation": 0.2 } as CSSProperties}
          >
            <PiCaretDoubleRightFill />
          </button>
        </div>
        {!volumeSlider ? (
          <motion.p
            key={currentTrack}
            initial={{ opacity: 0, x: "50%" }}
            animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
            exit={{ opacity: 0, x: "50%" }}
            className=" text-center z-50  text-white text-sm text-shadow-lg text-shadow-black/40"
          >
            {playMusic
              ? musicTracks[currentTrack].split("/").pop()
              : "Click icon to play music"}
          </motion.p>
        ) : (
          // <p className=" text-center z-50  text-white text-sm text-shadow-lg text-shadow-black/40">
          //   set the volume
          // </p>
          <input
            type="range"
            id="volume-slider"
            value={volume * 200}
            onChange={(e: any) => {
              setVolume(e.currentTarget.value / 200);
            }}
          ></input>
        )}
      </motion.div>

      <AnimatePresence>
        {!showScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute  pointer-none"
          >
            <h1 className="sm:text-6xl text-4xl text-white/90 text-shadow-lg font-bolder   text-shadow-black/50  ">
              Rachel Brinkman
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={subIndex}
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "50%" }}
                className="fixed text-white text-2xl font-semibold text-shadow-lg text-shadow-black/50"
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
        className="flex flex-row  w-full h-full"
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
            className="aero h-full p-2 rounded-md  border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col justify-between "
            style={{ backgroundColor: navToClose ? "#f3255151" : "#06B6D451" }}
          >
            <div
              key={"menu"}
              className="flex  flex-col gap-8 w-full   text-white font-extrabold"
            >
              <motion.button
                whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
                onHoverStart={() => hoverSound.play()}
                onClick={() => buttonClick("")}
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
                whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
                onClick={() => buttonClick("projects")}
                onHoverStart={() => hoverSound.play()}
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
                whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
                onClick={() => buttonClick("art")}
                onHoverStart={() => hoverSound.play()}
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
                whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
                className={`p-1 aero rounded-xl`}
                onClick={() => buttonClick("cv")}
                onHoverStart={() => hoverSound.play()}
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
              whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
              onClick={() => {
                clickLow.play();
                setShowTHREE((prev) => !prev);
              }}
              onHoverStart={() => hoverSound.play()}
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
              <div className="absolute -top-1 left-0 z-50">
                <button
                  onClick={closeScreen}
                  className="aero   text-xl  rounded-lg rounded-r-sm px-2  "
                  style={{ "--hue": 20, "--saturation": 0.9 } as CSSProperties}
                >
                  x
                </button>
                <button
                  onClick={() => {
                    buttonSound1.play();
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
                    transition={{ duration: 2 }}
                    className="static"
                  >
                    <Routes>
                      <Route path="/" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/art" element={<Art />} />
                      <Route path="/photos" element={<Art />} />
                      <Route path="/cv" element={<CV />} />
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
