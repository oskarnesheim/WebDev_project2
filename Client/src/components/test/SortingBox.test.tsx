import { fireEvent, render } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import SortingBox from "../sorting_and_filtering/SortingBox";
import { RecoilRoot } from "recoil";

describe("SortingBox", () => {
  test("Checks that all the sorting options are rendered", async () => {
    const setCurrentSorting = () => {};

    const { getByRole, getByText } = render(
      <RecoilRoot>
        <SortingBox setCurrentSorting={setCurrentSorting} />
      </RecoilRoot>,
    );

    const sortings = [
      "ID increasing (default)",
      "ID decreasing",
      "A-Z",
      "Z-A",
      "XP increasing",
      "XP decreasing",
      "kg increasing",
      "kg decreasing",
    ];
    fireEvent.click(getByRole("button", { name: "Choose Sorting" }));
    sortings.forEach((sorting) => {
      const option = getByText(sorting);
      expect(option).toBeTruthy();
    });
  });

  test("Checks if sorting is applied correctly", () => {
    let currentSorting = "";
    const setCurrentSorting = (newSort: React.SetStateAction<string>) => {
      if (typeof newSort === "function") {
        currentSorting = newSort(currentSorting);
      } else {
        currentSorting = newSort;
      }
    };

    const { getByRole, getAllByText } = render(
      <RecoilRoot>
        <SortingBox setCurrentSorting={setCurrentSorting} />
      </RecoilRoot>,
    );

    fireEvent.click(getByRole("button", { name: "Choose Sorting" }));
    const option = getAllByText("XP increasing");
    fireEvent.click(option[1]);
    expect(currentSorting).toBe("base_experience,1");

    const option2 = getAllByText("Z-A");
    fireEvent.click(option2[1]);
    expect(currentSorting).toBe("name,-1");

    const option3 = getAllByText("ID increasing (default)");
    fireEvent.click(option3[1]);
    expect(currentSorting).toBe("_id,1");
  });
});
