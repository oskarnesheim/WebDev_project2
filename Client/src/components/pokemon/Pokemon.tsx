import { Outlet, useNavigate, useParams } from "react-router-dom";
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

export default function Pokemon() {
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

  const PokemonData: PokemonPageI = data.pokemon;

  const checkTeam = (): number => {
    const id = PokemonData._id.toString();
    if (team.includes(id)) return 1;
    if (team.length == 6) return 2;
    return 0;
  };

  function handleOnClick() {
    switch (checkTeam()) {
      case 0:
        setTeam([...team, PokemonData._id.toString()]);
        break;
      case 1:
        setTeam(team.filter((teamId) => teamId !== PokemonData._id.toString()));
        break;
      case 2:
        console.log("Your team is full");
        break;
      default:
        break;
    }
  }

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
        sx={{ marginTop: "5vh", marginBottom: "3vh" }}
        variant="h3"
        textAlign={"center"}
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
      <Outlet />
    </>
  );
}
