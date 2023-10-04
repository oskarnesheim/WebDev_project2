import { useNavigate } from "react-router-dom";
import { IPokemon } from "../interfaces/pokemon";
import { useEffect } from "react";
import {
  Box,
  CssBaseline,
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

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!pokemon) navigate("..");
  });

  function createData(stat: string, value: number) {
    return { stat, value };
  }

  const rows = [
    createData("Height", pokemon.height),
    createData("Weight", pokemon.weight),
    createData("HP", pokemon.stats[0].base_stat),
    createData("Attack", pokemon.stats[1].base_stat),
    createData("Defense", pokemon.stats[2].base_stat),
    createData("Special Attack", pokemon.stats[3].base_stat),
    createData("Special Defense", pokemon.stats[4].base_stat),
    createData("Speed", pokemon.stats[5].base_stat),
  ];

  return (
    <>
      <CssBaseline />
      <Box alignContent={"center"} color={"blue"}>
        <TableContainer>
          <Typography variant="h5">Stats for {pokemon.name}</Typography>
          <Table sx={{ maxWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Stat</TableCell>
                <TableCell align="left">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.stat}>
                  <TableCell align="right">{row.stat}</TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
