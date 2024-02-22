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
        variant="solid"
        type="text"
        size="lg"
        placeholder="Type movie title here..."
        onChange={handleSearchChange}
      />
    </>
  );
}

export default HeaderSearch;
