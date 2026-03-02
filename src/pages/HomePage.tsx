import { motion, AnimatePresence, easeInOut } from "motion/react";
import { useState, type CSSProperties, type JSX } from "react";
import { Route, useLocation, useNavigate, Routes } from "react-router-dom";
import Projects from "./Projects";
import Art from "./Art";
import About from "./About";

type HomePageProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  setShowTHREE: React.Dispatch<React.SetStateAction<boolean>>;
};
function HomePage({ setShowTHREE }: HomePageProps) {
  const [showScreen, setShowScreen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  function changeScreen(param: string) {
    setShowScreen(true);
    navigate(`/${param}`);
  }
  return (
    <div className="p-4 sm:p-8 flex flex-col items-center absolute w-full h-full ">
      <div className="flex sm:flex-row flex-col w-full h-full">
        <AnimatePresence mode="wait">
          {showNav && (
            <motion.nav
              // initial={{ x: showNav ? 0 : "-100%" }}
              // animate={{
              //   x: showNav ? "-100%" : 0,
              //   transition: {
              //     duration: 0.3,
              //   },
              // }}
              initial={{ x: "-200%" }}
              animate={{ x: 0 }}
              exit={{ x: "-200%" }}
              className=" h-full p-4 rounded-md bg-cyan-500/20 border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col justify-between "
            >
              <div
                key={"menu"}
                className="flex  sm:flex-col flex-row gap-8 w-full   text-white font-extrabold"
              >
                <button
                  onClick={() => changeScreen("")}
                  className="p-1 aero rounded-xl"
                >
                  Home
                </button>
                <button
                  onClick={() => changeScreen("projects")}
                  className="p-1 aero rounded-xl"
                >
                  Projects
                </button>
                <button
                  onClick={() => changeScreen("art")}
                  className="p-1 aero rounded-xl"
                >
                  Illustrations
                </button>
                <button
                  className="p-1 aero rounded-xl"
                  onClick={() => changeScreen("cv")}
                >
                  Resume
                </button>
              </div>

              <button
                onClick={() => setShowTHREE((prev) => !prev)}
                className=" h-8 aero px-2 text-amber-50 rounded-xl"
                style={{ "--hue": 100, "--saturation": 0.7 } as CSSProperties}
              >
                Toggle3D
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
        <motion.div
          key={"screen"}
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
            initial={{ rotateY: showNav ? -10 : 0, rotateX: -1 }}
            animate={{
              rotateY: showNav ? -5 : 0,
              rotateX: showNav ? 1 : 0,

              transition: {
                duration: showNav ? 5 : 0.5,

                repeat: showNav ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="text-white p-4 relative preserve-3d text-2xl flex flex-col  w-full h-full items-center rounded-md bg-cyan-500/20 border-2 border-cyan-100 overflow-visible  inset-shadow-sm inset-shadow-indigo-100 "
          >
            <div className="absolute -top-4 -left-4 z-50">
              <button
                onClick={() => {
                  setShowScreen(false);
                  setShowNav(true);
                }}
                className="aero   text-2xl  rounded-xl px-2 "
                style={{ "--hue": 20, "--saturation": 0.9 } as CSSProperties}
              >
                x
              </button>
              <button
                onClick={() => {
                  setShowNav((prev) => !prev);
                }}
                className="aero   text-2xl  rounded-xl px-2 "
                style={{ "--hue": 150, "--saturation": 0.3 } as CSSProperties}
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
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
