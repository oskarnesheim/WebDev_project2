import { useNavigate } from "react-router-dom";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h2 className="pokedex-link" onClick={() => navigate("/")}>
        Pokedex
      </h2>
      <h3 className="myteam-link" onClick={() => navigate("/myteam")}>
        My Team <BusinessCenterOutlinedIcon />
      </h3>
      <h3 className="about-link" onClick={() => navigate("/about")}>
        About
      </h3>
    </div>
  );
}
