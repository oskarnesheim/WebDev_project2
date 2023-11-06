import PokemonCard from "./PokemonCard.tsx";
import { useQuery, gql } from "@apollo/client";
import { recoilFilterBy, recoilSortBy } from "../recoil/atoms.ts";
import { useRecoilState } from "recoil";

type PokemonViewProps = {
  search: string;
  page: number;
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

export default function PokemonView({
  setMaxPage,
  search,
  page,
}: PokemonViewProps) {
  const [sorting] = useRecoilState<string>(recoilSortBy);
  const [filters] = useRecoilState<string[]>(recoilFilterBy);

  const variables = {
    sorting: [sorting.split(",")],
    filters: filters,
    range: [page * 20 - 20, 20],
    search: search,
  };
  const { loading, error, data } = useQuery(getPokemons(), { variables });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  setMaxPage(Math.ceil(data.numberOfPokemonsThatMatchesSearch / 20));

  return (
    <div className="pokemons_container">
      {data.pokemonsSortedAndFiltered.map((pokemon: { _id: number }) => {
        return <PokemonCard key={pokemon._id} _id={pokemon._id} />;
      })}
    </div>
  );
}
