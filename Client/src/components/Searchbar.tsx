import { useState, useEffect } from "react";

type SearchbarProps = {
  updateSearch: React.Dispatch<React.SetStateAction<string>>;
  currentSearch?: string;
};

function Searchbar({ updateSearch }: SearchbarProps) {
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(search);
    }, 600);
    return () => clearTimeout(timer);
  }, [search, updateSearch]);
  return (
    <input
      type="text"
      id="city_input"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="E.g. charizard"
      required
    />
  );
}

export default Searchbar;
