import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h3 onClick={() => navigate("/")}>Pokedex</h3>
    </div>
  );
}
