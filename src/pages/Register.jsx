import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const students = JSON.parse(localStorage.getItem("student_requests") || "[]");
    const approvedStudents = JSON.parse(localStorage.getItem("approved_students") || "[]");

    const exists = [...students, ...approvedStudents].some((s) => s.email === email);
    if (exists) {
      setMessage("❌ This email is already registered!");
      return;
    }

    const newStudent = { name, email, rollno, department, year, mobile, password };
    students.push(newStudent);
    localStorage.setItem("student_requests", JSON.stringify(students));

    setMessage("✅ Registration submitted! Please wait for admin approval.");

    setTimeout(() => {
      navigate("/student-login");
    }, 2000);
  };

  const getYearOptions = () => {
    if (department === "BCA") {
      return [
        "1st Semester",
        "2nd Semester",
        "3rd Semester",
        "4th Semester",
        "5th Semester",
        "6th Semester",
      ];
    } else if (department) {
      return ["1st Year", "2nd Year", "3rd Year"];
    }
    return [];
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy">

      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
        animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
        animate={{ x: [-60, 40, -20, 0], y: [30, -20, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 rounded-2xl p-10 w-full max-w-md text-center"
      >
        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-md">
          Student Registration 📄
        </h1>
        <p className="text-sm text-white/90 mb-8">
          Join <span className="font-semibold">GDC Nagrota Surian E-Library</span>
        </p>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 text-center rounded-lg text-sm font-medium ${
              message.includes("❌")
                ? "bg-red-500/20 text-red-200"
                : "bg-green-500/20 text-green-200"
            }`}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-5 text-left">
          
          <div>
            <label className="block text-white/90 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2 font-medium">Email ID</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@gdcnagrota.edu.in"
              required
            />
          </div>

          
          <div>
            <label className="block text-white/90 mb-2 font-medium">Roll Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="e.g. 23BCA045"
              required
            />
          </div>

          
          <div className="relative">
            <label className="block text-white/90 mb-2 font-medium">Department</label>
            <select
              className="custom-select w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 
                        focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 
                        hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] 
                        backdrop-blur-xl cursor-pointer"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setYear("");
              }}
              required
            >
              <option value="">Select Department</option>
              <option value="BCA">BCA</option>
              <option value="BA">BA</option>
              <option value="BSC">BSC</option>
              <option value="BCOM">BCOM</option>
            </select>
          </div>

       
          {department && (
            <div className="relative">
              <label className="block text-white/90 mb-2 font-medium">Year / Semester</label>
              <select
                className="custom-select w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 
                          focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 
                          hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] 
                          backdrop-blur-xl cursor-pointer"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Select {department === "BCA" ? "Semester" : "Year"}</option>
                {getYearOptions().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-white/90 mb-2 font-medium">Mobile Number</label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-white/70 text-sm mt-5">
          Already have an account?{" "}
          <a href="/student-login" className="text-pink-300 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </motion.div>

    
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 10s ease infinite;
        }
        .animate-blob { animation: blob 8s infinite; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        /* FIX: Make dropdown background match theme */
        select.custom-select option {
          background-color: rgba(60, 20, 100, 0.9);
          color: #fff;
        }

        select.custom-select {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
}
