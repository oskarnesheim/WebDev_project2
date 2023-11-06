import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import FilterBox from "./components/FilterBox";
import SortingBox from "./components/SortingBox";

type FilterAndSortingBoxProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

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

export default function FilterAndSortingBox({
  setPage,
}: FilterAndSortingBoxProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset the local state variables if the modal is closed without applying changes
    // setTempCurrentFilter(currentFilter);
    // setTempSortBy(sortBy);
    setPage(1);
  };

  const handleResetFilter = () => {
    updateFilterBy("");
    updateSortBy("A-Z");
    setPage(1);
  };

  function updateFilterBy(filter: string) {
    const prevFilters = filter;
    if (filter === "") {
      sessionStorage.setItem("filterBy", JSON.stringify([]));
      return;
    }
    const newFilters = [...prevFilters, filter];
    sessionStorage.setItem("filterBy", JSON.stringify(newFilters));
  }

  function updateSortBy(sort: string) {
    sessionStorage.setItem("sortBy", JSON.stringify(sort));
  }

  const handleApplyFilter = () => {
    // Apply the temporary changes to the parent's state variables
    // updateFilterBy(tempCurrentFilter);
    // updateSort(tempSortBy);

    handleClose(); // Close the modal
  };

  return (
    <div className="filter_container">
      <Button onClick={handleOpen}>Filters/Sorting</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyles}>
          <div className="filter_sorting_inner">
            <FilterBox />
            <SortingBox />
          </div>
          <hr />
          <div className="apply_reset_filter">
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={handleApplyFilter}
            >
              Apply
            </Button>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
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
