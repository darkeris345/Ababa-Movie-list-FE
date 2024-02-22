import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
  };

  const isAuthenticated = localStorage.getItem("token") !== null;
  const userName = localStorage.getItem("username");

  return (
    <div className="header">
      {isAuthenticated && (
        <>
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
          <Button size="large" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default Header;
