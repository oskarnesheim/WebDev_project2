import { useEffect, useState, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recoilSearch, recoilPage } from "../recoil/atoms";

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

  return (
    <input
      type="text"
      id="search_input"
      value={search}
      onChange={(event) => type(event)}
      placeholder="E.g. charizard"
      required
    />
  );
}

export default Searchbar;
