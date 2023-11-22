import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
interface PokemonCardProps {
  _id: number;
  selected: boolean;
  count: number;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
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

/**
 * Function that returns a card with the Pokemon's name and image, used in MyTeam.tsx
 * @param _id - Pokemon ID
 * @param selected - boolean to check if the Pokemon is selected
 * @returns Mui Card with Pokemon's name and image
 */
export default function TeamMember({
  _id,
  selected,
  count,
  setSelectedPokemon,
}: PokemonCardProps) {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  /**
   *  Function that sets the selectedPokemon state to the index of the Pokemon in the team
   * @param index - index of the Pokemon in the team
   */
  function setSelectedPokemonFunc(index: number) {
    setSelectedPokemon(index);
    if (window.innerWidth < 1200) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  return (
    <Card
      tabIndex={0}
      onClick={() => setSelectedPokemonFunc(count)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setSelectedPokemonFunc(count);
        }
      }}
      key={count}
      aria-label={data.pokemon.name}
      variant="outlined"
      sx={{
        width: "300px",
        backgroundColor: selected ? "primary.main" : "primary.dark",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: "10px",
            alignItems: "center",
          }}
        >
          <img
            style={{
              transform: `translateY(${position}px)`,
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={data.pokemon.sprites.front_default}
            alt={data.pokemon.name}
          />
          <Typography variant="body1" sx={{ color: "primary.light" }}>
            {data.pokemon.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
