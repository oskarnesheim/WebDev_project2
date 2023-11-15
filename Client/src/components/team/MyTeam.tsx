import { useState } from "react";
import "./MyTeam.css";
import TeamMember from "./TeamMember";
import DisplayPokemon from "./DisplayPokemon";
import { useRecoilState } from "recoil";
import { recoilMyTeam } from "../../recoil/atoms";
import { Box } from "@mui/material";

/**
 * Function that returns a page that displays the user's team
 * @returns div with a list of TeamMember components and a display of the selected Pokemon
 */
export default function MyTeam() {
  const [team] = useRecoilState<string[]>(recoilMyTeam);
  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "0",
    0,
  ]); // [pokemon_ID,index]

  /**
   * Function that checks if a Pokemon is selected
   * @param id - Pokemon ID
   * @returns true if the Pokemon is selected, false otherwise
   */
  function checkselected(id: string): boolean {
    if (selectedPokemon[0] === id) {
      return true;
    }
    return false;
  }

  /**
   * Function that sets the selected Pokemon and scrolls to the bottom of the page
   * @param id - Pokemon ID
   * @param index - index of the Pokemon in the team
   */
  function setSelectedPokemonFunc(id: string, index: number) {
    setSelectedPokemon([id, index]);
    if (window.innerWidth < 1200) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  /**
   * Function that returns a list of TeamMember components (max 6)
   * @returns a list of TeamMember components
   */
  function teamlist() {
    if (team.length === 0)
      return <p data-testid="Empty_team_message">Team is currently empty </p>;
    return team.map((_id: string, count: number) => (
      <div
        onClick={() => setSelectedPokemonFunc(_id, count)}
        className="team-grid-child"
        key={count}
      >
        <TeamMember selected={checkselected(_id)} _id={Number(_id)} />
      </div>
    ));
  }

  return (
    <div className="my-team">
      <Box
        sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <h1>My Pokémon Team: </h1>
        <div className="team-grid">{teamlist()}</div>
        <h2>{team.length}/6</h2>
      </Box>
      <DisplayPokemon
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
}
