import { Outlet, useParams } from "react-router-dom";
import PokemonAbilities from "./PokemonAbilities";
import PokemonStats from "./PokemonStats";
import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { Box, Button, Link, Typography } from "@mui/material";

enum PokemonTabs {
  STATS = "stats",
  ABILITIES = "abilities",
}

export default function Pokemon() {
  const { id } = useParams();
  const [tab, setTab] = useState<PokemonTabs>(PokemonTabs.STATS);

  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [id, "_pokemon"],
    () => {
      // const res = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      const res = fetch(`pokemon_data/${id}.json/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);
      return res;
    }
  );

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
      <Typography variant="h3" textAlign={"center"}>
        {data.name} - #{data.id}
      </Typography>

      <Box
        sx={{
          dispaly: "flex",
          justifyContent: "center",
          alignItem: "center",
          border: "1px solid black",
        }}
      >
        <Link href="/">Go back</Link>
        <Button onClick={() => setTab(PokemonTabs.STATS)}>Stats</Button>
        <Button onClick={() => setTab(PokemonTabs.ABILITIES)}>Abilities</Button>
        {tab === PokemonTabs.STATS && <PokemonStats pokemon={data} />}
        {tab === PokemonTabs.ABILITIES && <PokemonAbilities pokemon={data} />}
      </Box>
      <Outlet />
    </>
  );
}
