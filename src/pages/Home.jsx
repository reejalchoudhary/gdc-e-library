import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assets/home1.jpg";
import img2 from "../assets/home2.jpg";
import img3 from "../assets/home3.jpg";
import img4 from "../assets/home4.jpg";
import img5 from "../assets/home5.jpg";

export default function Home() {
  const [selectedDept, setSelectedDept] = useState("");
  const navigate = useNavigate();

  const departments = ["BA", "BSc", "BCom", "BCA"];

  const images = [img1, img2, img3, img4, img5];    
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (dept) => {
    setSelectedDept(dept);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute inset-0 -z-10">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === i ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></motion.div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>

      <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <motion.h1
        className="relative text-5xl font-extrabold text-white drop-shadow-lg text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎓 Welcome to GDC Nagrota Surian E-Library
      </motion.h1>

      <motion.p
        className="relative text-gray-100 text-lg text-center mb-10 max-w-2xl drop-shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Select your department below to explore notes, PYQs, and study materials
        designed for your course.
      </motion.p>

     
      <motion.div
        className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {departments.map((dept) => (
          <motion.button
            key={dept}
            onClick={() => handleSelect(dept)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-4 rounded-xl font-semibold shadow-xl backdrop-blur-md transition-all duration-300 ${
              selectedDept === dept
                ? "bg-purple-600 text-white shadow-purple-400/60"
                : "bg-white/60 text-purple-800 hover:bg-purple-100"
            }`}
          >
            {dept}
          </motion.button>
        ))}
      </motion.div>

      
      {selectedDept && (
        <motion.div
          className="relative bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-3xl text-center border border-purple-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-purple-700 mb-8">
            📚 {selectedDept} Department Resources
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ scale: 1.05 }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              📒 Notes
            </motion.button>

            <motion.button
              onClick={() => navigate("/pyqs")}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              📄 PYQs
            </motion.button>

            <motion.button
              onClick={() => navigate("/books")}
              whileHover={{ scale: 1.05 }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              📘 Books
            </motion.button>

            <motion.button
              onClick={() => navigate("/upload")}
              whileHover={{ scale: 1.05 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              ⬆️ Upload Material
            </motion.button>
          </div>

          <p className="text-sm text-gray-600 mt-8">
            Selected Department:{" "}
            <span className="font-semibold text-purple-700">{selectedDept}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
