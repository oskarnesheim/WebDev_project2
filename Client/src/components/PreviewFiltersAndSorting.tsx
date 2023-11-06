import { useRecoilState } from "recoil";
import { recoilFilterBy, recoilSortBy } from "../recoil/atoms";
import sortings from "../assets/Sortings";

export default function PreviewFiltersAndSorting() {
  const [filterBy] = useRecoilState<string[]>(recoilFilterBy);
  const [sortBy] = useRecoilState<string>(recoilSortBy);

  const getFilters = () => {
    if (!filterBy || filterBy.length === 0) {
      return;
    }
    return (
      <>
        <p style={{ marginLeft: "20px" }}>{`Sorting: `}</p>
        {filterBy.map((filter) => (
          <p className="filter_single_preview" key={filter}>
            {filter},
          </p>
        ))}
      </>
    );
  };

  function getSortings() {
    if (!sortBy || sortBy === "_id,1") {
      return;
    }
    return (
      <>
        <p style={{ marginLeft: "20px" }}>{`Sorting: `}</p>
        <p style={{ textDecoration: "underline" }}>
          {sortings.find((sort) => sort[1] === sortBy)![0]}
        </p>
      </>
    );
  }

  return (
    <div className="filter_preview">
      {getFilters()}
      {getSortings()}
    </div>
  );
}
