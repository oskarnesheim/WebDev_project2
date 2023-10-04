import { pokemons } from "../../public/test2.ts";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar.tsx";
import FilterBox from "./FilterBox.tsx";
import SortingBox from "./SortingBox.tsx";
import { IPokemon_simple } from "../interfaces/pokemon.ts";
import PokemonCard from "./PokemonCard.tsx";

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

export default function Home() {
  const [delayedSearch, setDelayedSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(SortBy.NONE);
  const [pokemonList, setPokemonList] = useState<IPokemon_simple[]>(pokemons);
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);

  // const [currentFilter, setCurrentFilter] = useState<string[]>([]);

  useEffect(() => {
    const sortedList = [...pokemonList];
    switch (sortBy) {
      case SortBy.A_Z:
        sortedList.sort();
        break;
      case SortBy.BASE_EXPERIENCE_INCREASING:
        sortedList.sort((a, b) => a.base_experience - b.base_experience);
        break;
      case SortBy.BASE_EXPERIENCE_DECREASING:
        sortedList.sort((a, b) => b.base_experience - a.base_experience);
        break;
      case SortBy.WEIGHT_INCREASING:
        sortedList.sort((a, b) => a.weight - b.weight);
        break;
      case SortBy.WEIGHT_DECREASING:
        sortedList.sort((a, b) => b.weight - a.weight);
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

  useEffect(() => {
    // console.log(currentFilter);
    const filters = currentFilter.map((filter) => filter.toLocaleLowerCase());
    if (currentFilter.length > 0) {
      const newLlist: IPokemon_simple[] = [];
      pokemons.forEach((pokemon) => {
        console.log(pokemon.types.map((type) => type.type.name));
        const types = pokemon.types.map((type) => type.type.name);
        types.forEach((type) => {
          if (filters.includes(type.toLocaleLowerCase())) {
            newLlist.push(pokemon);
          }
        });
      });
      console.log(newLlist + "newlist");
      setPokemonList(newLlist);
    }
    if (currentFilter.length === 0) {
      setPokemonList(pokemons);
    }
  }, [currentFilter]);
  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setDelayedSearch} />
        <div className="filter_sort_container">
          <FilterBox
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
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
          })}{" "}
      </div>
    </div>
  );
}
