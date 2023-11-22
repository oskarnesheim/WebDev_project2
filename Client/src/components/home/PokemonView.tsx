import PokemonCard from "./PokemonCard.tsx";
import { useQuery } from "@apollo/client";
import {
  recoilFilterBy,
  recoilPage,
  recoilSortBy,
  recoilSearch,
  recoilMaxPage,
} from "../../recoil/atoms.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, CircularProgress } from "@mui/material";
import { PokemonCardI } from "../../interfaces/pokemon.ts";
import { getPokemons } from "../../functions/GraphQLQueries.ts";
import { useEffect } from "react";

/**
 * Function that returns the PokemonView component, which contains the PokemonCards displayed in Home.
 * Contains:
 * - PokemonCard (max 20)
 * @returns PokemonView component
 */
export default function PokemonView(): JSX.Element {
  const sorting = useRecoilValue<string>(recoilSortBy);
  const filters = useRecoilValue<string[]>(recoilFilterBy);
  const page = useRecoilValue<number>(recoilPage);
  const search = useRecoilValue<string>(recoilSearch);
  const setMaxPage = useSetRecoilState<number>(recoilMaxPage);
  const variables = {
    sorting: getSorting(),
    filters: filters,
    range: [page * 20 - 20, 20],
    search: search,
  };

  const { loading, error, data } = useQuery(getPokemons, { variables });

  // Set max page based on the number of pokemons that matches the search. Runs when data is updated.
  useEffect(() => {
    if (data) {
      const numberOfPokemonsThatMatchesSearch =
        data.numberOfPokemonsThatMatchesSearch;
      setMaxPage(Math.ceil(numberOfPokemonsThatMatchesSearch / 20));
    }
  }, [data, setMaxPage]);

  /**
   * Function that returns the sorting used to sort the pokemons. Returns default sorting if no sorting is selected.
   * @returns Array of sorting
   */
  function getSorting(): string[][] {
    if (!sorting) {
      return [["_id", "1"]];
    }
    return [sorting.split(",")];
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const pokemonList: PokemonCardI[] = data.pokemonsSortedAndFiltered;

  // If no pokemons are found
  if (data.pokemonsSortedAndFiltered.length === 0) {
    return (
      <Box sx={{ marginTop: "5vh" }} data-testid="Error_message_no_pokemons">
        No pokemons found
      </Box>
    );
  }

  return (
    <div className="pokemons_container">
      {pokemonList.map((pokemon: PokemonCardI) => {
        return <PokemonCard key={pokemon._id} PokemonData={pokemon} />;
      })}
    </div>
  );
}
