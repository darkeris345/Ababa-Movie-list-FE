import { getFavouriteMovies } from "../../services/get";
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import { useAuthContext } from "../../hooks/useAuthContext";
function FavouriteMovie({
  handleSearchChange,
  searchQuery,
  setUpdate,
  update,
}) {
  const { user } = useAuthContext();

  const userId = user?._id;

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
        {favouriteList.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              favouriteList={favouriteList}
              setUpdate={setUpdate}
            />
          );
        })}
      </div>
    </>
  );
}

export default FavouriteMovie;
