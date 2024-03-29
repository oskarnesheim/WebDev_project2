import "./css/Styles.css";
import Navbar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  recoilFilterBy,
  recoilSortBy,
  recoilPage,
  recoilMyTeam,
  initializeStateFromStorage,
  updateStorageOnChange,
} from "./recoil/atoms";

/**
 * Function that returns the App component with MUI Themeprovider, containing the navbar and the content provided by router
 * - Initializes state from storage
 * - Updates storage on change
 * - Scrolls to top when route changes
 * @returns  App component
 */
function App(): JSX.Element {
  const [currentFilter, setCurrentFilter] =
    useRecoilState<string[]>(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState<string>(recoilSortBy);
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [team, setTeam] = useRecoilState<string[]>(recoilMyTeam);

  // Initialize recoil states from storage (filterBy, sortBy, page, team)
  useEffect(() => {
    initializeStateFromStorage(
      setCurrentFilter,
      sessionStorage,
      "filterBy",
      [],
    );
    initializeStateFromStorage(setSortBy, sessionStorage, "sortBy", "_id,1");
    initializeStateFromStorage<number>(setRecPage, sessionStorage, "page", 1);
    initializeStateFromStorage(setTeam, localStorage, "team", []);
  }, [setCurrentFilter, setSortBy, setRecPage, setTeam]);

  // Update storage on change of recoil states (filterBy, sortBy, page, team)
  useEffect(() => {
    updateStorageOnChange("filterBy", currentFilter, sessionStorage);
    updateStorageOnChange("sortBy", sortBy, sessionStorage);
    updateStorageOnChange<number>("page", page, sessionStorage);
    updateStorageOnChange("team", team, localStorage);
  }, [currentFilter, sortBy, page, team]);

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
