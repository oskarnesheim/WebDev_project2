import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { findSinglePokemon } from "../../functions/GraphQLQueries";
import { recoilMyTeam } from "../../recoil/atoms";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import ArrowButtons from "./ArrowButtons";
import PokemonCard from "../home/PokemonCard";
import { removeFromTeam } from "./TeamFunctions";
import { PokemonCardI } from "../../interfaces/pokemon";

type Props = {
  selectedPokemon: number;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<number>>;
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
  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);
  const history = useNavigate();
  const variables = {
    _id: parseInt(team[selectedPokemon]),
  };
  const { loading, error, data } = useQuery(findSinglePokemon, { variables });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  const PokemonData: PokemonCardI = data.pokemon;
  const redirectToPokemon = () => {
    history("/" + team[selectedPokemon]);
  };

  /**
   * Function that calls removeFromTeam() to remove a Pokemon from the team, and sets the restets selectedPokemon to [0,0]
   * @param id - Pokemon ID
   */
  function deleteTeamMember(id: string) {
    removeFromTeam(team, id, setTeam);
    setSelectedPokemon(0);
  }

  /**
   * Function that returns a display of the selected Pokemon,
   * including PokemonCard that redirects to the Pokemon's page,
   * ArrowButtons to navigate between team members,
   * and a button to remove the Pokemon from the team. First pokemon in team is automaticly selected if no pokemon is selected.
   * @returns div with the selected Pokemon's info
   */
  function selectedInfo() {
    return (
      <>
        <div className="container" onClick={redirectToPokemon}>
          <PokemonCard key={team[selectedPokemon]} PokemonData={PokemonData} />
        </div>
        <ArrowButtons
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
        <div className="container">
          <Tooltip title={"Remove pokemon from your team. "} arrow>
            <Button
              className="box"
              onClick={() => deleteTeamMember(team[selectedPokemon])}
              color="error"
              variant="outlined"
              data-testid="remove_from_team_button"
            >
              REMOVE
            </Button>
          </Tooltip>
        </div>
      </>
    );
  }

  return selectedInfo();
}
