import { Outlet, useNavigate, useParams } from "react-router-dom";
import PokemonStats from "./PokemonStats";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import PokemonRatingReview from "./PokemonReviews";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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
  const [team, setWindowTeam] = useState<string>("");
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);
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
        console.log("Loader team fra localstore: " + team);
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

  function checkTeam(name: string): boolean {
    if (getTeam() === "error") {
      return true;
    }
    const team = getTeam();
    if (team !== "") {
      const listTeam = team.split(",");
      if (listTeam.includes(name)) {
        return true;
      }
    }
    return false;
  }

  function addToTeam(_id: string) {
    if (!verifyTeam(_id)) {
      return;
    }
    if (team === "") {
      setTeamState(_id);
    } else {
      setTeamState(team + "," + _id);
    }
  }

  function setTeamState(newTeam: string) {
    localStorage.setItem("team", JSON.stringify(newTeam));
    setWindowTeam(newTeam);
  }

  function verifyTeam(name: string) {
    if (team === "") {
      return true;
    }
    const listTeam = team.split(",");
    if (listTeam.includes(name)) {
      alert("You already have this pokemon in your team");
      return false;
    }
    if (listTeam.length >= 6) {
      alert("Your team is full");
      return false;
    }

    return true;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  function removeFromTeam(name: string) {
    const listTeam = team.split(",");
    const index = listTeam.indexOf(name);
    if (index > -1) {
      listTeam.splice(index, 1);
    }
    setTeamState(listTeam.join(","));
  }

  return (
    <>
      <Typography sx={{ marginTop: "5vh" }} variant="h3" textAlign={"center"}>
        {data.pokemon.name} - #{data.pokemon.base_experience}
      </Typography>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0em 12em 0em 12em",
          }}
        >
          {/* <Button
            disabled={checkTeam(data.pokemon.name)}
            onClick={() => addToTeam(data.pokemon.name)}
            style={{
              // justifyContent: "space-evenly",
              // border: "1px solid #E0F1FF",
              alignItems: "center",
              marginTop: "3vh",
              marginBottom: "3vh",
              marginLeft: "10vw",
              marginRight: "10vw",
            }}
          >
            {checkTeam(data.pokemon.name) ? "Already in team" : "Add to team"}
          </Button> */}
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
              checkTeam(data.pokemon.name)
                ? "Pokemon is already in your team, do you want to remove " +
                  data.pokemon.name +
                  " from your team?"
                : "Add " + data.pokemon.name + " to your team"
            }
            arrow
          >
            <Button
              variant="outlined"
              sx={{ color: checkTeam(data.pokemon.name) ? "red" : "green" }}
              onClick={() =>
                checkTeam(data.pokemon._id.toString())
                  ? removeFromTeam(data.pokemon._id.toString())
                  : addToTeam(data.pokemon._id.toString())
              }
            >
              {checkTeam(data.pokemon._id.toString())
                ? "Remove from team"
                : "Add to team"}
            </Button>
          </Tooltip>
        </Box>
        <PokemonStats pokemon={data.pokemon} />
      </Box>
      <PokemonRatingReview pokemonId={data.pokemon._id.toString()} />
      <Outlet />
    </>
  );
}
