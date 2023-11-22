import { useRecoilState, useRecoilValue } from "recoil";
import { recoilFilterBy, recoilSortBy } from "../../recoil/atoms";
import sortings from "../../assets/Sortings";
import { Box, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Component for displaying the current filters and sorting.
 * @returns JSX.Element
 */
export default function PreviewFiltersAndSorting(): JSX.Element {
  const [filterBy, setFilterBy] = useRecoilState<string[]>(recoilFilterBy);
  const sortBy = useRecoilValue<string>(recoilSortBy);

  // Get the filters
  const getFilters = (): undefined | JSX.Element => {
    if (!filterBy || filterBy.length === 0) {
      return;
    }
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }} border={"ActiveBorder"}>
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
              <IconButton
                color="primary"
                onClick={() =>
                  setFilterBy(filterBy.filter((f) => f !== filter))
                }
              >
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
