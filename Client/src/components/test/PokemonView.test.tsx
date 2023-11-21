// import { test, describe, expect } from "vitest";
// import { cleanup, render, waitFor } from "@testing-library/react";
// import { MockedProvider } from "@apollo/client/testing";
// import { getPokemons } from "../../functions/GraphQLQueries";
// import { BrowserRouter } from "react-router-dom";
// import { RecoilRoot } from "recoil";
// import PokemonView from "../home/PokemonView";

import { MockedProvider } from "@apollo/client/testing";
import { cleanup, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { describe, expect, test } from "vitest";
import Navbar from "../navbar/navbar";
import { getPokemons } from "../../functions/GraphQLQueries";

describe("Test loading of first 20 pokemon", () => {
  test("Load", async () => {
    const { getAllByText } = render(
      <MockedProvider mocks={First_20_pokemon_mock} addTypename={false}>
        <RecoilRoot>
          <BrowserRouter>
            {/* <Home /> */}
            <Navbar />
            {/* <PokemonView /> */}
          </BrowserRouter>
        </RecoilRoot>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getAllByText("Pokedex")).toBeTruthy();
    });
    cleanup();
  });
});

const First_20_pokemon_mock = [
  {
    request: {
      query: getPokemons,
      variables: {
        sorting: [["_id", "1"]],
        filters: [],
        search: "",
        range: [0, 20],
      },
    },
    result: {
      data: {
        pokemonsSortedAndFiltered: [
          {
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
          {
            _id: 2,
            name: "ivysaur",
            base_experience: 142,
            weight: 130,
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
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            },
          },
          {
            _id: 3,
            name: "venusaur",
            base_experience: 263,
            weight: 1000,
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
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            },
          },
          {
            _id: 4,
            name: "charmander",
            base_experience: 62,
            weight: 85,
            types: [
              {
                type: {
                  name: "fire",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            },
          },
          {
            _id: 5,
            name: "charmeleon",
            base_experience: 142,
            weight: 190,
            types: [
              {
                type: {
                  name: "fire",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
            },
          },
          {
            _id: 6,
            name: "charizard",
            base_experience: 267,
            weight: 905,
            types: [
              {
                type: {
                  name: "fire",
                },
              },
              {
                type: {
                  name: "flying",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
            },
          },
          {
            _id: 7,
            name: "squirtle",
            base_experience: 63,
            weight: 90,
            types: [
              {
                type: {
                  name: "water",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            },
          },
          {
            _id: 8,
            name: "wartortle",
            base_experience: 142,
            weight: 225,
            types: [
              {
                type: {
                  name: "water",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
            },
          },
          {
            _id: 9,
            name: "blastoise",
            base_experience: 265,
            weight: 855,
            types: [
              {
                type: {
                  name: "water",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
            },
          },
          {
            _id: 10,
            name: "caterpie",
            base_experience: 39,
            weight: 29,
            types: [
              {
                type: {
                  name: "bug",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
            },
          },
          {
            _id: 11,
            name: "metapod",
            base_experience: 72,
            weight: 99,
            types: [
              {
                type: {
                  name: "bug",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
            },
          },
          {
            _id: 12,
            name: "butterfree",
            base_experience: 198,
            weight: 320,
            types: [
              {
                type: {
                  name: "bug",
                },
              },
              {
                type: {
                  name: "flying",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
            },
          },
          {
            _id: 13,
            name: "weedle",
            base_experience: 39,
            weight: 32,
            types: [
              {
                type: {
                  name: "bug",
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
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
            },
          },
          {
            _id: 14,
            name: "kakuna",
            base_experience: 72,
            weight: 100,
            types: [
              {
                type: {
                  name: "bug",
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
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
            },
          },
          {
            _id: 15,
            name: "beedrill",
            base_experience: 178,
            weight: 295,
            types: [
              {
                type: {
                  name: "bug",
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
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
            },
          },
          {
            _id: 16,
            name: "pidgey",
            base_experience: 50,
            weight: 18,
            types: [
              {
                type: {
                  name: "normal",
                },
              },
              {
                type: {
                  name: "flying",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
            },
          },
          {
            _id: 17,
            name: "pidgeotto",
            base_experience: 122,
            weight: 300,
            types: [
              {
                type: {
                  name: "normal",
                },
              },
              {
                type: {
                  name: "flying",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
            },
          },
          {
            _id: 18,
            name: "pidgeot",
            base_experience: 216,
            weight: 395,
            types: [
              {
                type: {
                  name: "normal",
                },
              },
              {
                type: {
                  name: "flying",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
            },
          },
          {
            _id: 19,
            name: "rattata",
            base_experience: 51,
            weight: 35,
            types: [
              {
                type: {
                  name: "normal",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
            },
          },
          {
            _id: 20,
            name: "raticate",
            base_experience: 145,
            weight: 185,
            types: [
              {
                type: {
                  name: "normal",
                },
              },
            ],
            sprites: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
            },
          },
        ],
      },
    },
  },
];
