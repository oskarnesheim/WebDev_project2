import "../../App.css";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recoilSearch, recoilPage } from "../../recoil/atoms";

/**
 * Searchbar component for searching for pokemon by name.
 * @returns Searchbar component
 */
function Searchbar(): JSX.Element {
  const [stateSearch, setStateSearch] = useRecoilState<string>(recoilSearch);
  const [search, setSearch] = useState<string>(stateSearch);
  const setPage = useSetRecoilState<number>(recoilPage);

  // Update the search state when the stateSearch changes
  useEffect(() => {
    setSearch(stateSearch);
  }, [stateSearch]);

  // Update the recoilsearch when the search changes
  const updateSearch = useCallback(
    (searchValue: string): void => {
      setStateSearch(searchValue);
    },
    [setStateSearch],
  );

  // Calls the updateSearch function after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search, updateSearch]);

  /**
   * Updates the search state when the user types in the searchbar.
   * @param e : event
   */
  function type(e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
    setPage(1);
  }

  /**
   * Erases the input in the searchbar.
   */
  function eraseInput(): void {
    setSearch("");
    setPage(1);
  }

  return (
    <TextField
      type="text"
      value={search}
      onChange={(event: ChangeEvent<HTMLInputElement>) => type(event)}
      placeholder="pokémon name ..."
      fullWidth
      data-testid="search-bar"
      id="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear input"
              color="primary"
              onClick={() => eraseInput()}
              data-testid="clear-button"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          minHeight: "100px",
          padding: "10px",
          color: "white",
        },
        inputProps: {
          "data-testid": "search-bar-input",
        },
      }}
      InputLabelProps={{
        sx: {
          color: "white",
        },
      }}
    />
  );
}

export default Searchbar;
