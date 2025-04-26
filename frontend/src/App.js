import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import MainPage from './pages/MainPage';
import Profile from './components/Profile/Profile';
import About from './components/Footer/About';
import Privacy from './components/Footer/Privacy';
import Terms from './components/Footer/Terms';
import Contact from './components/Footer/Contact';
import DocumentsPage from './components/DocumentsPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<MainPage />} />
        </Route>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/about" element={<About/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App

