import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";

type PokemonCardProps = {
  _id: number;
  selected: boolean;
};

function findSinglePokemon(_id: number) {
  const q = gql`
    query query {
      pokemon(_id: ${_id}) {
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
        types{
          type{
            name
          }
        }
        sprites {
          front_default
          versions{
            generation-viii{
              icons{
                front_default
              }
            }
          }
        }
      }
    }
  `;
  return q;
}

export default function PokemonCard({ _id, selected }: PokemonCardProps) {
  const { loading, error, data } = useQuery(findSinglePokemon(_id));

  if (loading) {
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
        backgroundColor: "primary.dark",
        opacity: selected ? 0.9 : 0.6,
        transition: selected
          ? "opacity 0.3s ease-in-out, border 0.3s ease-in-out"
          : "none",
        "&:hover": {
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: "primary.dark",
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
              src={
                data.pokemon.sprites.versions["generation-viii"].icons
                  .front_default
              }
              alt={data.pokemon.name}
            />
          </Box>

          {/* Right side: Text */}
          <Typography variant="body1" sx={{ color: "primary.light" }}>
            {data.pokemon.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
