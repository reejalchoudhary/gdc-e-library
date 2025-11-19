import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PYQs() {
  const [pyqs, setPyqs] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    const loadPYQs = () => {
      const stored = JSON.parse(localStorage.getItem("pyqsUploads") || "[]");
      setPyqs(stored);
    };

    loadPYQs();

    const handleStorage = (e) => {
      if (!e.key || e.key === "pyqsUploads") {
        loadPYQs();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filtered = pyqs.filter((p) => {
    return (
      (!search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())) &&
      (!departmentFilter || p.department === departmentFilter) &&
      (!yearFilter || p.year === yearFilter)
    );
  });

  const handleDownload = (dataUrl, name) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = name;
    link.click();
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center p-10 
      bg-gradient-to-br from-indigo-300 via-purple-300 to-cyan-200 overflow-hidden"
    >
      
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-8 drop-shadow-lg text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📄 Previous Year Question Papers
      </motion.h1>

    
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search by name or category..."
          className="border border-purple-300 px-4 py-2 rounded-lg w-60 backdrop-blur-md bg-white/70 focus:ring-2 focus:ring-purple-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          className="border border-purple-300 px-4 py-2 rounded-lg w-48 backdrop-blur-md bg-white/70 focus:ring-2 focus:ring-purple-500 outline-none"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          className="border border-purple-300 px-4 py-2 rounded-lg w-36 backdrop-blur-md bg-white/70 focus:ring-2 focus:ring-purple-500 outline-none"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </motion.div>

     
      {filtered.length === 0 ? (
        <p className="text-center text-gray-700 bg-white/50 px-6 py-3 rounded-xl backdrop-blur-md">
          No PYQs found 😔
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 w-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filtered.map((file, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 flex flex-col items-center text-center transition-all border border-purple-200"
            >
              <p className="text-lg font-semibold text-purple-700 mb-2">
                {file.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Category:</strong> {file.category}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Dept:</strong> {file.department} |{" "}
                <strong>Year:</strong> {file.year}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Uploaded by <span className="font-medium">{file.uploader}</span>
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => window.open(file.data, "_blank")}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(file.data, file.name)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
