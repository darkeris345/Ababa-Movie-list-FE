import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./LoginForm.scss";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, isLoading, error } = useLogin();

  console.log(isLoading, error);

  const handleLogin = async (e) => {
    e.preventDefault();

    await loginUser({ username, password });
  };

  return (
    <div className="loginPage">
      <Box
        className="loginBox"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <div className="loginHeader">
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
        </div>

        <div className="loginInputs">
          <TextField
            required
            id="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Typography sx={{ mb: 2 }} variant="body2" gutterBottom>
          Don`t have an account? <Link to="/register">Register</Link>
        </Typography>

        <Button variant="contained" color="warning" type="submit">
          Log in
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </div>
  );
}

export default LoginForm;
