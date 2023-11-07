import { fireEvent, render } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import SortingBox from "../SortingBox";

describe("SortingBox", () => {
  test("Checks that all the sorting options are rendered", async () => {
    const sortBy = "";
    const updateSort = () => { };

    const { getByRole, getByText } = render(<SortingBox sortBy={sortBy} updateSort={updateSort} />)

    const sortings = [
      "A-Z",
      "Z-A",
      "Base experience increasing",
      "Base experience decreasing",
      "Weight increasing",
      "Weight decreasing",
      "Reset",
    ];
    fireEvent.click(getByRole("button", { name: "Sorting" }));
    sortings.forEach((sorting) => {
      const option = getByText(sorting);
      expect(option).toBeTruthy();
    });
  });

  test("Checks if sorting is applied correctly", () => {
    let sortBy = "";
    const updateSort = (newSort: React.SetStateAction<string>) => {
      if (typeof newSort === "function") {
        sortBy = newSort(sortBy);
      } else {
        sortBy = newSort;
      }
    };

    const { getByRole, getAllByText } = render(<SortingBox sortBy={sortBy} updateSort={updateSort} />);

    fireEvent.click(getByRole("button", { name: "Sorting" }));
    const option = getAllByText("Base experience increasing");
    fireEvent.click(option[1]);
    expect(sortBy).toBe("base_experience,1");

    const option2 = getAllByText("Z-A");
    fireEvent.click(option2[1]);
    expect(sortBy).toBe("name,-1");

    const option3 = getAllByText("Reset");
    fireEvent.click(option3[1]);
    expect(sortBy).toBe("");
  });
});