import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./RegisterForm.scss";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/registerUser";
import { ToastContainer, toast } from "react-toastify";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username and password are required.");
      return;
    }
    try {
      const response = await registerUser({ username, password });
      if (response.error) {
        toast.error( "Username already exists. Please choose a different username" );
      } else {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="registerPage">
      <Box
        className="registerBox"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleRegistration}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <div className="registerInputs">
          <TextField
            required
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Typography sx={{ mb: 2 }} variant="body2" gutterBottom>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Button variant="contained" color="warning" type="submit">
          Create account
        </Button>
      </Box>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default RegisterForm;
