import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { getAllDataPaginated } from "./services/get";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/HomePage/Home";
import MoviesList from "./pages/Movies/MoviesList";
import Register from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import FavouritesMovies from "./pages/FavouriteMoviesPage/FavouritesMovies";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuthContext();

  // Pagination settings saved
  const savedPerPage = parseInt(localStorage.getItem("perPage"));
  const savedPage = parseInt(localStorage.getItem("page"));

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(savedPage);
  const [perPage, setPerPage] = useState(savedPerPage);

  const fetchData = async () => {
    try {
      const response = await getAllDataPaginated(
        page,
        perPage,
        searchQuery,
        sortQuery
      );

      const { movies, totalCount } = response.data;

      if (totalCount === 0) throw new Error("No items found");

      setMovies(movies);
      setTotal(totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (search) => {
    setSearchQuery(search);
  };

  const handleSortChange = (sort) => {
    setSortQuery(sort);
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem("perPage", perPage);
    localStorage.setItem("page", page);
  }, [page, perPage, update, searchQuery, sortQuery]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/movies" />}
        />
        <Route
          path="/movies"
          element={
            !user ? (
              <Navigate to="/" />
            ) : (
              <MoviesList
                movies={movies}
                total={total}
                loading={loading}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                sortQuery={sortQuery}
                handleSortChange={handleSortChange}
                page={page}
                perPage={perPage}
                setPage={setPage}
                setPerPage={setPerPage}
                update={update}
                setUpdate={setUpdate}
              />
            )
          }
        />
        <Route
          path="/favourites"
          element={
            !user ? (
              <Navigate to="/" />
            ) : (
              <FavouritesMovies
                movies={movies}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                setUpdate={setUpdate}
                update={update}
                loading={loading}
              />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/movies" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/movies" /> : <Register />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
