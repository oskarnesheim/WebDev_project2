import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IPokemon } from "../interfaces/pokemon";

type PokemonCardProps = {
  name: string;
};

export default function PokemonCard({ name }: PokemonCardProps) {
  const filters = [
    ["Fire", "red"],
    ["Water", "blue"],
    ["Grass", "green"],
    ["Electric", "yellow"],
    ["Normal", "grey"],
    ["Fighting", "brown"],
    ["poison", "purple"],
    ["Ground", "brown"],
    ["Flying", "skyblue"],
    ["Psychic", "pink"],
    ["Bug", "green"],
    ["Rock", "brown"],
    ["Ghost", "purple"],
    ["Dark", "black"],
    ["Dragon", "purple"],
    ["Steel", "grey"],
    ["Fairy", "pink"],
  ];
  const navigate = useNavigate();

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

  function getBackgroundColor(): string[] {
    if (!data) return ["grey"];
    const colors: string[] = [];

    const types = data.types.map((type) => type.type.name);
    for (let i = 0; i < filters.length; i++) {
      if (types.includes(filters[i][0].toLowerCase())) {
        colors.push(filters[i][1]);
      }
    }
    return colors;
  }

  return (
    <Card
      onClick={() => navigate(name)}
      className="pokemon-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={data.id}
      sx={{
        width: "100%",
        textAlign: "center",
        "&:hover": {
          cursor: "pointer",
          boxShadow: `0 0 3vw 0px ${getBackgroundColor()[0]}`,
        },
      }}
    >
      <CardContent
        style={{
          background: `${
            getBackgroundColor().length > 1
              ? `linear-gradient(90deg, ${getBackgroundColor()[0]} 40%, ${
                  getBackgroundColor()[1]
                } 60%)`
              : getBackgroundColor()[0]
          }`,
          width: "100%",
        }}
      />
      <img
        style={{ height: "1%" }}
        src={data.sprites.front_default}
        alt="Cool picture of a Pokémon"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">
          {data.types.map((type) => type.type.name).join(", ")}
        </Typography>
        <Typography variant="body2">
          {data.weight} kg &nbsp; {data.base_experience}XP
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn more</Button>
      </CardActions> */}
    </Card>
  );
}
