import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function PaginationComponent({ total, page, setPage, perPage, setPerPage }) {
  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={
            total % perPage === 0
              ? total / perPage
              : Math.floor(total / perPage) + 1
          }
          defaultPage={page}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
          <InputLabel>Pages Count</InputLabel>
          <Select
            label="Per Page Count"
            onChange={(e) => {
              setPerPage(e.target.value);
            }}
            value={perPage}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default PaginationComponent;
