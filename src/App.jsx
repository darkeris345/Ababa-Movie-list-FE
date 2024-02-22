/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/HomePage/Home";
import MoviesList from "./pages/Movies/MoviesList";
import Register from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import FavouritesMovies from "./pages/FavouriteMoviesPage/FavouritesMovies";
import PageNotFound from "./pages/PageNotFound";
import { getAllDataPaginated } from "./services/get";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const savedPerPage = parseInt(localStorage.getItem("perPage")) || 4;
  const savedPage = parseInt(localStorage.getItem("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(savedPage);
  const [perPage, setPerPage] = useState(savedPerPage);

  const fetchData = async () => {
    try {
      const response = await getAllDataPaginated(page, perPage);
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

  useEffect(() => {
    localStorage.setItem("perPage", perPage.toString());
    localStorage.setItem("page", page.toString());
  }, [page, update, perPage, searchQuery]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <MoviesList
              movies={movies}
              loading={loading}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              total={total}
              page={page}
              setPage={setPage}
              perPage={perPage}
              setPerPage={setPerPage}
              update={update}
              setUpdate={setUpdate}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <FavouritesMovies
              movies={movies}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
