import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const [showUI, setShowUI] = useState(true);

  return (
    <div className="flex justify-center h-full w-full">
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>

      <Background setShowUI={setShowUI}></Background>
      {/* <div className="border-2 border-white w-1/3 h-1/2 flex justify-center items-center m-4 p-4 flex-col"></div> */}
    </div>
  );
}

export default App;
