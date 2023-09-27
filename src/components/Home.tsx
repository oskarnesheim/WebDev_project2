import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <NavLink to={"25"}>Pikachu</NavLink>
      <NavLink to={"69"}>Oskarsaurus</NavLink>
      <NavLink to={"420"}>Kjosasaurus</NavLink>
    </div>
  );
}
