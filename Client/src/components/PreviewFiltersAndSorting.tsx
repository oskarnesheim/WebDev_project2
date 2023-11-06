import { useState } from "react";
import { useRecoilState } from "recoil";
import { recoilFilterBy, recoilSortBy } from "../recoil/atoms";

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
  const [ascending_or_descending] = useState<string>(
    sortBy.split(",")[1] === "1" ? "Ascending" : "Descending",
  );

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
        {sortBy !== "name,1"
          ? sortBy.split(",")[0] + " - " + ascending_or_descending
          : "None"}
      </p>
    </div>
  );
}
