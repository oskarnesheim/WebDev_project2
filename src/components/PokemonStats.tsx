import { useNavigate } from "react-router-dom";
import { IPokemon } from "../interfaces/pokemon";
import { useEffect } from "react";

type PokemonStatsProps = {
  pokemon: IPokemon;
};

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!pokemon) navigate("..");
  });

  return (
    <div>
      <h3>Stats for {pokemon.name}</h3>
      <div>
        <h5>Height - {pokemon.height}</h5>
        <h5>Weight {pokemon.weight}</h5>
        <h5>
          {pokemon.stats.map((stat) => {
            return (
              <div>
                {stat.stat.name} - {stat.base_stat}
              </div>
            );
          })}
        </h5>
      </div>
    </div>
  );
}
