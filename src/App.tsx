import { Suspense, useState } from "react";
import "./App.css";
import Background from "./components/Background";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

function LoadingScreen() {
  console.log("Loading Screen");
  return (
    <div className="flex justify-center items-center text w-full h-full bg-amber-600">
      <p>LOADING...</p>
    </div>
  );
}
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
      {/* <LoadingScreen /> */}
      {showTHREE && <Background setShowUI={setShowUI}></Background>}
    </div>
  );
}

export default App;
