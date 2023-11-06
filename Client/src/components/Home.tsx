import { useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";
import PreviewFiltersAndSorting from "./PreviewFiltersAndSorting.tsx";
import { useRecoilState } from "recoil";
import { recoilFilterBy, recoilSortBy } from "../recoil/atoms.ts";
import { useEffect } from "react";

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [sortBy] = useRecoilState<string>(recoilSortBy);
  const [currentFilter] = useRecoilState<string[]>(recoilFilterBy);

  //update page when filter or sort is changed
  useEffect(() => {
    setPage(1);
  }, [currentFilter, sortBy]);

  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setDelayedSearch} />
        <FilterAndSortingBox setPage={setPage} />
      </div>
      <PreviewFiltersAndSorting />
      <PokemonView search={delayedSearch} page={page} setMaxPage={setMaxPage} />
      <BasicPagination maxPage={maxPage} page={page} setPage={setPage} />
    </div>
  );
}
