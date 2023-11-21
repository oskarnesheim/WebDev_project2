import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoilMyTeam } from "../../recoil/atoms";

interface Props {
  selectedPokemon: number;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
}

export default function Arrowbuttons({
  selectedPokemon,
  setSelectedPokemon,
}: Props) {
  const [team] = useRecoilState<string[]>(recoilMyTeam);
  const history = useNavigate();
  const redirectToPokemon = () => {
    history("/" + team[selectedPokemon]);
  };

  function moveBy(direction: string) {
    if (team.length === 1) return;
    let num = selectedPokemon;
    if (direction === "right") num += 1;
    if (direction === "left") num -= 1;
    if (num === -1) num = team.length - 1;
    if (num === team.length) num = 0;
    setSelectedPokemon(num);
  }

  return (
    <div className="button-container">
      <Button
        variant="contained"
        color="primary"
        onClick={() => moveBy("left")}
        aria-label="previous Pokémon"
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
        aria-label="next Pokémon"
        data-testid="right_button_team"
      >
        <ArrowForwardIcon />
      </Button>
    </div>
  );
}
