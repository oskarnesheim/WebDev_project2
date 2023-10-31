import PokemonCard from "./PokemonCard.tsx";
import { useQuery, gql } from "@apollo/client";

type PokemonViewProps = {
  range: number[];
  sorting: string[][];
  filters: string[];
  search: string;
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
        range: $range
        search: $search
      ) {
        _id
      }
    }
  `;
  return q;
}

export default function PokemonView({
  range,
  sorting,
  filters,
  search,
}: PokemonViewProps) {
  const variables = {
    sorting: sorting,
    filters: filters,
    range: range,
    search: search,
  };
  const { loading, error, data } = useQuery(getPokemons(), { variables });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="pokemons_container">
      {data.pokemonsSortedAndFiltered.map((pokemon: { _id: number }) => {
        return <PokemonCard key={pokemon._id} _id={pokemon._id} />;
      })}
    </div>
  );
}
