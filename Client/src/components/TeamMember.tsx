import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";

interface IPokemon {
  name: string;
  sprites: {
    versions: {
      ["generation-viii"]: {
        icons: {
          front_default: string;
        };
      };
    };
  };
}

interface PokemonCardProps {
  name: string;
  selected: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, selected }) => {
  const { data, error, isLoading } = useQuery<IPokemon, Error>(
    [name, "_pokemon"],
    async () => {
      const response = await fetch(`pokemon_data/${name}.json/`);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json() as Promise<IPokemon>;
    },
  );

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
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
          {/* Left side: Image */}
          <Box sx={{ marginRight: "10px", alignItems: "center" }}>
            <img
              style={imageStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
};

export default PokemonCard;
