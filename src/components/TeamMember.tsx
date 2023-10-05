import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";
import { Card, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type PokemonCardProps = {
  name: string;
};

export default function PokemonCard({ name }: PokemonCardProps) {
  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [name, "_pokemon"],
    () => {
      const res = fetch(`pokemon_data/${name}.json/`)
        .then((res) => res.json())
        .then((res) => res as IPokemon);
      return res;
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={"/public/mockSpriteIcon.png"}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {data.weight}
          Height: {data.height}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
