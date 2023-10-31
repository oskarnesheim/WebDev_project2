import { Box, Button, Modal } from "@mui/material";
import React from "react";
import SortingBox from "./components/SortingBox";
import Filterbox from "./components/Filterbox";

type FilterAndSortingBoxProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
  updateSort: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

const modalBoxStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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
        <Box sx={modalBoxStyles} display={"flex"} flexDirection={"row"}>
          <Filterbox
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <SortingBox sortBy={sortBy} updateSort={updateSort} />
        </Box>
      </Modal>
    </div>
  );
}
