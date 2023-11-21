import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  recoilSearch,
  recoilFilterBy,
  recoilSortBy,
  recoilPage,
} from "../../recoil/atoms";
import { useSetRecoilState } from "recoil";

export default function FadeMenu() {
  const setFilterBy = useSetRecoilState(recoilFilterBy);
  const setSortBy = useSetRecoilState(recoilSortBy);
  const setPage = useSetRecoilState(recoilPage);
  const setSearch = useSetRecoilState(recoilSearch);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const location = window.location.pathname;
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const changePage = (nav: string) => { 
    if (nav === "/") {
      logoOnclick(true);
    }
    setAnchorEl(null);
    navigate(nav);
  };

  const pages = [
    ["Pokedex", "/", "red"],
    ["My Team", "/myteam", "cornflowerblue"],
    ["About", "/about", "green"],
  ];

  const logoOnclick = (isMenu: boolean) => {
    setFilterBy([]);
    setSortBy("_id,1");
    setPage(1);
    setSearch("");
    if (!isMenu) {
      navigate("/");
    }
  };

  return (
    <div className="hamburger_menu_container">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        aria-label="hamburger menu"
        onClick={handleClick}
        style={{
          marginRight: "20px",
        }}
        data-testid="hamburger_menu"
      >
        <MenuIcon />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={changePage}
        TransitionComponent={Fade}
      >
        {pages.map((page) => {
          return (
            <MenuItem
              style={{
                color: "black",
                // color: location === page[1] ? page[2] : "black",
              }}
              key={page[0]}
              onClick={() => changePage(page[1])}
              data-testid={`${page[0]
                .toLowerCase()
                .replace(" ", "")}_link_button`}
            >
              {page[0]}
            </MenuItem>
          );
        })}
      </Menu>
      <h2
        className="pokedex-link"
        data-testid="pokedex_link_button"
        onClick={() => logoOnclick(false)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") navigate("/");
        }}
      >
        Pokedex
      </h2>
    </div>
  );
}
