import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import VariableProximity from "./VariableProximity";
import { useRef } from "react";
import NotateText from "./NotateText";
const logo = "/scavenger/assets/logo.svg";

function TopNav() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  return (
    <>
      <Navbar className=" font-[revolution] text-3xl w-full z-99 bg-gradient-to-b from-black via-black/90 to-red-500/0 p-2 flex absolute flex-row text-amber-100  top-0 justify-between ">
        <div className="flex-row flex items-center text-center gap-8 mx-8  ">
          <Container onClick={() => navigate("/scavenger")}>
            <NotateText>HOME</NotateText>
          </Container>
          <Container
            className="whitespace-nowrap w-fit"
            onClick={() => navigate("/scavenger/about")}
          >
            <NotateText>INFO</NotateText>
          </Container>
          <Container
            className="whitespace-nowrap w-fit"
            onClick={() => navigate("/scavenger/cart")}
          >
            <NotateText>CART</NotateText>
          </Container>
        </div>

        <a href="https://preydrivedesign.crd.co/" target="_blank">
          <ReactSVG src={logo} className="text-amber-50 w-36" />
        </a>
      </Navbar>
    </>
  );
}

export default TopNav;
