import Searchbar from "../sorting_and_filtering/Searchbar.tsx";
import FilterAndSortingBox from "../sorting_and_filtering/FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";
import PreviewFiltersAndSorting from "../sorting_and_filtering/PreviewFiltersAndSorting.tsx";

export default function Home() {
  return (
    <div className="home">
      <div className="search_container">
        <Searchbar />
        <FilterAndSortingBox />
      </div>
      <PreviewFiltersAndSorting />
      <PokemonView />
      <BasicPagination />
    </div>
  );
}
