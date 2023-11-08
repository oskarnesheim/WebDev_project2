import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { findSinglePokemon } from "../assets/GraphQLQueries";
import { recoilMyTeam } from "../recoil/atoms";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import ArrowButtons from "./ArrowButtons";
import PokemonCard from "./PokemonCard";
import { removeFromTeam } from "./TeamFunctions";
import { PokemonCardI } from "../interfaces/pokemon";

type Props = {
  selectedPokemon: [string, number];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<[string, number]>>;
};

export default function DisplayPokemon({
  selectedPokemon,
  setSelectedPokemon,
}: Props) {
  const history = useNavigate();
  const variables = {
    _id: parseInt(selectedPokemon[0]),
  };
  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);
  const { loading, error, data } = useQuery(findSinglePokemon(), { variables });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  const PokemonData: PokemonCardI = data.pokemon;
  const redirectToPokemon = () => {
    history("/" + selectedPokemon[0]);
  };

  function deleteTeamMember(id: string) {
    removeFromTeam(team, id, setTeam);
    setSelectedPokemon(["0", 0]);
  }

  function selectedInfo() {
    const pokeName = selectedPokemon[0];
    if (pokeName === "0") {
      return <div className="selected-Info"></div>;
    }
    return (
      <div className="selected-Info">
        <div className="container" onClick={redirectToPokemon}>
          <PokemonCard key={selectedPokemon[0]} PokemonData={PokemonData} />
        </div>
        <ArrowButtons
          team={team}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
        <div className="container">
          <Tooltip title={"Remove pokemon from your team. "} arrow>
            <Button
              className="box"
              onClick={() => deleteTeamMember(selectedPokemon[0])}
              color="error"
              variant="outlined"
            >
              REMOVE
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }

  return selectedInfo();
}
