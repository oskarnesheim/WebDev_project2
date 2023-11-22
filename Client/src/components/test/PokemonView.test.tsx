import { MockedProvider } from "@apollo/client/testing";
import { cleanup, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { describe, expect, test } from "vitest";
import { First_20_pokemon_mock } from "../../utils/mocks/PokemonViewMock";
import PokemonView from "../home/PokemonView";

describe("Test loading of first 20 pokemon", () => {
  test("Load", async () => {
    const { getAllByText } = render(
      <MockedProvider mocks={First_20_pokemon_mock} addTypename={false}>
        <RecoilRoot>
          <BrowserRouter>
            <PokemonView />
          </BrowserRouter>
        </RecoilRoot>
        ,
      </MockedProvider>,
    );

    await waitFor(() => {
      setTimeout(() => {
        expect(getAllByText("Pokedex")).toBeTruthy();
      }, 1000);
    });
    cleanup();
  });
});
