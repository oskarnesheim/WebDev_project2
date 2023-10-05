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
  const [team, setWindowTeam] = useState<string>("");
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [id, "pokemon"],
    () => {
      const res = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);

      return res;
    }
  );

  function getTeam() {
    if (teamIsLoaded) {
      return team;
    }
    const teamJSON = localStorage.getItem("team");
    if (teamJSON) {
      try {
        const team = JSON.parse(teamJSON);
        console.log("Loader team fra localstore: " + team);
        setTeamState(team);
        setTeamIsLoaded(true);
        return team;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return "error"; // Handle the error appropriately
      }
    } else {
      return ""; // Handle the case when "team" is not found in localStorage
    }
  }

  function checkTeam(name: string): boolean {
    if (getTeam() === "error") {
      return true;
    }
    const team = getTeam();
    if (team !== "") {
      const listTeam = team.split(",");
      if (listTeam.includes(name)) {
        return true;
      }
    }
    return false;
  }

  function addToTeam(name: string) {
    if (!verifyTeam(name)) {
      return;
    }
    if (team === "") {
      setTeamState(name);
    } else {
      setTeamState(team + "," + name);
    }
  }

  function setTeamState(newTeam: string) {
    localStorage.setItem("team", JSON.stringify(newTeam));
    setWindowTeam(newTeam);
  }

  function verifyTeam(name: string) {
    if (team === "") {
      return true;
    }
    const listTeam = team.split(",");
    if (listTeam.includes(name)) {
      alert("You already have this pokemon in your team");
      return false;
    }
    if (listTeam.length >= 6) {
      alert("Your team is full");
      return false;
    }

    return true;
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
      <button
        disabled={checkTeam(data.name)}
        onClick={() => addToTeam(data.name)}
      >
        {checkTeam(data.name) ? "Already in team" : "Add to team"}
      </button>
      <Outlet />
    </div>
  );
}
