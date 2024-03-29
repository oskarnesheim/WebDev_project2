import { render, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import FilterBox from "../sorting_and_filtering/FilterBox";
import { RecoilRoot } from "recoil";

describe("FilterBox", () => {
  test("Checks if all filter options are rendered correctly", () => {
    const currentFilters: string[] = [];
    const setCurrentFilter = () => {};

    const { getByRole, getByText } = render(
      <RecoilRoot>
        <FilterBox
          currentFilters={currentFilters}
          setCurrentFilter={setCurrentFilter}
        />
      </RecoilRoot>,
    );

    fireEvent.click(getByRole("button", { name: "Choose Filters" }));
    const filters = [
      "normal",
      "fire",
      "water",
      "grass",
      "electric",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dark",
      "dragon",
      "steel",
      "fairy",
      "Reset",
    ];
    filters.forEach((filter) => {
      const option = getByText(filter);
      expect(option).toBeTruthy();
    });
  });

  test("Checks if filters are applied correctly", () => {
    let currentFilters: string[] = [];
    const setCurrentFilter = (newFilters: React.SetStateAction<string[]>) => {
      if (typeof newFilters === "function") {
        currentFilters = newFilters(currentFilters);
      } else {
        currentFilters = [...currentFilters, ...newFilters];
      }
    };

    const { getByRole, getAllByText } = render(
      <RecoilRoot>
        <FilterBox
          currentFilters={currentFilters}
          setCurrentFilter={setCurrentFilter}
        />
      </RecoilRoot>,
    );

    fireEvent.click(getByRole("button", { name: "Choose Filters" }));
    const option = getAllByText("fire");
    fireEvent.click(option[1]);
    expect(currentFilters).toContain("fire");

    const option2 = getAllByText("water");
    fireEvent.click(option2[1]);
    expect(currentFilters).toContain("water");
  });

  test("Snapshot test of filter box", () => {
    const currentFilters: string[] = [];
    const setCurrentFilter = () => {};

    const page = render(
      <RecoilRoot>
        <FilterBox
          currentFilters={currentFilters}
          setCurrentFilter={setCurrentFilter}
        />
        ,
      </RecoilRoot>,
    );
    expect(page).toMatchSnapshot();
  });
});
