import { useState } from "react";

type PreviewFiltersAndSortingProps = {
  currentFilter: string[];
  sortBy: string;
};

export default function PreviewFiltersAndSorting({
  currentFilter,
  sortBy,
}: PreviewFiltersAndSortingProps) {
  const [ascending_or_descending] = useState<string>(
    sortBy.split(",")[1] === "1" ? "Ascending" : "Descending",
  );

  return (
    <div className="filter_preview">
      <p>{"Filters:  "}</p>
      {currentFilter.length > 0 ? (
        currentFilter.map((filter) => (
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
