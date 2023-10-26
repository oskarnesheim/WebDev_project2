import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";

type PokemonCardProps = {
  name: string;
  selected: boolean;
};

export default function PokemonCard({ name, selected }: PokemonCardProps) {
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
        boxSizing: "border-box",
        border: selected ? "1px solid #E0F1FF" : "none",
        backgroundColor: "primary.dark",
        opacity: selected ? 0.9 : 0.6,
        transition: selected
          ? "opacity 0.3s ease-in-out, border 0.3s ease-in-out"
          : "none",
        "&:hover": {
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: "primary.main",
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
          <Typography variant="body1" sx={{ color: "primary.light" }}>
            {data.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
