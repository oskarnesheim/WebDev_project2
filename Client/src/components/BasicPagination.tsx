import Pagination from "@mui/material/Pagination";
import { recoilMaxPage, recoilPage } from "../recoil/atoms";
import { useRecoilState } from "recoil";
// import Stack from "@mui/material/Stack";

export default function BasicPagination() {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [maxPage] = useRecoilState<number>(recoilMaxPage);

  function setPage(page: number) {
    console.log("page: ", page);
    sessionStorage.setItem("page", JSON.stringify(page));
    setRecPage(page);
  }

  return (
    <div className="pagination">
      <Pagination
        page={page}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) =>
          setPage(value)
        }
        count={maxPage}
        variant="outlined"
        size="large"
        shape="rounded"
      />
    </div>
  );
}
