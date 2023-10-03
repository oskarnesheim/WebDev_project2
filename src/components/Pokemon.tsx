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
    [id, "pokemon"],
    () => {
      const res = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);

      return res;
    }
  );

  const [isMember, setIsMember] = useState<boolean>(false);

  function getTeam() {
    const team = JSON.parse(localStorage.getItem("team") || "");
    return team;
  }

  function setTeam(team: string) {
    localStorage.setItem("team", JSON.stringify(team));
  }

  function clickFunction(name: string) {
    let team = getTeam();
    const listTeam = team.split(",");
    if (listTeam.length >= 6) {
      alert("Your team is full");
      return;
    }
    if (listTeam.includes(name)) {
      alert("You already have this pokemon in your team");
      return;
    }
    if (team === "") {
      team = name;
      setIsMember(true);
    } else team += "," + name;
    {
      setTeam(team);
      setIsMember(true);
    }
  }

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
      <div>
        <button onClick={() => setTab(PokemonTabs.STATS)}>Stats</button>
        <button onClick={() => setTab(PokemonTabs.ABILITIES)}>Abilities</button>
      </div>
      <div>
        {tab === PokemonTabs.STATS && <PokemonStats pokemon={data} />}
        {tab === PokemonTabs.ABILITIES && <PokemonAbilities pokemon={data} />}
      </div>
      {getTeam().split(",").includes(data.name) || isMember ? (
        <button disabled>Pokemon is in your team</button>
      ) : (
        <button
          onClick={() => {
            {
              clickFunction(data.name);
            }
          }}
        >
          Add Pokemon to team
        </button>
      )}
      <Outlet />
    </div>
  );
}
