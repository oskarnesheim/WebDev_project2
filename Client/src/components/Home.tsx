import { useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";

//! Forslag til hva vi kan sorteve på
// eslint-disable-next-line react-refresh/only-export-components
export enum SortBy {
  A_Z = "name,1",
  Z_A = "name,-1",
  BASE_EXPERIENCE_INCREASING = "base_experience,1",
  BASE_EXPERIENCE_DECREASING = "base_experience,-1",
  WEIGHT_INCREASING = "weight,1",
  WEIGHT_DECREASING = "weight,-1",
}

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>(SortBy.A_Z);
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);
  // const [range] = useState<number[]>([0, 20]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setDelayedSearch} />
        <FilterAndSortingBox
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          sortBy={sortBy}
          updateSort={setSortBy}
          setPage={setPage}
        />
      </div>
      <PokemonView
        filters={currentFilter}
        // range={range}
        sorting={[sortBy.split(",")]}
        search={delayedSearch}
        page={page}
        setMaxPage={setMaxPage}
      />
      <BasicPagination maxPage={maxPage} page={page} setPage={setPage} />
    </div>
  );
}
