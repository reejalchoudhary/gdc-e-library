import { useEffect, useState } from "react";
import { Eye, Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion"; 

export default function Books() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("booksUploads") || "[]");
    stored.sort((a, b) => (b.uploadedAtTs || 0) - (a.uploadedAtTs || 0));
    setBooks(stored);

    const handleStorageChange = (e) => {
      if (e.key === "booksUploads") {
        const updatedBooks = JSON.parse(localStorage.getItem("booksUploads") || "[]");
        setBooks(updatedBooks);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveAndSet = (arr) => {
    localStorage.setItem("booksUploads", JSON.stringify(arr));
    setBooks(arr);
  };

  const handleDelete = (index) => {
    if (sessionStorage.getItem("role") !== "admin") {
      showToast("Only admin can delete uploads.", "error");
      return;
    }
    if (!window.confirm("Delete this item?")) return;
    const updated = [...books];
    updated.splice(index, 1);
    saveAndSet(updated);
    window.dispatchEvent(new Event("storage"));
    showToast("🗑️ Book deleted successfully!", "error");
  };

  const filtered = books.filter((b) => {
    const q = query.trim().toLowerCase();
    if (q && !b.name.toLowerCase().includes(q) && !b.category.toLowerCase().includes(q)) return false;
    if (departmentFilter && b.department?.toLowerCase() !== departmentFilter.toLowerCase()) return false;
    if (yearFilter && b.year?.toLowerCase() !== yearFilter.toLowerCase()) return false;
    if (categoryFilter && b.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    return true;
  });

  const departments = Array.from(new Set(books.map((b) => b.department).filter(Boolean)));
  const years = Array.from(new Set(books.map((b) => b.year).filter(Boolean)));
  const categories = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));

  
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file) return;

    reader.onload = () => {
      const newBook = {
        name: file.name,
        category,
        uploader: "Admin",  
        department,
        year,
        data: reader.result,
        uploadedAt: new Date().toLocaleString(),
        uploadedAtTs: Date.now(),
      };
      
      const updated = [...books, newBook];
      saveAndSet(updated);
      window.dispatchEvent(new Event("storage"));
      showToast("✅ Book uploaded successfully!");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9] text-gray-800">
      
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

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

      
      <div className="relative z-10 p-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">📚 Uploaded Books</h1>

          
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Search by name or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map((y, i) => (
                <option key={i} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-600"
            >
              No books found.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((book, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 120,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-100 to-cyan-100 p-5 rounded-xl shadow-lg transition-transform transform hover:shadow-xl"
                >
                  <h2 className="font-semibold text-lg truncate text-blue-700">{book.name}</h2>
                  <p className="text-sm text-gray-700">📖 {book.category}</p>
                  <p className="text-sm text-gray-600">🏛 {book.department || "—"}</p>
                  <p className="text-sm text-gray-600 mb-3">🎓 {book.year || "—"}</p>

                  <div className="flex gap-2">
                    <a
                      href={book.data}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg text-center transition-colors"
                    >
                      <Eye className="inline-block mr-1 w-4 h-4" /> Preview
                    </a>
                    <a
                      href={book.data}
                      download={book.name}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center transition-colors"
                    >
                      <Download className="inline-block mr-1 w-4 h-4" /> Download
                    </a>
                  </div>

                  {sessionStorage.getItem("role") === "admin" && (
                    <div className="mt-3 text-right">
                      <button
                        onClick={() => handleDelete(books.indexOf(book))}
                        className="text-red-600 hover:underline flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
