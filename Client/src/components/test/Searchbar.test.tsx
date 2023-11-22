import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Searchbar from "../sorting_and_filtering/Searchbar";
import userEvent from "@testing-library/user-event";

describe("Searchbar", () => {
  test("Searchbar works as intended", () => {
    const { getByTestId } = render(
      <RecoilRoot>
        <Searchbar />
      </RecoilRoot>,
    );

    const searchBar = getByTestId("search-bar");

    expect(searchBar).not.toBe(null);

    searchBar.click();

    // Type pikachu in the searchbar
    userEvent.type(searchBar, "pikachu");

    // Expect the value not to be pikachu immediately
    expect(searchBar.textContent).not.toBe("pikachu");

    // Wait for the delay (600ms) to trigger the update
    setTimeout(() => {
      expect(searchBar.textContent).toBe("pikachu");
    }, 600);
  });
});
