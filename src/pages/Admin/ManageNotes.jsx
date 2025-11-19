import { useState, useEffect } from "react";
import { Trash2, UploadCloud, CheckCircle, XCircle } from "lucide-react";

export default function ManageNotes() {
  const STORAGE_KEY = "notesUploads";
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadNotes = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setNotes(stored.sort((a, b) => b.uploadedAtTs - a.uploadedAtTs));
  };

  useEffect(() => {
    loadNotes();
    const handleStorageChange = (e) => {
      if (!e.key || e.key === STORAGE_KEY) {
        loadNotes();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDelete = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotes(updated);
    window.dispatchEvent(new Event("storage"));
    showToast("🗑️ Note deleted successfully!", "error");
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file || !category || !name || !department || !year) {
      showToast("⚠️ Please fill all fields!", "error");
      return;
    }

 
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showToast("⚠️ File size exceeds the 5MB limit!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newNote = {
        name: file.name,
        uploader: name,
        category,
        department,
        year,
        data: reader.result,
        uploadedAt: new Date().toLocaleString(),
        uploadedAtTs: Date.now(),
      };

      const existingNotes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      if (existingNotes.length >= 100) {
        showToast("⚠️ Maximum upload limit reached.", "error");
        return;
      }

      const updatedNotes = [newNote, ...existingNotes];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));

      setNotes(updatedNotes);

      setFile(null);
      setCategory("");
      setName("");
      setDepartment("");
      setYear("");
      e.target.reset(); 

      window.dispatchEvent(new Event("storage"));

      showToast("✅ Note uploaded successfully!");
    };
    reader.readAsDataURL(file); 
  };

  const filteredNotes = notes.filter((note) => {
    const matchesDept = filterDept === "All" || note.department === filterDept;
    const matchesYear = filterYear === "All" || note.year === filterYear;
    return matchesDept && matchesYear;
  });

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-start p-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500">
      
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {toast && (
        <div
          className={`fixed top-5 right-5 flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-white backdrop-blur-md transition-all z-50 ${
            toast.type === "error" ? "bg-red-500/90" : "bg-green-500/90"
          }`}
        >
          {toast.type === "error" ? (
            <XCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <h1 className="relative z-10 text-4xl font-bold text-white drop-shadow-lg mb-10 text-center">
        📘 Manage Notes (Admin)
      </h1>

      <form
        onSubmit={handleUpload}
        className="relative z-10 bg-white/80 backdrop-blur-md shadow-2xl border border-white/20 rounded-2xl p-8 w-full max-w-md mb-12"
      >
        <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
          <UploadCloud /> Upload New Note
        </h2>

        <label className="block mb-2 text-gray-700 font-medium">Uploader Name</label>
        <input
          type="text"
          placeholder="Enter uploader name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <label className="block mb-2 text-gray-700 font-medium">Category</label>
        <input
          type="text"
          placeholder="e.g. Web Dev, Physics"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <label className="block mb-2 text-gray-700 font-medium">Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="">Select Department</option>
          <option value="BA">BA</option>
          <option value="BSc">BSc</option>
          <option value="BCom">BCom</option>
          <option value="BCA">BCA</option>
        </select>

        <label className="block mb-2 text-gray-700 font-medium">Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>

        <label className="block mb-2 text-gray-700 font-medium">File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-6 border border-gray-300 px-3 py-2 rounded-lg bg-white/70"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-transform transform hover:scale-105"
        >
          🚀 Upload Note
        </button>
      </form>

     
      <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-8">
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="px-4 py-2 border border-white/40 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="All">All Departments</option>
          <option value="BA">BA</option>
          <option value="BSc">BSc</option>
          <option value="BCom">BCom</option>
          <option value="BCA">BCA</option>
        </select>

        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-4 py-2 border border-white/40 rounded-lg bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-purple-500 outline-none"
        >
          <option value="All">All Years</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>
      </div>

      {/* Notes List */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {filteredNotes.length === 0 ? (
          <p className="col-span-full text-center text-white text-lg">
            No notes available yet.
          </p>
        ) : (
          filteredNotes.map((note, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-white/20"
            >
              <p className="text-lg font-semibold text-purple-700 mb-1 break-words">
                {note.uploader || "Unknown"}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Dept:</strong> {note.department} |{" "}
                <strong>Year:</strong> {note.year}
              </p>
              <p className="text-sm text-gray-600 italic mb-3">{note.category}</p>

              <div className="flex gap-3 mt-2">
                <a
                  href={note.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
                >
                  Preview
                </a>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">{note.uploadedAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
