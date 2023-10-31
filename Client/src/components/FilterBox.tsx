import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FormControlLabel, Checkbox, Box } from "@mui/material";

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

type FadeMenuProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filterbox({
  currentFilter,
  setCurrentFilter,
}: FadeMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
          <MenuItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentFilter.includes(filter[0])}
                  style={{ color: filter[1] }}
                  onChange={() => {
                    if (currentFilter.includes(filter[0])) {
                      setCurrentFilter(
                        currentFilter.filter((type) => type !== filter[0]),
                      );
                    } else {
                      setCurrentFilter([...currentFilter, filter[0]]);
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
            setCurrentFilter([]);
          }}
        >
          Reset
        </MenuItem>
      </Menu>
    </Box>
  );
}
