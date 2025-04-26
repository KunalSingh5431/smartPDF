import { Container, Paper, Typography, Box } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel"; 

export default function Terms() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)", 
        padding: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "100%",
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)", 
          }}
        >
          <GavelIcon sx={{ fontSize: 50, color: "#764ba2", mb: 1 }} />

          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            Terms of Service
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            By using our services, you agree to our <b>terms and conditions</b>.  
            We strive to maintain a <b>safe and user-friendly environment</b> for all users.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Please <b>read our terms carefully</b> before proceeding.  
            If you have any questions, feel free to <b>contact us</b>.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
