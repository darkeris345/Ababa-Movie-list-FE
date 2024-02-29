import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { Box, Typography, TextField, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./LoginForm.scss";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, isLoading, error } = useLogin();

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
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputProps={{
              endAdornment: (
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </span>
              ),
            }}
          />
        </div>
        <Typography sx={{ mb: 2 }} variant="body2" gutterBottom>
          Don`t have an account? <Link to="/register">Register</Link>
        </Typography>

        <Button
          disabled={isLoading}
          variant="contained"
          color="warning"
          type="submit"
        >
          Log in
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </div>
  );
}

export default LoginForm;
