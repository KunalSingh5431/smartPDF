import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Save, Edit, Lock, Mail, Person, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!loggedInUser || !token) {
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(loggedInUser);
      if (!userData || !userData.id) {
        console.error("User ID is missing");
        navigate("/login");
      } else {
        fetchUserData(userData.id, token);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("User Data Fetched: ", data); // Log the data
      setUser(data);  // Store user data in state
      setName(data?.name || "");  // Set name and email
      setEmail(data?.email || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !user._id) return;

    if (newPassword && newPassword !== confirmNewPassword) {
      setToastMessage("New passwords do not match.");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }

    const token = localStorage.getItem("token");

    const updatedData = {
      name,
      email,
    };

    if (currentPassword && newPassword) {
      updatedData.currentPassword = currentPassword;
      updatedData.newPassword = newPassword;
    }

    try {
      const response = await fetch(`/api/users/user-update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        setToastMessage("Profile updated successfully!");
        setToastSeverity("success");
        setToastOpen(true);
      } else {
        const errorText = await response.text();
        setToastMessage(`Failed to update profile: ${errorText}`);
        setToastSeverity("error");
        setToastOpen(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setToastMessage("Error updating profile.");
      setToastSeverity("error");
      setToastOpen(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 2, alignSelf: "flex-start" }}
      >
        Back to Dashboard
      </Button>

      {user ? (
        <Card style={{ maxWidth: 500, width: "100%", padding: "20px" }}>
          <CardHeader
            avatar={<Avatar>{name ? name.charAt(0).toUpperCase() : "U"}</Avatar>}
            title={<Typography variant="h5">{name || "Loading..."}</Typography>}
            subheader={email || "Loading..."}
            action={
              !isEditing && (
                <IconButton onClick={() => setIsEditing(true)}>
                  <Edit />
                </IconButton>
              )
            }
          />
          <CardContent>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                fullWidth
                InputProps={{
                  startAdornment: <Person style={{ marginRight: 10 }} />,
                }}
              />
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                fullWidth
                InputProps={{
                  startAdornment: <Mail style={{ marginRight: 10 }} />,
                }}
              />
              <Divider />
              {isEditing && (
                <>
                  <TextField
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <Lock style={{ marginRight: 10 }} />,
                    }}
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <Lock style={{ marginRight: 10 }} />,
                    }}
                  />
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <Lock style={{ marginRight: 10 }} />,
                    }}
                  />

                  <CardActions style={{ justifyContent: "flex-end" }}>
                    <Button variant="outlined" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<Save />}
                    >
                      Save Changes
                    </Button>
                  </CardActions>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">Loading profile...</Typography>
      )}

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity={toastSeverity} onClose={() => setToastOpen(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
