import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Route, useLocation, useNavigate, Routes } from "react-router-dom";
import Projects from "./Projects";
import Art from "./Art";
import About from "./About";
function HomePage() {
  const [showProjects, setShowProjects] = useState(false);

  const showScreen = true;
  const navigate = useNavigate();

  function changeScreen(param: string) {
    navigate(`/${param}`);
  }
  return (
    <div className="p-4 sm:p-8 flex flex-col items-center absolute z-99 w-full h-full ">
      <div className="flex sm:flex-row flex-col w-full h-full">
        <div className=" w-1/5 h-full  rounded-md bg-cyan-500/20 border-2  border-cyan-100 overflow-auto inset-shadow-sm inset-shadow-indigo-100  flex justify-center ">
          {/* <AnimatePresence mode="wait"> */}
          {/* {!showProjects ? ( */}
          <motion.div
            key={"menu"}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="flex  sm:flex-col flex-row gap-8 w-full sm:p-2 lg:p-6  text-white font-extrabold"
          >
            <button onClick={() => changeScreen("")} className="p-1 aero">
              Home
            </button>
            <button
              onClick={() => changeScreen("projects")}
              className="p-1 aero"
            >
              Projects
            </button>
            <button onClick={() => changeScreen("art")} className="p-1 aero">
              Art and Drawing
            </button>
            <button className="p-1 aero" onClick={() => changeScreen("cv")}>
              Qualifications
            </button>
          </motion.div>
        </div>
        <AnimatePresence mode="wait">
          {showScreen && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: "100%",

                transition: {
                  duration: 0.3,

                  // repeat: Infinity,
                  // repeatType: "reverse",
                },
              }}
              exit={{ scaleY: 0 }}
              className=" w-full h-full sm:perspective-[800px]"
            >
              <motion.div
                key={"projects"}
                initial={{ rotateY: -5, rotateX: -1 }}
                animate={{
                  rotateY: -10,
                  rotateX: 1,

                  transition: {
                    duration: 15,

                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                exit={{ x: "100%" }}
                onClick={() => setShowProjects(false)}
                className="text-white preserve-3d text-2xl flex flex-col lg:w-9/10  w-full h-full items-center rounded-md bg-cyan-500/20 border-2 border-cyan-100 overflow-auto inset-shadow-sm inset-shadow-indigo-100 "
              >
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/art" element={<Art />} />
                </Routes>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HomePage;
