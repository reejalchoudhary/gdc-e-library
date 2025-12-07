import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const approvedStudents = JSON.parse(localStorage.getItem("approved_students") || "[]");
    const pendingRequests = JSON.parse(localStorage.getItem("student_requests") || "[]");

    const approvedUser = approvedStudents.find(
      (s) => s.email === email && s.password === password
    );

    const pendingUser = pendingRequests.find(
      (s) => s.email === email && s.password === password
    );

    if (approvedUser) {
    
      localStorage.setItem(
        "loggedInStudent",
        JSON.stringify({
          name: approvedUser.name,
          email: approvedUser.email,
          department: approvedUser.department,
          year: approvedUser.year,
          rollNo: approvedUser.rollNo || "N/A",
        })
      );

      setMessage(`✅ Welcome ${approvedUser.name}! Redirecting...`);
      if (onLogin) onLogin();
      setTimeout(() => navigate("/home"), 1500);
    } else if (pendingUser) {
      setMessage("⏳ Your registration is pending admin approval. Please wait!");
    } else {
      setMessage("❌ Invalid email or password! Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 opacity-40 blur-3xl -z-10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-3"
        >
          Student Login 👨‍🎓
        </motion.h1>
        <p className="text-center text-white/80 mb-8">
          Welcome to{" "}
          <span className="font-semibold text-white">GDC Nagrota Surian E-Library</span>
        </p>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 text-center rounded-lg font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : message.includes("⏳")
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-white/90 mb-2 font-medium">Email ID</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-white/80 text-sm mt-6">
          New student?{" "}
          <Link
            to="/register"
            className="text-purple-200 font-semibold hover:text-white underline transition-all"
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
