import { useState } from "react";
import "./MyTeam.css";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";
import TeamMember from "./TeamMember";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function MyTeam() {
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);
  const [team, setTeamState] = useState<string[]>([]);

  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "",
    0,
  ]); // [name,index]

  const history = useNavigate();

  function checkselected(name: string): boolean {
    if (selectedPokemon[0] === "") {
      return false;
    }
    if (selectedPokemon[0] !== name) {
      return false;
    }
    return true;
  }

  const redirectToPokemon = () => {
    history("/" + selectedPokemon[0]);
  };

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
        setTeamState(team.split(","));
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
    setTeamState(team.split(","));
  }

  function editTeamMEmber(index: number) {
    setSelectedPokemon([team[index], index]);
  }

  function moveBy(direction: string) {
    if (team.length === 1) return;
    let num = selectedPokemon[1];
    if (direction === "right") num += 1;
    if (direction === "left") num -= 1;
    if (direction === "up") num -= 2;
    if (direction === "down") num += 2;
    if (num === -1) num = team.length - 1;
    if (num === -2) num = team.length - 2;
    if (num === team.length) num = 0;
    if (num === team.length + 1) num = 1;

    editTeamMEmber(num);
  }

  function deleteTeamMember(index: number) {
    const updatedTeam = [...team]; // Create a copy of the array
    const outcast = updatedTeam.splice(index, 1); // Remove the item from the copy
    alert(`${outcast[0]} was removed from your team`);
    setTeamState(updatedTeam); // Update the state with the new array
    setTeam(updatedTeam.join(",")); // Update the localStorage with the new array
    setSelectedPokemon(["", 0]);
  }

  const ArrowButtons = () => {
    return (
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}
          onClick={() => moveBy("up")}
        >
          <ArrowUpwardIcon />
        </Button>
        <div className="horizontal-arrows">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "5px" }}
            onClick={() => moveBy("left")}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "5px" }}
            onClick={() => moveBy("right")}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}
          onClick={() => moveBy("down")}
        >
          <ArrowDownwardIcon />
        </Button>
      </div>
    );
  };

  function selectedInfo() {
    const pokeName = selectedPokemon[0];
    if (pokeName === "") {
      return <div className="selected-Info"></div>;
    }
    return (
      <div className="selected-Info">
        <div className="container" onClick={redirectToPokemon}>
          <PokemonCard key={selectedPokemon[0]} _id={selectedPokemon[0]} />
        </div>
        <ArrowButtons />
        <div className="container">
          <Button
            className="box"
            onClick={() => deleteTeamMember(selectedPokemon[1])}
            color="error"
            variant="outlined"
          >
            REMOVE
          </Button>
        </div>
      </div>
    );
  }

  function teamlist() {
    if (getTeam() == "") return <p>Team is empty 🙁</p>;
    return team.map((pokemon: string, count: number) => (
      <div
        onClick={() => editTeamMEmber(count)}
        className="team-grid-child"
        key={count}
      >
        <TeamMember selected={checkselected(pokemon)} name={pokemon} />
      </div>
    ));
  }

  return (
    <div className="my-team">
      <div>
        <h1>My Pokémon Team</h1>
        <div className="team-grid">{teamlist()}</div>
      </div>
      {selectedInfo()}
    </div>
  );
}
