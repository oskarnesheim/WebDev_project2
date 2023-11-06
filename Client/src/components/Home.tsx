import { useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";
import PreviewFiltersAndSorting from "./PreviewFiltersAndSorting.tsx";

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState("");
  const [maxPage, setMaxPage] = useState<number>(1);

  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setDelayedSearch} />
        <FilterAndSortingBox />
      </div>
      <PreviewFiltersAndSorting />
      <PokemonView search={delayedSearch} setMaxPage={setMaxPage} />
      <BasicPagination maxPage={maxPage} />
    </div>
  );
}
