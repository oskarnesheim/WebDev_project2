import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import pokeBall from "../../assets/Pokeball.png";

export default function About() {
  const styles = {
    about: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: {
        xs: "90vw",
        sm: "80vw",
        md: "60vw",
      },
      margin: "auto",
      marginTop: "5vh",
      color: "primary.main",
      textAlign: "center",
    },
    paragraph: {
      marginTop: "5vh",
    },
    paragraphAlingment: {
      textAlign: {
        xs: "left",
        sm: "center",
      },
    },
  };

  return (
    <Box sx={styles.about}>
      <Typography variant="h2">About</Typography>
      <Typography sx={styles.paragraphAlingment}>
        Discover our Pokedex, a handy tool for Pokemon enthusiasts featuring
        information on 300 Pokemons from the first and second generations. Dive
        into a world of statistics, where you can delve into details like
        height, weight, type, and more for each Pokemon. Share your own unique
        insights and reviews about these creatures with fellow users. But that's
        not all - you can also curate your dream team of six Pokemons to keep
        them close, offering you a fun and engaging way to stay connected with
        your favorite companions.
      </Typography>

      <Typography variant="h4" sx={styles.paragraph}>
        Search
        <Typography sx={styles.paragraphAlingment}>
          You can search for a pokemon by its name or you can filter pokemons
          based on different types (water, fire, grass etc.). Additionally you
          can sort pokemons by their name, height, weight, and base experience,
          in both ascending and descending order. The results will show you the
          first 20 pokemons that match your search criteria, with the option to
          go to the next page to see 20 more pokemons.
        </Typography>
      </Typography>

      <Typography variant="h4" sx={styles.paragraph}>
        My Team
        <Divider />
        <Typography sx={styles.paragraphAlingment}>
          You have the ability to put together your own team of Pokémon. You can
          add up to 6 Pokémon to your team before it's full. You also have the
          ability to remove Pokémon from your team if you suddenly change your
          mind. And no, you cannot have 6 Charizards.
        </Typography>
      </Typography>

      <Typography
        variant="h4"
        sx={{ marginTop: "5vh", color: "primary.light" }}
      >
        Gotta Catch 'Em All!
      </Typography>
      <img src={pokeBall} id="pokeball" alt="pokeball" />
    </Box>
  );
}
