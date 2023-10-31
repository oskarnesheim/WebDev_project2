import { useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";

//! Forslag til hva vi kan sorteve på
// eslint-disable-next-line react-refresh/only-export-components
export enum SortBy {
  A_Z = "A-Z",
  Z_A = "Z-A",
  BASE_EXPERIENCE_INCREASING = "Base experience increasing",
  BASE_EXPERIENCE_DECREASING = "Base experience decreasing",
  WEIGHT_INCREASING = "Weight increasing",
  WEIGHT_DECREASING = "Weight decreasing",
  NONE = "None",
}

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(SortBy.NONE);
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);

  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setDelayedSearch} />
        <div className="filter_sort_container">
          <FilterAndSortingBox
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            sortBy={sortBy}
            updateSort={setSortBy}
          />
        </div>
      </div>
      <PokemonView
        filters={["fire"]}
        range={[0, 40]}
        sorting={[
          ["base_experience", "-1"],
          ["weight", "1"],
        ]}
        search={delayedSearch}
      />
    </div>
  );
}
