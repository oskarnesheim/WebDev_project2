import { useNavigate } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useSetRecoilState } from "recoil";
import {
  recoilFilterBy,
  recoilSortBy,
  recoilPage,
  recoilSearch,
} from "../../recoil/atoms";

/**
 * Function that returns the Navbar component, which is displayed on the top of the page.
 * Contains:
 * - Pokedex link
 * - My Team link
 * - About link
 * @returns Navbar component
 */
export default function Navbar(): JSX.Element {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const setFilterBy = useSetRecoilState(recoilFilterBy);
  const setSortBy = useSetRecoilState(recoilSortBy);
  const setPage = useSetRecoilState(recoilPage);
  const setSearch = useSetRecoilState(recoilSearch);
  const navigate = useNavigate();

  // Set windowSize when window is resized
  window.onresize = (): void => {
    setWindowSize(window.innerWidth);
  };

  // sets the filter, sort, page and search to default values when the logo is clicked
  const logoOnclick = (): void => {
    setFilterBy([]);
    setSortBy("_id,1");
    setPage(1);
    setSearch("");
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
