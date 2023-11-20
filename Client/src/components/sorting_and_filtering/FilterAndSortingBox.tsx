import { Box, Button, List, Modal, Typography } from "@mui/material";
import { SetStateAction, useState, useEffect } from "react";

import FilterBox from "./FilterBox";
import SortingBox from "./SortingBox";
import {
  recoilFilterBy,
  recoilSortBy,
  recoilPage,
  initializeStateFromStorage,
  updateStorageOnChange,
} from "../../recoil/atoms";
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
  const [currentFilter, setCurrentFilter] = useRecoilState(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState(recoilSortBy);
  const [page, setPage] = useRecoilState(recoilPage);
  const [tempFilters, setTempFilters] = useState<string[]>([]);
  const [tempSortBy, setTempSortBy] = useState<string>("");

  // Initialize state from sessionStorage
  useEffect(() => {
    initializeStateFromStorage(
      setCurrentFilter,
      sessionStorage,
      "filterBy",
      [],
    );
    initializeStateFromStorage(setSortBy, sessionStorage, "sortBy", "_id,1");
    initializeStateFromStorage(setPage, sessionStorage, "page", 1);
  }, [setCurrentFilter, setSortBy, setPage]);

  // Update sessionStorage whenever state changes
  useEffect(() => {
    updateStorageOnChange("filterBy", currentFilter, sessionStorage);
    updateStorageOnChange("sortBy", sortBy, sessionStorage);
    updateStorageOnChange("page", page, sessionStorage);
  }, [currentFilter, sortBy, page]);

  const handleOpen = () => {
    setTempFilters(currentFilter);
    setTempSortBy(sortBy);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTempFilters(currentFilter); // Reset temporary states to currentFilter
    setTempSortBy(sortBy); // Reset temporary states to sortBy
  };

  const handleResetFilter = () => {
    const defaultFilters: SetStateAction<string[]> = [];
    const defaultSort = "_id,1";

    setCurrentFilter(defaultFilters);
    setSortBy(defaultSort);
    setTempFilters(defaultFilters);
    setTempSortBy(defaultSort);
    setPage(1); // Reset the page to 1

    handleClose(); // Close the modal
  };

  const handleApplyFilter = () => {
    setCurrentFilter(tempFilters);
    setSortBy(tempSortBy);
    setPage(1); // Reset the page to 1
    handleClose(); // Close the modal
  };

  const handleFocus = (text: string) => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 0.5;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="filter_container">
      <Button
        sx={{ height: "100px", padding: "20px", width: "100%" }}
        variant="outlined"
        data-testid="filter_button"
        onClick={handleOpen}
        onFocus={() => handleFocus("Filters and Sorting")}
      >
        Filters/Sorting
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid="filter-box-modal"
      >
        <Box sx={modalBoxStyles}>
          <div className="filter_sorting_dropdowns">
            <SortingBox setCurrentSorting={setTempSortBy} />
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
                {sortings.map((sort) => {
                  if (sort[1] === tempSortBy) {
                    return sort[0];
                  }
                })}
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
              onFocus={() => handleFocus("Apply")}
              data-testid="apply-filter-button"
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
              onFocus={() => handleFocus("Reset")}
            >
              Reset
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
