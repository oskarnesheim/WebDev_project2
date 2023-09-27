import { useParams } from "react-router-dom";

export default function PokemonStats() {
  const { id } = useParams();
  return <div>PokemonStats for pokemon {id}</div>;
}
