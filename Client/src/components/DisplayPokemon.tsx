import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowButtons from "./Arrowbuttons";
import PokemonCard from "./PokemonCard";

type Props = {
  team: string[];
  selectedPokemon: [string, number];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<[string, number]>>;
  setTeamState: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function DisplayPokemon({
  team,
  selectedPokemon,
  setSelectedPokemon,
  setTeamState,
}: Props) {
  const history = useNavigate();

  const redirectToPokemon = () => {
    // redirects to the selected pokemon
    history("/" + selectedPokemon[0]);
  };

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
          <Tooltip title={"Remove pokemon from your team. "} arrow>
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

  function deleteTeamMember(index: number) {
    const updatedTeam = [...team]; // Create a copy of the array
    updatedTeam.splice(index, 1); // Remove the item from the copy
    // alert(`${outcast[0]} was removed from your team`);
    setTeamState(updatedTeam); // Update the state with the new array
    setTeam(updatedTeam.join(",")); // Update the localStorage with the new array
    setSelectedPokemon(["0", 0]);
  }

  function setTeam(team: string) {
    localStorage.setItem("team", "");
    if (team === "") return;
    localStorage.setItem("team", JSON.stringify(team));
    setTeamState(team.split(","));
  }

  return selectedInfo();
}
