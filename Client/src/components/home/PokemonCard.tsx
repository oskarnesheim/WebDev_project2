import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { PokemonCardI } from "../../interfaces/pokemon";
import { useRef } from "react";

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

/**
 * Function that returns the PokemonCard component.
 * Contains:
 * - Pokemon sprite (picture)
 * - Pokemon name
 * - Pokemon types
 * - Pokemon weight
 * - Pokemon base experience
 * @param PokemonData PokemonCardI
 * @returns PokemonCard component
 */
export default function PokemonCard({
  PokemonData,
}: PokemonCardProps): JSX.Element {
  const navigate = useNavigate();

  /**
   * Function that returns the colors used to indicate the pokemon types
   * Used in:
   * - CardContent
   * - Card (shadow on hover)
   * @returns Array of colors based on the pokemon types
   */
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

  /**
   * Reference to the card element
   */
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      ref={cardRef}
      tabIndex={0}
      aria-label={PokemonData.name}
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
        sx={{
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
        alt={"Picture of " + PokemonData.name}
        data-testid={PokemonData._id + "_picture"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {PokemonData.name}
        </Typography>
        <Typography variant="body2" data-testid={PokemonData._id + "_types"}>
          {PokemonData.types
            .map((type: { type: { name: string } }) => type.type.name)
            .join(", ")}
        </Typography>
        <Divider
          sx={{
            backgroundColor: "black",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <Typography variant="body2">
          {PokemonData.weight} kg &nbsp; {PokemonData.base_experience}XP
        </Typography>
      </CardContent>
    </Card>
  );
}
