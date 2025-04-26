import { Typography, Container, Paper, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
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
          <InfoIcon sx={{ fontSize: 50, color: "#6a11cb", mb: 1 }} />

          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            About Us
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Welcome to our platform! We are dedicated to providing <b>top-notch services</b> and an <b>unmatched user experience</b>.
            Our team is passionate about <b>innovation</b> and <b>quality</b>, ensuring you get the best possible service.
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={2}>
            Thank you for being a part of our journey! 🚀
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
