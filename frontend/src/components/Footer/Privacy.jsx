import { Container, Paper, Typography, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function Privacy() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)", 
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
          <LockIcon sx={{ fontSize: 50, color: "#ff6b6b", mb: 1 }} />

          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            Privacy Policy
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Your privacy is <b>important</b> to us. We ensure that your personal data is <b>protected</b> and used only for the intended purposes.
            We do not share your information with third parties <b>without your consent</b>.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            By using our services, you <b>agree</b> to our privacy policies and terms.  
            For further details, feel free to <b>contact us</b>.  
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
