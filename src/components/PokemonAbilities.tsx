import { useParams } from "react-router-dom";

export default function PokemonAbilities() {
  const { id } = useParams();
  return <div>PokemonAbilities for {id}</div>;
}
