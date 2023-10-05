import { Button, Modal } from "@mui/material";
import React from "react";
import FilterBox from "./components/FilterBox";
import SortingBox from "./components/SortingBox";

type FilterAndSortingBoxProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

export default function FilterAndSortingBox({
  currentFilter,
  setCurrentFilter,
  updateSort,
  sortBy,
}: FilterAndSortingBoxProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="filter_container">
      <Button onClick={handleOpen}>Filters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <SortingBox sortBy={sortBy} updateSort={updateSort} />
          <FilterBox
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        </div>
      </Modal>
    </div>
  );
}
