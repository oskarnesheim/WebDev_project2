import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SortBy } from "./Home";
import React from "react";

export const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#002c58",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};
type sortingBoxProps = {
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

export default function SortingBox({ updateSort, sortBy }: sortingBoxProps) {
  return (
    <Box sx={style}>
      <FormControl fullWidth>
        <InputLabel style={{ color: "white" }}>Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ color: "white" }}
          value={sortBy}
          label="Age"
          onChange={(e) => updateSort(e.target.value)}
        >
          <MenuItem value={SortBy.A_Z}>A-Z</MenuItem>
          <MenuItem value={SortBy.Z_A}>Z-A</MenuItem>
          <MenuItem value={SortBy.BASE_EXPERIENCE_INCREASING}>
            Base experience increasing
          </MenuItem>
          <MenuItem value={SortBy.BASE_EXPERIENCE_DECREASING}>
            Base experience decreasing
          </MenuItem>
          <MenuItem value={SortBy.WEIGHT_INCREASING}>
            Weight increasing
          </MenuItem>
          <MenuItem value={SortBy.WEIGHT_DECREASING}>
            Weight decreasing
          </MenuItem>
          <MenuItem value={SortBy.NONE}>Random</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
