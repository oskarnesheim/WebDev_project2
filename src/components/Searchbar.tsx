type SearchbarProps = {
  updateSearch: React.Dispatch<React.SetStateAction<string>>;
  currentSearch: string;
};

function Searchbar({ updateSearch, currentSearch }: SearchbarProps) {
  return (
    <input
      type="text"
      id="city_input"
      value={currentSearch}
      onChange={(event) => updateSearch(event.target.value)}
      placeholder="E.g., Pikachu"
      required
    />
  );
}

export default Searchbar;
