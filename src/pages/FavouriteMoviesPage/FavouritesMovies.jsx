import { getFavouriteMovies } from "../../services/get";
import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
function FavouriteMovie({ onSearchChange, searchQuery }) {
  const userId = localStorage.getItem("userId");
  const [favouriteList, setFavouriteList] = useState([]);

  const fetchDataFavourite = async () => {
    const response = await getFavouriteMovies(userId);
    setFavouriteList(response);
  };

  useEffect(() => {
    fetchDataFavourite();
  }, []);

  const filteredMovies = favouriteList.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HeaderSearch onSearchChange={onSearchChange} value={searchQuery} />

      <div className="moviesList">
        {filteredMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              favouriteList={favouriteList}
            />
          );
        })}
      </div>
    </>
  );
}

export default FavouriteMovie;
