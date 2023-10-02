import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SortBy } from "./Home";

type sortingBoxProps = {
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

export default function SortingBox({ updateSort, sortBy }: sortingBoxProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Age"
          onChange={(e) => updateSort(e.target.value)}
        >
          <MenuItem value={SortBy.A_Z}>A-Z</MenuItem>
          <MenuItem value={SortBy.Z_A}>Z-A</MenuItem>
          <MenuItem value={SortBy.ATTACK_INCREASING}>
            Attack increasing
          </MenuItem>
          <MenuItem value={SortBy.ATTACK_DECREASING}>
            Attack decreasing
          </MenuItem>
          <MenuItem value={SortBy.AGE_INCREASING}>Age increasing</MenuItem>
          <MenuItem value={SortBy.AGE_DECREASING}>Age decreasing</MenuItem>
          <MenuItem value={SortBy.NONE}>None</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
