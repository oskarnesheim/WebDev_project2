import { useState } from "react";
import "./MyTeam.css";
import PokemonCard from "./PokemonCard";
import TeamMember from "./TeamMember";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ArrowButtons from "./Arrowbuttons";
import { useNavigate } from "react-router-dom";

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

  function setTeam(team: string) {
    localStorage.setItem("team", "");
    if (team === "") return;
    localStorage.setItem("team", JSON.stringify(team));
    setTeamState(team.split(","));
  }

  const history = useNavigate();
  const redirectToPokemon = () => {
    // redirects to the selected pokemon
    history("/" + selectedPokemon[0]);
  };

  function deleteTeamMember(index: number) {
    const updatedTeam = [...team]; // Create a copy of the array
    updatedTeam.splice(index, 1); // Remove the item from the copy
    // alert(`${outcast[0]} was removed from your team`);
    setTeamState(updatedTeam); // Update the state with the new array
    setTeam(updatedTeam.join(",")); // Update the localStorage with the new array
    setSelectedPokemon(["0", 0]);
  }

  function selectedInfo() {
    const pokeName = selectedPokemon[0];
    if (pokeName === "0") {
      return <div className="selected-Info"></div>;
    }
    return (
      <div className="selected-Info">
        <div className="container" onClick={redirectToPokemon}>
          <PokemonCard
            key={selectedPokemon[0]}
            _id={Number(selectedPokemon[0])}
          />
        </div>
        <ArrowButtons
          team={team}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
        <div className="container">
          <Tooltip
            title={
              "Would you like to remove " +
              selectedPokemon[0] +
              " from your team?"
            }
            arrow
          >
            <Button
              className="box"
              onClick={() => deleteTeamMember(selectedPokemon[1])}
              color="error"
              variant="outlined"
            >
              REMOVE
            </Button>
          </Tooltip>
        </div>
      </div>
    );
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
      {selectedInfo()}
    </div>
  );
}
