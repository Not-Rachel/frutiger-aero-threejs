import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Scavenger from "./pages/Scavenger";
function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <Scavenger />
      </BrowserRouter>
    </div>
  );
}

export default App;
