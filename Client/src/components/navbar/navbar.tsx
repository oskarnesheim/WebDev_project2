import { useNavigate } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { Switch } from "@mui/material";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useRecoilState } from "recoil";
import {
  recoilTTS,
  recoilFilterBy,
  recoilSortBy,
  recoilPage,
  recoilSearch,
  updateStorageOnChange,
} from "../../recoil/atoms";

export default function Navbar() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [filterBy, setFilterBy] = useRecoilState(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState(recoilSortBy);
  const [page, setPage] = useRecoilState(recoilPage);
  const [search, setSearch] = useRecoilState(recoilSearch);
  const [ttsEnabled, setTtsEnabled] = useRecoilState(recoilTTS);

  window.onresize = () => {
    setWindowSize(window.innerWidth);
  };
  const navigate = useNavigate();

  const logoOnclick = () => {
    if (filterBy.length !== 0) {
      setFilterBy([]);
      updateStorageOnChange("filterBy", [], sessionStorage);
    }
    if (sortBy !== "_id,1") {
      setSortBy("_id,1");
      updateStorageOnChange("sortBy", "_id,1", sessionStorage);
    }
    if (page !== 1) {
      setPage(1);
      updateStorageOnChange("page", 1, sessionStorage);
    }
    if (search !== "") {
      setSearch("");
    }
    navigate("/");
  };

  const handleFocus = (text: string) => {
    if (ttsEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 0.5;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      {windowSize < 700 ? (
        <HamburgerMenu />
      ) : (
        <div className="navbar" data-testid="navbar">
          <h2
            className="pokedex-link"
            data-testid="pokedex_link_button"
            onClick={() => logoOnclick()}
            tabIndex={0}
            onFocus={() => handleFocus("Pokedex")}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/");
            }}
          >
            Pokedex
          </h2>
          <h3
            tabIndex={0}
            className="myteam-link"
            data-testid="myteam_link_button"
            onClick={() => navigate("/myteam")}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/myteam");
            }}
            onFocus={() => handleFocus("My Team")}
          >
            My Team <BusinessCenterOutlinedIcon />
          </h3>
          <h3
            tabIndex={0}
            className="about-link"
            onClick={() => navigate("/about")}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/about");
            }}
            onFocus={() => handleFocus("About")}
            data-testid="about_link_button"
          >
            About
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={ttsEnabled}
              onFocus={() => handleFocus("Text to speech")}
              onChange={() => setTtsEnabled(!ttsEnabled)}
              name="ttsSwitch"
              inputProps={{ "aria-label": "TTS switch" }}
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: ttsEnabled ? "primary" : "grey",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: ttsEnabled ? "lightblue" : "lightgrey",
                },
              }}
            />
            <p
              style={{
                fontSize: "0.8rem",
                margin: "0",
                marginTop: "0px",
                marginLeft: "0px",
                padding: "0",
              }}
            >
              Text to speech
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
