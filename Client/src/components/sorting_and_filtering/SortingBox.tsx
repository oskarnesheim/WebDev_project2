import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";
// import styled from "@mui/material/styles/styled";
import sortings from "../../assets/Sortings";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

type SortingBoxType = {
  setCurrentSorting: React.Dispatch<React.SetStateAction<string>>;
  currentSorting: string;
};

/**
 * SortingBox component for choosing sorting.
 * @param setCurrentSorting
 * @param currentSorting
 * @returns JSX.Element
 */
export default function SortingBox({
  setCurrentSorting,
  currentSorting,
}: SortingBoxType): JSX.Element {
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

  return (
    <Box>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        data-testid="sort-list-button"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        Choose Sorting{" "}
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
        {sortings.map((sorting) => (
          <MenuItem
            key={sorting[1]}
            value={sorting[1]}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleClose();
                setCurrentSorting(sorting[1]);
              }
            }}
            data-testid={sorting[0]}
            onClick={() => {
              handleClose();
              setCurrentSorting(sorting[1]);
            }}
            style={{
              color: sorting[1] === currentSorting ? "red" : "black",
            }}
          >
            {sorting[0]}
            {currentSorting === sorting[1] ? " ✓" : ""}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
