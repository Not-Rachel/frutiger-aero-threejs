import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Scavenger from "./pages/Scavenger";
import AboutUs from "./pages/AboutUs";
import Game from "./pages/Game";
import Cart from "./pages/Cart.tsx";
import TopNav from "./components/ScavNav";
function App() {
  return (
    <>
      <div className="bg-black">
        <Router>
          {/* <TopNav /> */}
          <Routes>
            <Route path="/scavenger" element={<Scavenger />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
