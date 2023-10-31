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
    query MyQuery($sorting: [[String]], $filters: [String], $range: [Int]) {
      pokemonsSortedAndFiltered(
        sorting: $sorting
        filters: $filters
        range: $range
      ) {
        _id
      }
    }
  `;
  return q;
}

function pokeSearch() {
  const q = gql`
    query query($search: String, $range: [Int]) {
      pokemonSearch(search: $search, range: $range) {
        _id
      }
    }
  `;
  return q;
}

function whatQuery(search: string) {
  return search.length > 0 ? pokeSearch() : getPokemons();
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
  const { loading, error, data } = useQuery(whatQuery(search), { variables });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="pokemons_container">
      {!search
        ? data.pokemonsSortedAndFiltered.map((pokemon: { _id: number }) => {
            return <PokemonCard key={pokemon._id} _id={pokemon._id} />;
          })
        : data.pokemonSearch.map((pokemon: { _id: number }) => {
            return <PokemonCard key={pokemon._id} _id={pokemon._id} />;
          })}
    </div>
  );
}
