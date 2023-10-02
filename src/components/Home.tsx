import PokemonCard from "./PokemonCard";
import { names } from "../../public/20_names.ts";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar.tsx";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [delayedSearch, setDelayedSearch] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="home">
      <div className="search_container">
        <Searchbar updateSearch={setSearch} currentSearch={search} />
        <div>FilterBox</div>
      </div>
      <div className="pokemons_container">
        {delayedSearch
          ? names
              .filter((pokemon) => pokemon === delayedSearch)
              .map((pokemon) => {
                return <PokemonCard key={pokemon} name={pokemon} />;
              })
          : names.map((pokemon) => {
              return <PokemonCard key={pokemon} name={pokemon} />;
            })}
      </div>
    </div>
  );
}
