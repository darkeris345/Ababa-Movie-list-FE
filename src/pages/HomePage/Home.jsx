import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Home.scss";
function Home() {
  return (
    <>
      <h1>Home</h1>
      <div className="buttonsAuth">
      <Link to="/register">
        <Button className="register" variant="contained">Register</Button></Link>
      <Link to="/login">
        <Button className="login" variant="contained">Login</Button>
      </Link>
      </div>

    </>
  );
}

export default Home;
