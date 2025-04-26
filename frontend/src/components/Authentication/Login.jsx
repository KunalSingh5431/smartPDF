import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon } from "@mui/icons-material";
import { 
  Container, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  IconButton, 
  InputAdornment, 
  Box 
} from "@mui/material";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /*const API_BASE_URL =  "http://localhost:5000";*/

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200); 
    } catch (error) {
      toast.error(error.message || "Login failed", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Card sx={{ width: "100%", p: 4, borderRadius: 3, boxShadow: 8 }}>
          <CardHeader
            title={
              <Typography variant="h5" align="center" fontWeight="bold" color="primary">
                Login to SmartPDF
              </Typography>
            }
            subheader={
              <Typography align="center" color="textSecondary">
                Enter your credentials to access your account
              </Typography>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                startIcon={<LoginIcon />} 
                sx={{ mt: 2 }}
              >
                Log in
              </Button>
            </form>
          </CardContent>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
              Sign up
            </Link>
          </Typography>
        </Card>
      </Container>

      <ToastContainer />
    </Box>
  );
}
