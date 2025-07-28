# 📄 SmartPDF - Summarize and Listen to Your PDFs

SmartPDF is a MERN stack application that allows users to upload PDF files, generate AI-based summaries, and listen to them using text-to-speech. Built with intuitive UI, JWT authentication, and powerful backend processing using Gemini AI, this tool is perfect for quick understanding of lengthy documents.

🔗 **Live Demo:** [https://your-deployed-link.com](https://smartpdf-bybv.onrender.com)

---

## 🚀 Features

- 📤 Upload PDF documents securely
- 🤖 Generate intelligent summaries using Gemini API
- 🔊 Text-to-speech playback of summaries
- 🧾 Summary caching for performance
- 🧑‍💻 JWT-based authentication
- 📂 Document listing and deletion
- 🖼 Modern responsive UI with Material-UI (MUI)

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Material UI (MUI)
- SpeechSynthesis API

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer for file uploads
- pdf-parse for text extraction
- Gemini AI API for text summarization

---

## 📸 Demo

> [(<img width="1919" height="878" alt="Image" src="https://github.com/user-attachments/assets/fd21cef7-e7b0-4d0d-9bff-ee2bfe0bd812" />)]

---

## 🔐 Authentication

- Secure login and signup with JWT tokens.
- Protected routes and actions using middleware.

---

## 🧠 AI Summary

- Text is extracted from PDFs using `pdf-parse`.
- Summaries are generated using Gemini's large language model API.
- Summaries are stored in MongoDB and reused on future requests.

---

## 🔊 Text-to-Speech

- Summaries can be read aloud using the browser’s `SpeechSynthesisUtterance` API.
- One-click interaction for enhanced accessibility.

---

## 📁 Folder Structure (Client + Server)

/client → React Frontend
/server → Express Backend
/uploads → PDF Storage

---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/KunalSingh5431/SmartPDF.git
cd SmartPDF
```

2. **Backend Setup**

```bash
cd server
npm install
```

3. **Create a .env file and add:**

```bash
JWT_SECRET=your_secret_key
PORT=5000
```

4. **Frontend Setup**

```bash
cd ../client
npm install
npm start
```

---

## 🙌 Acknowledgements

- Gemini API for AI summarization
- pdf-parse
- MUI for UI components

---

## 📬 Contact

- Kunal Singh
- 📧 kunalsingh5431@gmail.com
- 🐙 GitHub: KunalSingh5431



