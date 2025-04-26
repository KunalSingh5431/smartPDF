import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { Search, Upload, BarChart, FlashOn } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #bbdefb, #ffffff)" }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="primary" style={{fontWeight:"900", fontSize:"20px"}}>SmartPDF</Typography>
          <div>
            <Button color="inherit" component={Link} to="/login" style={{marginRight:"20px"}}>Log In</Button>
            <Button color="primary" variant="contained" component={Link} to="/signup">Sign Up</Button>
          </div>
        </Toolbar>
      </AppBar>

      <Container style={{ textAlign: "center", padding: "4rem 0" }}>
        <Typography variant="h3" gutterBottom>Welcome to SmartPDF</Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Revolutionize your document management with AI-powered search and analysis.
        </Typography>
        <Button variant="contained" color="primary" size="large" component={Link} to="/signup">
          Get Started for Free
        </Button>
      </Container>

      <Container>
        <Grid container spacing={4} justifyContent="center">
          {[{
            icon: <Search fontSize="large" color="primary" />, 
            title: "Intelligent Search", 
            text: "Find any information within your PDFs in seconds with our advanced search capabilities."
          }, {
            icon: <Upload fontSize="large" color="success" />, 
            title: "Easy Upload", 
            text: "Quickly upload and organize your PDF documents in a centralized, secure location."
          }, {
            icon: <BarChart fontSize="large" color="secondary" />, 
            title: "Insightful Analytics", 
            text: "Gain valuable insights from your documents with our powerful analytics tools."
          }, {
            icon: <FlashOn fontSize="large" color="warning" />, 
            title: "Lightning Fast", 
            text: "Experience blazing-fast performance, even with large document collections."
          }].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  {feature.icon}
                  <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                  <Typography color="textSecondary">{feature.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container style={{ textAlign: "center", padding: "4rem 0" }}>
        <Typography variant="h4" gutterBottom>Ready to transform your document management?</Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Join smartPDF and start optimizing your workflow today.
        </Typography>
        <Button variant="contained" color="primary" size="large" component={Link} to="/signup" style={{ marginRight: 10 }}>
          Sign Up Now
        </Button>
        <Button variant="outlined" color="primary" size="large" component={Link} to="/login">
          Log In
        </Button>
      </Container>

      <footer style={{ backgroundColor: "#f5f5f5", padding: "2rem 0", textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary">&copy; 2025 SmartPDF . All rights reserved.</Typography>
        <div style={{ marginTop: "1rem" }}>
            <Button color="primary" component={Link} to="/about">
              About
            </Button>
            <Button color="primary" component={Link} to="/privacy">
             Privacy Policy
           </Button>
           <Button color="primary" component={Link} to="/terms">
              Terms of Service
            </Button>
            <Button color="primary" component={Link} to="/contact">
              Contact Us
            </Button>
        </div>
      </footer>
    </div>
  );
}
