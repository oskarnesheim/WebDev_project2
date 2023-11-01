import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import SortingBox from "./components/SortingBox";
import FilterBox from "./components/FilterBox";

type FilterAndSortingBoxProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
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
  currentFilter,
  setCurrentFilter,
  updateSort,
  sortBy,
  setPage,
}: FilterAndSortingBoxProps) {
  const [open, setOpen] = useState(false);
  const [tempCurrentFilter, setTempCurrentFilter] = useState(currentFilter); // Local state for currentFilter
  const [tempSortBy, setTempSortBy] = useState(sortBy); // Local state for sortBy

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset the local state variables if the modal is closed without applying changes
    setTempCurrentFilter(currentFilter);
    setTempSortBy(sortBy);
    setPage(1);
  };

  const handleApplyFilter = () => {
    // Apply the temporary changes to the parent's state variables
    setCurrentFilter(tempCurrentFilter);
    updateSort(tempSortBy);

    handleClose(); // Close the modal
  };

  return (
    <div className="filter_container">
      <Button onClick={handleOpen}>Filters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyles} display={"flex"} flexDirection={"column"}>
          <div className="filter_sorting_inner">
            <FilterBox
              currentFilter={tempCurrentFilter} // Use the local state here
              setCurrentFilter={setTempCurrentFilter} // Update the local state
            />
            <SortingBox
              sortBy={tempSortBy} // Use the local state here
              updateSort={setTempSortBy} // Update the local state
            />
          </div>
          <Button onClick={handleApplyFilter}>Apply</Button>
        </Box>
      </Modal>
    </div>
  );
}
