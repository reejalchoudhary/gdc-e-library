import { motion } from "framer-motion";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-2xl text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">
          🎓 Welcome, Student!
        </h1>
        <p className="text-lg text-gray-100 mb-8">
          You are now logged in to the{" "}
          <span className="font-semibold text-yellow-300">
            GDC Nagrota Surian E-Library
          </span>
          .  
          Explore uploaded books, download PYQs, and join discussion groups with classmates.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          ⬅ Back to Home
        </button>
      </motion.div>
    </div>
  );
}
