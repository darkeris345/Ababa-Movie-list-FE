import Input from "@mui/joy/Input";
import "./HeaderSearch.scss";

function HeaderSearch({ handleSearchChange, setUpdate }) {
  
  const onChangeSearch = (event) => {
    handleSearchChange(event.target.value);
    setUpdate((update) => update + 1);
  };

  return (
    <>
      <Input
        className="search"
        variant="solid"
        type="text"
        size="lg"
        placeholder="Type movie title here..."
        onChange={onChangeSearch}
      />
    </>
  );
}

export default HeaderSearch;
