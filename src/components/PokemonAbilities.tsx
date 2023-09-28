// import { useParams } from "react-router-dom";
import { url } from "../interfaces/pokemon";

type PokemonAbilitiesProps = {
  pokemon: url;
};

export default function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
  return (
    <div>
      <h5>Abilites for {pokemon.name}</h5>
    </div>
  );
}
