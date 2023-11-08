import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

export default function FadeMenu() {
  const location = window.location.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const changePage = (toWhatPage: string) => {
    setAnchorEl(null);
    navigate(toWhatPage);
  };

  const pages = [
    ["Pokedex", "/", "red"],
    ["My Team", "/myteam", "cornflowerblue"],
    ["About", "/about", "green"],
  ];

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
      >
        <img src="../../public/hamburgermenu_white.png" alt="Menu" />
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
                color: location === page[1] ? page[2] : "black",
              }}
              key={page[0]}
              onClick={() => changePage(page[1])}
            >
              {page[0]}
            </MenuItem>
          );
        })}
      </Menu>
      <h1>Pokedex</h1>
    </div>
  );
}
