import { useState } from "react";
import "../../css/Styles.css";
import TeamMember from "./TeamMember";
import DisplayPokemon from "./DisplayPokemon";
import { useRecoilState } from "recoil";
import { recoilMyTeam } from "../../recoil/atoms";
import { Box, Typography } from "@mui/material";

/**
 * Function that returns a page that displays the user's team
 * @returns div with a list of TeamMember components and a display of the selected Pokemon
 */
export default function MyTeam(): JSX.Element {
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
  function teamlist(): JSX.Element[] | JSX.Element {
    if (team.length === 0)
      return (
        <Typography variant="body1" data-testid="Empty_team_message">
          Team is empty{" "}
        </Typography>
      );
    return team.map((_id: string, count: number) => (
      <TeamMember
        count={count}
        selected={checkselected(_id)}
        _id={Number(_id)}
        setSelectedPokemon={setSelectedPokemon}
        key={count}
      />
    ));
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "100px",
        "@media (max-width: 1200px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <Typography
          variant="h4"
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          My Pokémon Team:{" "}
        </Typography>
        <div className="team-grid">{teamlist()}</div>
        <Typography
          variant="h5"
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {team.length}/6
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "black",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          width: "320px",
          height: "380px",
        }}
      >
        {team.length === 0 ? (
          <Typography variant="body1">
            Pokemons will be displayed here once you add them to your team.
          </Typography>
        ) : (
          <DisplayPokemon
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        )}
      </Box>
    </Box>
  );
}
