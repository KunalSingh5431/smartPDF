import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock, Person, HowToReg } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Container,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); 

  const API_BASE_URL = "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    try {
      const response = await fetch('/api/users/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast.success("Signup successful!", { position: "top-center" });
      setTimeout(() => navigate("/login"), 2000); 
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4b6cb7, #182848)",
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Card sx={{ maxWidth: 450, width: "100%", padding: 3, borderRadius: 3, boxShadow: 8 }}>
          <CardHeader
            title={
              <Typography variant="h5" align="center" fontWeight="bold" color="primary">
                Create an Account
              </Typography>
            }
            subheader={
              <Typography align="center" color="textSecondary">
                Sign up for SmartPDF
              </Typography>
            }
          />
          <CardContent>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

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
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<HowToReg />} sx={{ mt: 2 }}>
                Sign Up
              </Button>
            </form>
          </CardContent>

          <CardActions sx={{ justifyContent: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
                Log in
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Container>

      <ToastContainer />
    </Box>
  );
}
