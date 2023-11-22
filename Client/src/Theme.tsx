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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#0c72bb",
            },
            "&:hover fieldset": {
              borderColor: "#FFCB05",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6cb9f0",
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "#1a1a1a", // dark grey
          "&.Mui-selected": {
            backgroundColor: "#0c72bb", // blue
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#FFCB05", // yellow
          },
          "&:hover": {
            backgroundColor: "#6cb9f0", // light blue
          },
        },
      },
    },
  },
});

export default theme;
