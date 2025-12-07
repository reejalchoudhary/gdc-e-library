import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 flex flex-col items-center justify-center p-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-4xl"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-300">
           Admin Dashboard
        </h1>
        <p className="text-center text-gray-200 mb-10">
          Welcome to the{" "}
          <span className="font-semibold text-yellow-400">
            GDC Nagrota Surian E-Library Management System
          </span>
          .<br />
          Here you can manage books, question papers, notes, users, and discussion posts.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Manage Books */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-500 bg-opacity-20 p-6 rounded-xl text-center shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-3">📘 Manage Books</h2>
            <p className="text-gray-100 mb-4">
              Upload, edit, and remove books available in the digital library.
            </p>
            <button
              onClick={() => navigate("/admin/manage-books")}
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-lg transition"
            >
              Go to Books
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500 bg-opacity-20 p-6 rounded-xl text-center shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-3">📄 Manage PYQs</h2>
            <p className="text-gray-100 mb-4">
              Upload or delete previous year question papers for students.
            </p>
            <button
              onClick={() => navigate("/admin/manage-pyqs")}
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-lg transition"
            >
              Go to PYQs
            </button>
          </motion.div>

          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-500 bg-opacity-20 p-6 rounded-xl text-center shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-3">🗒️ Manage Notes</h2>
            <p className="text-gray-100 mb-4">
              Upload and organize course notes for different subjects and semesters.
            </p>
            <button
              onClick={() => navigate("/admin/manage-notes")}
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-lg transition"
            >
              Go to Notes
            </button>
          </motion.div>

         
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-500 bg-opacity-20 p-6 rounded-xl text-center shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-3">💬 Manage Discussions</h2>
            <p className="text-gray-100 mb-4">
              Moderate and manage discussion threads and student posts.
            </p>
            <button
              onClick={() => navigate("/admin/manage-discussions")}
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-lg transition"
            >
              Go to Discussions
            </button>
          </motion.div>

          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-pink-500 bg-opacity-20 p-6 rounded-xl text-center shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-3">👥 Manage Users</h2>
            <p className="text-gray-100 mb-4">
              View registered students and manage their access permissions.
            </p>
            <button
              onClick={() => navigate("/admin/manage-users")}
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-lg transition"
            >
              Go to Users
            </button>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => (window.location.href = "/login-selector")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
