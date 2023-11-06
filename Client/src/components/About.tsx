import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import pokeBall from "../assets/Pokeball.png";

export default function About() {
  const styles = {
    about: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "50vw",
      margin: "auto",
      marginTop: "5vh",
      color: "primary.main",
      textAlign: "center",
    },
    paragraph: {
      marginTop: "5vh",
    },
  };

  return (
    <Box sx={styles.about}>
      <Typography variant="h1">About</Typography>
      <Typography variant="body1">
        This is a Pokedex where you can keep track of stats on 200 pokemon, and
        add your favorite Pokemon to your team.
      </Typography>

      <Typography variant="h3" sx={styles.paragraph}>
        Search
        <Typography variant="body1">
          You can search for a pokemon by its name or you can find pokemon using
          filter or sort.
        </Typography>
      </Typography>

      <Typography variant="h3" sx={styles.paragraph}>
        My Team
        <Divider />
        <Typography>
          You can only keep 6 pokémon in your team, but you can always remove
          pokemon and add new ones. And no, you cannot have 6 Charizards.
        </Typography>
      </Typography>

      <Typography variant="body1" sx={styles.paragraph}>
        Gonna catch them all!
      </Typography>
      <img
        src={pokeBall}
        alt="pokeball"
        style={{
          objectFit: "cover",
          marginTop: "5vh",
          width: "50vw",
          height: "15vw",
        }}
      />
    </Box>
  );
}
