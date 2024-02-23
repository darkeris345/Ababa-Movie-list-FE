import "./NavBar.scss";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "@mui/material/Button";

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const userName = user?.username;

  const handleLogout = () => {
    logout();

    if (location.pathname !== "/login") {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="navbar">
        {!user && (
          <>
            <NavLink to="/" className="activeLink">
              Home
            </NavLink>
            <NavLink to="/register" className="activeLink">
              Register
            </NavLink>
            <NavLink to="/login" className="activeLink">
              Login
            </NavLink>
          </>
        )}
      </nav>

      {user && (
        <div className="loggedNav">
          <nav className="navbar">
            <NavLink to="/movies" className="activeLink">
              Movies
            </NavLink>
            <NavLink to="/favourites" className="activeLink">
              Favourites
            </NavLink>
          </nav>

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
