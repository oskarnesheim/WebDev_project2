import PokemonCard from "./PokemonCard.tsx";
import { useQuery, gql } from "@apollo/client";
import {
  recoilFilterBy,
  recoilPage,
  recoilSortBy,
  recoilSearch,
} from "../recoil/atoms.ts";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";

type PokemonViewProps = {
  setMaxPage: React.Dispatch<React.SetStateAction<number>>;
};

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

export default function PokemonView({ setMaxPage }: PokemonViewProps) {
  const [sorting] = useRecoilState<string>(recoilSortBy);
  const [filters] = useRecoilState<string[]>(recoilFilterBy);
  const [page] = useRecoilState<number>(recoilPage);
  const [search] = useRecoilState<string>(recoilSearch);

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

  setMaxPage(Math.ceil(data.numberOfPokemonsThatMatchesSearch / 20));

  // If no pokemons are found
  if (data.pokemonsSortedAndFiltered.length === 0) {
    return <Box sx={{ marginTop: "5vh" }}>No pokemons found</Box>;
  }

  return (
    <div className="pokemons_container">
      {data.pokemonsSortedAndFiltered.map((pokemon: { _id: number }) => {
        return <PokemonCard key={pokemon._id} _id={pokemon._id} />;
      })}
    </div>
  );
}
