import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: {
      main: "#0B4C8D", // blue
      light: "#ffffff", // white
      dark: "#0E98F8", // light blue
    },
    secondary: {
      main: "#FFCB05", // yellow
      light: "#ffffff", // white
      dark: "#FFCB05", // yellow
    },
  },
  typography: {
    fontFamily: ["pokemonfont;"].join(","),
  },
});

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
