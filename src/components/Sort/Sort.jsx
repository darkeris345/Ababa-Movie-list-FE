import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Sort.scss";
function Sort({ handleSortChange, setUpdate, sortQuery }) {
  const onChangeSort = (event) => {
    handleSortChange(event.target.value);
    setUpdate((update) => update + 1);
  };

  return (
    <>
      <Box className="sort">
        <FormControl fullWidth>
          <InputLabel>Sort</InputLabel>
          <Select value={sortQuery} label="Sort" onChange={onChangeSort}>
            <MenuItem value={"Title:asc"}>Sort by Title A-Z</MenuItem>
            <MenuItem value={"Title"}>Sort by Title Z-A</MenuItem>
            <MenuItem value={"Year:asc"}>From Oldest</MenuItem>
            <MenuItem value={"Year"}>From Newest</MenuItem>
            <MenuItem value={"Runtime:asc"}>Runtime Shortest</MenuItem>
            <MenuItem value={"Runtime"}>Runtime Longest</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default Sort;
