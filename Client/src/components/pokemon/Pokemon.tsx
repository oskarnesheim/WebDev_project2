import { useNavigate, useParams } from "react-router-dom";
import PokemonStats from "./PokemonStats";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import PokemonRatingReview from "./PokemonReviews";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { recoilMyTeam } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { PokemonPageI } from "../../interfaces/pokemon";
import { findSinglePokemon } from "../../functions/GraphQLQueries";

/**
 * Function that returns the Pokemon component, which contains the Pokemon information.
 * Contains:
 * - Pokemon name
 * - Pokemon stats (HP, Attack, Defense, Special Attack, Special Defense, Speed)
 * - Pokemon rating and reviews
 * @returns Pokemon component
 */
export default function Pokemon(): JSX.Element {
  const { _id } = useParams();
  const navigate = useNavigate();
  const variables = {
    _id: parseInt(_id!),
  };
  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);
  const { loading, error, data } = useQuery(findSinglePokemon, { variables });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  // Get pokemon data from GraphQL after loading and error check
  const PokemonData: PokemonPageI = data.pokemon;

  /**
   * Function that checks if the pokemon is in the team.
   * @returns 0 if not in team, 1 if in team, 2 if team is full
   */
  const checkTeam = (): number => {
    const id = PokemonData._id.toString();
    if (team.includes(id)) return 1;
    if (team.length == 6) return 2;
    return 0;
  };

  /**
   * Function that handles the onClick event for the add to team button.
   * - If pokemon is not in team, add it to the team
   * - If pokemon is in team, remove it from the team
   * - If team is full, do nothing
   * @returns void
   */
  function handleOnClick(): void {
    switch (checkTeam()) {
      case 0:
        setTeam([...team, PokemonData._id.toString()]);
        break;
      case 1:
        setTeam(team.filter((teamId) => teamId !== PokemonData._id.toString()));
        break;
      case 2:
        break;
      default:
        break;
    }
  }

  /**
   * Function that returns the color and text for the add to team button.
   * @param mode : 0 to get color, 1 to get text, 2 to get tooltip text
   * @returns color or text based on mode
   */
  function getButtonInfo(mode: number) {
    switch (checkTeam()) {
      case 0:
        if (mode == 0) return "green";
        if (mode == 2) return "Add " + PokemonData.name + " to your team";
        return "Add to team";
      case 1:
        if (mode == 0) return "red";
        if (mode == 2) return "Remove " + PokemonData.name + " from your team";
        return "Remove from team";
      case 2:
        if (mode == 0) return "grey";
        if (mode == 2) return "Cannot add more Pokemon to your team";
        return "Team is full";
      default:
        break;
    }
  }

  return (
    <>
      <Typography
        sx={{ marginTop: "15px", marginBottom: "15px" }}
        variant="h3"
        textAlign={"center"}
        data-testid="pokemon-name"
      >
        {PokemonData.name} - #{PokemonData._id}
      </Typography>
      <Divider color="white" />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "3vh",
            marginBottom: "3vh",
          }}
        >
          <Tooltip title="Go back to previous page" arrow>
            <Button
              sx={{
                marginRight: "10px",
                "&:hover": {
                  cursor: "alias",
                },
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNewIcon />
            </Button>
          </Tooltip>
          <Tooltip title={getButtonInfo(2)} arrow>
            <Button
              data-testid="add_to_team_button"
              variant="outlined"
              sx={{
                color: getButtonInfo(0),
              }}
              onClick={() => handleOnClick()}
            >
              {getButtonInfo(1)}
            </Button>
          </Tooltip>
        </Box>
        <PokemonStats pokemon={PokemonData} />
      </Box>
      <PokemonRatingReview _id={PokemonData._id} />
    </>
  );
}
