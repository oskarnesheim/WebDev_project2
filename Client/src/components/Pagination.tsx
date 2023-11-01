import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

type BasicPaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
};

export default function BasicPagination({
  page,
  setPage,
  maxPage,
}: BasicPaginationProps) {
  return (
    <div>
      <Pagination
        page={page}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) =>
          setPage(value)
        }
        count={maxPage}
        color="primary"
        variant="outlined"
        size="large"
      />
    </div>
  );
}
