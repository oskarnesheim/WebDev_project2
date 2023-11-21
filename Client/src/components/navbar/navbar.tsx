import { useNavigate } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useRecoilState } from "recoil";
import {
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
            data-testid="about_link_button"
          >
            About
          </h3>
        </div>
      )}
    </div>
  );
}
