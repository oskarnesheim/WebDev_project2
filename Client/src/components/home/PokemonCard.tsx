import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { PokemonCardI } from "../../interfaces/pokemon";
import { useEffect, useRef } from "react";

type PokemonCardProps = {
  PokemonData: PokemonCardI;
};
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

export default function PokemonCard({ PokemonData }: PokemonCardProps) {
  const navigate = useNavigate();

  function getBackgroundColor(): string[] {
    if (!PokemonData) return ["grey"];
    const colors: string[] = [];

    const types = PokemonData.types.map(
      (type: { type: { name: string } }) => type.type.name,
    );
    for (let i = 0; i < filters.length; i++) {
      if (types.includes(filters[i][0].toLowerCase())) {
        colors.push(filters[i][1]);
      }
    }
    return colors;
  }

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      const handleFocus = () => {
        const speechSynthesis = window.speechSynthesis;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${PokemonData.name}`);
        utterance.volume = 0.5;
        speechSynthesis.speak(utterance);
      };

      const handleEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          const speechSynthesis = window.speechSynthesis;
          speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(
            `${PokemonData.name} selected`,
          );
          utterance.volume = 0.5;
          speechSynthesis.speak(utterance);
        }
      };

      card.addEventListener("focus", handleFocus);
      card.addEventListener("keydown", handleEnter);

      return () => {
        card.removeEventListener("focus", handleFocus);
        card.removeEventListener("keydown", handleEnter);
      };
    }
  }, [PokemonData.name]);

  return (
    <Card
      ref={cardRef}
      tabIndex={0}
      onClick={() => {
        navigate("/" + PokemonData._id.toString());
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate("/" + PokemonData._id.toString());
        }
      }}
      className="pokemon-card"
      data-testid={PokemonData._id}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={PokemonData._id}
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
        src={PokemonData.sprites.front_default}
        alt="Cool picture of a Pokémon"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {PokemonData.name}
        </Typography>
        <Typography variant="body2">
          {PokemonData.types
            .map((type: { type: { name: string } }) => type.type.name)
            .join(", ")}
        </Typography>
        <hr />
        <Typography variant="body2">
          {PokemonData.weight} kg &nbsp; {PokemonData.base_experience}XP
        </Typography>
      </CardContent>
    </Card>
  );
}
