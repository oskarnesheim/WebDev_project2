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

  const handleFocus = (text: string) => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 0.5;
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      {windowSize < 700 ? (
        <HamburgerMenu />
      ) : (
        <div className="navbar">
          <h2 tabIndex={0} className="pokedex-link" onClick={() => navigate("/")} onKeyDown={(event) => { if (event.key === 'Enter') navigate("/"); }} onFocus={() => handleFocus('Pokedex')}>
            Pokedex
          </h2>
          <h3 tabIndex={0} className="myteam-link" onClick={() => navigate("/myteam")} onKeyDown={(event) => { if (event.key === 'Enter') navigate("/myteam"); }} onFocus={() => handleFocus('My Team')}>
            My Team <BusinessCenterOutlinedIcon />
          </h3>
          <h3 tabIndex={0} className="about-link" onClick={() => navigate("/about")} onKeyDown={(event) => { if (event.key === 'Enter') navigate("/about"); }} onFocus={() => handleFocus('About')}>
            About
          </h3>
        </div>
      )}
    </div>
  );
}
