import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { findSinglePokemon } from "../../functions/GraphQLQueries";
import { recoilMyTeam } from "../../recoil/atoms";
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowButtons from "./ArrowButtons";
import PokemonCard from "../home/PokemonCard";
import { removeFromTeam } from "./TeamFunctions";
import { PokemonCardI } from "../../interfaces/pokemon";

type Props = {
  selectedPokemon: [string, number];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<[string, number]>>;
};

/**
 * Function that returns a display of the selected Pokemon, including PokemonCard that redirects to the Pokemon's page, ArrowButtons to navigate between team members, and a button to remove the Pokemon from the team
 * @param selectedPokemon - [Pokemon ID, index of the Pokemon in the team]
 * @returns div with the selected Pokemon's info
 */
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

  /**
   * Function that calls removeFromTeam() to remove a Pokemon from the team, and sets the restets selectedPokemon to [0,0]
   * @param id - Pokemon ID
   */
  function deleteTeamMember(id: string) {
    removeFromTeam(team, id, setTeam);
    setSelectedPokemon(["0", 0]);
  }

  /**
   * Function that returns a display of the selected Pokemon,
   * including PokemonCard that redirects to the Pokemon's page,
   * ArrowButtons to navigate between team members,
   * and a button to remove the Pokemon from the team. First pokemon in team is automaticly selected if no pokemon is selected.
   * @returns div with the selected Pokemon's info
   */
  function selectedInfo() {
    const pokeName = selectedPokemon[0];
    if (team.length === 0) {
      return (
        <div className="selected-Info">
          <Typography variant="body1">
            Pokemons will be displayed here once you add them to your team.
          </Typography>
        </div>
      );
    }
    if (pokeName === "0") {
      setSelectedPokemon([team[0], 0]);
    } else
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
