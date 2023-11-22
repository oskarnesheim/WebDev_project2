import { describe, expect, test } from "vitest";
import PokemonCard from "../home/PokemonCard";
import { BrowserRouter } from "react-router-dom";
import { PokemonCardI } from "../../interfaces/pokemon";
import { render, waitFor } from "@testing-library/react";

const bulbasaur: PokemonCardI = {
  _id: 1,
  name: "bulbasaur",
  base_experience: 64,
  weight: 69,
  types: [
    {
      type: {
        name: "grass",
      },
    },
    {
      type: {
        name: "poison",
      },
    },
  ],
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
};

describe("Testing PokemonCard", () => {
  test("Test loading of a single pokemoncard", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PokemonCard PokemonData={bulbasaur} />
      </BrowserRouter>,
    );
    await waitFor(() => {
      // Test that the pokemoncard is loaded
      expect(getByTestId("1")).toBeTruthy();

      // Test that the picture is loaded correctly
      expect(getByTestId("1_picture").getAttribute("src")).toBe(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      );
      expect(getByTestId("1_picture").getAttribute("alt")).toBe(
        "Picture of bulbasaur",
      );

      // Test that the types are correct
      expect(getByTestId("1_types").textContent).toContain("grass, poison");
    });
  });
});
