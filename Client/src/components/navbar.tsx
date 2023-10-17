import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h2 onClick={() => navigate("/")}>Pokedex</h2>
      <h3 className="myteam-link" onClick={() => navigate("/myteam")}>
        My Team
      </h3>
    </div>
  );
}
