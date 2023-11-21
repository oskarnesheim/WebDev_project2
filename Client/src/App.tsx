import "./App.css";
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
  initializeStateFromStorage,
  updateStorageOnChange,
} from "./recoil/atoms";

function App() {
  const [currentFilter, setCurrentFilter] =
    useRecoilState<string[]>(recoilFilterBy);
  const [sortBy, setSortBy] = useRecoilState<string>(recoilSortBy);
  const [page, setRecPage] = useRecoilState<number>(recoilPage);

  useEffect(() => {
    initializeStateFromStorage(
      setCurrentFilter,
      sessionStorage,
      "filterBy",
      [],
    );
    initializeStateFromStorage(setSortBy, sessionStorage, "sortBy", "_id,1");
    initializeStateFromStorage<number>(setRecPage, sessionStorage, "page", 1);
  }, [setCurrentFilter, setSortBy, setRecPage]);

  // Update sessionStorage whenever state changes
  useEffect(() => {
    updateStorageOnChange("filterBy", currentFilter, sessionStorage);
    updateStorageOnChange("sortBy", sortBy, sessionStorage);
    updateStorageOnChange<number>("page", page, sessionStorage);
  }, [currentFilter, sortBy, page]);
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
