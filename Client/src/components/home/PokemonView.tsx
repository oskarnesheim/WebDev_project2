import PokemonCard from "./PokemonCard.tsx";
import { useQuery } from "@apollo/client";
import {
  recoilFilterBy,
  recoilPage,
  recoilSortBy,
  recoilSearch,
  recoilMaxPage,
} from "../../recoil/atoms.ts";
import { useRecoilState } from "recoil";
import { Box, CircularProgress } from "@mui/material";
import { PokemonCardI } from "../../interfaces/pokemon.ts";
import { getPokemons } from "../../functions/GraphQLQueries.ts";
import { useEffect } from "react";

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

  const { loading, error, data } = useQuery(getPokemons, { variables });

  useEffect(() => {
    if (data) {
      const numberOfPokemonsThatMatchesSearch =
        data.numberOfPokemonsThatMatchesSearch;
      setMaxPage(Math.ceil(numberOfPokemonsThatMatchesSearch / 20));
    }
  }, [data, setMaxPage]);

  function getSorting() {
    if (!sorting) {
      return [["name", "1"]];
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
