import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowButtons from "./ArrowButtons";
import PokemonCard from "./PokemonCard";
import { removeFromTeam } from "./TeamFunctions";
import { useRecoilState } from "recoil";
import { recoilMyTeam } from "../recoil/atoms";

type Props = {
  selectedPokemon: [string, number];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<[string, number]>>;
};

/**
 * Function that returns a display of the selected Pokemon, including PokemonCard that redirects to the Pokemon's page, ArrowButtons to navigate between team members, and a button to remove the Pokemon from the team
 * @param selectedPokemon - [Pokemon ID, index of the Pokemon in the team]
 * @returns div with the selected Pokemon's info
 */
export default function DisplayPokemon({
  selectedPokemon,
  setSelectedPokemon,
}: Props) {
  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);
  const history = useNavigate();

  const redirectToPokemon = () => {
    history("/" + selectedPokemon[0]);
  };

  /**
   * Function that calls removeFromTeam() to remove a Pokemon from the team, and sets the restets selectedPokemon to [0,0]
   * @param id - Pokemon ID
   */
  function deleteTeamMember(id: string) {
    removeFromTeam(team, id, setTeam);
    setSelectedPokemon(["0", 0]);
  }

  /**
   * Function that returns a display of the selected Pokemon, including PokemonCard that redirects to the Pokemon's page, ArrowButtons to navigate between team members, and a button to remove the Pokemon from the team
   * @returns div with the selected Pokemon's info
   */
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
              onClick={() => deleteTeamMember(selectedPokemon[0])}
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

  return selectedInfo();
}
