import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Home.scss";

function Home() {
  return (
    <div className="homeContainer">
      <div className="homeContent">
        <Typography variant="h2" gutterBottom>
          Welcome to Movie App
        </Typography>
        <Typography variant="body1" paragraph>
          Discover movies and add them to your favorites list with ease.
        </Typography>
        <div className="buttonsAuth">
          <Link to="/register">
            <Button className="register" variant="contained" color="secondary">
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button className="login" variant="contained" color="secondary">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
