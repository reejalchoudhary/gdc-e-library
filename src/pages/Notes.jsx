import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");

  const STORAGE_KEY = "notesUploads";

  const loadNotes = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setNotes(stored.sort((a, b) => b.uploadedAtTs - a.uploadedAtTs));
  };

  useEffect(() => {
    loadNotes();
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) loadNotes();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.name.toLowerCase().includes(search.toLowerCase()) ||
      note.category.toLowerCase().includes(search.toLowerCase()) ||
      note.uploader.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      department === "All" || note.department === department;
    const matchesYear = year === "All" || note.year === year;
    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] p-6 text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-extrabold text-center text-cyan-700 mb-10 drop-shadow-md"
      >
        📘 Notes Library
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-cyan-300 rounded-xl w-64 focus:ring-2 focus:ring-cyan-400 bg-white/70 backdrop-blur-md outline-none transition-all"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 bg-white/70 backdrop-blur-md"
        >
          <option value="All">All Departments</option>
          <option value="BA">BA</option>
          <option value="BSc">BSc</option>
          <option value="BCom">BCom</option>
          <option value="BCA">BCA</option>
        </select>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 bg-white/70 backdrop-blur-md"
        >
          <option value="All">All Years</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>
      </motion.div>

      {filteredNotes.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-lg mt-12"
        >
          No notes found. Try uploading one! ✏️
        </motion.p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="flex flex-wrap justify-center gap-8"
        >
          {filteredNotes.map((note, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 100 },
                },
              }}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-72 text-center hover:shadow-2xl border border-cyan-100 transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-cyan-700 mb-2 break-words">
                {note.uploader || "Unknown"}
              </h2>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Dept:</strong> {note.department || "N/A"} |{" "}
                <strong>Year:</strong> {note.year || "N/A"}
              </p>
              <p className="italic text-xs text-gray-500 mb-3">
                {note.name} <br /> ({note.category})
              </p>

              <div className="flex justify-center gap-3">
                <a
                  href={note.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-medium transition-all"
                >
                  Preview
                </a>
                <a
                  href={note.data}
                  download={note.name}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium transition-all"
                >
                  Download
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Uploaded: {note.uploadedAt}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
