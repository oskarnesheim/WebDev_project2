import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import { recoilFilterBy } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const filters = [
  ["fire", "red"],
  ["water", "blue"],
  ["grass", "green"],
  ["electric", "yellow"],
  ["normal", "grey"],
  ["fighting", "brown"],
  ["poison", "purple"],
  ["ground", "brown"],
  ["flying", "skyblue"],
  ["psychic", "pink"],
  ["bug", "green"],
  ["rock", "brown"],
  ["ghost", "purple"],
  ["dark", "black"],
  ["dragon", "purple"],
  ["steel", "grey"],
  ["fairy", "pink"],
];

// type FadeMenuProps = {
//   currentFilter: string[];
//   setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
// };

export default function FilterBox() {
  const [currentFilter] = useRecoilState(recoilFilterBy);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function updateFilterBy(filter: string) {
    const prevFilters = filter;
    if (filter === "") {
      sessionStorage.setItem("filterBy", JSON.stringify([]));
      return;
    }
    const newFilters = [...prevFilters, filter];
    sessionStorage.setItem("filterBy", JSON.stringify(newFilters));
  }

  function getChecked(type: string) {
    const filter = currentFilter;
    if (filter.includes(type)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box>
      <h2>Filters</h2>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Filters
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {filters.map((filter) => (
          <MenuItem key={filter[0]}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getChecked(filter[0])}
                  style={{ color: filter[1] }}
                  onChange={() => {
                    if (getChecked(filter[0])) {
                     remove
                    } else {
                      updateFilterBy(filter[0]);
                    }
                  }}
                />
              }
              label={filter[0]}
            />
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            handleClose;
            updateFilterBy("");
          }}
        >
          Reset
        </MenuItem>
      </Menu>
    </Box>
  );
}
