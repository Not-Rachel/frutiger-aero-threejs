import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
function App() {
  const [showTHREE, setShowTHREE] = useState(false);
  return (
    <div className="relative h-full w-full">
      <div className="absolute z-40 w-full h-full">
        <BrowserRouter>
          <HomePage setShowTHREE={setShowTHREE} />
        </BrowserRouter>
      </div>

      {showTHREE && (
        <Background
          setShowUI={() => {
            console.log("Clicked");
          }}
        ></Background>
      )}
    </div>
  );
}

export default App;
