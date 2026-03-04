import { motion, AnimatePresence, easeInOut } from "motion/react";
import { useEffect, useState, type CSSProperties, type JSX } from "react";
import { Route, useLocation, useNavigate, Routes } from "react-router-dom";
import Projects from "./Projects";
import Art from "./Art";
import About from "./About";

type HomePageProps = Omit<JSX.IntrinsicElements["primitive"], "object"> & {
  setShowTHREE: React.Dispatch<React.SetStateAction<boolean>>;
};
function HomePage({ setShowTHREE }: HomePageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScreen, setShowScreen] = useState(location.pathname.length > 1);
  const [navToClose, setNavToClose] = useState(false);
  const [showNav, setShowNav] = useState(true);
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

  function navDrag(event, info) {
    // console.log(info.point.x, info.point.y);
    setNavToClose(info.point.x < 0 || info.point.y < 0);
  }
  function navDragEnd(event, info) {
    // console.log(info.point.x, info.point.y);
    if (info.point.x < 0 || info.point.y < 0) {
      setShowNav(false);
    }
  }

  return (
    <div className="p-4 sm:p-8 flex flex-col items-center absolute w-full h-full ">
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
            className=" h-full p-4 rounded-md  border-2  border-cyan-100 overflow-hidden inset-shadow-sm inset-shadow-indigo-100  flex flex-col justify-between "
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
                  location.pathname === "/"
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
                  location.pathname === "/projects"
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
                  location.pathname === "/art"
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
                  location.pathname === "/cv"
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
              initial={{ rotateY: -10, rotateX: -1 }}
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
              className="text-white p-4 pt-8 relative preserve-3d text-2xl flex flex-col  w-full h-full items-center rounded-md bg-cyan-500/20 border-2 border-cyan-100 overflow-visible  inset-shadow-sm inset-shadow-indigo-100 "
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
