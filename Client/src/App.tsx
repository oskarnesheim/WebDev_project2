import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="content_container">
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
