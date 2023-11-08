import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recoilSearch, recoilPage } from "../../recoil/atoms";
import { IconButton, TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import "../../App.css";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

function Searchbar() {
  const [stateSearch] = useRecoilState<string>(recoilSearch);
  const [search, setSearch] = useState<string>(stateSearch);
  const setUseSearch = useSetRecoilState<string>(recoilSearch);
  const setPage = useSetRecoilState<number>(recoilPage);

  const updateSearch = useCallback(
    (searchValue: string) => {
      sessionStorage.setItem("search", JSON.stringify(searchValue));
      setUseSearch(searchValue);
    },
    [setUseSearch],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search, updateSearch]);

  function type(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
    sessionStorage.setItem("page", JSON.stringify(1));
  }

  function eraseInput() {
    setSearch("");
    setPage(1);
    sessionStorage.setItem("page", JSON.stringify(1));
  }

  return (
    <TextField
      type="text"
      className="search-bar"
      value={search}
      onChange={(event: ChangeEvent<HTMLInputElement>) => type(event)}
      placeholder="pokemon name..."
      fullWidth
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
