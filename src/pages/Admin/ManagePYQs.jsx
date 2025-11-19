import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, FileText, UploadCloud, Edit, Save, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManagePYQs() {
  const navigate = useNavigate();
  const [pyqs, setPYQs] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedPYQs = JSON.parse(localStorage.getItem("pyqsUploads") || "[]");
    setPYQs(storedPYQs);
  }, []);

  const savePYQs = (updated) => {
    setPYQs(updated);
    localStorage.setItem("pyqsUploads", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  
  const handleUpload = (e) => {
    e.preventDefault();
    setStatus("⏳ Uploading...");

    if (!file || !category || !name || !department || !year) {
      setStatus("⚠️ Please fill all fields and select a file!");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const newPYQ = {
        name: file.name,
        category,
        uploader: name,
        department,
        year,
        data: event.target.result,
        uploadedAt: new Date().toLocaleString(),
        uploadedAtTs: Date.now(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem("pyqsUploads") || "[]");
        const updated = [...existing, newPYQ];

        localStorage.setItem("pyqsUploads", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
        setPYQs(updated);

        setStatus("✅ PYQ uploaded successfully!");
      } catch (err) {
        console.error(err);
        setStatus("❌ Failed to save. File may be too large!");
      }

      setFile(null);
      setCategory("");
      setName("");
      setDepartment("");
      setYear("");
    };

    reader.onerror = () => setStatus("❌ Failed to read file!");
    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    if (!window.confirm("🗑️ Delete this PYQ permanently?")) return;
    const updated = pyqs.filter((_, i) => i !== index);
    savePYQs(updated);
    setStatus("🗑️ PYQ deleted.");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const p = pyqs[index];
    setCategory(p.category);
    setName(p.uploader);
    setDepartment(p.department);
    setYear(p.year);
  };

  const handleSaveEdit = (index) => {
    const updated = [...pyqs];
    updated[index] = {
      ...updated[index],
      category,
      uploader: name,
      department,
      year,
    };
    savePYQs(updated);
    setEditIndex(null);
    setCategory("");
    setName("");
    setDepartment("");
    setYear("");
    setStatus("✅ PYQ updated!");
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setCategory("");
    setName("");
    setDepartment("");
    setYear("");
    setStatus("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white p-8 flex flex-col items-center">
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

        <h1 className="text-3xl font-bold text-center mb-4 text-yellow-300">
          📄 Manage PYQs
        </h1>

      
        {status && (
          <p className="text-center mb-6 bg-white/20 px-4 py-2 rounded-lg text-sm">
            {status}
          </p>
        )}

      
        <form onSubmit={handleUpload} className="bg-white/10 p-6 rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UploadCloud size={20} /> Upload New PYQ
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
              placeholder="Category (e.g. BCA 1st Sem)"
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
            🚀 Upload PYQ
          </button>
        </form>

     
        {pyqs.length === 0 ? (
          <p className="text-center text-gray-300">No PYQs uploaded yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pyqs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white bg-opacity-10 p-5 rounded-xl shadow-lg"
              >
                {editIndex === i ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2">✏️ Editing {p.name}</h2>
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
                        <FileText size={20} /> {p.name}
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
                    <p className="text-gray-300 mt-2">
                      {p.department} - {p.year}
                    </p>
                    <p className="text-sm text-gray-400">By {p.uploader}</p>
                    <p className="text-xs text-gray-500 mt-1">{p.category}</p>
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
