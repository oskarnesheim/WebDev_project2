import { Outlet, useNavigate, useParams } from "react-router-dom";
import PokemonStats from "./PokemonStats";
import { useQuery, gql } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import PokemonRatingReview from "./PokemonReviews";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { checkTeam, addToTeam, removeFromTeam } from "./TeamFunctions";
import { recoilMyTeam } from "../recoil/atoms";
import { useRecoilState } from "recoil";

function findSinglePokemon() {
  const q = gql`
    query query($_id: Int!) {
      pokemon(_id: $_id) {
        _id
        name
        height
        weight
        base_experience
        stats {
          stat {
            name
          }
          base_stat
        }
        abilities {
          ability {
            name
          }
        }
        sprites {
          front_default
        }
      }
    }
  `;
  return q;
}

export default function Pokemon() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const variables = {
    _id: parseInt(_id!),
  };
  const { loading, error, data } = useQuery(findSinglePokemon(), { variables });

  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  function handleOnClick() {
    switch (checkTeam(team, data.pokemon._id.toString())) {
      case 0:
        addToTeam(team, data.pokemon._id.toString(), setTeam);
        break;
      case 1:
        removeFromTeam(team, data.pokemon._id.toString(), setTeam);
        break;
      case 2:
        console.log("Your team is full");
        break;
      default:
        break;
    }
  }

  function getButtonInfo(mode: number) {
    switch (checkTeam(team, data.pokemon._id.toString())) {
      case 0:
        if (mode == 0) return "green";
        if (mode == 2) return "Add " + data.pokemon.name + " to your team";
        return "Add to team";
      case 1:
        if (mode == 0) return "red";
        if (mode == 2) return "Remove " + data.pokemon.name + " from your team";
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
        {data.pokemon.name} - #{data.pokemon._id}
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
        <PokemonStats pokemon={data.pokemon} />
      </Box>
      <PokemonRatingReview _id={data.pokemon._id} />
      <Outlet />
    </>
  );
}
