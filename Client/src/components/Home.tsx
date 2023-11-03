import { useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";
import PreviewFiltersAndSorting from "./PreviewFiltersAndSorting.tsx";
import SortBy from "../assets/Enums.ts";

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>(SortBy.A_Z);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const filterSessionStorage = () => {
    const data = sessionStorage.getItem("filter");
    if (data) {
      const filterList: string[] = JSON.parse(data);
      return filterList;
    } else {
      return [];
    }
  }; 

  const [currentFilter, setCurrentFilter] = useState<string[]>(
    filterSessionStorage(),
  );

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
      <PreviewFiltersAndSorting currentFilter={currentFilter} sortBy={sortBy} />
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
