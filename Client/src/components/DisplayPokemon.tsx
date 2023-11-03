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

export default function DisplayPokemon({
  selectedPokemon,
  setSelectedPokemon,
}: Props) {
  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);

  const history = useNavigate();

  const redirectToPokemon = () => {
    history("/" + selectedPokemon[0]);
  };

  function deleteTeamMember(id: string) {
    removeFromTeam(team, id, setTeam);
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
