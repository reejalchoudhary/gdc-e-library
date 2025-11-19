import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import up1 from "../assets/upload1.jpg";
import up2 from "../assets/upload2.jpg";
import up3 from "../assets/upload3.jpg";

const STORAGE_MAP = {
  book: "booksUploads",
  note: "notesUploads",
  pyq: "pyqsUploads",
};

function nowString() {
  return new Date().toLocaleString();
}
function nowTs() {
  return Date.now();
}

function Toast({ message, type = "success", onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22 }}
      className={`px-4 py-2 rounded-md shadow-lg text-sm ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : "bg-sky-700 text-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>{message}</div>
        <button onClick={onClose} className="ml-2 text-xs opacity-90 hover:opacity-100">
          ✕
        </button>
      </div>
    </motion.div>
  );
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Upload() {
  const [type, setType] = useState("note");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [uploader, setUploader] = useState("");
  const [file, setFile] = useState(null);

  const [toasts, setToasts] = useState([]);

  const images = [up1, up2, up3];

  const [bgIndex, setBgIndex] = useState(0);
  const CAROUSEL_MS = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((p) => (p + 1) % images.length);
    }, CAROUSEL_MS);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const loggedIn = JSON.parse(sessionStorage.getItem("loggedInStudent") || "null");
    if (loggedIn?.name) setUploader(loggedIn.name);
  }, []);

  const pushToast = (message, variant = "success", ttl = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl);
  };

  const handleFileSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return setFile(null);
    if (f.size > 30 * 1024 * 1024)
      return pushToast("File too large (max 30MB).", "error");

    setFile(f);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return pushToast("Enter file title.", "error");
    if (!category.trim()) return pushToast("Enter category.", "error");
    if (!department) return pushToast("Select department.", "error");
    if (!year) return pushToast("Select year.", "error");
    if (!file) return pushToast("Choose a file.", "error");

    pushToast("Uploading...", "info", 1500);

    try {
      const dataUrl = await readFileAsDataURL(file);

      const payload = {
        name: name.trim(),
        category: category.trim(),
        department,
        year,
        uploader: uploader || "Anonymous",
        data: dataUrl,
        uploadedAt: nowString(),
        uploadedAtTs: nowTs(),
      };

      const key = STORAGE_MAP[type];
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.unshift(payload);
      localStorage.setItem(key, JSON.stringify(existing));

      pushToast("Upload successful 🎉", "success");

      setName("");
      setCategory("");
      setDepartment("");
      setYear("");
      setFile(null);
    } catch {
      pushToast("Upload failed!", "error");
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">

      <div className="absolute inset-0 -z-10">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{
              opacity: bgIndex === idx ? 1 : 0,
              scale: bgIndex === idx ? 1.05 : 1,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      </div>
      <div className="fixed top-6 right-6 z-50 space-y-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              message={t.message}
              type={t.variant}
              onClose={() => setToasts((s) => s.filter((x) => x.id !== t.id))}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 p-6 flex justify-center">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-white/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          <h1 className="text-3xl font-bold text-center text-purple-800 mb-4">
            ⬆️ Upload Material
          </h1>
          <p className="text-center text-gray-700 mb-6">
            Select type and upload files stored in LocalStorage.
          </p>

          <div className="flex justify-center gap-4 mb-6">
            {["note", "book", "pyq"].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  type === t
                    ? "bg-purple-600 text-white"
                    : "bg-white/70 text-purple-700"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title"
              className="input"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category / Subject"
              className="input"
            />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input"
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
              className="input"
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
            </select>

            <input
              value={uploader}
              onChange={(e) => setUploader(e.target.value)}
              placeholder="Uploader Name"
              className="input md:col-span-2"
            />

            <label className="md:col-span-2">
              <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border cursor-pointer">
                <span className="font-medium">Choose File</span>
                <span className="text-xs text-gray-600">
                  PDF, DOCX, PPTX, Images (max 30MB)
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                  onChange={handleFileSelect}
                />
              </div>
              <p className="text-xs mt-1">
                Selected: {file ? file.name : "No file chosen"}
              </p>
            </label>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => {
                setName("");
                setCategory("");
                setDepartment("");
                setYear("");
                setFile(null);
                pushToast("Form reset", "info");
              }}
              className="px-6 py-3 bg-white border rounded-lg"
            >
              Reset
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
