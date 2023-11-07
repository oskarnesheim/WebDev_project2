import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Searchbar from "../Searchbar";

describe("Searchbar", () => {
  test("Searchbar renders correctly", () => {
    const { queryByPlaceholderText } = render(
      <Searchbar updateSearch={() => {}} />,
    );
    const inputElement = queryByPlaceholderText("E.g. charizard");
    expect(inputElement).not.toBe(null);
  });

  test("Searchbar updates search text", () => {
    let searchValue: string | ((prevState: string) => string) = "";
    const { getAllByPlaceholderText } = render(
      <Searchbar updateSearch={(value) => (searchValue = value)} />,
    );

    const inputElement = getAllByPlaceholderText("E.g. charizard");

    // Type 'pikachu' into the input
    userEvent.type(inputElement[0], "pikachu");

    // Expect the value to be empty because the update is delayed by 600ms
    expect(searchValue).toBe("");
  });

  test("Searchbar updates search after a delay", () => {
    let searchValue: string | ((prevState: string) => string) = "";
    const { getAllByPlaceholderText } = render(
      <Searchbar updateSearch={(value) => (searchValue = value)} />,
    );

    const [inputElement] = getAllByPlaceholderText("E.g. charizard");

    // Type 'pikachu' into the input
    userEvent.type(inputElement, "pikachu");

    // Expect the value to be empty immediately
    expect(searchValue).toBe("");

    // Wait for the delay (600ms) to trigger the update
    setTimeout(() => {
      expect(searchValue).toBe("pikachu");
    }, 600);
  });
});
