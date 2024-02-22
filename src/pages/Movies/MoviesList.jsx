import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import PaginationComponent from "../../components/Pagination/Pagination";
import "./MoviesList.scss";
import { RiseLoader } from "react-spinners";
import { useEffect } from "react";

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
  fetchData,
}) {
  useEffect(() => {
    fetchData();
  }, [page, perPage, update]);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HeaderSearch onSearchChange={onSearchChange} value={searchQuery} />
      <div className="moviesList">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            setUpdate={setUpdate}
            update={update}
          />
        ))}
        {loading && (
          <RiseLoader
            color="#36d7b7"
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
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
