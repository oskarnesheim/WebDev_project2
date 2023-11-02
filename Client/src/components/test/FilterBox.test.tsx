import { test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import FilterBox from "../FilterBox";

test("Checks if the filtering works properly", () => {
  let currentFilter: string[] = [];
  const setCurrentFilter: React.Dispatch<React.SetStateAction<string[]>> = (
    newFilter,
  ) => {
    if (typeof newFilter === "function") {
      currentFilter = newFilter(currentFilter);
    } else {
      currentFilter = newFilter;
    }
  };

  // Checks if all the filters are rendered
  const { getAllByText } = render(
    <FilterBox
      currentFilter={currentFilter}
      setCurrentFilter={setCurrentFilter}
    />,
  );
  const filters = [
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Normal",
    "Fighting",
    "poison",
    "Ground",
    "Flying",
  ];
  filters.forEach((filter) => {
    const filterLabel = getAllByText(filter);
    expect(filterLabel).not.toBe(null);
  });

  // Checks if a filter is applied and removed correctly
  const fireFilter = getAllByText("Fire")[0];
  fireEvent.click(fireFilter);
  expect(currentFilter).toEqual(["Fire"]);
  const resetButton = getAllByText("Reset")[0];
  fireEvent.click(resetButton);
  expect(currentFilter).toEqual([]);
});
