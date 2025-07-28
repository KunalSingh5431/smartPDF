const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document");
const pdfParse = require("pdf-parse");
const { summariseText } = require("../utils/gemini");

const router = express.Router();

// ✅ Auth Middleware
const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// ✅ Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// ✅ Upload File Endpoint (returns file URL)
router.post("/upload-file", protect, upload.single("pdf"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl, name: req.file.originalname });
});

// ✅ Serve uploaded files statically
router.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ✅ Upload Document Metadata
router.post("/upload", protect, async (req, res) => {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const document = await Document.create({
      userId: req.user.id,
      name,
      url,
      date: new Date(),
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get All User Documents (with summary)
router.get("/doc", protect, async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id }).select("name url date summary");
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Delete Document
router.delete("/delete/:id", protect, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    if (doc.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete file from server
    const filePath = path.join(__dirname, "..", "uploads", path.basename(doc.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

// ✅ Generate or Return Summary
router.get("/summary/:id", protect, async (req, res) => {
  try {
    console.log("▶ summary route → id:", req.params.id);

    const doc = await Document.findById(req.params.id);
    if (!doc) {
      console.log("❌ doc not found");
      return res.status(404).json({ message: "Document not found" });
    }

    // ✅ Return cached summary if exists
    if (doc.summary && doc.summary.length > 10) {
      console.log("✅ Returning cached summary");
      return res.json({ summary: doc.summary });
    }

    // ✅ Generate and store new summary
    const pdfPath = path.join(__dirname, "..", "uploads", path.basename(doc.url));
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);

    const summary = await summariseText(pdfData.text);

    doc.summary = summary;
    await doc.save();

    console.log("✅ New summary generated and saved");
    res.json({ summary });
  } catch (err) {
    console.log("❌ summary route failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
