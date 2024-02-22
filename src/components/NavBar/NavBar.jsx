import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();

    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
  };

  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData?.username;

  return (
    <>
      <nav className="navbar">
        {!user && (
          <>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      {user && (
        <div className="loggedNav">
          <div className="navbar">
            <Link to="/movies">Movies</Link>
            <Link to="/favourites">Favorites</Link>
          </div>

          <div className="userHeader">
            <span>
              Welcome back,{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "Black",
                  textDecoration: "underline",
                }}
              >
                {userName}
              </span>
              !
            </span>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
