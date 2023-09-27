import { NavLink, Outlet, useParams } from "react-router-dom";

export default function Pokemon() {
  const { id } = useParams();
  return (
    <div>
      <h1>Pokemon - {id}</h1>
      <NavLink to={".."}>Go back</NavLink>
      <div>
        <NavLink to={"stats"}>Stats</NavLink>
        <NavLink to={"abilities"}>Abilities</NavLink>
        <Outlet />
      </div>
    </div>
  );
}
