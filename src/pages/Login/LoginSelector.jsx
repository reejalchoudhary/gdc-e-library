import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png"; 

export default function LoginSelector() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899] animate-gradient-xy">
      
      <motion.div
        className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 60, -60, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-18"
        animate={{ x: [-40, 50, -30, 0], y: [40, -20, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-16"
        animate={{ x: [50, -50, 40, 0], y: [-30, 30, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

 
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-white/8 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-md text-center text-white"
      >
        <div className="flex flex-col items-center -mt-10">
          
          <motion.div
            aria-hidden="true"
            className="rounded-full"
            style={{
              width: 220,
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
            
            animate={{ scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          >
            
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 220,
                height: 220,
                borderRadius: "9999px",
                filter: "blur(28px)",
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(99,102,241,0.08) 35%, rgba(139,92,246,0.02) 70%, transparent 100%)",
                zIndex: -1,
                boxShadow: "0 30px 60px rgba(99,102,241,0.12), inset 0 0 40px rgba(255,255,255,0.02)",
              }}
            />
           
            <motion.img
              src={logo}
              alt="College Logo"
              className="rounded-full object-cover"
              style={{
                width: 160,
                height: 160,
                borderRadius: "9999px",
                border: "6px solid rgba(255,255,255,0.06)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 4px 10px rgba(99,102,241,0.12)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
              
              animate={{
                y: [0, -6, 0],
                rotate: [0, -3, 0, 3, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 drop-shadow-lg leading-tight">
          Welcome to
          <br />
          GDC Nagrota Surian E-Library
        </h1>

        <p className="text-white/80 mb-6 text-sm">
          Please select your login type to continue
        </p>

        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/student-login")}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            👨‍🎓 Student Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/admin-login")}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            🧑‍💼 Admin Login
          </motion.button>
        </div>

        <p className="text-white/70 text-xs mt-6">
          © 2025 GDC Nagrota Surian E-Library | Built with 💻 + ☕ + No Sleep 😴
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
      `}</style>
    </div>
  );
}
