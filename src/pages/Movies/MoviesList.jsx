import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import PaginationComponent from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import { RiseLoader } from "react-spinners";
import "./MoviesList.scss";

function MoviesList({
  movies,
  loading,
  handleSearchChange,
  total,
  page,
  setPage,
  perPage,
  setPerPage,
  setUpdate,
  sortQuery,
  handleSortChange,
}) {


  return (
    <>
      <div>
        <HeaderSearch
          handleSearchChange={handleSearchChange}
          setUpdate={setUpdate}
          sortQuery={sortQuery}
          handleSortChange={handleSortChange}
        />
        <Sort
          handleSortChange={handleSortChange}
          setUpdate={setUpdate}
          sortQuery={sortQuery}
        />
      </div>
      <div className="moviesList">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} setUpdate={setUpdate} />
        ))}
        {loading && <RiseLoader color="#36d7b7" size={30} />}
      </div>
      <PaginationComponent
        total={total}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
      />
    </>
  );
}

export default MoviesList;
