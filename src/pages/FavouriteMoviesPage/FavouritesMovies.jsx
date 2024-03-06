import { getFavouriteMovies } from "../../services/get";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { RiseLoader } from "react-spinners";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
function FavouriteMovie({
  handleSearchChange,
  searchQuery,
  setUpdate,
  update,
  loading,
}) {
  const { user } = useAuthContext();

  const userId = user?.id;

  const [favouriteList, setFavouriteList] = useState([]);

  const fetchDataFavourite = async () => {
    const response = await getFavouriteMovies(userId, searchQuery);
    setFavouriteList(response);
  };

  useEffect(() => {
    fetchDataFavourite();
  }, [update]);

  return (
    <>
      <HeaderSearch
        handleSearchChange={handleSearchChange}
        setUpdate={setUpdate}
      />

      <div className="moviesList">
        {favouriteList.length > 0 ? (
          favouriteList.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              favouriteList={favouriteList}
              setUpdate={setUpdate}
            />
          ))
        ) : (
          <h1>The favourite list is empty</h1>
        )}
        {loading && <RiseLoader color="#36d7b7" size={30} />}
      </div>
    </>
  );
}

export default FavouriteMovie;
