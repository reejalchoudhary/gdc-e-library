import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); 
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      setMessage("✅ Admin login successful!");
      setIsError(false);

      setTimeout(() => {
        if (onLogin) onLogin();
        navigate("/admin-dashboard");
      }, 1500);
    } else {
      setMessage("❌ Invalid admin credentials");
      setIsError(true);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-500 via-rose-400 to-yellow-400 animate-gradient-xy p-6">

      <motion.div
        className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [-60, 40, -50, 0], y: [30, -50, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [40, -70, 70, 0], y: [-30, 20, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

     
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-bold text-center text-white drop-shadow-md mb-4">
          🧑‍💼 Admin Login
        </h1>
        <p className="text-center text-white/80 mb-8 text-sm">
          Access your{" "}
          <span className="font-semibold text-yellow-200">
            E-Library Management Panel
          </span>
        </p>

        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div>
            <label className="block text-white/80 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-300 outline-none transition"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-300 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 221, 128, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-rose-400 to-yellow-400 text-white py-2.5 rounded-lg font-semibold shadow-lg transition-all hover:shadow-yellow-400/50"
          >
            Login
          </motion.button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-5 text-center text-sm font-medium ${
              isError ? "text-red-300" : "text-green-300"
            }`}
          >
            {message}
          </motion.div>
        )}

        <p className="text-center text-white/70 text-sm mt-6">
          Authorized personnel only ⚠️
        </p>
      </motion.div>

      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
