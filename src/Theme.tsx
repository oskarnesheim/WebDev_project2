import { createTheme } from "@mui/material";

// https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: {
      main: "#0c72bb", // blue
      dark: "#093c6f", // dark blue
      light: "#6cb9f0", // light blue
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

export default theme;
