import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Discussion() {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem("discussion_msgs") || "[]";
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(() => localStorage.getItem("discussion_user") || "");
  const boxRef = useRef();

 
  const role = sessionStorage.getItem("role") || "student";

  
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
    window.dispatchEvent(new Event("storage"));
  };

 
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !username.trim()) {
      alert("⚠️ Please enter your name and message!");
      return;
    }

    const newMsg = {
      text: input,
      time: new Date().toLocaleString(),
      from: role === "admin" ? "Admin" : "Student",
      name: username,
      highlight: false,
    };

    const updated = [...messages, newMsg];
    saveAndSync(updated);
    setInput("");
  };

  
  const adminMessages = messages.filter((m) => m.from === "Admin");
  const otherMessages = messages.filter((m) => m.from !== "Admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white py-10 px-4 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        💬 College Discussion Group
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl w-full max-w-2xl p-6 flex flex-col"
      >
       
        {adminMessages.length > 0 && (
          <div className="bg-yellow-300/20 border border-yellow-400 p-4 rounded-lg mb-4 shadow-md">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">
              📢 Official Announcements
            </h3>
            {adminMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-yellow-100/10 p-2 rounded-lg mb-2"
              >
                <p className="text-yellow-200 font-medium">{msg.text}</p>
                <p className="text-xs text-gray-300">
                  {msg.name} ({msg.from}) • {msg.time}
                </p>
              </motion.div>
            ))}
          </div>
        )}

       
        <div
          className="flex-grow h-64 overflow-y-auto border border-white/20 p-3 rounded-lg space-y-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent"
          ref={boxRef}
        >
          {otherMessages.length === 0 ? (
            <p className="text-gray-300 text-center">
              No messages yet — start the conversation!
            </p>
          ) : (
            otherMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-2 rounded-lg ${
                  msg.highlight
                    ? "bg-yellow-200/30 border border-yellow-400"
                    : "bg-purple-200/20"
                }`}
              >
                <p className="text-white">{msg.text}</p>
                <p className="text-xs text-gray-300 mt-1">
                  {msg.name} ({msg.from}) • {msg.time}
                </p>
              </motion.div>
            ))
          )}
        </div>


        <form onSubmit={handleSend} className="flex flex-col sm:flex-row gap-2 mt-4">
          <input
            type="text"
            placeholder="Your name..."
            className="flex-grow border border-white/40 bg-white/30 text-white placeholder-white/70 p-2 rounded focus:outline-none"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              localStorage.setItem("discussion_user", e.target.value);
            }}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow border border-white/40 bg-white/30 text-white placeholder-white/70 p-2 rounded focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-yellow-400 text-purple-900 font-semibold px-4 rounded-lg hover:bg-yellow-500 transition"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
