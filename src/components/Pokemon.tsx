import { NavLink, Outlet, useParams } from "react-router-dom";
import PokemonAbilities from "./PokemonAbilities";
import PokemonStats from "./PokemonStats";
import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

enum PokemonTabs {
  STATS = "stats",
  ABILITIES = "abilities",
}

export default function Pokemon() {
  const { id } = useParams();
  const [tab, setTab] = useState<PokemonTabs>(PokemonTabs.STATS);

  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [id, "_pokemon"],
    () => {
      const res = fetch(`pokemon_data/${id}.json/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);
      return res;
    }
  );

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>
        {data.name} - {data.id}
      </h1>
      <NavLink to={".."}>Go back</NavLink>
      <img
        style={{ height: 140 }}
        src={data.sprites.front_default}
        alt="Cool picture of a pokemon"
      />
      <div>
        <button onClick={() => setTab(PokemonTabs.STATS)}>Stats</button>
        <button onClick={() => setTab(PokemonTabs.ABILITIES)}>Abilities</button>
      </div>
      <div>
        {tab === PokemonTabs.STATS && <PokemonStats pokemon={data} />}
        {tab === PokemonTabs.ABILITIES && <PokemonAbilities pokemon={data} />}
      </div>
      <Outlet />
    </div>
  );
}
