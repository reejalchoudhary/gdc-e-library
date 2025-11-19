import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Profile() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const keys = [
      "loggedInStudent",
      "student",
      "user",
      "currentUser",
      "studentData",
    ];

    let found = null;
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          found = JSON.parse(value);
          break;
        } catch (err) {
          console.error("Error parsing stored student data:", err);
        }
      }
    }

    if (!found) {
      console.warn("⚠️ No student data found in localStorage");
    } else {
      setStudent(found);
    }
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500">
        <p className="text-lg">No student logged in.</p>
        <button
          onClick={() => navigate("/login-selector")}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-5 py-2 rounded-full font-semibold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-6 text-white">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <UserCircle className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">{student.name || "Unnamed Student"}</h1>
        <p className="text-yellow-200 mb-6">Student Profile</p>

        <div className="text-left space-y-3 text-white/90">
          <p><span className="font-semibold text-yellow-300">Email:</span> {student.email || "Not Provided"}</p>
          <p><span className="font-semibold text-yellow-300">Department:</span> {student.department || "Not Provided"}</p>
          <p><span className="font-semibold text-yellow-300">Year:</span> {student.year || "Not Provided"}</p>
          <p><span className="font-semibold text-yellow-300">Roll No:</span> {student.rollNo || "Not Provided"}</p>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-6 py-2 rounded-full font-semibold transition-transform hover:scale-105"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
