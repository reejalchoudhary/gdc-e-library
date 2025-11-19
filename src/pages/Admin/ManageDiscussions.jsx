import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Star, Send } from "lucide-react";

export default function ManageDiscussion() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("discussion_msgs") || "[]");
    } catch {
      return [];
    }
  });

  const [adminInput, setAdminInput] = useState("");

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "discussion_msgs") {
        try {
          setMessages(JSON.parse(e.newValue || "[]"));
        } catch {
          setMessages([]);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const saveAndSync = (updated) => {
    setMessages(updated);
    localStorage.setItem("discussion_msgs", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // force update everywhere
  };

  const handleDelete = (index) => {
    if (!window.confirm("🗑️ Delete this message permanently?")) return;
    const updated = messages.filter((_, i) => i !== index);
    saveAndSync(updated);
  };

  const handleHighlight = (index) => {
    const updated = messages.map((msg, i) =>
      i === index ? { ...msg, highlight: !msg.highlight } : msg
    );
    saveAndSync(updated);
  };

  const handleAdminSend = (e) => {
    e.preventDefault();
    if (adminInput.trim() === "") return;

    const newMsg = {
      text: adminInput,
      time: new Date().toLocaleString(),
      from: "Admin",
      highlight: false,
    };

    const updated = [...messages, newMsg];
    saveAndSync(updated);
    setAdminInput("");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center py-10 px-4">

      <div className="absolute w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl w-full max-w-3xl p-6"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">
           Admin — Manage Discussion
        </h2>

        <div className="max-h-[65vh] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent mb-4">
          {messages.length === 0 ? (
            <p className="text-center text-white/80">
              No messages to manage yet.
            </p>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex justify-between items-center p-4 rounded-xl border ${
                  msg.highlight
                    ? "bg-yellow-100/40 border-yellow-400 shadow-lg"
                    : msg.from === "Admin"
                    ? "bg-purple-400/40 border-purple-300"
                    : "bg-white/10 border-white/30"
                }`}
              >
                <div>
                  <p
                    className={`text-lg ${
                      msg.from === "Admin" ? "text-yellow-200" : "text-white"
                    }`}
                  >
                    {msg.from === "Admin" ? "👑 Admin:" : "👤 Student:"}{" "}
                    {msg.text}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">{msg.time}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleHighlight(i)}
                    className={`p-2 rounded-lg ${
                      msg.highlight
                        ? "bg-yellow-400 text-white hover:bg-yellow-500"
                        : "bg-white/30 text-yellow-300 hover:bg-yellow-400 hover:text-white"
                    } transition`}
                    title="Highlight message"
                  >
                    <Star size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition"
                    title="Delete message"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <form onSubmit={handleAdminSend} className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Type an admin message..."
            className="flex-grow border border-white/40 bg-white/30 text-white placeholder-white/70 p-2 rounded focus:outline-none"
            value={adminInput}
            onChange={(e) => setAdminInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-purple-900 font-semibold px-4 rounded-lg hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <Send size={16} /> Send
          </button>
        </form>
      </motion.div>
    </div>
  );
}