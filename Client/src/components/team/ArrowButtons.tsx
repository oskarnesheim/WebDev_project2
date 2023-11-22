import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { recoilMyTeam } from "../../recoil/atoms";
import { Box } from "@mui/material";

interface Props {
  selectedPokemon: number;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Component for displaying the arrow buttons in MyTeam.
 * @param selectedPokemon
 * @param setSelectedPokemon
 * @returns JSX.Element
 */
export default function Arrowbuttons({
  selectedPokemon,
  setSelectedPokemon,
}: Props): JSX.Element {
  const team = useRecoilValue<string[]>(recoilMyTeam);
  const history = useNavigate();
  const redirectToPokemon = () => {
    history("/" + team[selectedPokemon]);
  };

  /**
   * Moves the selected pokemon in the team by one.
   * - If the team only has one pokemon, do nothing.
   * - if user moves to the left of the first pokemon, move to the last pokemon.
   * - if user moves to the right of the last pokemon, move to the first pokemon.
   * @param direction
   */
  function moveBy(direction: string): void {
    if (team.length === 1) return;
    let num = selectedPokemon;
    if (direction === "right") num += 1;
    if (direction === "left") num -= 1;
    if (num === -1) num = team.length - 1;
    if (num === team.length) num = 0;
    setSelectedPokemon(num);
  }

  return (
    <Box
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "2vw",
      }}
    >
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
    </Box>
  );
}
