import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

interface Props {
  team: string[];
  selectedPokemon: [string, number];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<[string, number]>>;
}

export default function Arrowbuttons({
  team,
  selectedPokemon,
  setSelectedPokemon,
}: Props) {
  const history = useNavigate();
  const redirectToPokemon = () => {
    // redirects to the selected pokemon
    history("/" + selectedPokemon[0]);
  };

  function moveBy(direction: string) {
    if (team.length === 1) return;
    let num = selectedPokemon[1];
    if (direction === "right") num += 1;
    if (direction === "left") num -= 1;
    if (num === -1) num = team.length - 1;
    if (num === team.length) num = 0;
    if (num === team.length + 1) num = 1;
    setSelectedPokemon([team[num], num]);
  }

  return (
    <div className="button-container">
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
    </div>
  );
}
