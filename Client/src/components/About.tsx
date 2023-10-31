import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "50vw",
        margin: "auto",
        marginTop: "5vh",
      }}
    >
      <Typography variant="h1">About</Typography>
      <Typography variant="body1">
        This is a Pokedex where you can search for your favorite Pokemon and add
        them to your team.
      </Typography>

      <Typography variant="body1">Hope you like it and have fun!</Typography>
    </Box>
  );
}
