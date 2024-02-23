import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./RegisterForm.scss";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, isLoading, error } = useRegister();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ username, password });
    } catch (error) {
      console.error("Registration failed:", error);
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
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Button
          disabled={isLoading}
          variant="contained"
          color="warning"
          type="submit"
        >
          Create account
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </div>
  );
}

export default RegisterForm;
