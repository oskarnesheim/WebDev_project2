import { test, describe, expect } from "vitest";
import { cleanup, waitFor } from "@testing-library/react";
import { renderWithRouterQueryClientAndDrinkId } from "../../utils/test-utils";

describe("Test loading of a single pokemoncard", () => {
  test("Test loading of a single pokemon", async () => {
    const { getByText, getByTestId } =
      renderWithRouterQueryClientAndDrinkId("1");

    await waitFor(() => {
      expect(getByText("Height")).toBeTruthy();
      expect(getByTestId("pokemon-name")).toBeTruthy();
    });
  });

  cleanup();
});
