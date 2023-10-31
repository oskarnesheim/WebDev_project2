// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { SortBy } from "./Home";
// import React from "react";

// type sortingBoxProps = {
//   updateSort: React.Dispatch<React.SetStateAction<string>>;
//   sortBy: string;
// };

// export default function SortingBox({ updateSort, sortBy }: sortingBoxProps) {
//   return (
//     <FormControl>
//       <h2>Sorting</h2>
//       <InputLabel style={{ color: "white" }}>Sort by</InputLabel>
//       <Select
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         style={{ color: "white" }}
//         value={sortBy}
//         label="Age"
//         onChange={(e) => updateSort(e.target.value)}
//       >
//         <MenuItem value={SortBy.A_Z}>A-Z</MenuItem>
//         <MenuItem value={SortBy.Z_A}>Z-A</MenuItem>
//         <MenuItem value={SortBy.BASE_EXPERIENCE_INCREASING}>
//           Base experience increasing
//         </MenuItem>
//         <MenuItem value={SortBy.BASE_EXPERIENCE_DECREASING}>
//           Base experience decreasing
//         </MenuItem>
//         <MenuItem value={SortBy.WEIGHT_INCREASING}>Weight increasing</MenuItem>
//         <MenuItem value={SortBy.WEIGHT_DECREASING}>Weight decreasing</MenuItem>
//       </Select>
//     </FormControl>
//   );
// }
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { SortBy } from "./Home";

type sortingBoxProps = {
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

export default function SortingBox({ updateSort, sortBy }: sortingBoxProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <h2>Sorting</h2>
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
        <MenuItem value={SortBy.A_Z}>A-Z</MenuItem>
        // <MenuItem value={SortBy.Z_A}>Z-A</MenuItem>
        //{" "}
        <MenuItem value={SortBy.BASE_EXPERIENCE_INCREASING}>
          // Base experience increasing //{" "}
        </MenuItem>
        //{" "}
        <MenuItem value={SortBy.BASE_EXPERIENCE_DECREASING}>
          // Base experience decreasing //{" "}
        </MenuItem>
        //{" "}
        <MenuItem value={SortBy.WEIGHT_INCREASING}>Weight increasing</MenuItem>
        //{" "}
        <MenuItem value={SortBy.WEIGHT_DECREASING}>Weight decreasing</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose;
            updateSort("");
          }}
        >
          Reset
        </MenuItem>
      </Menu>
    </div>
  );
}
