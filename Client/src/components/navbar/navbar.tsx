import { useNavigate } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  window.onresize = () => {
    setWindowSize(window.innerWidth);
  };
  const navigate = useNavigate();
  return (
    <div>
      {windowSize < 700 ? (
        <HamburgerMenu />
      ) : (
        <div className="navbar" data-testid="navbar">
          <h2
            className="pokedex-link"
            data-testid="pokedex_link_button"
            onClick={() => navigate("/")}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/");
            }}
          >
            Pokedex
          </h2>
          <h3
            className="myteam-link"
            data-testid="myteam_link_button"
            onClick={() => navigate("/myteam")}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/myteam");
            }}
          >
            My Team <BusinessCenterOutlinedIcon />
          </h3>
          <h3
            className="about-link"
            data-testid="about_link_button"
            onClick={() => navigate("/about")}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/about");
            }}
          >
            About
          </h3>
        </div>
      )}
    </div>
  );
}
