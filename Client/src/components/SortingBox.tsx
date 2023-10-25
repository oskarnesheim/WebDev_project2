import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SortBy } from "./Home";
import React from "react";

type sortingBoxProps = {
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

export default function SortingBox({ updateSort, sortBy }: sortingBoxProps) {
  return (
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
        <MenuItem value={SortBy.WEIGHT_INCREASING}>Weight increasing</MenuItem>
        <MenuItem value={SortBy.WEIGHT_DECREASING}>Weight decreasing</MenuItem>
        <MenuItem value={SortBy.NONE}>Random</MenuItem>
      </Select>
    </FormControl>
  );
}
