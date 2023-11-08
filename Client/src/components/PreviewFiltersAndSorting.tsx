import { useRecoilState } from "recoil";
import {
  recoilFilterBy,
  recoilSortBy,
  removeFromFilter,
} from "../recoil/atoms";
import sortings from "../assets/Sortings";
import { Box, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function PreviewFiltersAndSorting() {
  const [filterBy, setFilterBy] = useRecoilState<string[]>(recoilFilterBy);
  const [sortBy] = useRecoilState<string>(recoilSortBy);

  const getFilters = () => {
    if (!filterBy || filterBy.length === 0) {
      return;
    }
    function removeFilter(filter: string) {
      removeFromFilter(filter);
      setFilterBy(filterBy.filter((f) => f !== filter));
    }

    return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }} border={"ActiveBorder"}>
        {/* <Typography sx={{ marginRight: "1vw"}}>
          {"Filters: "}
        </Typography> */}
        <h5 id="filter_header">Filters: </h5>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {filterBy.map((filter) => (
            <Box
              sx={{
                borderStyle: "solid",
                borderColor: "primary.light",
                borderWidth: "1px",
                borderRadius: "5px",
                padding: "0.5vw",
                marginRight: "1vw",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={filter}
            >
              {filter}{" "}
              <IconButton color="primary" onClick={() => removeFilter(filter)}>
                <ClearIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  function getSortings() {
    if (!sortBy || sortBy === "_id,1") {
      return;
    }
    return (
      <div className="sorting_preview">
        <Typography>{"Sorting:"}</Typography>
        <Typography sx={{ textDecoration: "underline" }}>
          {sortings.find((sort) => sort[1] === sortBy)![0]}
        </Typography>
      </div>
    );
  }

  return (
    <div className="filter_preview">
      {getSortings()}
      {getFilters()}
    </div>
  );
}
