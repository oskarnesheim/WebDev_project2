import "../../App.css";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  recoilSearch,
  recoilPage,
  initializeStateFromStorage,
  updateStorageOnChange,
} from "../../recoil/atoms";

function Searchbar() {
  const [stateSearch, setStateSearch] = useRecoilState<string>(recoilSearch);
  const [search, setSearch] = useState<string>(stateSearch);
  const setPage = useSetRecoilState<number>(recoilPage);

  // Initialize state from sessionStorage
  useEffect(() => {
    initializeStateFromStorage(setStateSearch, sessionStorage, "search", "");
  }, [setStateSearch]);

  // Update sessionStorage whenever state changes
  useEffect(() => {
    updateStorageOnChange("search", stateSearch, sessionStorage);
    updateStorageOnChange("page", 1, sessionStorage);
  }, [stateSearch]);

  const updateSearch = useCallback(
    (searchValue: string) => {
      setStateSearch(searchValue);
    },
    [setStateSearch],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search, updateSearch]);

  function type(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  function eraseInput() {
    setSearch("");
    setPage(1);
  }

  return (
    <TextField
      type="text"
      className="search-bar"
      value={search}
      onChange={(event: ChangeEvent<HTMLInputElement>) => type(event)}
      placeholder="pokemon name..."
      fullWidth
      data-testid="search-bar"
      id="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton color="primary" onClick={() => eraseInput()}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          // height removed, consider using min-height if necessary
          minHeight: "100px", // default for MUI TextField
          padding: "10px", // Adjust padding to vertically center the text
          color: "white",
          // backgroundColor: "rgba(0,0,0,0.5)",
          // Removed width as fullWidth prop is used
        },
      }}
      InputLabelProps={{
        style: {
          color: "white",
          // Make sure the label is positioned correctly
          // lineHeight: '1', // Uncomment if needed
        },
      }}
    />
  );
}

export default Searchbar;
