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
    return <CircularProgress />;
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
