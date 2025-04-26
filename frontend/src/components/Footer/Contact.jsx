import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function Contact() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #43cea2, #185a9d)",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "100%",
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <ContactMailIcon sx={{ fontSize: 50, color: "#185a9d", mb: 1 }} />

          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            Contact Us
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Have any questions? <b>We'd love to hear from you!</b><br/>
            Fill in the details below, and we'll get back to you as soon as possible.
          </Typography>

          <Box component="form" sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Your Name" variant="outlined" fullWidth required />
            <TextField label="Your Email" type="email" variant="outlined" fullWidth required />
            <TextField label="Your Message" multiline rows={4} variant="outlined" fullWidth required />

            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#134e6f", 
                  transform: "scale(1.05)", 
                },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
