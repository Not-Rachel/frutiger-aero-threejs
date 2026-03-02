import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const [showUI, setShowUI] = useState(true);
  const [showTHREE, setShowTHREE] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div className="absolute z-40 w-full h-full">
        <BrowserRouter>
          <HomePage setShowTHREE={setShowTHREE} />
        </BrowserRouter>
      </div>
      {showTHREE && <Background setShowUI={setShowUI}></Background>}
    </div>
  );
}

export default App;
