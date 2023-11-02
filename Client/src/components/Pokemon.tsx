import { Outlet, useNavigate, useParams } from "react-router-dom";
import PokemonStats from "./PokemonStats";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import PokemonRatingReview from "./PokemonReviews";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  getTeamFromLocalStorage,
  checkTeam,
  addToTeam,
  removeFromTeam,
} from "./TeamFunctions";
import { useEffect } from "react";

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

  const [team, setTeam] = useState<string[]>(getTeamFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = () => {
      setTeam(getTeamFromLocalStorage());
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
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
          <Tooltip
            title={
              checkTeam(team, data.pokemon._id.toString())
                ? "Pokemon is already in your team, do you want to remove " +
                  data.pokemon.name +
                  " from your team?"
                : "Add " + data.pokemon.name + " to your team"
            }
            arrow
          >
            <Button
              variant="outlined"
              sx={{
                color: checkTeam(team, data.pokemon._id.toString())
                  ? "red"
                  : "green",
              }}
              onClick={() =>
                checkTeam(team, data.pokemon._id.toString())
                  ? removeFromTeam(team, data.pokemon._id.toString(), setTeam)
                  : addToTeam(team, data.pokemon._id.toString(), setTeam)
              }
            >
              {checkTeam(team, data.pokemon._id.toString())
                ? "Remove from team"
                : "Add to team"}
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
