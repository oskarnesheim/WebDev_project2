import { data } from "../../public/mockData";
import PokemonCard from "./PokemonCard";

export default function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="pokemons_container">
        {data.results.map((pokemon) => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}
