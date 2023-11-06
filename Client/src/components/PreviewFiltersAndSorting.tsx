import { useRecoilState } from "recoil";
import { recoilFilterBy, recoilSortBy } from "../recoil/atoms";
import sortings from "../assets/Sortings";

// type PreviewFiltersAndSortingProps = {
//   currentFilter: string[];
//   sortBy: string;
// };

export default function PreviewFiltersAndSorting() {
  //   {
  //   currentFilter,
  //   sortBy,
  // }: PreviewFiltersAndSortingProps
  const [filterBy] = useRecoilState<string[]>(recoilFilterBy);
  const [sortBy] = useRecoilState<string>(recoilSortBy);

  return (
    <div className="filter_preview">
      <p>{"Filters:  "}</p>
      {filterBy.length > 0 ? (
        filterBy.map((filter) => (
          <p className="filter_single_preview" key={filter}>
            {filter},
          </p>
        ))
      ) : (
        <p className="filter_single_preview">None</p>
      )}
      <p style={{ marginLeft: "20px" }}>{`Sorting: `}</p>
      <p style={{ textDecoration: "underline" }}>
        {sortings.find((sort) => sort[1] === sortBy)![0]}
      </p>
    </div>
  );
}
