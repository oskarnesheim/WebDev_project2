import Searchbar from "../sorting_and_filtering/Searchbar.tsx";
import FilterAndSortingBox from "../sorting_and_filtering/FilterAndSortingBox.tsx";
import PokemonView from "./PokemonView.tsx";
import BasicPagination from "./BasicPagination.tsx";
import PreviewFiltersAndSorting from "../sorting_and_filtering/PreviewFiltersAndSorting.tsx";

/**
 * Function that returns the Home component.
 * Contains:
 * - Searchbar
 * - Filter and sorting box
 * - Preview of filters and sorting
 * - Pokemon view
 * - Pagination
 * @returns Home component
 */
export default function Home(): JSX.Element {
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
