import PokemonCard from "./PokemonCard";
import { names } from "../../public/20_names.ts";

export default function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="pokemons_container">
        {names.map((pokemon) => {
          return <PokemonCard key={pokemon} name={pokemon} />;
        })}
      </div>
    </div>
  );
}
