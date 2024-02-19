import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Login() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <div>
        <TextField required id="username" label="Username" />
        <TextField required id="password" label="Password" type="password" />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default Login;