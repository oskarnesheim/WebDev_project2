import { useState } from "react";
import "./MyTeam.css";
import TeamMember from "./TeamMember";
import DisplayPokemon from "./DisplayPokemon";
import { useRecoilState } from "recoil";
import { recoilMyTeam } from "../recoil/atoms";
import { Box } from "@mui/material";

export default function MyTeam() {
  const [team] = useRecoilState<string[]>(recoilMyTeam);
  const [selectedPokemon, setSelectedPokemon] = useState<[string, number]>([
    "0",
    0,
  ]); // [pokemon_ID,index]

  function checkselected(id: string): boolean {
    if (selectedPokemon[0] === id) {
      return true;
    }
    return false;
  }

  function setSelectedPokemonFunc(id: string, index: number) {
    setSelectedPokemon([id, index]);
    if (window.innerWidth < 1200) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function teamlist() {
    if (team.length === 0) return <p>Team is currently empty </p>;
    return team.map((_id: string, count: number) => (
      <div
        onClick={() => setSelectedPokemonFunc(_id, count)}
        className="team-grid-child"
        key={count}
      >
        <TeamMember selected={checkselected(_id)} _id={Number(_id)} />
      </div>
    ));
  }

  return (
    <div className="my-team">
      <Box
        sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <h1>My Pokémon Team: </h1>
        <div className="team-grid">{teamlist()}</div>
        <h2>{team.length}/6</h2>
      </Box>
      <DisplayPokemon
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
}
