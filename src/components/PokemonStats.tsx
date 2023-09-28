import { url } from "../interfaces/pokemon";

type PokemonStatsProps = {
  pokemon: url;
};

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  return (
    <div>
      <h5>Stats for {pokemon.name}</h5>
    </div>
  );
}
