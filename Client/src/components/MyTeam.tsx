import { useState } from "react";
import "./MyTeam.css";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";
import TeamMember from "./TeamMember";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Tooltip from "@mui/material/Tooltip";

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
      // index 0 is the name of the pokemon, if it is empty, no pokemon is selected
      return false;
    }
    if (selectedPokemon[0] !== name) {
      // if the name of the pokemon is not the same as the selected pokemon, it is not selected
      return false;
    }
    return true;
  }

  const redirectToPokemon = () => {
    // redirects to the selected pokemon
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
    if (team === "") return;
    localStorage.setItem("team", JSON.stringify(team));
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
    if (num === -1) num = team.length - 1;
    if (num === team.length) num = 0;
    if (num === team.length + 1) num = 1;

    editTeamMEmber(num);
  }

  function deleteTeamMember(index: number) {
    const updatedTeam = [...team]; // Create a copy of the array
    console.log("updated team copy" + updatedTeam);
    const outcast = updatedTeam.splice(index, 1); // Remove the item from the copy
    console.log("Denne kastes ut:" + outcast);
    alert(`${outcast[0]} was removed from your team`);
    setTeamState(updatedTeam); // Update the state with the new array
    console.log("oppdatert team: " + updatedTeam);
    setTeam(updatedTeam.join(",")); // Update the localStorage with the new array
    setSelectedPokemon(["", 0]);
  }

  const ArrowButtons = () => {
    return (
      <div className="button-container">
        {/* <div className="horizontal-arrows"> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => moveBy("left")}
        >
          <ArrowBackIcon />
        </Button>
        <Tooltip title="Go to Pokémon" arrow>
          <Button
            variant="contained"
            color="primary"
            onClick={() => redirectToPokemon()}
          >
            <CircleTwoToneIcon />
          </Button>
        </Tooltip>
        <Button
          variant="contained"
          color="primary"
          onClick={() => moveBy("right")}
        >
          <ArrowForwardIcon />
        </Button>
        {/* </div> */}
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
          <PokemonCard key={selectedPokemon[0]} _id={selectedPokemon[1]} />
        </div>
        <ArrowButtons />
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
        <h2>{team.length}/6</h2>
      </div>
      {selectedInfo()}
    </div>
  );
}
