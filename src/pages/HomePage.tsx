import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Window from "./Window";
import itunes from "/assets/itunes.png";

import hover from "/assets/audio/hover.mp3";
import click_low from "/assets/audio/click_low.mp3";

import { randInt } from "three/src/math/MathUtils.js";
import { PiCaretDoubleRightFill, PiCaretDoubleLeftFill } from "react-icons/pi";

// Projects
import Background from "../components/Background";
import BlockStacking from "./BlockStacking";
import DitherDemo from "./DitherDemo";
import Offline from "./Offline";
import PhysicsSim from "./PhysicsSim";
import ScavengerPortal from "./ScavengerPortal";

import { Resizable } from "re-resizable";

const PROJECT_DEFS: Record<
  string,
  {
    title: string;
    href: string;
    component?: React.ComponentType;
    position: { x: number; y: number };
  }
> = {
  dither: {
    title: "Blue Dithering",
    href: "dither",
    component: DitherDemo,
    position: { x: 0, y: 0 },
  },
  scavenger: {
    title: "Scavenger",
    href: "scavenger",
    component: ScavengerPortal,
    position: { x: 40, y: 40 },
  },
  offline: {
    title: "Offline",
    href: "offline",
    component: Offline,
    position: { x: 80, y: 80 },
  },
  stacking: {
    title: "Block Stacking",
    href: "stacking",
    component: BlockStacking,
    position: { x: 100, y: 80 },
  },
  fish: {
    title: "Fish Swimming",
    href: "fish",
    component: Background,
    position: { x: 200, y: 80 },
  },
  physics: {
    title: "Physics Simulation",
    href: "physics",
    component: PhysicsSim,
    position: { x: 200, y: 80 },
  },
  ex: {
    title: "null",
    href: "null",
    component: undefined,
    position: { x: 200, y: 80 },
  },
  ex2: {
    title: "null",
    href: "null",
    component: undefined,
    position: { x: 200, y: 80 },
  },
  ex3: {
    title: "null",
    href: "null",
    component: undefined,
    position: { x: 200, y: 80 },
  },
  ex4: {
    title: "null",
    href: "null",
    component: undefined,
    position: { x: 200, y: 80 },
  },
};

const PROJECT_IDS = Object.keys(PROJECT_DEFS) as (keyof typeof PROJECT_DEFS)[];

const musicTracks = [
  "/assets/audio/tracks/aphex_twin_film.mp3",
  "/assets/audio/tracks/aphex_twin_Nocares.mp3",
  "/assets/audio/tracks/aphex_twin_WithMyFamily.mp3",
  "/assets/audio/tracks/EarlyMorningClissold.mp3",
  "/assets/audio/tracks/BlueCarpet.mp3",
  "/assets/audio/tracks/rainworld_Breathing_Hyometer.mp3",
  "/assets/audio/tracks/rainworld_Raindeer_Ride.mp3",
  "/assets/audio/tracks/rainworld_sundown.mp3",
  "/assets/audio/tracks/rainworld_Open_Skies.mp3",
];

const wallpaper = "/assets/meadow_wallpaper.mp4";

function NavButton({
  active,
  title,
  onClick,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
}) {
  const hoverSound = new Audio(hover);
  const clickLow = new Audio(click_low);
  clickLow.volume = 0.7;
  clickLow.load();
  hoverSound.volume = 0.5;
  hoverSound.load();
  return (
    <motion.button
      whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
      onClick={() => {
        // buttonClick();
        clickLow.play();
        onClick();
      }}
      onHoverStart={() => hoverSound.play()}
      className=" aero p-1 text-amber-50 rounded-xl overflow-hidden"
      style={
        active
          ? ({ "--hue": 600, "--saturation": 0.8 } as React.CSSProperties)
          : {}
      }
    >
      {title}
    </motion.button>
  );
}

function HomePage() {
  const [playMusic, setPlayMusic] = useState(false);
  const [musicPrompt, setMusicPrompt] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(
    randInt(0, musicTracks.length - 1),
  );
  // const [playUI, setPlayUI] = useState(true);
  const [navToClose, setNavToClose] = useState(false);
  const [fullScreen, setFullscreen] = useState(false);
  const [activeProjects, setActiveProject] = useState<string[]>([]);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});

  // const [showNav, setShowNav] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  const topZRef = useRef(1);

  const openProject = useCallback((id: string) => {
    setMusicPrompt(false);
    topZRef.current += 1;
    setActiveProject((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setZIndices((prev) => ({ ...prev, [id]: topZRef.current }));
  }, []);

  const closeProject = useCallback((id: string) => {
    setActiveProject((prev) => prev.filter((p) => p !== id));
    setZIndices((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const resetProject = useCallback((id: string) => {
    closeProject(id);
    setTimeout(() => openProject(id), 0); // Delay so change is made
  }, []);

  const bringToFront = useCallback((id: string) => {
    topZRef.current += 1;
    setZIndices((prev) => ({ ...prev, [id]: topZRef.current }));
    console.log(topZRef.current);
  }, []);

  const toggleAudio = useCallback(() => {
    setMusicPrompt(false);
    if (audioRef.current) {
      setPlayMusic((prev) => {
        prev ? audioRef.current!.pause() : audioRef.current!.play();
        return !prev;
      });
    }
  }, []);

  function playNextTrack(steps = 1) {
    setCurrentTrack(
      (prev) =>
        (((prev + steps) % musicTracks.length) + musicTracks.length) %
        musicTracks.length,
    );
  }

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.25;
  }, []);

  // Avoid race conditions with playing next track
  useEffect(() => {
    if (audioRef.current && playMusic) {
      audioRef.current.play().catch((err) => console.log("Play error:", err));
    }
  }, [currentTrack, playMusic]);

  const [volumeSlider, setVolumeSilder] = useState(false);

  const handleVolumeChange = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraintsRef}
      className={`relative flex flex-col items-center   w-full h-full`}
    >
      <audio
        ref={audioRef}
        src={musicTracks[currentTrack]}
        loop={false}
        onEnded={() => playNextTrack()}
      ></audio>
      <motion.div
        onHoverStart={() => setVolumeSilder(true)}
        onHoverEnd={() => setVolumeSilder(false)}
        className="flex w-48  flex-col justify-center items-center gap-1  fixed right-0 z-50 bottom-0 m-4  "
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
            // onDoubleClick={() => setPlayUI(true)}
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
          // <VolumeSlider onChange={handleVolumeChange} />
          <input
            type="range"
            defaultValue={
              audioRef && audioRef.current ? audioRef.current.volume * 200 : 0.1
            }
            // defaultValue={50}
            className="bg-green-300"
            onChange={(e) =>
              handleVolumeChange(Number(e.currentTarget.value) / 200)
            }
          />
        )}
      </motion.div>
      <div className="flex sm:flex-row flex-col h-full w-full">
        {/*CONTENTS*/}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ zIndex: 2 }}
          className=" w-auto flex flex-row  pointer-events-auto  "
        >
          {/* LARGE NAV */}
          {!fullScreen && (
            <div>
              <div className="hidden sm:block ">
                <Resizable
                  defaultSize={{
                    width: window.screen.width / 8,
                    height: "100vh",
                  }}
                  enable={{
                    top: false,
                    right: true,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                  }}
                  minWidth={50}
                  maxWidth={300}
                  className="z-50  m-4"
                >
                  <motion.nav
                    initial={{ scaleX: !fullScreen ? 0 : "100%" }}
                    animate={{
                      scaleX: !fullScreen ? "100%" : 0,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    // layout
                    className="z-40 h-[95%] p-2  rounded-md  border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col justify-between "
                    style={{
                      backgroundColor: navToClose ? "#f3255151" : "#06B6D451",
                    }}
                  >
                    <div
                      key={"menu"}
                      className="flex flex-col gap-8 w-full   text-white font-extrabold "
                    >
                      {PROJECT_IDS.map((id) => {
                        const isActive = activeProjects.includes(id);
                        return (
                          <NavButton
                            key={id}
                            active={isActive}
                            onClick={() => {
                              isActive ? resetProject(id) : openProject(id);
                            }}
                            title={PROJECT_DEFS[id].title}
                          />
                        );
                      })}
                    </div>
                  </motion.nav>
                </Resizable>
              </div>
              {/* SMALL NAV */}
              <div
                className={`text-sm grid grid-cols-3 gap-1 sm:hidden mx-2 border z-50 pointer-events-auto`}
              >
                {PROJECT_IDS.map((id) => {
                  const isActive = activeProjects.includes(id);
                  return (
                    <NavButton
                      key={id}
                      active={isActive}
                      onClick={() => {
                        isActive ? resetProject(id) : openProject(id);
                      }}
                      // onClick={() => {}}
                      title={PROJECT_DEFS[id].title}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className="absolute w-full border h-auto items-center  flex flex-col">
            <h1 className="sm:text-6xl text-4xl text-white/90 text-shadow-lg font-bolder   text-shadow-black/50  ">
              Rachel Brinkman
            </h1>

            <motion.h2
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=" items-center border flex flex-col text-white text-2xl font-semibold text-shadow-lg text-shadow-black/50"
            >
              <a
                href="https://github.com/Not-Rachel"
                className="pointer-events-auto"
              >
                github.com/Not-Rachel
              </a>

              <AnimatePresence mode="wait">
                {musicPrompt && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{
                      scaleY: "100%",
                      y: "160%",
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{ scaleY: 0 }}
                    className="z-40   p-2  rounded-md  border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col items-center "
                    style={{
                      backgroundColor: navToClose ? "#f3255151" : "#06B6D451",
                    }}
                  >
                    <h2>Play Music?</h2>
                    <div className="flex justify-around w-full">
                      <button
                        onClick={() => {
                          setPlayMusic(true);
                          setMusicPrompt(false);
                        }}
                        className="aero px-1 rounded-lg"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setMusicPrompt(false)}
                        className="aero px-1 rounded-lg"
                      >
                        No
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.h2>
          </div>
        </motion.div>
        {/* WINDOW AREA */}
        <motion.main
          // layout
          // ref={containerRef}
          transition={{ duration: 0.3 }}
          className={`sm:grid sm:grid-cols-2 z-10  w-full h-full overflow-scroll `}
        >
          {activeProjects.map((id) => {
            const def = PROJECT_DEFS[id];
            return (
              <Window
                key={id}
                href={def.href}
                component={def.component}
                zIndex={zIndices[id] ?? 1}
                fullScreen={fullScreen}
                setFullScreen={setFullscreen}
                setNavToClose={setNavToClose}
                onClose={() => {
                  closeProject(id);
                }}
                onFocus={() => bringToFront(id)}
                constraintsRef={constraintsRef}
              />
            );
          })}
        </motion.main>
      </div>

      <video
        className="absolute inset-0 z-0 w-full h-full object-cover will-change-transform"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline
        preload="auto"
      >
        <source src={wallpaper} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default HomePage;
