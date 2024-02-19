import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import PaginationComponent from "../../components/Pagination/Pagination";
import "./MoviesList.css";
import { RiseLoader } from "react-spinners";

function MoviesList({
  movies,
  loading,
  searchQuery,
  onSearchChange,
  total,
  page,
  setPage,
  perPage,
  setPerPage,
  update,
  setUpdate,
}) {
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HeaderSearch onSearchChange={onSearchChange} value={searchQuery} />
      <div className="moviesList">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
        {loading && (
          <RiseLoader
            color="#36d7b7"
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
            style={{ marginLeft: "45%" }}
          />
        )}
      </div>
      <PaginationComponent
        total={total}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
}

export default MoviesList;
