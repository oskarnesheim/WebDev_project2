import { pokemons } from "../../public/test2.ts";
import { Key, useEffect, useState } from "react";
import Searchbar from "./Searchbar.tsx";
import { IPokemon_simple } from "../interfaces/pokemon.ts";
import PokemonCard from "./PokemonCard.tsx";
import FilterAndSortingBox from "../FilterAndSortingBox.tsx";
import { useQuery, gql } from "@apollo/client";

//! Forslag til hva vi kan sorteve på
// eslint-disable-next-line react-refresh/only-export-components
export enum SortBy {
  A_Z = "A-Z",
  Z_A = "Z-A",
  BASE_EXPERIENCE_INCREASING = "Base experience increasing",
  BASE_EXPERIENCE_DECREASING = "Base experience decreasing",
  WEIGHT_INCREASING = "Weight increasing",
  WEIGHT_DECREASING = "Weight decreasing",
  NONE = "None",
}

function getPokemons() {
  const q = gql`
    query query {
      pokemonsSortedAndFiltered(
        filters: ["fire"]
        sorting: [["name", "1"]]
        range: [0, 20]
      ) {
        _id
        name
        types {
          type {
            name
          }
        }
        base_experience
        weight
      }
    }
  `;
  return q;
}

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(SortBy.NONE);
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);
  const { loading, error, data } = useQuery(getPokemons());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setDelayedSearch} />
        <div className="filter_sort_container">
          <FilterAndSortingBox
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            sortBy={sortBy}
            updateSort={setSortBy}
          />
        </div>
      </div>
      <div className="pokemons_container">
        {data.pokemonsSortedAndFiltered.map((pokemon: { _id: number }) => {
          return <PokemonCard key={pokemon._id} _id={pokemon._id} />;
        })}
      </div>
    </div>
  );
}
