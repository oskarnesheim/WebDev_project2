import "./App.css";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  /**
   * Scrolls to top when route changes
   * @returns null
   */
  const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="content_container">
          <ScrollToTop />
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
