import { useNavigate } from "react-router-dom";
import { PokemonPageI } from "../../interfaces/pokemon";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
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
import theme from "../../Theme";

type PokemonStatsProps = {
  pokemon: PokemonPageI;
};

// Design from https://www.serebii.net/xy/alakastat.jpg
const LIGHTBLUEGRADIENT =
  "linear-gradient(to left, " +
  theme.palette.primary.main +
  ", " +
  theme.palette.primary.light +
  ")";
const BLUE = theme.palette.primary.main;
const DARKBLUEGRADIENT =
  "linear-gradient(to right," +
  theme.palette.primary.dark +
  ", " +
  theme.palette.primary.main +
  ")";
const BLUEGRADIENTCIRCLE =
  "radial-gradient(circle, " +
  theme.palette.primary.light +
  "," +
  theme.palette.primary.main +
  " 69%)";

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!pokemon) navigate("..");
  });

  function createData(stat: string, value: number, color: string) {
    return { stat, value, color };
  }

  const rows = [
    createData("Height", pokemon.height, LIGHTBLUEGRADIENT),
    createData("Weight", pokemon.weight, BLUE),
    createData("HP", pokemon.stats[0].base_stat, LIGHTBLUEGRADIENT),
    createData("Attack", pokemon.stats[1].base_stat, BLUE),
    createData("Defense", pokemon.stats[2].base_stat, LIGHTBLUEGRADIENT),
    createData("Special Attack", pokemon.stats[3].base_stat, BLUE),
    createData(
      "Special Defense",
      pokemon.stats[4].base_stat,
      LIGHTBLUEGRADIENT,
    ),
    createData("Speed", pokemon.stats[5].base_stat, BLUE),
  ];

  const screenLargerThan830px = useMediaQuery("(min-width: 830px)");

  const screenSmallerThan550px = useMediaQuery("(max-width: 550px)");

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
          <Box
            sx={{
              background: DARKBLUEGRADIENT,
              maxWidth: 800,
            }}
          >
            <Typography
              variant="h5"
              textAlign={screenSmallerThan550px ? "center" : "left"}
              padding={"0.5em 0em 0em 1em"}
              data-testid="pokemon-stats-title"
            >
              Stats for {pokemon.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ minWidth: 250 }}>
              <Table sx={{ alignItems: "center" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ border: 0, color: "white", paddingTop: "1.5em" }}
                    >
                      Stat
                    </TableCell>
                    <TableCell
                      align={screenSmallerThan550px ? "right" : "left"}
                      sx={{ border: 0, color: "white", paddingTop: "1.5em" }}
                    >
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.stat} sx={{ background: row.color }}>
                      <TableCell
                        align="left"
                        sx={{ border: 0, color: "white" }}
                      >
                        {row.stat}
                      </TableCell>
                      <TableCell
                        align={screenSmallerThan550px ? "right" : "left"}
                        sx={{ border: 0, color: "white" }}
                      >
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box
              sx={{
                minWidth: screenLargerThan830px ? 450 : "50%",
                background: screenLargerThan830px ? BLUEGRADIENTCIRCLE : null,
                margin: 0,
                display: screenSmallerThan550px ? "none" : "flex", //Wont show picture on mobile
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: screenLargerThan830px ? 450 : "50%",
                }}
                component={"img"}
                data-testid="pokemon-stats-image"
                alt={"Picture of " + pokemon.name}
                src={pokemon.sprites.front_default}
              ></Box>
            </Box>
          </Box>
          <Box
            // Shows picture on mobile
            sx={{
              display: screenSmallerThan550px ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                height: 150,
              }}
              component={"img"}
              alt={"Picture of " + pokemon.name}
              src={pokemon.sprites.front_default}
            ></Box>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}
