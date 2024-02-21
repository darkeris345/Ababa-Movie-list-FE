import Input from "@mui/joy/Input";
import "./HeaderSearch.scss";

function HeaderSearch({ onSearchChange }) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <>
      <Input
      className="search"
        variant="outlined"
        type="text"
        size="lg"
        placeholder="Type in here…"
        onChange={handleSearchChange}
      />
    </>
  );
}

export default HeaderSearch;
