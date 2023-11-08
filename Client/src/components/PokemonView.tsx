import PokemonCard from "./PokemonCard.tsx";
import { useQuery, gql } from "@apollo/client";
import {
  recoilFilterBy,
  recoilPage,
  recoilSortBy,
  recoilSearch,
  recoilMaxPage,
} from "../recoil/atoms.ts";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";
import { PokemonCardI } from "../interfaces/pokemon.ts";

function getPokemons() {
  const q = gql`
    query MyQuery(
      $sorting: [[String]]
      $filters: [String]
      $range: [Int]
      $search: String
    ) {
      pokemonsSortedAndFiltered(
        sorting: $sorting
        filters: $filters
        search: $search
        range: $range
      ) {
        _id
        name
        height
        base_experience
        weight
        stats {
          stat {
            name
          }
          base_stat
        }
        types {
          type {
            name
          }
        }
        sprites {
          front_default
        }
      }
      numberOfPokemonsThatMatchesSearch(
        sorting: $sorting
        filters: $filters
        search: $search
      )
    }
  `;
  return q;
}

export default function PokemonView() {
  const [sorting] = useRecoilState<string>(recoilSortBy);
  const [filters] = useRecoilState<string[]>(recoilFilterBy);
  const [page] = useRecoilState<number>(recoilPage);
  const [search] = useRecoilState<string>(recoilSearch);
  const [, setMaxPage] = useRecoilState<number>(recoilMaxPage);
  const variables = {
    sorting: getSorting(),
    filters: filters,
    range: [page * 20 - 20, 20],
    search: search,
  };

  const { loading, error, data } = useQuery(getPokemons(), { variables });

  function getSorting() {
    if (!sorting) {
      return [["name", "1"]];
    }
    return [sorting.split(",")];
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const numberOfPokemonsThatMatchesSearch =
    data.numberOfPokemonsThatMatchesSearch;
  const pokemonList: PokemonCardI[] = data.pokemonsSortedAndFiltered;
  //? Denne gjør så vi får en feilmelding i console.
  //? Dette skjer siden den ikke skjer med en gang komponenten blir rendret.
  setMaxPage(Math.ceil(numberOfPokemonsThatMatchesSearch / 20));

  // If no pokemons are found
  if (data.pokemonsSortedAndFiltered.length === 0) {
    return <Box sx={{ marginTop: "5vh" }}>No pokemons found</Box>;
  }

  return (
    <div className="pokemons_container">
      {pokemonList.map((pokemon: PokemonCardI) => {
        return <PokemonCard key={pokemon._id} PokemonData={pokemon} />;
      })}
    </div>
  );
}
