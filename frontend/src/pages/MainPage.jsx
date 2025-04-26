import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Modal,
  Fade,
  Box,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Dashboard,
  UploadFile,
  List as ListIcon,
  AccountCircle,
  Settings,
  Logout,
  Person,
  CloudUpload,
  Delete,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  /*const API_BASE_URL = "http://localhost:5000/api/documents";*/

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(loggedInUser));
      fetchDocuments();
    }
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/documents/doc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
      setFilteredDocs(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const uploadResponse = await axios.post(
        `/api/documents/upload-file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url, name } = uploadResponse.data;

      const metadata = { name, url };
      await axios.post(`/api/documents/upload`, metadata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToastMessage("PDF uploaded successfully!");
      setToastOpen(true);
      handleCloseModal();
      fetchDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload document.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this PDF?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/documents/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setToastMessage("PDF deleted successfully!");
      setToastOpen(true);
      fetchDocuments();
    } catch (error) {
      console.error("Delete failed:", error);
      const msg = error?.response?.data?.message || "Failed to delete document.";
      setToastMessage(msg);
      setToastOpen(true);
    }
  };
  

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = documents.filter((doc) => doc.name.toLowerCase().includes(query));
    setFilteredDocs(filtered);
  };

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarOpen ? 240 : 60,
          transition: "width 0.3s ease-in-out",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? 240 : 60,
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: isSidebarOpen ? "flex-end" : "center" }}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button onClick={handleOpenModal}>
            <ListItemIcon>
              <UploadFile />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Upload Documents" />}
          </ListItem>
          <ListItem button onClick={() => navigate("/documents")}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="My Documents" />}
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Drawer>

      <main style={{ flexGrow: 1, padding: 20 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome, {user?.name || "User"}!
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{ startAdornment: <Search sx={{ marginRight: 1 }} /> }}
              sx={{ background: "white", borderRadius: 1, marginRight: 2 }}
            />
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
              <MenuItem onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                Show Profile
              </MenuItem>
              <MenuItem disabled>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                Profile Type: {user?.role || "User"}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {filteredDocs.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{doc.name}</Typography>
                  <Typography color="textSecondary">Uploaded: {doc.date?.slice(0, 10)}</Typography>
                  <Button size="small" variant="contained" sx={{ mt: 1, mr: 1 }} onClick={() => window.open(doc.url, "_blank")}>
                    View
                  </Button>
                  <Button size="small" variant="contained" color="error" sx={{ mt: 1 }} startIcon={<Delete />} onClick={() => handleDelete(doc._id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Fade in={openModal}>
          <Box sx={{ width: 400, p: 3, bgcolor: "white", borderRadius: 2, textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Typography variant="h6">Upload a PDF</Typography>
            <Button variant="contained" component="label" startIcon={<CloudUpload />} sx={{ mt: 2 }}>
              Select PDF
              <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
            </Button>
            {selectedFile && <Typography sx={{ mt: 1 }}>Selected: {selectedFile.name}</Typography>}
            <Button onClick={handleUpload} variant="contained" sx={{ mt: 2, ml: 3 }}>
              Upload
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity={toastMessage.toLowerCase().includes("fail") ? "error" : "success"}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
