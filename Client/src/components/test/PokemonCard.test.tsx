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
    const { getAllByText } = render(
      <BrowserRouter>
        <PokemonCard PokemonData={bulbasaur} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getAllByText("bulbasaur")).toBeTruthy();
      expect(getAllByText("grass, poison")).toBeTruthy();
    });
  });
});
