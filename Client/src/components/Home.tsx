import Searchbar from "./Searchbar.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";
import PreviewFiltersAndSorting from "./PreviewFiltersAndSorting.tsx";

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
