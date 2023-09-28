import { NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";
import { allPokemons } from "../../public/mockData";
import PokemonAbilities from "./PokemonAbilities";
import PokemonStats from "./PokemonStats";

export default function Pokemon() {
  const { id } = useParams();
  const info = allPokemons.find((p) => p.name === id);

  return (
    <div>
      <h1>
        {id} - {info?.id}
      </h1>
      <div>
        <h5>{info?.habitat.name}</h5>
        <h5>{info?.name}</h5>
        <h5>{info?.shape.name}</h5>
      </div>
      <NavLink to={".."}>Go back</NavLink>
      <div>
        <NavLink to={"stats"}>Stats</NavLink>
        <NavLink to={"abilities"}>Abilities</NavLink>
        <Routes>
          <Route
            path={"abilities"}
            element={<PokemonAbilities pokemon={info!} />}
          />
          <Route path={"stats"} element={<PokemonStats pokemon={info!} />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
