import { useNavigate, useRouteError } from "react-router-dom";
import Button from "@mui/material/Button";
export default function ErrorPage() {
  const navigate = useNavigate();

  const error = useRouteError();
  console.error(error);

  return (
    <div className="error_page_container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <img id="error_404_icon" src="../../public/404.jpg" alt="" />
      <p>
        Click
        <Button variant="contained" onClick={() => navigate("/")}>
          Here
        </Button>
        to go back to the main page
      </p>
    </div>
  );
}
