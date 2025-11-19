import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ManageUsers() {
  const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState([]);
  const [searchPending, setSearchPending] = useState("");
  const [filterDeptPending, setFilterDeptPending] = useState("");
  const [filterYearPending, setFilterYearPending] = useState("");
  const [searchApproved, setSearchApproved] = useState("");
  const [filterDeptApproved, setFilterDeptApproved] = useState("");
  const [filterYearApproved, setFilterYearApproved] = useState("");

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("student_requests") || "[]");
    const storedApproved = JSON.parse(localStorage.getItem("approved_students") || "[]");
    setRequests(storedRequests);
    setApproved(storedApproved);
  }, []);

  const handleApprove = (index) => {
    const newApproved = [...approved, requests[index]];
    const newRequests = requests.filter((_, i) => i !== index);
    setApproved(newApproved);
    setRequests(newRequests);
    localStorage.setItem("student_requests", JSON.stringify(newRequests));
    localStorage.setItem("approved_students", JSON.stringify(newApproved));
  };

  const handleReject = (index) => {
    const newRequests = requests.filter((_, i) => i !== index);
    setRequests(newRequests);
    localStorage.setItem("student_requests", JSON.stringify(newRequests));
  };

  const handleDeleteApproved = (index) => {
    const updated = approved.filter((_, i) => i !== index);
    setApproved(updated);
    localStorage.setItem("approved_students", JSON.stringify(updated));
  };

  
  const filteredRequests = requests.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchPending.toLowerCase()) ||
      s.email.toLowerCase().includes(searchPending.toLowerCase());
    const matchDept = filterDeptPending ? s.department === filterDeptPending : true;
    const matchYear = filterYearPending ? s.year === filterYearPending : true;
    return matchSearch && matchDept && matchYear;
  });

  const filteredApproved = approved.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchApproved.toLowerCase()) ||
      s.email.toLowerCase().includes(searchApproved.toLowerCase());
    const matchDept = filterDeptApproved ? s.department === filterDeptApproved : true;
    const matchYear = filterYearApproved ? s.year === filterYearApproved : true;
    return matchSearch && matchDept && matchYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-yellow-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 rounded-2xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center drop-shadow-md">
          Manage Users 👥
        </h1>

        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-pink-300 mb-4">Pending Student Requests</h2>

          
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none flex-1 min-w-[220px]"
              value={searchPending}
              onChange={(e) => setSearchPending(e.target.value)}
            />
            <select
              className="custom-select w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 
                        focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 
                        hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] 
                        backdrop-blur-xl cursor-pointer"
              value={filterDeptPending}
              onChange={(e) => setFilterDeptPending(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="BCA">BCA</option>
              <option value="BA">BA</option>
              <option value="BSC">BSC</option>
              <option value="BCOM">BCOM</option>
            </select>
            <select
              className="custom-select w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 
                        focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 
                        hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] 
                        backdrop-blur-xl cursor-pointer"
              value={filterYearPending}
              onChange={(e) => setFilterYearPending(e.target.value)}
            >
              <option value="">All Years</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
            </select>
          </div>

          {filteredRequests.length === 0 ? (
            <p className="text-white/70">No pending requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-white text-sm border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-white/10 text-pink-200">
                    <th className="border border-white/20 px-3 py-2">Full Name</th>
                    <th className="border border-white/20 px-3 py-2">Email</th>
                    <th className="border border-white/20 px-3 py-2">Roll No</th>
                    <th className="border border-white/20 px-3 py-2">Department</th>
                    <th className="border border-white/20 px-3 py-2">Year/Sem</th>
                    <th className="border border-white/20 px-3 py-2">Mobile</th>
                    <th className="border border-white/20 px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((s, index) => (
                    <tr key={index} className="hover:bg-white/5 transition">
                      <td className="border border-white/20 px-3 py-2">{s.name}</td>
                      <td className="border border-white/20 px-3 py-2">{s.email}</td>
                      <td className="border border-white/20 px-3 py-2">{s.rollno}</td>
                      <td className="border border-white/20 px-3 py-2">{s.department}</td>
                      <td className="border border-white/20 px-3 py-2">{s.year}</td>
                      <td className="border border-white/20 px-3 py-2">{s.mobile}</td>
                      <td className="border border-white/20 px-3 py-2">
                        <button
                          onClick={() => handleApprove(index)}
                          className="px-3 py-1 bg-green-500/30 hover:bg-green-500/50 rounded-md mr-2 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(index)}
                          className="px-3 py-1 bg-red-500/30 hover:bg-red-500/50 rounded-md transition"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
        <div>
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Approved Students</h2>

          
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-pink-400 outline-none flex-1 min-w-[220px]"
              value={searchApproved}
              onChange={(e) => setSearchApproved(e.target.value)}
            />
            <select
              className="custom-select w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 
                        focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 
                        hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] 
                        backdrop-blur-xl cursor-pointer"
              value={filterDeptApproved}
              onChange={(e) => setFilterDeptApproved(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="BCA">BCA</option>
              <option value="BA">BA</option>
              <option value="BSC">BSC</option>
              <option value="BCOM">BCOM</option>
            </select>
            <select
              className="custom-select w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 
                        focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 
                        hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,105,180,0.5)] 
                        backdrop-blur-xl cursor-pointer"
              value={filterYearApproved}
              onChange={(e) => setFilterYearApproved(e.target.value)}
            >
              <option value="">All Years</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
            </select>
          </div>

          {filteredApproved.length === 0 ? (
            <p className="text-white/70">No approved students found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-white text-sm border-collapse border border-white/20 rounded-lg">
                <thead>
                  <tr className="bg-white/10 text-yellow-200">
                    <th className="border border-white/20 px-3 py-2">Full Name</th>
                    <th className="border border-white/20 px-3 py-2">Email</th>
                    <th className="border border-white/20 px-3 py-2">Roll No</th>
                    <th className="border border-white/20 px-3 py-2">Department</th>
                    <th className="border border-white/20 px-3 py-2">Year/Sem</th>
                    <th className="border border-white/20 px-3 py-2">Mobile</th>
                    <th className="border border-white/20 px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApproved.map((s, index) => (
                    <tr key={index} className="hover:bg-white/5 transition">
                      <td className="border border-white/20 px-3 py-2">{s.name}</td>
                      <td className="border border-white/20 px-3 py-2">{s.email}</td>
                      <td className="border border-white/20 px-3 py-2">{s.rollno}</td>
                      <td className="border border-white/20 px-3 py-2">{s.department}</td>
                      <td className="border border-white/20 px-3 py-2">{s.year}</td>
                      <td className="border border-white/20 px-3 py-2">{s.mobile}</td>
                      <td className="border border-white/20 px-3 py-2">
                        <button
                          onClick={() => handleDeleteApproved(index)}
                          className="px-3 py-1 bg-red-500/30 hover:bg-red-500/50 rounded-md transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
