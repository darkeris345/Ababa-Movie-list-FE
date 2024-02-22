import { Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/favourites">Favorites</Link>
    </nav>
  );
}

export default NavBar;
