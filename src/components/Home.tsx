// import { useQuery } from "@tanstack/react-query";
import { data } from "../../public/mockData";
import PokemonCard from "./PokemonCard";
// import { IPokemonList } from "../interfaces/pokemon";

export default function Home() {
  //   const { data, error, isLoading } = useQuery<IPokemonList, Error>({
  //     queryKey: ["first_20_pokemon"],
  //     queryFn: (): IPokemonList => {
  //       return data as IPokemonList;
  //     },
  //   });

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }

  return (
    <div className="home">
      <h1>Home</h1>
      {data.results.map((pokemon) => {
        return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
      })}
    </div>
  );
}
