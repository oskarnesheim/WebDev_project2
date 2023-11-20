import { test, describe, expect, afterEach, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { findSinglePokemon } from "../../functions/GraphQLQueries";
import Pokemon from "../pokemon/Pokemon";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const PokemonMock = [
  {
    request: {
      query: findSinglePokemon,
      variables: {
        _id: null,
      },
    },
    result: {
      data: {
        pokemon: {
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
        },
      },
    },
  },
];

describe("Test loading of a single pokemoncard", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost:5173/project2/",
        _id: "1",
        // Add other properties as needed
      },
      writable: true,
    });
  });
  test("Test loading of a single pokemon", async () => {
    const { getAllByText } = render(
      <MockedProvider mocks={PokemonMock} addTypename={false}>
        <RecoilRoot>
          <BrowserRouter>
            <Pokemon />
          </BrowserRouter>
        </RecoilRoot>
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(getAllByText("Stats for")).toBeTruthy();
    });
  });

  afterEach(() => {});
});
