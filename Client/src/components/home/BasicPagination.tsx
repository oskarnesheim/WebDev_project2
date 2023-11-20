import Pagination from "@mui/material/Pagination";
import {
  recoilTTS,
  recoilMaxPage,
  recoilPage,
  initializeStateFromStorage,
  updateStorageOnChange,
} from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useState } from "react";
import { PaginationItem } from "@mui/material";

export default function BasicPagination() {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [maxPage] = useRecoilState<number>(recoilMaxPage);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [focusedItem, setFocusedItem] = useState<number | null>(null);
  const [ttsEnabled] = useRecoilState(recoilTTS);

  useEffect(() => {
    initializeStateFromStorage<number>(setRecPage, sessionStorage, "page", 1);
  }, [setRecPage]);

  // Update localStorage whenever myTeam changes
  useEffect(() => {
    updateStorageOnChange<number>("page", page, sessionStorage);
  }, [page]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getSize() {
    switch (true) {
      case width < 465 && width > 370:
        return "medium";
      case width < 370:
        return "small";
      default:
        return "large";
    }
  }

  const handleFocus = (text: string) => {
    if (ttsEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 0.5;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="pagination">
      <Pagination
        page={page}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) =>
          setRecPage(value)
        }
        count={maxPage}
        variant="outlined"
        size={getSize()}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            style={
              item.page === focusedItem ? { backgroundColor: "lightgray" } : {}
            }
            onFocus={() => {
              handleFocus("Page " + item.page);
              setFocusedItem(item.page);
            }}
            onBlur={() => setFocusedItem(null)}
          />
        )}
        data-testid="pagination"
      />
    </div>
  );
}
