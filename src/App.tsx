import { Suspense, useState } from "react";
import "./App.css";
// import Background from "./components/Background";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import React from "react";
// import Background from "./components/Background";
import { Loader } from "@react-three/drei";
function App() {
  const [showTHREE, setShowTHREE] = useState(false);
  const ThreeScreen = React.lazy(() => import("./components/Background"));

  return (
    <div className="relative h-full w-full">
      <div className="absolute z-40 w-full h-full">
        <BrowserRouter>
          <HomePage setShowTHREE={setShowTHREE} />
        </BrowserRouter>
      </div>

      {/* {showTHREE && (
        <Background
          setShowUI={() => {
            console.log("Clicked");
          }}
        ></Background>
      )} */}
      {showTHREE && (
        <Suspense fallback={<Loader />}>
          <ThreeScreen
            setShowUI={() => {
              console.log("Clicked");
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
