import { useState } from "react";
import Preview from "./components/Preview";
import "./App.css";
import Bubble from "./components/Bubble";

function App() {
  var projects = [
    { image: "", link: "", title: "" },
    { image: "", link: "", title: "" },
    { image: "", link: "", title: "" },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Bubble></Bubble>
      {/* <div className="border-2 border-white w-1/3 h-1/2 flex justify-center items-center m-4 p-4 flex-col"></div> */}
    </div>
  );
}

export default App;
