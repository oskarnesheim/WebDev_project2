// import { useParams } from "react-router-dom";
import { IPokemon } from "../interfaces/pokemon";

type PokemonAbilitiesProps = {
  pokemon: IPokemon;
};

export default function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
  return (
    <div>
      <h5>Abilites for {pokemon.name}</h5>
    </div>
  );
}
