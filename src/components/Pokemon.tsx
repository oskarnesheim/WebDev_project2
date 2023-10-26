import { Outlet, useNavigate, useParams } from "react-router-dom";
import PokemonAbilities from "./PokemonAbilities";
import PokemonStats from "./PokemonStats";
import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import PokemonRatingReview from "./PokemonReviews";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

enum PokemonTabs {
  STATS = "stats",
  ABILITIES = "abilities",
}

export default function Pokemon() {
  const { id } = useParams();
  const [tab, setTab] = useState<PokemonTabs>(PokemonTabs.STATS);
  const [team, setWindowTeam] = useState<string>("");
  const [teamIsLoaded, setTeamIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [id, "_pokemon"],
    () => {
      const res = fetch(`pokemon_data/${id}.json/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);

      return res;
    },
  );

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

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Typography sx={{ marginTop: "5vh" }} variant="h3" textAlign={"center"}>
        {data.name} - #{data.id}
      </Typography>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            // border: "1px solid #E0F1FF",
            alignItems: "center",
            marginTop: "3vh",
            marginBottom: "3vh",
            marginLeft: "10vw",
            marginRight: "10vw",
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
          <Button variant="outlined" onClick={() => setTab(PokemonTabs.STATS)}>
            Stats
          </Button>
          <Tooltip
            title={
              checkTeam(data.name)
                ? "Pokemon is already in your team, do you want to remove " +
                  data.name +
                  " from your team?"
                : "Add " + data.name + " to your team"
            }
            arrow
          >
            <Button
              variant="outlined"
              sx={{ color: checkTeam(data.name) ? "red" : "green" }}
              onClick={() => addToTeam(data.name)}
            >
              {checkTeam(data.name) ? "Remove from team" : "Add to team"}
            </Button>
          </Tooltip>
        </Box>
        {tab === PokemonTabs.STATS && <PokemonStats pokemon={data} />}
        {tab === PokemonTabs.ABILITIES && <PokemonAbilities pokemon={data} />}
      </Box>
      <PokemonRatingReview pokemonId={data.id.toString()} />
      <Outlet />
    </>
  );
}
