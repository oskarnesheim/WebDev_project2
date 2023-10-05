import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import * as React from "react";
import Box from "@mui/material/Box";
type FilterBoxProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
};
export const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#002c58",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  text: "white",
};
const filters = [
  ["Fire", "red"],
  ["Water", "blue"],
  ["Grass", "green"],
  ["Electric", "yellow"],
  ["Normal", "grey"],
  ["Fighting", "brown"],
  ["poison", "purple"],
  ["Ground", "brown"],
  ["Flying", "skyblue"],
  // ["Psychic", "pink"],
  // ["Bug", "green"],
  // ["Rock", "brown"],
  // ["Ghost", "purple"],
  // ["Dark", "black"],
  // ["Dragon", "purple"],
  // ["Steel", "grey"],
  // ["Fairy", "pink"],
];

export default function FilterBox({
  currentFilter,
  setCurrentFilter,
}: FilterBoxProps) {
  return (
    <Box sx={style}>
      <div>
        <ul id="filter_list">
          {filters.map((filter) => (
            <FormGroup key={filter[0]}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={currentFilter.includes(filter[0])}
                    style={{ color: filter[1] }}
                    onChange={() => {
                      if (currentFilter.includes(filter[0])) {
                        setCurrentFilter(
                          currentFilter.filter((type) => type !== filter[0])
                        );
                      } else {
                        setCurrentFilter([...currentFilter, filter[0]]);
                      }
                    }}
                  />
                }
                label={filter[0]}
                style={{ color: "white" }}
              />
            </FormGroup>
          ))}
        </ul>
        <Button
          onClick={() => {
            setCurrentFilter([]);
          }}
        >
          Reset
        </Button>
      </div>
    </Box>
  );
}
