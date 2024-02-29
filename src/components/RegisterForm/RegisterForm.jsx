import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import { Box, Typography, TextField, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./RegisterForm.scss";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputProps={{
              endAdornment: (
                <span onClick={() => setShowPassword(!showPassword)} className="eyeIcon">
                  {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </span>
              ),
            }}
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
        {isLoading && (
          <>
            <Typography>Loging...</Typography>
            <BarLoader color="#36d7b7" />
          </>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </div>
  );
}

export default RegisterForm;
