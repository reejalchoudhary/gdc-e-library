import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Book, UploadCloud, Edit, Save, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("booksUploads")) || [];
    setBooks(storedBooks);

    const handleStorageChange = (e) => {
      if (e.key === "booksUploads") {
        setBooks(JSON.parse(localStorage.getItem("booksUploads")) || []);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const saveBooks = (updated) => {
    setBooks(updated);
    localStorage.setItem("booksUploads", JSON.stringify(updated));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !category || !name || !department || !year) {
      return showToast("⚠️ Please fill all fields!", "error");
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newBook = {
        name: file.name,
        category,
        uploader: name,
        department,
        year,
        data: reader.result, 
        uploadedAt: new Date().toLocaleString(),
        uploadedAtTs: Date.now(),
      };

      const updated = [...books, newBook];
      saveBooks(updated);
      showToast("✅ Book uploaded!");
      setFile(null);
      setCategory("");
      setName("");
      setDepartment("");
      setYear("");
      e.target.reset();
    };

    reader.readAsDataURL(file); 
  };

  
  const handleDelete = (index) => {
    if (!window.confirm("🗑️ Delete this book permanently?")) return;
    const updated = books.filter((_, i) => i !== index);
    saveBooks(updated);
    showToast("🗑️ Book deleted successfully!", "error");
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    const b = books[index];
    setCategory(b.category);
    setName(b.uploader);
    setDepartment(b.department);
    setYear(b.year);
  };

  const handleSaveEdit = (index) => {
    const updated = [...books];
    updated[index] = {
      ...updated[index],
      category,
      uploader: name,
      department,
      year,
    };
    saveBooks(updated);
    setEditIndex(null);
    setCategory("");
    setName("");
    setDepartment("");
    setYear("");
    showToast("✅ Book updated!");
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setCategory("");
    setName("");
    setDepartment("");
    setYear("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white p-8 flex flex-col items-center">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 flex items-center gap-2 px-5 py-3 rounded-lg shadow-lg text-white backdrop-blur-md transition-all z-50 ${
            toast.type === "error" ? "bg-red-500/90" : "bg-green-500/90"
          }`}
        >
          {toast.type === "error" ? (
            <X size={20} />
          ) : (
            <CheckCircle size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
      >
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-300">
          📘 Manage Books
        </h1>
        <form onSubmit={handleUpload} className="bg-white/10 p-6 rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UploadCloud size={20} /> Upload New Book
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Uploader Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded text-black"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded text-black"
            />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">Select Department</option>
              <option value="BA">BA</option>
              <option value="BSc">BSc</option>
              <option value="BCom">BCom</option>
              <option value="BCA">BCA</option>
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
            </select>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="md:col-span-2 p-2 bg-white rounded text-black"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-lg transition"
          >
            🚀 Upload Book
          </button>
        </form>

        {/* Book list */}
        {books.length === 0 ? (
          <p className="text-center text-gray-300">No books uploaded yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {books.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white bg-opacity-10 p-5 rounded-xl shadow-lg"
              >
                {editIndex === i ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2">✏️ Editing {b.name}</h2>
                    <input
                      type="text"
                      placeholder="Uploader Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 mb-2 rounded text-black"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 mb-2 rounded text-black"
                    />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-2 mb-2 rounded text-black"
                    >
                      <option value="BA">BA</option>
                      <option value="BSc">BSc</option>
                      <option value="BCom">BCom</option>
                      <option value="BCA">BCA</option>
                    </select>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full p-2 mb-2 rounded text-black"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                    </select>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSaveEdit(i)}
                        className="bg-green-400 hover:bg-green-500 text-purple-900 font-semibold px-4 py-2 rounded-lg"
                      >
                        <Save size={16} className="inline mr-1" /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg"
                      >
                        <X size={16} className="inline mr-1" /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Book size={20} /> {b.name}
                      </h2>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(i)}
                          className="text-yellow-300 hover:text-yellow-400"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 mt-2">{b.department} - {b.year}</p>
                    <p className="text-sm text-gray-400">By {b.uploader}</p>
                    <p className="text-xs text-gray-500 mt-1">{b.category}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}