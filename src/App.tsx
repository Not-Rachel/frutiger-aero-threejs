// import { Suspense, useState } from "react";
import "./App.css";
// import Background from "./components/Background";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DitherDemo from "./pages/DitherDemo";
import BlockStacking from "./pages/BlockStacking";
// import Background from "./components/Background";
import Boids from "./pages/Boids";

import PhysicsSim from "./pages/PhysicsSim";
import Offline from "./pages/Offline";
import { useEffect } from "react";
// import React from "react";
// import Background from "./components/Background";
// import { Loader } from "@react-three/drei";
function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}
function App() {
  // const [showTHREE, setShowTHREE] = useState(false);
  // const ThreeScreen = React.lazy(() => import("./components/Background"));

  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dither" element={<DitherDemo />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/stack" element={<BlockStacking />} />
          <Route path="/fish" element={<Boids />} />
          <Route path="/physics" element={<PhysicsSim />} />
          <Route
            path="/scavenger/*"
            element={<ExternalRedirect to="/scavenger/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
    // <div className="relative h-full w-full">
    //   <div className="absolute z-40 w-full h-full">
    //     <BrowserRouter>
    //       <HomePage />
    //     </BrowserRouter>
    //   </div>

    //   {/* {showTHREE && (
    //     <Background
    //       setShowUI={() => {
    //         console.log("Clicked");
    //       }}
    //     ></Background>
    //   )} */}
    //   {/* {showTHREE && (
    //     <Suspense fallback={<Loader />}>
    //       <ThreeScreen />
    //     </Suspense>
    //   )} */}
    // </div>
  );
}

export default App;
