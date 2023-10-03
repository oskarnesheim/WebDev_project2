import PokemonCard from "./PokemonCard";
import { pokemons } from "../../public/test.ts";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterBox from "./FilterBox.tsx";
import SortingBox from "./SortingBox.tsx";
import { IPokemon_simple } from "../interfaces/pokemon.ts";

//! Forslag til hva vi kan sorteve på
// eslint-disable-next-line react-refresh/only-export-components
export enum SortBy {
  A_Z = "A-Z",
  Z_A = "Z-A",
  ATTACK_INCREASING = "Attack increasing",
  ATTACK_DECREASING = "Attack decreasing",
  AGE_INCREASING = "Age increasing",
  AGE_DECREASING = "Age decreasing",
  NONE = "None",
}

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [delayedSearch, setDelayedSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(SortBy.NONE);
  const [pokemonList, setPokemonList] = useState<IPokemon_simple[]>(pokemons);

  // const [currentFilter, setCurrentFilter] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const sortedList = [...pokemonList];
    switch (sortBy) {
      case SortBy.A_Z:
        sortedList.sort();
        break;
      case SortBy.Z_A:
        sortedList.sort().reverse();
        break;
      case SortBy.NONE:
        sortedList.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setPokemonList(sortedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setSearch} currentSearch={search} />
        <div className="filter_sort_container">
          <FilterBox />
          <SortingBox sortBy={sortBy} updateSort={setSortBy} />
        </div>
      </div>
      <div className="pokemons_container">
        {pokemonList
          .filter((pokemon) =>
            !delayedSearch ? true : pokemon.name.includes(delayedSearch)
          )
          .map((pokemon) => {
            return <PokemonCard key={pokemon.id} name={pokemon.name} />;
          })}
      </div>
    </div>
  );
}
