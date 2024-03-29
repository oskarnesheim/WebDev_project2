import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

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

type FilterBoxProps = {
  currentFilters: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

/**
 * FilterBox component for choosing filters with checkboxes.
 * @param currentFilters
 * @param setCurrentFilter
 * @returns
 */
export default function FilterBox({
  currentFilters,
  setCurrentFilter,
}: FilterBoxProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Open the menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Prevent the menu from closing when clicking on a checkbox
  const handleMousedown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        data-testid="filter-list-button"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        Choose Filters{" "}
        <ArrowDropDownCircleOutlinedIcon
          sx={{ marginTop: "-5px", marginLeft: "5px" }}
        />
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
          <MenuItem
            key={filter[0]}
            data-testid={filter[0]}
            onMouseDown={handleMousedown}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (currentFilters.includes(filter[0])) {
                  setCurrentFilter(
                    currentFilters.filter((f) => f !== filter[0]),
                  );
                } else {
                  setCurrentFilter([...currentFilters, filter[0]]);
                }
              }
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentFilters.includes(filter[0])}
                  style={{ color: filter[1] }}
                  onChange={() => {
                    if (currentFilters.includes(filter[0])) {
                      setCurrentFilter(
                        currentFilters.filter((f) => f !== filter[0]),
                      );
                    } else {
                      setCurrentFilter([...currentFilters, filter[0]]);
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
