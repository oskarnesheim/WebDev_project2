import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import * as React from "react";
type FilterBoxProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
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
                        currentFilter.filter((type) => type !== filter[0]),
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
  );
}
