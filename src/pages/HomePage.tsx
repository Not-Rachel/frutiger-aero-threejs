import { motion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Window from "./Window";
import itunes from "/assets/itunes.png";

// import ui_1 from "/assets/audio/ui1.mp3";
import hover from "/assets/audio/hover.mp3";
import click_low from "/assets/audio/click_low.mp3";

import { randInt } from "three/src/math/MathUtils.js";
import { PiCaretDoubleRightFill, PiCaretDoubleLeftFill } from "react-icons/pi";
import DitherDemo from "./DitherDemo";
import Offline from "./Offline";
import BlockStacking from "./BlockStacking";
import Background from "../components/Background";

// import FluidGlass from "../components/LiquidGlass";

// TODO: Add liquid glass effect to windows
const musicTracks = [
  "/assets/audio/tracks/aphex_twin_delphium.mp3",
  "/assets/audio/tracks/aphex_twin_film.mp3",
  "/assets/audio/tracks/aphex_twin_I.mp3",
  "/assets/audio/tracks/sd_card_gallery.mp3",
];

function HomePage() {
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

  // const buttonSound1 = new Audio(ui_1);
  // const TVoffSound = new Audio(TVOff);

  const hoverSound = new Audio(hover);
  const clickLow = new Audio(click_low);
  // TVoffSound.volume = 0.9;
  clickLow.volume = 0.7;
  hoverSound.volume = 0.5;

  function changeScreen(param: string) {
    setShowScreen(true);
    navigate(`/${param}`);
  }

  function NavButton({
    title,
    href,
    onClick,
  }: {
    title: string;
    href: string;
    onClick: () => void;
  }) {
    return (
      <motion.button
        whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
        onClick={() => {
          buttonClick(href);
          onClick();
        }}
        onHoverStart={() => hoverSound.play()}
        className=" h-8 aero px-2 text-amber-50 rounded-xl"
        style={
          showScreen && location.pathname === "/stacking"
            ? ({ "--saturation": 0.5 } as CSSProperties)
            : {}
        }
      >
        {title}
      </motion.button>
    );
  }

  const [projects, setProjects] = useState([
    {
      id: "dither",
      title: "Blue Dithering",
      href: "dither",
      project: <DitherDemo />,
      open: false,
      position: { x: 0, y: 0 },
      zIndex: 0,
    },
    {
      id: "scavenger",
      title: "Scavenger",
      href: "scavenger",

      open: false,
      position: { x: 40, y: 40 },
      zIndex: 0,
    },
    {
      id: "offline",
      title: "Offline",
      href: "offline",
      project: <Offline />,

      open: false,
      position: { x: 80, y: 80 },
      zIndex: 0,
    },
    {
      id: "stacking",
      title: "BlockStacking",
      href: "stacking",
      project: <BlockStacking />,

      open: false,
      position: { x: 100, y: 80 },
      zIndex: 0,
    },
    {
      id: "fish",
      title: "Fish Swimming",
      href: "fish",
      project: <Background />,

      open: false,
      position: { x: 200, y: 80 },
      zIndex: 0,
    },
  ]);

  const [topZ, setTopZ] = useState(1);

  function openProject(id: string) {
    setTopZ((prev) => prev + 1);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, open: true, zIndex: topZ + 1 } : p,
      ),
    );
  }
  function closeProject(id: string) {
    setTopZ((prev) => prev + 1);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, open: false, zIndex: topZ } : p)),
    );
    console.log("Closed window:", id, projects);
  }

  function bringToFront(id: string) {
    setTopZ((prev) => prev + 1);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, zIndex: topZ + 1 } : p)),
    );
  }

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
    <div className={`p-4 relative flex flex-col items-center  w-full h-full`}>
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

      {/* {!showScreen && ( */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ zIndex: 2 }}
        className="absolute  pointer-events-auto  "
      >
        <h1 className="sm:text-6xl text-4xl text-white/90 text-shadow-lg font-bolder   text-shadow-black/50  ">
          Rachel Brinkman
        </h1>

        {/* <AnimatePresence mode="wait">
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
              </AnimatePresence> */}
        <motion.h2
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed text-white text-2xl font-semibold text-shadow-lg text-shadow-black/50"
        >
          <a
            href="https://github.com/Not-Rachel"
            className="pointer-events-auto"
          >
            github.com/Not-Rachel
          </a>
        </motion.h2>
        {/* <h2 className="text-xl text-white/90 font-light text-shadow-lg ">
              <a
                href="https://github.com/Not-Rachel"
                className="pointer-events-auto"
              >
                github.com/Not-Rachel
              </a>
            </h2> */}
      </motion.div>
      {/* )} */}
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className="  flex flex-row  w-full h-full"
      >
        {/* <AnimatePresence mode="wait"> */}
        {showNav && (
          <motion.nav
            // drag
            // onDrag={navDrag}
            // onDragEnd={navDragEnd}
            // dragSnapToOrigin

            initial={{ scaleX: showNav ? 0 : "100%" }}
            animate={{
              scaleX: showNav ? "100%" : 0,
              transition: {
                duration: 0.3,
              },
            }}
            layout
            className=" h-full p-2 rounded-md  border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col justify-between "
            style={{ backgroundColor: navToClose ? "#f3255151" : "#06B6D451" }}
          >
            <div
              key={"menu"}
              className="flex  flex-col gap-8 w-full   text-white font-extrabold"
            >
              {projects.map((p) => {
                return (
                  <NavButton
                    onClick={() => openProject(p.id)}
                    title={p.title}
                    href={p.href}
                  />
                );
              })}
            </div>
          </motion.nav>
        )}
        {/* MAIN SCREEN */}
        {projects
          .filter((p) => p.open)
          .map((p) => {
            console.log(p);
            return (
              <Window
                href={p.href}
                key={p.id}
                showNav={showNav}
                setShowNav={setShowNav}
                setNavToClose={setNavToClose}
                onClose={() => {
                  closeProject(p.id);
                }}
                onFocus={() => bringToFront(p.id)}
                zIndex={p.zIndex}
              />
            );
          })}
      </motion.div>
    </div>
  );
}

export default HomePage;
