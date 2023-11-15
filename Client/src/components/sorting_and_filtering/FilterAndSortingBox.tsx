import { Box, Button, List, Modal, Typography } from "@mui/material";
import { useState } from "react";
import FilterBox from "./FilterBox";
import SortingBox from "./SortingBox";
import { recoilFilterBy, recoilSortBy, recoilPage } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import sortings from "../../assets/Sortings";

const modalBoxStyles = {
  position: "absolute",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#002c58",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  text: "white",
};

export default function FilterAndSortingBox() {
  const [open, setOpen] = useState(false);
  const [currentFilter, setCurrentFilter] =
    useRecoilState<string[]>(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState<string>(recoilSortBy);
  const [page, setPage] = useRecoilState<number>(recoilPage);
  const [tempFilters, setTempFilters] = useState<string[]>(currentFilter);
  const [tempSortBy, setTempSortBy] = useState<string>(sortBy);
  const handleOpen = () => {
    setTempFilters(currentFilter);
    setTempSortBy(sortBy);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset the local state variables if the modal is closed without applying changes
    updatePage(1);
  };

  const handleResetFilter = () => {
    // Reset the local state and storage immediately
    setCurrentFilter([]);
    setSortBy("_id,1");

    // Reset the session storage (Should be done inside function, but that doesn't work for some reason )
    sessionStorage.setItem("filterBy", JSON.stringify([]));
    sessionStorage.setItem("sortBy", JSON.stringify("name,1"));

    // Update the local state and local storage for the temporary filters and sorting
    setTempFilters([]);
    setTempSortBy("name,1");

    // Update the page immediately
    updatePage(1);

    // Close the modal
    handleClose();
  };

  function updateFilterBy(filters: string[]) {
    sessionStorage.setItem("filterBy", JSON.stringify(filters));
    setCurrentFilter(tempFilters);
  }

  function updateSortBy(sort: string) {
    sessionStorage.setItem("sortBy", JSON.stringify(sort));
    setSortBy(tempSortBy);
  }

  function updatePage(pagenr: number) {
    if (page > 20) {
      throw new Error("Page number cannot be greater than 20");
    }
    sessionStorage.setItem("page", JSON.stringify(pagenr));
    setPage(pagenr);
  }

  const handleApplyFilter = () => {
    updateFilterBy(tempFilters);
    updateSortBy(tempSortBy);
    updatePage(1);
    handleClose(); // Close the modal
  };

  return (
    <div className="filter_container">
      <Button
        sx={{ height: "100px", padding: "20px", width: "100%" }}
        variant="outlined"
        data-testid="filter_button"
        onClick={handleOpen}
      >
        Filters/Sorting
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyles}>
          <div className="filter_sorting_dropdowns">
            <SortingBox
              currentSorting={tempSortBy}
              setCurrentSorting={setTempSortBy}
            />
            <FilterBox
              currentFilters={tempFilters}
              setCurrentFilter={setTempFilters}
            />
          </div>
          <div className="current_active_filters">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1">
                Active Sorting: <hr />
              </Typography>
              <Typography variant="body1">
                {sortings.find((sort) => sort[1] === tempSortBy)![0]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1">
                Active Filters:
                <hr />
              </Typography>

              <List>
                {tempFilters.map((filter) => (
                  <Typography variant="body1">{filter}</Typography>
                ))}
              </List>
            </Box>
          </div>
          <hr />
          <div className="apply_reset_filter">
            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "lightgreen", boxShadow: 10 },
              }}
              onClick={handleApplyFilter}
            >
              Apply
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "pink", boxShadow: 10 },
              }}
              onClick={handleResetFilter}
            >
              Reset
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
