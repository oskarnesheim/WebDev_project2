import { Outlet, useNavigate, useParams } from "react-router-dom";
import PokemonStats from "./PokemonStats";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Typography } from "@mui/material";
import PokemonRatingReview from "./PokemonReviews";

function findSinglePokemon(_id: number) {
  const q = gql`
    query query {
      pokemon(_id: ${_id}) {
        _id
        name
        height
        weight
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
  const { loading, error, data } = useQuery(findSinglePokemon(parseInt(_id!)));

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

  function addToTeam(name: string) {
    if (!verifyTeam(name)) {
      return;
    }
    if (team === "") {
      setTeamState(name);
    } else {
      setTeamState(team + "," + name);
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

  return (
    <>
      <Typography variant="h3" textAlign={"center"}>
        {data.pokemon.name} - #{data.pokemon._id}
      </Typography>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0em 12em 0em 12em",
          }}
        >
          <Button onClick={() => navigate(-1)}>Go back</Button>
          <Button
            disabled={checkTeam(data.pokemon.name)}
            onClick={() => addToTeam(data.pokemon.name)}
          >
            {checkTeam(data.pokemon.name) ? "Already in team" : "Add to team"}
          </Button>
        </Box>
        <PokemonStats pokemon={data.pokemon} />
      </Box>
      <PokemonRatingReview pokemonId={data.pokemon._id.toString()} />
      <Outlet />
    </>
  );
}
