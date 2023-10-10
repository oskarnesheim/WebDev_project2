import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";
import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, createTheme } from "@mui/material";

type PokemonCardProps = {
  name: string;
  selected: boolean;
};

const customFontStyle = {
  fontFamily: "pokemonfont", // Use the font-family name you defined
};

export default function PokemonCard({ name, selected }: PokemonCardProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0B4C8D", // blue
        light: "#ffffff", // white
        dark: "#0E98F8", // light blue
      },
      secondary: {
        main: "#FFCB05", // yellow
        light: "#ffffff", // white
        dark: "#FFCB05", // yellow
      },
    },
  });

  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [name, "_pokemon"],
    () => {
      const res = fetch(`pokemon_data/${name}.json/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);
      return res;
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        border: selected ? "1px solid #E0F1FF" : "none",
        backgroundColor: theme.palette.primary.main,
        opacity: selected ? 0.9 : 0.6,
        transition: selected
          ? "opacity 0.3s ease-in-out, border 0.3s ease-in-out"
          : "none",
        "&:hover": {
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left side: Image */}
          <Box sx={{ marginRight: "10px", alignItems: "center" }}>
            <img
              src={data.sprites.versions["generation-viii"].icons.front_default}
              alt={name}
            />
          </Box>

          {/* Right side: Text */}
          <Typography
            variant="body1"
            sx={{ color: theme.palette.primary.light }}
            style={customFontStyle}
          >
            {data.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
