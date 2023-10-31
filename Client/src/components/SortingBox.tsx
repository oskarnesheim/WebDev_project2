import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";

type sortingBoxProps = {
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};
enum SortBy {
  A_Z = "name,1",
  Z_A = "name,-1",
  BASE_EXPERIENCE_INCREASING = "base_experience,1",
  BASE_EXPERIENCE_DECREASING = "base_experience,-1",
  WEIGHT_INCREASING = "weight,1",
  WEIGHT_DECREASING = "weight,-1",
}

const sortings = [
  ["A-Z", SortBy.A_Z],
  ["Z-A", SortBy.Z_A],
  ["Base experience increasing", SortBy.BASE_EXPERIENCE_INCREASING],
  ["Base experience decreasing", SortBy.BASE_EXPERIENCE_DECREASING],
  ["Weight increasing", SortBy.WEIGHT_INCREASING],
  ["Weight decreasing", SortBy.WEIGHT_DECREASING],
];

export default function SortingBox({ updateSort }: sortingBoxProps) {
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
        Sorting
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
            onClick={() => {
              handleClose;
              updateSort(sorting[1]);
            }}
          >
            {sorting[0]}
          </MenuItem>
        ))}

        <MenuItem
          onClick={() => {
            handleClose;
            updateSort("");
          }}
        >
          Reset
        </MenuItem>
      </Menu>
    </Box>
  );
}
