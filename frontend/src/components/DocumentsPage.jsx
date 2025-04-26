import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Modal,
  Fade,
} from "@mui/material";
import {
  Delete,
  ViewModule,
  ViewList,
  VolumeUp,  
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DocumentsPage() {
  const [documents, setDocuments]   = useState([]);
  const [viewMode,  setViewMode]    = useState("grid");
  const [toastOpen, setToastOpen]   = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("Loading…");

  const [speakingId, setSpeakingId]   = useState(null);   

  const navigate     = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => { fetchDocs(); }, []);
  const fetchDocs = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_BASE_URL}/api/documents/doc`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/documents/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToastMessage("Deleted");
      setToastOpen(true);
      fetchDocs();
    } catch (err) {
      setToastMessage("Delete failed");
      setToastOpen(true);
    }
  };

  const showSummary = async (id) => {
    try {
      setSummaryText("Generating summary…");
      setSummaryOpen(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_BASE_URL}/api/documents/summary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummaryText(data.summary);
    } catch {
      setSummaryText("Summary failed");
    }
  };

  const speak = (text, id) => {
    window.speechSynthesis.cancel();
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.onend   = () => setSpeakingId(null);
    u.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  };
  const stopSpeak = () => {
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  };

  const Actions = ({ doc }) => (
    <>
      <Button size="small" variant="contained" onClick={() => window.open(doc.url, "_blank")}>
        View
      </Button>

      <Button size="small" variant="contained" color="success" sx={{ ml: 1 }} onClick={() => showSummary(doc._id)}>
        Summary
      </Button>

      <IconButton
        size="small"
        color={speakingId === doc._id ? "primary" : "default"}
        sx={{ ml: 0.9 }}
        onClick={async () => {
          if (speakingId === doc._id) { stopSpeak(); return; }
          try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${API_BASE_URL}/summary/${doc._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            speak(data.summary || doc.name, doc._id);
          } catch {
            setToastMessage("Audio failed");
            setToastOpen(true);
          }
        }}
      >
        <VolumeUp fontSize="inherit" />
      </IconButton>

      <Button
        size="small"
        variant="contained"
        color="error"
        sx={{ ml: 1 }}
        onClick={() => handleDelete(doc._id)}
      >
        <Delete />
      </Button>
    </>
  );

  return (
    <div style={{ padding: 20 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="outlined" onClick={() => navigate("/dashboard")} sx={{ mb: 2, alignSelf: "flex-start" }}>
          Back to Dashboard
        </Button>
        <Typography variant="h4">Your Documents</Typography>
        <IconButton onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
          {viewMode === "grid" ? <ViewList /> : <ViewModule />}
        </IconButton>
      </Box>

      {viewMode === "grid" ? (
        documents.length === 0 ? (
          <Typography>No documents uploaded.</Typography>
        ) : (
          <Grid container spacing={2}>
            {documents.map((d) => (
              <Grid item xs={12} sm={6} md={4} key={d._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{d.title || d.name}</Typography>
                    <Typography color="textSecondary">
                      Uploaded: {d.date?.slice(0, 10)}
                    </Typography>
                    <Box mt={1}>
                      <Actions doc={d} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((d) => (
                <TableRow key={d._id}>
                  <TableCell>{d.title || d.name}</TableCell>
                  <TableCell>{d.date?.slice(0, 10)}</TableCell>
                  <TableCell><Actions doc={d} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity={toastMessage.includes("fail") ? "error" : "success"}>{toastMessage}</Alert>
      </Snackbar>

      <Modal open={summaryOpen} onClose={() => setSummaryOpen(false)} closeAfterTransition>
        <Fade in={summaryOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 320, sm: 550 },
              bgcolor: "#fafafa",          
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 6,
              p: 3,
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight={600}>
                Document Summary
              </Typography>
              <IconButton size="small" onClick={() => setSummaryOpen(false)}>
                ✕
              </IconButton>
            </Box>

            <Typography
              component="div"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.6,
                fontSize: "0.95rem",
                pl: 1,
              }}
            >
              {summaryText
                .split("\n")
                .filter((l) => l.trim())
                .map((line, idx) => `• ${line.trim()}`)
                .join("\n")}
            </Typography>
          </Box>
        </Fade>
      </Modal>

    </div>
  );
}
