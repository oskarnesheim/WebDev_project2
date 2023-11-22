import { useState } from "react";
import "./MyTeam.css";
import TeamMember from "./TeamMember";
import DisplayPokemon from "./DisplayPokemon";
import { useRecoilState } from "recoil";
import { recoilMyTeam } from "../../recoil/atoms";
import { Box, Typography } from "@mui/material";

/**
 * Function that returns a page that displays the user's team
 * @returns div with a list of TeamMember components and a display of the selected Pokemon
 */
export default function MyTeam() {
  const [team] = useRecoilState<string[]>(recoilMyTeam);
  const [selectedPokemon, setSelectedPokemon] = useState<number>(0);

  /**
   * Function that checks if a Pokemon is selected
   * @param id - Pokemon ID
   * @returns true if the Pokemon is selected, false otherwise
   */
  function checkselected(id: string): boolean {
    if (team[selectedPokemon] === id) {
      return true;
    }
    return false;
  }

  /**
   * Function that returns a list of TeamMember components (max 6)
   * @returns a list of TeamMember components
   */
  function teamlist() {
    if (team.length === 0)
      return <p data-testid="Empty_team_message">Team is empty </p>;
    return team.map((_id: string, count: number) => (
      <TeamMember
        count={count}
        selected={checkselected(_id)}
        _id={Number(_id)}
        setSelectedPokemon={setSelectedPokemon}
      />
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
      {team.length === 0 ? (
        <div className="selected-Info">
          <Typography variant="body1">
            Pokemons will be displayed here once you add them to your team.
          </Typography>
        </div>
      ) : (
        <div className="selected-Info">
          <DisplayPokemon
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </div>
      )}
    </div>
  );
}
