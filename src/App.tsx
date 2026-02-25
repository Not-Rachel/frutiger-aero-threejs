import { useState } from "react";
import Preview from "./components/Preview";
import "./App.css";
import Background from "./components/Background";

function App() {
  var projects = [
    { image: "", link: "", title: "" },
    { image: "", link: "", title: "" },
    { image: "", link: "", title: "" },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col gap-4 absolute p-6 z-99 text-white">
        <button className="aero">Projects</button>
        <button className="aero">Resume</button>
        <button className="aero">About</button>
      </div>
      <Background></Background>
      {/* <div className="border-2 border-white w-1/3 h-1/2 flex justify-center items-center m-4 p-4 flex-col"></div> */}
    </div>
  );
}

export default App;
