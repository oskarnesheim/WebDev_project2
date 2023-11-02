import { useState } from "react";
import "./MyTeam.css";
import TeamMember from "./TeamMember";
import DisplayPokemon from "./DisplayPokemon";
import { getTeamFromLocalStorage } from "./TeamFunctions";

export default function MyTeam() {
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);
  const [team, setTeam] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "0",
    0,
  ]); // [pokemon_ID,index]

  function checkselected(id: string): boolean {
    if (selectedPokemon[0] === id) {
      return true;
    }
    return false;
  }

  function getTeam(): string[] {
    if (teamIsLoaded) {
      return team;
    }
    const newTeam = getTeamFromLocalStorage();
    setTeam(newTeam);
    setTeamIsLoaded(true);
    return newTeam;
  }

  function teamlist() {
    if (getTeam().length === 0) return <p>Team is empty 🙁</p>;
    console.log("team yea: " + team);
    return team.map((_id: string, count: number) => (
      <div
        onClick={() => setSelectedPokemon([_id, count])}
        className="team-grid-child"
        key={count}
      >
        <TeamMember selected={checkselected(_id)} _id={Number(_id)} />
      </div>
    ));
  }

  return (
    <div className="my-team">
      <div>
        <h1>My Pokémon Team: </h1>
        <div className="team-grid">{teamlist()}</div>
        <h2>{team.length}/6</h2>
      </div>
      <DisplayPokemon
        team={team}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        setTeamState={setTeam}
      />
    </div>
  );
}
