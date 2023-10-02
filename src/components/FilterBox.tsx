import { useState } from "react";

type FilterBoxProps = {
  currentFilter: string[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FilterBox() {
  const [showFilterBox, setShowFilterBox] = useState<boolean>(false);

  const filters = ["Fire", "Water", "Grass", "Diamond"];

  return (
    <div>
      <p onClick={() => setShowFilterBox(!showFilterBox)}>
        Filter {showFilterBox ? "Show" : "Hide"}
      </p>
      {showFilterBox && (
        <div>
          <ul id="filter_list">
            {filters.map((filter) => (
              <li>{filter}</li>
            ))}
          </ul>
          <p>Update</p>
        </div>
      )}
    </div>
  );
}
