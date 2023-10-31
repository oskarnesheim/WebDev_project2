import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { useQuery, gql } from "@apollo/client";

type PokemonCardProps = {
  _id: number;
};

function findSinglePokemon() {
  const q = gql`
    query query($_id: Int!) {
      pokemon(_id: $_id) {
        _id
        name
        height
        base_experience
        weight
        stats {
          stat {
            name
          }
          base_stat
        }
        abilities {
          ability {
            name
          }
        }
        types {
          type {
            name
          }
        }
        sprites {
          front_default
        }
      }
    }
  `;
  return q;
}

export default function PokemonCard({ _id }: PokemonCardProps) {
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
  const variables = {
    _id: _id,
  };
  const { loading, error, data } = useQuery(findSinglePokemon(), { variables });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function getBackgroundColor(): string[] {
    if (!data) return ["grey"];
    const colors: string[] = [];

    const types = data.pokemon.types.map(
      (type: { type: { name: string } }) => type.type.name,
    );
    for (let i = 0; i < filters.length; i++) {
      if (types.includes(filters[i][0].toLowerCase())) {
        colors.push(filters[i][1]);
      }
    }
    return colors;
  }

  return (
    <Card
      onClick={() => navigate(_id.toString())}
      className="pokemon-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={data.pokemon._id}
      sx={{
        width: "100%",
        textAlign: "center",
        "&:hover": {
          cursor: "pointer",
          boxShadow: `0 0 10vw 0px ${getBackgroundColor()[0]}`,
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
        src={data.pokemon.sprites.front_default}
        alt="Cool picture of a Pokémon"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.pokemon.name}
        </Typography>
        <Typography variant="body2">
          {data.pokemon.types
            .map((type: { type: { name: string } }) => type.type.name)
            .join(", ")}
        </Typography>
        <Typography variant="body2">
          <hr />
          {data.pokemon.weight} kg &nbsp; {data.pokemon.base_experience}XP
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn more</Button>
      </CardActions> */}
    </Card>
  );
}
