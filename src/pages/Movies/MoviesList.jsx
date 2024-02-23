import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import PaginationComponent from "../../components/Pagination/Pagination";
import "./MoviesList.scss";
import { RiseLoader } from "react-spinners";
import { useEffect } from "react";

function MoviesList({
  movies,
  loading,
  handleSearchChange,
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

  return (
    <>
      <HeaderSearch  handleSearchChange={handleSearchChange} setUpdate={setUpdate} />
      <div className="moviesList">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            setUpdate={setUpdate}
          />
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
