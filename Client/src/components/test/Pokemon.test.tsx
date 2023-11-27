import { test, describe, expect } from "vitest";
import { cleanup, waitFor } from "@testing-library/react";
import { renderWithRouterQueryClientAndPokemonId } from "../../utils/test-utils";

describe("Test loading of pokemon", () => {
  test("Test that everything loads on the page", async () => {
    const { getByTestId } = renderWithRouterQueryClientAndPokemonId("1");

    await waitFor(() => {
      // Test that the pokemon name is correct
      expect(getByTestId("pokemon-name").textContent).toBe("bulbasaur - #1");
      expect(getByTestId("pokemon-types").textContent).toBe("grass - poison");

      // Test that the pokemon image is correct
      expect(getByTestId("pokemon-stats-image").getAttribute("src")).toBe(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      );
      expect(getByTestId("pokemon-stats-image").getAttribute("alt")).toBe(
        "Picture of bulbasaur",
      );

      // Test that the pokemon stats are correct
      expect(getByTestId("Height").textContent).toBe("7");
      expect(getByTestId("Weight").textContent).toBe("69");
      expect(getByTestId("HP").textContent).toBe("45");
      expect(getByTestId("Attack").textContent).toBe("49");
      expect(getByTestId("Defense").textContent).toBe("49");
      expect(getByTestId("Special Attack").textContent).toBe("65");
      expect(getByTestId("Special Defense").textContent).toBe("65");
      expect(getByTestId("Speed").textContent).toBe("45");

      // Test that the pokemon reviews show up
      expect(getByTestId("add-review-button")).toBeTruthy();
      expect(getByTestId("pokemon-reviews-header").textContent).toBe(
        "Rate and Review",
      );
    });
  });

  cleanup();
});
