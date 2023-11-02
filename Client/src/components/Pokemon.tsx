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

  function getTeam() {
    if (teamIsLoaded) {
      return team;
    }
    const teamJSON = localStorage.getItem("team");
    if (teamJSON) {
      try {
        const team = JSON.parse(teamJSON);
        setTeamState(team);
        setTeamIsLoaded(true);
        return team;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return "error"; // Handle the error appropriately
      }
    } else {
      return ""; // Handle the case when "team" is not found in localStorage
    }
  }

  function checkTeam(_id: number): boolean {
    if (getTeam() === "error") {
      return true;
    }
    const team = getTeam();
    if (team !== "") {
      const listTeam = team.split(",");
      if (listTeam.includes(_id.toString())) {
        return true;
      }
    }
    return false;
  }

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function removeFromTeam(name: string) {
    const listTeam = team.split(",");
    const index = listTeam.indexOf(name);
    if (index > -1) {
      listTeam.splice(index, 1);
    }
    setTeamState(listTeam.join(","));
  }

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
              sx={{ color: checkTeam(data.pokemon._id) ? "red" : "green" }}
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
