import { useState } from "react";
import "./MyTeam.css";
import TeamMember from "./TeamMember";
import DisplayPokemon from "./DisplayPokemon";


export default function MyTeam() {
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);
  const [team, setTeamState] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "0",
    0,
  ]); // [pokemon_ID,index]

  function checkselected(id: string): boolean {
    if (selectedPokemon[0] === "0") {
      // index 0 is the name of the pokemon, if it is empty, no pokemon is selected
      return false;
    }
    if (selectedPokemon[0] !== id) {
      // if the name of the pokemon is not the same as the selected pokemon, it is not selected
      return false;
    }
    return true;
  }

  function getTeam() {
    if (teamIsLoaded) {
      return team;
    }
    const teamJSON = localStorage.getItem("team");
    if (teamJSON) {
      try {
        const team = JSON.parse(teamJSON);
        if (team === "") {
          setTeamIsLoaded(true);
          return "";
        }
        setTeamIsLoaded(true);
        const splitted = team.split(",");
        setTeamState(splitted);
        return team;
      } catch (error) {
        return "error"; // Handle the error appropriately
      }
    } else {
      return ""; // Handle the case when "team" is not found in localStorage
    }
  }

  function teamlist() {
    if (getTeam() == "") return <p>Team is empty 🙁</p>;
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
      <DisplayPokemon team={team} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} setTeamState={setTeamState}  />
    </div>
  );
}
