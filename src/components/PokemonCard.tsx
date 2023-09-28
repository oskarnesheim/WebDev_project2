import { NavLink } from "react-router-dom";
import { IPokemon } from "../interfaces/pokemon";

type PokemonCardProps = {
  pokemon: IPokemon;
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div>
      <h3>
        This is <NavLink to={pokemon.name}>{pokemon.name}</NavLink>
      </h3>
    </div>
  );
}
