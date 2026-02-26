import { useState } from "react";
import Preview from "./components/Preview";
import "./App.css";
import Background from "./components/Background";
import { AnimatePresence, motion } from "motion/react";

function App() {
  var projects = [
    { image: "", link: "", title: "" },
    { image: "", link: "", title: "" },
    { image: "", link: "", title: "" },
  ];

  const [showProjects, setShowProjects] = useState(false);
  const [showUI, setShowUI] = useState(true);

  return (
    <div className="flex justify-center h-full w-full">
      <div className="p-16 flex flex-col items-center absolute z-99 w-full h-full ">
        {showUI && (
          <div className="flex flex-row w-full h-full">
            <div className="aero w-1/3 h-full p-2 rounded-md bg-cyan-500/20  flex justify-center ">
              {/* <AnimatePresence mode="wait"> */}
              {/* {!showProjects ? ( */}
              <motion.div
                key={"menu"}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="flex flex-col gap-8 w-full p-6 text-white font-extrabold"
              >
                <button
                  onClick={() => setShowProjects(true)}
                  className="p-1 aero"
                >
                  Projects
                </button>
                <button className="p-1 aero">Art and Drawing</button>
                <button className="p-1 aero">Qualifications</button>
              </motion.div>
              {/* ) : ( */}

              {/* )} */}
            </div>
            <AnimatePresence mode="wait">
              {showProjects && (
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
                  className=" w-full h-full perspective-[800px]"
                >
                  <motion.div
                    key={"projects"}
                    initial={{ rotateY: -5, rotateX: -1 }}
                    animate={{
                      rotateY: -20,
                      rotateX: 1,

                      transition: {
                        duration: 15,

                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                    exit={{ x: "100%" }}
                    onClick={() => setShowProjects(false)}
                    className="text-white preserve-3d text-2xl flex flex-col p-l-4 gap-8 w-9/10 h-full items-center rounded-md bg-cyan-500/20 border-2 border-cyan-100 overflow-auto inset-shadow-sm inset-shadow-indigo-100 "
                  >
                    <p>Project 1</p>
                    <p>Project 2</p>
                    <p>Project 3</p>
                    <p>Project 4</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                    <p>Project 5</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* <p className="aero text-white">Hello</p> */}
      </div>
      <Background setShowUI={setShowUI}></Background>
      {/* <div className="border-2 border-white w-1/3 h-1/2 flex justify-center items-center m-4 p-4 flex-col"></div> */}
    </div>
  );
}

export default App;
