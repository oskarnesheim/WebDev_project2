import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  updateStorageOnChange,
  recoilSearch,
  recoilFilterBy,
  recoilSortBy,
  recoilPage,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export default function FadeMenu() {
  const [filterBy, setFilterBy] = useRecoilState(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState(recoilSortBy);
  const [page, setPage] = useRecoilState(recoilPage);
  const [search, setSearch] = useRecoilState(recoilSearch);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const location = window.location.pathname;
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const changePage = (toWhatPage: string) => {
    if (toWhatPage === "/") {
      logoOnclick(true);
    }
    setAnchorEl(null);
    navigate(toWhatPage);
  };

  const pages = [
    ["Pokedex", "/", "red"],
    ["My Team", "/myteam", "cornflowerblue"],
    ["About", "/about", "green"],
  ];

  const logoOnclick = (isMenu: boolean) => {
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
