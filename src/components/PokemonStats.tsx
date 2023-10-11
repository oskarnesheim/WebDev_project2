import { useNavigate } from "react-router-dom";
import { IPokemon } from "../interfaces/pokemon";
import { useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type PokemonStatsProps = {
  pokemon: IPokemon;
};

// Design from https://www.serebii.net/xy/alakastat.jpg
// const LIGHTBLUE = "#5cd5ed";
const LIGHTBLUE = "linear-gradient(to left, #257189,  #5cd5ed)";
const BLUE = "#257189";
const DARKBLUE = "linear-gradient(to left, #257189,  #1e4c62)";
const BACKGROUNDBLUE = "radial-gradient(circle, #5cd5ed 0%,  #257189 69%)";

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!pokemon) navigate("..");
  });

  function createData(stat: string, value: number, color: string) {
    return { stat, value, color };
  }

  const rows = [
    createData("Height", pokemon.height, LIGHTBLUE),
    createData("Weight", pokemon.weight, BLUE),
    createData("HP", pokemon.stats[0].base_stat, LIGHTBLUE),
    createData("Attack", pokemon.stats[1].base_stat, BLUE),
    createData("Defense", pokemon.stats[2].base_stat, LIGHTBLUE),
    createData("Special Attack", pokemon.stats[3].base_stat, BLUE),
    createData("Special Defense", pokemon.stats[4].base_stat, LIGHTBLUE),
    createData("Speed", pokemon.stats[5].base_stat, BLUE),
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          padding: 0,
        }}
      >
        <TableContainer
          sx={{
            maxWidth: 800,
            background: BLUE,
            paddingTop: "1em",
          }}
        >
          <Box sx={{ background: DARKBLUE, maxWidth: 450 }}>
            <Typography variant="h5" textAlign={"left"} paddingLeft={"1em"}>
              Stats for {pokemon.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ minWidth: 250 }}>
              <Table sx={{ alignItems: "center" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ border: 0 }}>
                      Stat
                    </TableCell>
                    <TableCell align="left" sx={{ border: 0 }}>
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.stat} sx={{ background: row.color }}>
                      <TableCell align="left" sx={{ border: 0 }}>
                        {row.stat}
                      </TableCell>
                      <TableCell align="left" sx={{ border: 0 }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box
              sx={{
                minWidth: 550,
                background: BACKGROUNDBLUE,
                margin: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: 450,
                  width: 450,
                }}
                component={"img"}
                alt={"Picture of " + pokemon.name}
                src={pokemon.sprites.front_default}
              ></Box>
            </Box>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}
