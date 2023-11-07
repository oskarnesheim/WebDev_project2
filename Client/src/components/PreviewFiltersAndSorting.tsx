import { useRecoilState } from "recoil";
import { recoilFilterBy, recoilSortBy } from "../recoil/atoms";
import sortings from "../assets/Sortings";
import { Box, Typography } from "@mui/material";

export default function PreviewFiltersAndSorting() {
  const [filterBy] = useRecoilState<string[]>(recoilFilterBy);
  const [sortBy] = useRecoilState<string>(recoilSortBy);

  const getFilters = () => {
    if (!filterBy || filterBy.length === 0) {
      return;
    }
    return (
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ marginRight: "1vw" }}>{"Filters: "}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "0.5vh 0.5vw",
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
              }}
              key={filter}
            >
              {filter}
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
      <>
        <Typography sx={{ marginLeft: "5vw", marginRight: "1vw" }}>
          {"Sorting:"}
        </Typography>
        <Typography sx={{ textDecoration: "underline" }}>
          {sortings.find((sort) => sort[1] === sortBy)![0]}
        </Typography>
      </>
    );
  }

  return (
    <div className="filter_preview">
      {getFilters()}
      {getSortings()}
    </div>
  );
}
