import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Upload from "./pages/Upload";
import PYQs from "./pages/PYQs";
import Discussion from "./pages/Discussion";
import Footer from "./components/Footer";

import Register from "./pages/Register";
import ManageStudents from "./pages/Admin/ManageStudents";

import StudentLogin from "./pages/Login/StudentLogin";
import AdminLogin from "./pages/Login/AdminLogin";

import Profile from "./pages/Profile";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LoginSelector from "./pages/Login/LoginSelector";
import Notes from "./pages/Notes";

import ManageNotes from "./pages/Admin/ManageNotes";
import ManageBooks from "./pages/Admin/ManageBooks";
import ManagePYQs from "./pages/Admin/ManagePYQs";
import ManageDiscussions from "./pages/Admin/ManageDiscussions";
import ManageUsers from "./pages/Admin/ManageUsers";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("loggedIn") === "true"
  );
  const [role, setRole] = useState(sessionStorage.getItem("role") || "");

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("role", userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("role");
  };

  return (
    <Router>
      <ScrollToTop /> 
      <div className="min-h-screen flex flex-col text-gray-800">
        {role !== "admin" && (
          <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} role={role} />
        )}

        <main className="flex-grow">
          <Routes>
            
            <Route
              path="/"
              element={<RedirectLogic isLoggedIn={isLoggedIn} role={role} />}
            />
            <Route path="/login-selector" element={<LoginSelector />} />
            <Route
              path="/student-login"
              element={<StudentLogin onLogin={() => handleLogin("student")} />}
            />
            <Route
              path="/admin-login"
              element={<AdminLogin onLogin={() => handleLogin("admin")} />}
            />
            <Route path="/profile" element={<Profile />} />

            <Route path="/register" element={<Register />} />

            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="/home" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/pyqs" element={<PYQs />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/discussion" element={<Discussion />} />

            
            <Route path="/admin/manage-notes" element={<ManageNotes />} />
            <Route path="/admin/manage-books" element={<ManageBooks />} />
            <Route path="/admin/manage-pyqs" element={<ManagePYQs />} />
            <Route path="/admin/manage-discussions" element={<ManageDiscussions />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-students" element={<ManageStudents />} />
          </Routes>
        </main>

        {role !== "admin" && <Footer />}
      </div>
    </Router>
  );
}

function RedirectLogic({ isLoggedIn, role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/home");
      }
    } else {
      navigate("/login-selector");
    }
  }, [isLoggedIn, role, navigate]);

  return null;
}
