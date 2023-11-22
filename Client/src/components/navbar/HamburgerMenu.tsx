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
import { Box, Typography } from "@mui/material";

/**
 * Function that returns the HamburgerMenu component, which contains the menu displayed in the navbar.
 * Contains:
 * - Pokedex link
 * - My Team link
 * - About link
 * @returns HamburgerMenu component
 */
export default function FadeMenu() {
  const setFilterBy = useSetRecoilState(recoilFilterBy);
  const setSortBy = useSetRecoilState(recoilSortBy);
  const setPage = useSetRecoilState(recoilPage);
  const setSearch = useSetRecoilState(recoilSearch);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
    <Box
      sx={{
        zIndex: 1,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontSize: "20px",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
      }}
    >
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
      <Typography
        variant="h5"
        sx={{
          color: "white",
          marginTop: "30px",
          "&:hover": {
            cursor: "pointer",
            color: "red",
          },
        }}
        data-testid="pokedex_link_button"
        onClick={() => logoOnclick(false)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") navigate("/");
        }}
      >
        PokeDex
      </Typography>
    </Box>
  );
}
