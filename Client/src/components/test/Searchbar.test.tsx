import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import Searchbar from "../Searchbar";

describe("Searchbar", () => {
  test("Searchbar works as intended", () => {
    const { queryByPlaceholderText } = render(
      <RecoilRoot>
        <Searchbar />
      </RecoilRoot>,
    );
    const inputElement = queryByPlaceholderText(
      "pokemon name...",
    ) as HTMLInputElement;
    expect(inputElement).not.toBe(null);

    // Type 'pikachu' into the input
    userEvent.type(inputElement, "pikachu");

    // Expect the value to be empty immediately
    expect(inputElement.value).toBe("");

    // Wait for the delay (600ms) to trigger the update
    setTimeout(() => {
      expect(inputElement.value).toBe("pikachu");
    }, 600);
  });
});
