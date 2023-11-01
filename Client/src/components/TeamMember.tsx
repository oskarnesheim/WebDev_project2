import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";

interface PokemonCardProps {
  _id: number;
  selected: boolean;
}
function findSinglePokemon() {
  const q = gql`
    query query($_id: Int!) {
      pokemon(_id: $_id) {
        _id
        name
        sprites {
          front_default
        }
      }
    }
  `;
  return q;
}

export default function TeamMember({ _id, selected }: PokemonCardProps) {
  const variables = {
    _id: _id,
  };

  const { loading, error, data } = useQuery(findSinglePokemon(), { variables });

  const [position, setPosition] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isHovered) {
      intervalId = window.setInterval(() => {
        setPosition((pos) => (pos === 0 ? -10 : 0));
      }, 200);
    }
    return () => clearInterval(intervalId);
  }, [isHovered]);

  const imageStyle = {
    transform: `translateY(${position}px)`,
    transition: "transform 0.2s ease-in-out",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(variables);
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
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
      <CardContent
        sx={{
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ marginRight: "10px", alignItems: "center" }}>
            <img
              style={imageStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              src={data.pokemon.sprites.front_default}
              alt={data.pokemon.name}
            />
          </Box>
          <Typography variant="body1" sx={{ color: "primary.light" }}>
            {data.pokemon.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
