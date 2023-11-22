import Pagination from "@mui/material/Pagination";
import { recoilMaxPage, recoilPage } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useState } from "react";
import { PaginationItem } from "@mui/material";

/**
 * Function that returns the BasicPagination component with the pagination for the pokemon list
 * - Uses recoil state for page and maxPage
 * - Uses window width to determine pagination size
 * @returns BasicPagination component
 */
export default function BasicPagination(): JSX.Element {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [maxPage] = useRecoilState<number>(recoilMaxPage);
  const [width, setWidth] = useState<number>(window.innerWidth);

  // Update width on resize
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Function that returns the size of the pagination based on the window width
   * @returns "small" | "medium" | "large"
   */
  function getSize(): "small" | "medium" | "large" {
    switch (true) {
      case width < 465 && width > 370:
        return "medium";
      case width < 370:
        return "small";
      default:
        return "large";
    }
  }

  return (
    <Pagination
      sx={{ marginTop: "5vh", marginBottom: "10vh" }}
      page={page}
      onChange={(_e: React.ChangeEvent<unknown>, value: number) =>
        setRecPage(value)
      }
      count={maxPage}
      variant="outlined"
      size={getSize()}
      shape="rounded"
      renderItem={(item) => <PaginationItem {...item} />}
      data-testid="pagination"
    />
  );
}
