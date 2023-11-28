import { Box, Button, Divider, List, Modal, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";

import FilterBox from "./FilterBox";
import SortingBox from "./SortingBox";
import { recoilFilterBy, recoilSortBy, recoilPage } from "../../recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
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

/**
 * FilterAndSortingBox component; a modal that contains the FilterBox and SortingBox components.
 * Contains:
 * - FilterBox component
 * - SortingBox component
 * - Apply and Reset buttons
 * @returns FilterAndSortingBox component
 */
export default function FilterAndSortingBox(): JSX.Element {
  const [open, setOpen] = useState(false);

  const [currentFilter, setCurrentFilter] = useRecoilState(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState(recoilSortBy);
  const [tempFilters, setTempFilters] = useState<string[]>([]);
  const [tempSortBy, setTempSortBy] = useState<string>("");
  const setPage = useSetRecoilState<number>(recoilPage);

  // Open the modal
  const handleOpen = (): void => {
    setTempFilters(currentFilter);
    setTempSortBy(sortBy);
    setOpen(true);
  };

  // Close the modal
  const handleClose = (): void => {
    setOpen(false);
    setTempFilters(currentFilter); // Reset temporary states to currentFilter
    setTempSortBy(sortBy); // Reset temporary states to sortBy
  };

  // Reset the filter and sorting to default
  const handleResetFilter = (): void => {
    const defaultFilters: SetStateAction<string[]> = [];
    const defaultSort = "_id,1";

    setCurrentFilter(defaultFilters);
    setSortBy(defaultSort);
    setTempFilters(defaultFilters);
    setTempSortBy(defaultSort);
    setPage(1); // Reset the page to 1
    handleClose(); // Close the modal
  };

  // Apply the filter and sorting
  const handleApplyFilter = (): void => {
    setCurrentFilter(tempFilters);
    setSortBy(tempSortBy);
    setPage(1); // Reset the page to 1
    handleClose(); // Close the modal
  };

  return (
    <div className="filter_container">
      <Button
        sx={{
          height: "100px",
          padding: "20px",
          width: "100%",
          backgroundColor: "#0c141b",
        }}
        variant="outlined"
        data-testid="filter_button"
        onClick={handleOpen}
        aria-label="filters and sorting"
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
            <SortingBox
              setCurrentSorting={setTempSortBy}
              currentSorting={tempSortBy}
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
              <Typography color={"primary.light"} variant="body1">
                Active Sorting:
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "primary.light",
                  marginBottom: "10px",
                }}
              />
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
              <Typography color={"primary.light"} variant="body1">
                Active Filters:
              </Typography>
              <Divider
                sx={{ backgroundColor: "primary.light", marginBottom: "10px" }}
              />
              {tempFilters.length === 0 ? (
                <Typography variant="body1">None</Typography>
              ) : (
                <List>
                  {tempFilters.map((filter, index) => (
                    <Typography key={index} variant="body1">
                      {filter}
                    </Typography>
                  ))}
                </List>
              )}
            </Box>
          </div>
          <Divider
            sx={{
              backgroundColor: "white",
              marginBottom: "10px",
              marginTop: "20px",
            }}
          />
          <div className="apply_reset_filter">
            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "lightgreen", boxShadow: 10 },
              }}
              onClick={handleApplyFilter}
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
            >
              Reset
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
