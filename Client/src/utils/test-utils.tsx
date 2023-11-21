import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Pokemon from "../components/pokemon/Pokemon";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { MockedProvider } from "@apollo/client/testing";
import { PokemonMock } from "./mocks/PokemonMock";

const client = new ApolloClient({
  uri: "http://it2810-08.idi.ntnu.no:6969/graphql/",
  cache: new InMemoryCache(),
});

export const renderWithRouterQueryClientAndDrinkId = (_id: string) =>
  render(
    <MockedProvider mocks={PokemonMock}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <MemoryRouter initialEntries={[`/${_id}`]}>
            <Routes>
              <Route path="/:_id" element={<Pokemon />} />
            </Routes>
          </MemoryRouter>
        </RecoilRoot>
      </ApolloProvider>
    </MockedProvider>,
  );
